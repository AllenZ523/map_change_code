"use strict";

const CONFIG = window.SQUAD_MAP_CONFIG;

if (!CONFIG) {
  throw new Error("缺少配置文件：请先加载 config.js。");
}

const {
  defaultLocale: DEFAULT_LOCALE,
  author: AUTHOR,
  i18n: I18N,
  mapRules: MAP_RULES,
  factionRules: FACTION_RULES,
  labels: {
    ecosystems: ECOSYSTEM_LABELS,
    mapTypes: MAP_TYPE_LABELS,
    difficulties: DIFFICULTY_LABELS,
    sizes: SIZE_LABELS,
    modeTypes: MODE_TYPE_LABELS,
    alliances: ALLIANCE_LABELS
  },
  modeTypes: MODE_TYPES,
  difficulties: DIFFICULTIES,
  mapSizes: MAP_SIZES,
  balanceWarning: BALANCE_WARNING,
  maps: MAPS,
  countries: COUNTRIES
} = CONFIG;

function requireConfigArray(name, value) {
  if (!Array.isArray(value) || value.length === 0) {
    throw new Error(`配置错误：${name} 必须是非空数组。`);
  }
}

requireConfigArray("modeTypes", MODE_TYPES);
requireConfigArray("difficulties", DIFFICULTIES);
requireConfigArray("mapSizes", MAP_SIZES);
requireConfigArray("maps", MAPS);
requireConfigArray("countries", COUNTRIES);

const LOCALES = I18N?.locales || [];
const FALLBACK_LOCALE = LOCALES.includes(DEFAULT_LOCALE) ? DEFAULT_LOCALE : LOCALES[0];

if (!FALLBACK_LOCALE) {
  throw new Error("配置错误：i18n 必须至少包含一种语言。");
}

const $ = (id) => document.getElementById(id);

const elements = {
  authorName: $("authorName"),
  languageSelect: $("languageSelect"),
  resetCommandButton: $("resetCommandButton"),
  metricMaps: $("metricMaps"),
  metricLayers: $("metricLayers"),
  metricFactions: $("metricFactions"),
  mapResultCount: $("mapResultCount"),
  mapSearch: $("mapSearch"),
  ecosystemFilter: $("ecosystemFilter"),
  mapTypeFilter: $("mapTypeFilter"),
  mapList: $("mapList"),
  selectedMapMeta: $("selectedMapMeta"),
  operationControl: $("operationControl"),
  modeCountLabel: $("modeCountLabel"),
  modeList: $("modeList"),
  allowCivilWarToggle: $("allowCivilWarToggle"),
  validFactionLabel: $("validFactionLabel"),
  faction1Select: $("faction1Select"),
  formation1Select: $("formation1Select"),
  faction2Select: $("faction2Select"),
  formation2Select: $("formation2Select"),
  balanceLabel: $("balanceLabel"),
  balanceFill: $("balanceFill"),
  commandOutput: $("commandOutput"),
  copyCommandButton: $("copyCommandButton"),
  difficultyChecks: $("difficultyChecks"),
  sizeChecks: $("sizeChecks"),
  modeTypeChecks: $("modeTypeChecks"),
  thresholdInput: $("thresholdInput"),
  poolSizeInput: $("poolSizeInput"),
  thresholdRange: $("thresholdRange"),
  generatePoolButton: $("generatePoolButton"),
  copyPoolButton: $("copyPoolButton"),
  poolCandidateCount: $("poolCandidateCount"),
  poolResultCount: $("poolResultCount"),
  poolResults: $("poolResults"),
  toast: $("toast")
};

