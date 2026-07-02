"use strict";

(() => {
  const core = window.SQUAD_CONFIG_CORE;
  const mapData = window.SQUAD_MAP_DATA;
  const factionData = window.SQUAD_FACTION_DATA;
  const i18n = window.SQUAD_I18N;
  const mapRules = window.SQUAD_MAP_RULES;
  const factionRules = window.SQUAD_FACTION_RULES;

  if (!core || !mapData || !factionData || !i18n || !mapRules || !factionRules) {
    throw new Error("配置错误：请先加载 config/、i18n/ 下的配置脚本。");
  }

  window.SQUAD_MAP_CONFIG = Object.freeze({
    defaultLocale: i18n.defaultLocale,
    author: "[POST]MirageStar",
    i18n,
    labels: core.labels,
    modeTypes: core.modeTypes,
    difficulties: core.difficulties,
    mapSizes: core.mapSizes,
    balanceWarning: core.balanceWarning,
    maps: mapData.maps,
    countries: factionData.countries,
    mapRules,
    factionRules
  });
})();