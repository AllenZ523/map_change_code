"use strict";

(() => {
const MAP_LABELS = Object.fromEntries(window.SQUAD_MAP_DATA.maps.map((map) => [map.id, map.name]));

const COUNTRY_LABELS_EN = {
  USA: "United States Army",
  USMC: "United States Marine Corps",
  RGF: "Russian Ground Forces",
  VDV: "Russian Airborne Forces",
  PLA: "People's Liberation Army",
  PLAAGF: "PLA Amphibious Ground Forces",
  PLANMC: "PLA Navy Marine Corps",
  ADF: "Australian Defence Force",
  BAF: "British Armed Forces",
  CAF: "Canadian Armed Forces",
  IMF: "Irregular Militia Forces",
  MEI: "Middle Eastern Insurgents",
  GFI: "Ground Forces of Iran",
  TLF: "Turkish Land Forces",
  CRF: "Canadian Rebel Forces",
  WPMC: "Western Private Military Contractors",
  AFU: "Armed Forces of Ukraine"
};

const FORMATION_LABELS_EN = {
  CombinedArms: "Combined Arms",
  Armored: "Armored",
  AirAssault: "Air Assault",
  LightInfantry: "Light Infantry",
  Motorized: "Motorized",
  Mechanized: "Mechanized",
  Support: "Support",
  AmphibiousAssault: "Amphibious Assault"
};

const EN_US = {
  localeName: "English",
  appTitle: "Squad Map Manager WebUI",
  ui: {
    mainTitle: "Squad Map Preset GUI",
    author: "Author",
    reset: "Reset",
    commandView: "Command",
    poolView: "Random Pool",
    metrics: "Data Overview",
    mapsMetric: "Maps",
    layersMetric: "Layers",
    factionsMetric: "Factions",
    mapSection: "Maps",
    search: "Search",
    searchPlaceholder: "Map / Layer",
    ecosystem: "Ecosystem",
    type: "Type",
    operation: "Operation",
    preset: "Set Next",
    changeLayer: "Change Layer",
    changeLayerHint: "Change Layer switches the current map immediately. Confirm before copying or running it.",
    mode: "Mode",
    matchup: "Faction & Formation",
    allowCivilWar: "Allow Civil War",
    force1: "Faction 1",
    force2: "Faction 2",
    faction: "Faction",
    formation: "Formation",
    command: "Command",
    copyCommand: "Copy Command",
    poolStrategy: "Pool Strategy",
    difficulty: "Difficulty",
    size: "Size",
    balanceThreshold: "Balance Limit",
    generateCount: "Count",
    generatePool: "Generate Pool",
    copyAll: "Copy All",
    results: "Results",
    language: "Language",
    allEcosystems: "All Ecosystems",
    allTypes: "All Types",
    mapCount: "{count} maps",
    layerCount: "{count} layers",
    layerTag: "{count} layers",
    validOptions: "{count} available",
    candidateCount: "{count} combinations",
    resultCount: "{count} items",
    emptyMaps: "No matching maps",
    invalidCommand: "Cannot generate command: current selection is missing a valid faction or formation.",
    balanceEmpty: "Balance -",
    balanceValue: "Balance {value}",
    balancePlain: "Balanced",
    faction1Advantage: "Faction 1 +{value}",
    faction2Advantage: "Faction 2 +{value}",
    faction1TooStrong: "Faction 1 advantage too high",
    faction2TooStrong: "Faction 2 advantage too high",
    balanceChip: "Balance {value}",
    balanceSuffix: "Balance: {value}",
    poolEmpty: "No pool generated yet",
    noCombinations: "No matching combinations",
    generated: "Generated {count} commands",
    nothingToCopy: "Nothing to copy",
    copied: "Copied",
    copyFailed: "Copy failed",
    resetDone: "Reset complete"
  },
  ecosystems: {
    CentralAsia: "Central Asia",
    MiddleEast: "Middle East",
    EasternEurope: "Eastern Europe",
    NorthernEurope: "Northern Europe",
    NorthAmerica: "North America",
    Asia: "Asia",
    Training: "Training"
  },
  mapTypes: {
    LargeAmphibious: "Large Amphibious",
    Normal: "Normal"
  },
  difficulties: {
    Easy: "Easy",
    Medium: "Medium",
    Hard: "Hard"
  },
  sizes: {
    Small: "Small",
    Medium: "Medium",
    Large: "Large"
  },
  modeTypes: {
    AAS: "AAS",
    RAAS: "RAAS",
    INV: "Invasion",
    INS: "Insurgency",
    DES: "Destruction",
    SKR: "Skirmish",
    TC: "Territory Control",
    SEED: "Seed"
  },
  alliances: window.SQUAD_CONFIG_CORE.labels.alliances,
  maps: MAP_LABELS,
  countries: COUNTRY_LABELS_EN,
  formations: FORMATION_LABELS_EN
};

  window.SQUAD_I18N_EN_US = Object.freeze(EN_US);
})();