const state = {
  view: "command",
  locale: FALLBACK_LOCALE,
  operation: "AdminSetNextLayer",
  selectedMapId: MAPS[0].id,
  selectedModeName: MAPS[0].modes[0].modeName,
  faction1: "",
  formation1: "",
  faction2: "",
  formation2: "",
  allowCivilWar: true,
  mapSearch: "",
  ecosystemFilter: "all",
  mapTypeFilter: "all",
  poolDifficulties: new Set(DIFFICULTIES),
  poolSizes: new Set(MAP_SIZES),
  poolModeTypes: new Set(MODE_TYPES),
  balanceThreshold: BALANCE_WARNING,
  poolSize: 5,
  poolCommands: []
};

let toastTimer = 0;

const i18nRuntime = I18N.createRuntime(state.locale);

function t(key, values = {}) {
  return i18nRuntime.t(key, values);
}

function labelFrom(group, key) {
  return i18nRuntime.labelFrom(group, key);
}

function mapLabel(map) {
  return labelFrom("maps", map.id);
}

function modeTypeLabel(value) {
  return labelFrom("modeTypes", value);
}

function applyLocale() {
  const config = i18nRuntime.config;
  document.documentElement.lang = state.locale;
  document.title = config.appTitle || t("mainTitle");

  if (elements.authorName) {
    elements.authorName.textContent = AUTHOR || "";
  }

  document.querySelectorAll("[data-i18n]").forEach((node) => {
    node.textContent = t(node.dataset.i18n);
  });

  document.querySelectorAll("[data-i18n-attr]").forEach((node) => {
    node.dataset.i18nAttr.split(";").forEach((item) => {
      const [attribute, key] = item.split(":").map((part) => part.trim());
      if (attribute && key) {
        node.setAttribute(attribute, t(key));
      }
    });
  });
}

function getMapById(id) {
  return MAPS.find((map) => map.id === id) || MAPS[0];
}

function getFactionByName(name) {
  return COUNTRIES.find((item) => item.name === name) || null;
}

function getModeByName(map, modeName) {
  return map.modes.find((item) => item.modeName === modeName) || map.modes[0];
}

function canAlliancesFight(alliance1, alliance2) {
  return FACTION_RULES.canAlliancesFight(alliance1, alliance2, { allowCivilWar: state.allowCivilWar });
}

function getValidFactions(map) {
  return FACTION_RULES.getValidFactions(COUNTRIES, map);
}

function getAllowedFormations(factionItem, mapSize) {
  return FACTION_RULES.getAllowedFormations(factionItem, mapSize);
}

function formatAdvantage(value) {
  if (value > 0) {
    return t("faction1Advantage", { value });
  }
  if (value < 0) {
    return t("faction2Advantage", { value: Math.abs(value) });
  }
  return t("balancePlain");
}

function balanceClass(value) {
  return Math.abs(value) > BALANCE_WARNING ? "danger" : "accent";
}

function selectedContext() {
  const map = getMapById(state.selectedMapId);
  const selectedMode = getModeByName(map, state.selectedModeName);
  const faction1 = getFactionByName(state.faction1);
  const faction2 = getFactionByName(state.faction2);
  const formation1 = getAllowedFormations(faction1, selectedMode.mapSize).find((item) => item.name === state.formation1) || null;
  const formation2 = getAllowedFormations(faction2, selectedMode.mapSize).find((item) => item.name === state.formation2) || null;
  return { map, selectedMode, faction1, faction2, formation1, formation2 };
}

function createOption(value, label, selected = false) {
  const option = document.createElement("option");
  option.value = value;
  option.textContent = label;
  option.selected = selected;
  return option;
}

function setSelectOptions(select, options, selectedValue) {
  select.replaceChildren();
  options.forEach((option) => {
    select.appendChild(createOption(option.value, option.label, option.value === selectedValue));
  });
}

function replaceChildrenKeepScroll(container, ...children) {
  const scrollTop = container.scrollTop;
  const scrollLeft = container.scrollLeft;
  container.replaceChildren(...children);
  container.scrollTop = scrollTop;
  container.scrollLeft = scrollLeft;
  requestAnimationFrame(() => {
    container.scrollTop = scrollTop;
    container.scrollLeft = scrollLeft;
  });
}

