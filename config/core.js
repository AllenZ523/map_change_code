"use strict";

(() => {
const ECOSYSTEM_LABELS = {
  CentralAsia: "中亚",
  MiddleEast: "中东",
  EasternEurope: "东欧",
  NorthernEurope: "北欧",
  NorthAmerica: "北美",
  Asia: "亚洲",
  Training: "训练"
};

const MAP_TYPE_LABELS = {
  LargeAmphibious: "大型两栖",
  Normal: "普通"
};

const DIFFICULTY_LABELS = {
  Easy: "简单",
  Medium: "进阶",
  Hard: "困难"
};

const SIZE_LABELS = {
  Small: "小型",
  Medium: "中型",
  Large: "大型"
};

const MODE_TYPE_LABELS = {
  AAS: "攻守有序",
  RAAS: "随机攻守",
  INV: "侵攻",
  INS: "叛乱",
  DES: "摧毁",
  SKR: "遭遇战",
  TC: "区域控制",
  SEED: "暖服"
};

const ALLIANCE_LABELS = {
  NATO: "NATO",
  Russia: "Russia",
  China: "China",
  Independent: "Independent"
};

const MODE_TYPES = ["AAS", "RAAS", "INV", "INS", "DES", "SKR", "TC", "SEED"];
const DIFFICULTIES = ["Easy", "Medium", "Hard"];
const MAP_SIZES = ["Small", "Medium", "Large"];
const BALANCE_WARNING = 15;


  const mode = (modeName, modetype, mapSize, difficulty, faction1Advantage = 0) => ({
    modeName,
    modetype,
    mapSize,
    difficulty,
    faction1Advantage
  });

  const formation = (name, advantage = 0) => ({ name, advantage });

  const country = (name, alliance, ecosystems, formations, amphibiousOnly = false) => ({
    name,
    alliance,
    ecosystems,
    formations,
    amphibiousOnly
  });

  window.SQUAD_CONFIG_CORE = Object.freeze({
    labels: Object.freeze({
      ecosystems: ECOSYSTEM_LABELS,
      mapTypes: MAP_TYPE_LABELS,
      difficulties: DIFFICULTY_LABELS,
      sizes: SIZE_LABELS,
      modeTypes: MODE_TYPE_LABELS,
      alliances: ALLIANCE_LABELS
    }),
    modeTypes: MODE_TYPES,
    difficulties: DIFFICULTIES,
    mapSizes: MAP_SIZES,
    balanceWarning: BALANCE_WARNING,
    helpers: Object.freeze({ mode, formation, country })
  });
})();
