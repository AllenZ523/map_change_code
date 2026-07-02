"use strict";

(() => {
  function mapMatchesSearch(map, keyword, labels) {
    if (!keyword) {
      return true;
    }
    const mapLabel = labels.mapLabel(map).toLowerCase();
    return map.name.toLowerCase().includes(keyword) || mapLabel.includes(keyword) || map.modes.some((item) => item.modeName.toLowerCase().includes(keyword));
  }

  function filterMaps(maps, state, labels) {
    const keyword = state.mapSearch.trim().toLowerCase();
    return maps.filter((map) => {
      const matchSearch = mapMatchesSearch(map, keyword, labels);
      const matchEcosystem = state.ecosystemFilter === "all" || map.ecosystem === state.ecosystemFilter;
      const matchType = state.mapTypeFilter === "all" || map.mapType === state.mapTypeFilter;
      return matchSearch && matchEcosystem && matchType;
    });
  }

  window.SQUAD_MAP_RULES = Object.freeze({ filterMaps });
})();