function renderStaticControls() {
  const languageOptions = LOCALES.map((locale) => ({
    value: locale,
    label: I18N.messages[locale].localeName || locale
  }));
  const ecosystemOptions = [
    { value: "all", label: t("allEcosystems") },
    ...Object.keys(ECOSYSTEM_LABELS)
      .filter((key) => MAPS.some((map) => map.ecosystem === key))
      .map((value) => ({ value, label: labelFrom("ecosystems", value) }))
  ];
  const mapTypeOptions = [
    { value: "all", label: t("allTypes") },
    ...Object.keys(MAP_TYPE_LABELS).map((value) => ({ value, label: labelFrom("mapTypes", value) }))
  ];

  setSelectOptions(elements.languageSelect, languageOptions, state.locale);
  setSelectOptions(elements.ecosystemFilter, ecosystemOptions, state.ecosystemFilter);
  setSelectOptions(elements.mapTypeFilter, mapTypeOptions, state.mapTypeFilter);

  elements.metricMaps.textContent = MAPS.length;
  elements.metricLayers.textContent = MAPS.reduce((sum, map) => sum + map.modes.length, 0);
  elements.metricFactions.textContent = COUNTRIES.length;

  renderCheckboxes(elements.difficultyChecks, DIFFICULTIES, "difficulties", state.poolDifficulties, "pool-difficulty");
  renderCheckboxes(elements.sizeChecks, MAP_SIZES, "sizes", state.poolSizes, "pool-size");
  renderCheckboxes(elements.modeTypeChecks, MODE_TYPES, "modeTypes", state.poolModeTypes, "pool-mode-type");

  elements.thresholdInput.value = state.balanceThreshold;
  elements.thresholdRange.value = state.balanceThreshold;
  elements.poolSizeInput.value = state.poolSize;
  elements.allowCivilWarToggle.checked = state.allowCivilWar;
}

function renderCheckboxes(container, values, labelGroup, selectedSet, name, includeCode = false) {
  const fragment = document.createDocumentFragment();
  values.forEach((value) => {
    const label = document.createElement("label");
    label.className = "check-card";

    const input = document.createElement("input");
    input.type = "checkbox";
    input.name = name;
    input.value = value;
    input.checked = selectedSet.has(value);

    const span = document.createElement("span");
    const displayLabel = labelFrom(labelGroup, value);
    span.textContent = includeCode ? value : displayLabel;
    span.title = includeCode ? displayLabel : "";

    label.append(input, span);
    fragment.appendChild(label);
  });
  container.replaceChildren(fragment);
}

function filteredMaps() {
  return MAP_RULES.filterMaps(MAPS, state, { mapLabel });
}

function ensureSelectedMapIsVisible(maps) {
  if (maps.length === 0) {
    return;
  }
  if (!maps.some((map) => map.id === state.selectedMapId)) {
    state.selectedMapId = maps[0].id;
    state.selectedModeName = maps[0].modes[0].modeName;
  }
}

function renderMapList(maps) {
  elements.mapResultCount.textContent = t("mapCount", { count: maps.length });

  if (maps.length === 0) {
    replaceChildrenKeepScroll(elements.mapList, emptyState(t("emptyMaps")));
    return;
  }

  const fragment = document.createDocumentFragment();
  maps.forEach((map) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = `map-button${map.id === state.selectedMapId ? " is-active" : ""}`;
    button.dataset.mapId = map.id;

    const title = document.createElement("span");
    title.className = "item-title";
    title.textContent = mapLabel(map);

    const meta = document.createElement("span");
    meta.className = "item-meta";
    meta.append(
      chip(labelFrom("ecosystems", map.ecosystem)),
      chip(labelFrom("mapTypes", map.mapType), map.mapType === "LargeAmphibious" ? "warning" : ""),
      chip(t("layerTag", { count: map.modes.length }))
    );

    button.append(title, meta);
    fragment.appendChild(button);
  });

  replaceChildrenKeepScroll(elements.mapList, fragment);
}

