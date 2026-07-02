"use strict";

(() => {
  function canOperateOnMapType(factionItem, mapType) {
    return !factionItem.amphibiousOnly || mapType === "LargeAmphibious";
  }

  function canOperateInEcosystem(factionItem, ecosystem) {
    return factionItem.ecosystems.includes(ecosystem);
  }

  function canAlliancesFight(alliance1, alliance2, options = {}) {
    if (alliance1 === "Independent" || alliance2 === "Independent") {
      return true;
    }
    return Boolean(options.allowCivilWar) || alliance1 !== alliance2;
  }

  function getValidFactions(countries, map) {
    return countries.filter((item) => canOperateInEcosystem(item, map.ecosystem) && canOperateOnMapType(item, map.mapType));
  }

  function getAllowedFormations(factionItem, mapSize) {
    if (!factionItem) {
      return [];
    }
    if (mapSize !== "Small") {
      return factionItem.formations;
    }
    const combinedArms = factionItem.formations.find((item) => item.name === "CombinedArms");
    return combinedArms ? [combinedArms] : [];
  }

  window.SQUAD_FACTION_RULES = Object.freeze({
    canAlliancesFight,
    getValidFactions,
    getAllowedFormations
  });
})();