function renderModeList(map) {
  if (!map.modes.some((item) => item.modeName === state.selectedModeName)) {
    state.selectedModeName = map.modes[0].modeName;
  }

  elements.modeCountLabel.textContent = t("layerCount", { count: map.modes.length });
  elements.selectedMapMeta.textContent = `${labelFrom("ecosystems", map.ecosystem)} · ${labelFrom("mapTypes", map.mapType)}`;

  const fragment = document.createDocumentFragment();
  map.modes.forEach((item) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = `mode-button${item.modeName === state.selectedModeName ? " is-active" : ""}`;
    button.dataset.modeName = item.modeName;

    const title = document.createElement("span");
    title.className = "item-title";
    title.textContent = item.modeName;

    const meta = document.createElement("span");
    meta.className = "item-meta";
    meta.append(
      chip(modeTypeLabel(item.modetype), "accent"),
      chip(labelFrom("sizes", item.mapSize)),
      chip(labelFrom("difficulties", item.difficulty), item.difficulty === "Hard" ? "danger" : ""),
      chip(formatAdvantage(item.faction1Advantage))
    );

    button.append(title, meta);
    fragment.appendChild(button);
  });

  replaceChildrenKeepScroll(elements.modeList, fragment);
}

function renderFactionControls(map, selectedMode) {
  const validFactions = getValidFactions(map);
  if (!validFactions.some((item) => item.name === state.faction1)) {
    state.faction1 = validFactions[0]?.name || "";
  }

  const faction1 = getFactionByName(state.faction1);
  const validFactions2 = validFactions.filter((item) => faction1 && item.name !== faction1.name && canAlliancesFight(faction1.alliance, item.alliance));
  if (!validFactions2.some((item) => item.name === state.faction2)) {
    state.faction2 = validFactions2[0]?.name || "";
  }

  elements.validFactionLabel.textContent = t("validOptions", { count: validFactions.length });

  setSelectOptions(
    elements.faction1Select,
    validFactions.map((item) => ({ value: item.name, label: factionLabel(item) })),
    state.faction1
  );

  setSelectOptions(
    elements.faction2Select,
    validFactions2.map((item) => ({ value: item.name, label: factionLabel(item) })),
    state.faction2
  );

  renderFormationControls(selectedMode);
}

function renderFormationControls(selectedMode) {
  const faction1 = getFactionByName(state.faction1);
  const faction2 = getFactionByName(state.faction2);
  const formations1 = getAllowedFormations(faction1, selectedMode.mapSize);
  const formations2 = getAllowedFormations(faction2, selectedMode.mapSize);

  if (!formations1.some((item) => item.name === state.formation1)) {
    state.formation1 = formations1[0]?.name || "";
  }
  if (!formations2.some((item) => item.name === state.formation2)) {
    state.formation2 = formations2[0]?.name || "";
  }

  setSelectOptions(
    elements.formation1Select,
    formations1.map((item) => ({ value: item.name, label: formationLabel(item) })),
    state.formation1
  );

  setSelectOptions(
    elements.formation2Select,
    formations2.map((item) => ({ value: item.name, label: formationLabel(item) })),
    state.formation2
  );
}

function factionLabel(item) {
  return labelFrom("countries", item.name);
}

function formationLabel(item) {
  return labelFrom("formations", item.name);
}

function renderCommandResult() {
  const { selectedMode, faction1, faction2, formation1, formation2 } = selectedContext();
  if (!selectedMode || !faction1 || !faction2 || !formation1 || !formation2) {
    elements.commandOutput.textContent = t("invalidCommand");
    elements.balanceLabel.textContent = t("balanceEmpty");
    return;
  }

  const balance = selectedMode.faction1Advantage + formation1.advantage - formation2.advantage;
  const command = `${state.operation} ${selectedMode.modeName} ${faction1.name}+${formation1.name} ${faction2.name}+${formation2.name}`;
  elements.commandOutput.textContent = command;
  elements.balanceLabel.textContent = t("balanceValue", { value: balance });
  elements.balanceLabel.className = balanceClass(balance);
  elements.balanceFill.style.left = `${Math.max(0, Math.min(100, 50 + balance / 2))}%`;

  if (Math.abs(balance) > BALANCE_WARNING) {
    elements.balanceLabel.textContent += balance > 0 ? ` · ${t("faction1TooStrong")}` : ` · ${t("faction2TooStrong")}`;
  }
}

function chip(text, variant = "") {
  const span = document.createElement("span");
  span.className = `chip${variant ? ` ${variant}` : ""}`;
  span.textContent = text;
  return span;
}

function emptyState(text) {
  const div = document.createElement("div");
  div.className = "empty-state";
  div.textContent = text;
  return div;
}

function updateCommandView() {
  const maps = filteredMaps();
  ensureSelectedMapIsVisible(maps);
  renderMapList(maps);

  const map = getMapById(state.selectedMapId);
  const selectedMode = getModeByName(map, state.selectedModeName);
  state.selectedModeName = selectedMode.modeName;

  renderModeList(map);
  renderFactionControls(map, selectedMode);
  renderCommandResult();
  updateOperationControl();
}

function updateOperationControl() {
  elements.operationControl.querySelectorAll(".segment").forEach((button) => {
    button.classList.toggle("is-active", button.dataset.operation === state.operation);
  });
}

function collectChecked(container) {
  return new Set(Array.from(container.querySelectorAll("input:checked")).map((input) => input.value));
}

function allValidCombinations() {
  const combinations = [];
  const threshold = Math.abs(state.balanceThreshold);

  MAPS.forEach((map) => {
    map.modes.forEach((selectedMode) => {
      if (!state.poolDifficulties.has(selectedMode.difficulty)) {
        return;
      }
      if (!state.poolSizes.has(selectedMode.mapSize)) {
        return;
      }
      if (!state.poolModeTypes.has(selectedMode.modetype)) {
        return;
      }

      const validFactions1 = getValidFactions(map);
      validFactions1.forEach((faction1) => {
        const formations1 = getAllowedFormations(faction1, selectedMode.mapSize);
        formations1.forEach((formation1) => {
          const validFactions2 = validFactions1.filter((faction2) => faction2.name !== faction1.name && canAlliancesFight(faction1.alliance, faction2.alliance));
          validFactions2.forEach((faction2) => {
            const formations2 = getAllowedFormations(faction2, selectedMode.mapSize);
            formations2.forEach((formation2) => {
              const balance = selectedMode.faction1Advantage + formation1.advantage - formation2.advantage;
              if (Math.abs(balance) <= threshold) {
                combinations.push({
                  map,
                  selectedMode,
                  faction1,
                  formation1,
                  faction2,
                  formation2,
                  balance
                });
              }
            });
          });
        });
      });
    });
  });

  return combinations;
}

function commandForCombination(item) {
  return `AdminSetNextLayer ${item.selectedMode.modeName} ${item.faction1.name}+${item.formation1.name} ${item.faction2.name}+${item.formation2.name}`;
}

function renderPoolStats() {
  const count = allValidCombinations().length;
  elements.poolCandidateCount.textContent = t("candidateCount", { count });
  elements.generatePoolButton.disabled = count === 0;
}

function renderPoolResults() {
  elements.poolResultCount.textContent = t("resultCount", { count: state.poolCommands.length });

  if (state.poolCommands.length === 0) {
    elements.poolResults.replaceChildren(emptyState(t("poolEmpty")));
    return;
  }

  const fragment = document.createDocumentFragment();
  state.poolCommands.forEach((item, index) => {
    const card = document.createElement("article");
    card.className = "pool-item";

    const meta = document.createElement("div");
    meta.className = "item-meta";
    meta.append(
      chip(`#${index + 1}`, "accent"),
      chip(mapLabel(item.map)),
      chip(modeTypeLabel(item.selectedMode.modetype), "accent"),
      chip(labelFrom("sizes", item.selectedMode.mapSize)),
      chip(t("balanceChip", { value: item.balance }), balanceClass(item.balance))
    );

    const command = document.createElement("div");
    command.className = "pool-command";
    command.textContent = `${commandForCombination(item)} | ${t("balanceSuffix", { value: item.balance })}`;

    card.append(meta, command);
    fragment.appendChild(card);
  });

  elements.poolResults.replaceChildren(fragment);
}

function updatePoolView() {
  renderPoolStats();
  renderPoolResults();
}

function generatePool() {
  const combinations = allValidCombinations();
  if (combinations.length === 0) {
    state.poolCommands = [];
    updatePoolView();
    showToast(t("noCombinations"));
    return;
  }

  const shuffled = [...combinations];
  for (let i = shuffled.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }

  state.poolCommands = shuffled.slice(0, Math.min(state.poolSize, shuffled.length));
  updatePoolView();
  showToast(t("generated", { count: state.poolCommands.length }));
}

function clampNumber(value, min, max, fallback) {
  const number = Number.parseInt(value, 10);
  if (Number.isNaN(number)) {
    return fallback;
  }
  return Math.max(min, Math.min(max, number));
}

async function copyText(text) {
  if (!text.trim()) {
    showToast(t("nothingToCopy"));
    return;
  }

  try {
    await navigator.clipboard.writeText(text);
    showToast(t("copied"));
  } catch {
    const textarea = document.createElement("textarea");
    textarea.value = text;
    textarea.setAttribute("readonly", "");
    textarea.style.position = "fixed";
    textarea.style.left = "-9999px";
    document.body.appendChild(textarea);
    textarea.select();
    const ok = document.execCommand("copy");
    textarea.remove();
    showToast(ok ? t("copied") : t("copyFailed"));
  }
}

function showToast(text) {
  window.clearTimeout(toastTimer);
  elements.toast.textContent = text;
  elements.toast.classList.add("is-visible");
  toastTimer = window.setTimeout(() => {
    elements.toast.classList.remove("is-visible");
  }, 1800);
}

function resetCommandState() {
  state.operation = "AdminSetNextLayer";
  state.selectedMapId = MAPS[0].id;
  state.selectedModeName = MAPS[0].modes[0].modeName;
  state.faction1 = "";
  state.formation1 = "";
  state.faction2 = "";
  state.formation2 = "";
  state.allowCivilWar = true;
  state.mapSearch = "";
  state.ecosystemFilter = "all";
  state.mapTypeFilter = "all";
  elements.mapSearch.value = "";
  elements.ecosystemFilter.value = "all";
  elements.mapTypeFilter.value = "all";
  elements.allowCivilWarToggle.checked = state.allowCivilWar;
  updateCommandView();
  showToast(t("resetDone"));
}

function bindEvents() {
  elements.languageSelect.addEventListener("change", (event) => {
    state.locale = i18nRuntime.setLocale(event.target.value);
    applyLocale();
    renderStaticControls();
    updateCommandView();
    updatePoolView();
  });

  document.querySelectorAll(".tab-button").forEach((button) => {
    button.addEventListener("click", () => {
      state.view = button.dataset.view;
      document.querySelectorAll(".tab-button").forEach((item) => item.classList.toggle("is-active", item === button));
      document.querySelectorAll(".view-panel").forEach((panel) => panel.classList.toggle("is-active", panel.dataset.panel === state.view));
      if (state.view === "pool") {
        updatePoolView();
      }
    });
  });

  elements.resetCommandButton.addEventListener("click", resetCommandState);

  elements.allowCivilWarToggle.addEventListener("change", (event) => {
    state.allowCivilWar = event.target.checked;
    state.faction2 = "";
    state.formation2 = "";
    state.poolCommands = [];
    updateCommandView();
    updatePoolView();
  });

  elements.mapSearch.addEventListener("input", (event) => {
    state.mapSearch = event.target.value;
    updateCommandView();
  });

  elements.ecosystemFilter.addEventListener("change", (event) => {
    state.ecosystemFilter = event.target.value;
    updateCommandView();
  });

  elements.mapTypeFilter.addEventListener("change", (event) => {
    state.mapTypeFilter = event.target.value;
    updateCommandView();
  });

  elements.mapList.addEventListener("click", (event) => {
    const button = event.target.closest(".map-button");
    if (!button) {
      return;
    }
    const map = getMapById(button.dataset.mapId);
    state.selectedMapId = map.id;
    state.selectedModeName = map.modes[0].modeName;
    state.faction1 = "";
    state.faction2 = "";
    state.formation1 = "";
    state.formation2 = "";
    updateCommandView();
  });

  elements.modeList.addEventListener("click", (event) => {
    const button = event.target.closest(".mode-button");
    if (!button) {
      return;
    }
    state.selectedModeName = button.dataset.modeName;
    state.formation1 = "";
    state.formation2 = "";
    updateCommandView();
  });

  elements.operationControl.addEventListener("click", (event) => {
    const button = event.target.closest(".segment");
    if (!button) {
      return;
    }
    state.operation = button.dataset.operation;
    updateCommandView();
  });

  elements.faction1Select.addEventListener("change", (event) => {
    state.faction1 = event.target.value;
    state.faction2 = "";
    state.formation1 = "";
    state.formation2 = "";
    updateCommandView();
  });

  elements.faction2Select.addEventListener("change", (event) => {
    state.faction2 = event.target.value;
    state.formation2 = "";
    updateCommandView();
  });

  elements.formation1Select.addEventListener("change", (event) => {
    state.formation1 = event.target.value;
    updateCommandView();
  });

  elements.formation2Select.addEventListener("change", (event) => {
    state.formation2 = event.target.value;
    updateCommandView();
  });

  elements.copyCommandButton.addEventListener("click", () => {
    copyText(elements.commandOutput.textContent);
  });

  elements.difficultyChecks.addEventListener("change", () => {
    state.poolDifficulties = collectChecked(elements.difficultyChecks);
    updatePoolView();
  });

  elements.sizeChecks.addEventListener("change", () => {
    state.poolSizes = collectChecked(elements.sizeChecks);
    updatePoolView();
  });

  elements.modeTypeChecks.addEventListener("change", () => {
    state.poolModeTypes = collectChecked(elements.modeTypeChecks);
    updatePoolView();
  });

  elements.thresholdInput.addEventListener("input", (event) => {
    state.balanceThreshold = clampNumber(event.target.value, 0, 100, BALANCE_WARNING);
    elements.thresholdRange.value = state.balanceThreshold;
    updatePoolView();
  });

  elements.thresholdRange.addEventListener("input", (event) => {
    state.balanceThreshold = clampNumber(event.target.value, 0, 100, BALANCE_WARNING);
    elements.thresholdInput.value = state.balanceThreshold;
    updatePoolView();
  });

  elements.poolSizeInput.addEventListener("input", (event) => {
    state.poolSize = clampNumber(event.target.value, 1, 50, 5);
    elements.poolSizeInput.value = state.poolSize;
  });

  elements.generatePoolButton.addEventListener("click", generatePool);

  elements.copyPoolButton.addEventListener("click", () => {
    const text = state.poolCommands.map((item) => `${commandForCombination(item)} | ${t("balanceSuffix", { value: item.balance })}`).join("\n");
    copyText(text);
  });
}

function init() {
  applyLocale();
  renderStaticControls();
  bindEvents();
  updateCommandView();
  updatePoolView();
}

init();
