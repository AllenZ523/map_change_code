"use strict";

(() => {
  const { mode } = window.SQUAD_CONFIG_CORE.helpers;

// 可用地图、地图生态、地图类型和图层配置。
const MAPS = [
  {
    id: "Al_Basrah",
    name: "Al_Basrah",
    ecosystem: "MiddleEast",
    mapType: "LargeAmphibious",
    modes: [
      mode("AlBasrah_AAS_v1", "AAS", "Large", "Hard"),
      mode("AlBasrah_AAS_v2", "AAS", "Large", "Hard"),
      mode("AlBasrah_Invasion_v1", "INV", "Large", "Easy"),
      mode("AlBasrah_Invasion_v2", "INV", "Large", "Easy"),
      mode("AlBasrah_Invasion_v3", "INV", "Large", "Easy"),
      mode("AlBasrah_RAAS_v1", "RAAS", "Large", "Medium"),
      mode("AlBasrah_RAAS_v2", "RAAS", "Large", "Medium"),
      mode("AlBasrah_Seed_v1", "SEED", "Small", "Easy"),
      mode("AlBasrah_Seed_v2", "SEED", "Small", "Easy"),
      mode("AlBasrah_Skirmish_v1", "SKR", "Small", "Hard"),
      mode("AlBasrah_Skirmish_v2", "SKR", "Small", "Hard"),
      mode("AlBasrah_Skirmish_v3", "SKR", "Small", "Hard")
    ]
  },
  {
    id: "Anvil",
    name: "Anvil",
    ecosystem: "CentralAsia",
    mapType: "Normal",
    modes: [
      mode("Anvil_AAS_v1", "AAS", "Large", "Medium"),
      mode("Anvil_Invasion_v1", "INV", "Large", "Medium"),
      mode("Anvil_RAAS_v1", "RAAS", "Large", "Medium"),
      mode("Anvil_RAAS_v2", "RAAS", "Large", "Medium"),
      mode("Anvil_Skirmish_v1", "SKR", "Small", "Medium")
    ]
  },
  {
    id: "Belaya",
    name: "Belaya",
    ecosystem: "EasternEurope",
    mapType: "Normal",
    modes: [
      mode("Belaya_AAS_v1", "AAS", "Large", "Medium"),
      mode("Belaya_AAS_v2", "AAS", "Large", "Medium"),
      mode("Belaya_AAS_v3", "AAS", "Large", "Medium"),
      mode("Belaya_Invasion_v1", "INV", "Large", "Medium"),
      mode("Belaya_Invasion_v2", "INV", "Large", "Medium"),
      mode("Belaya_RAAS_v1", "RAAS", "Large", "Medium"),
      mode("Belaya_Skirmish_v1", "SKR", "Small", "Medium")
    ]
  },
  {
    id: "Black_Coast",
    name: "Black_Coast",
    ecosystem: "EasternEurope",
    mapType: "LargeAmphibious",
    modes: [
      mode("BlackCoast_AAS_v1", "AAS", "Large", "Medium"),
      mode("BlackCoast_AAS_v2", "AAS", "Large", "Medium"),
      mode("BlackCoast_Invasion_v1", "INV", "Large", "Medium"),
      mode("BlackCoast_Invasion_v2", "INV", "Large", "Medium"),
      mode("BlackCoast_RAAS_v1", "RAAS", "Large", "Medium"),
      mode("BlackCoast_RAAS_v2", "RAAS", "Large", "Medium"),
      mode("BlackCoast_Seed_v1", "SEED", "Small", "Medium"),
      mode("BlackCoast_Skirmish_v1", "SKR", "Medium", "Medium")
    ]
  },
  {
    id: "Chora",
    name: "Chora",
    ecosystem: "CentralAsia",
    mapType: "Normal",
    modes: [
      mode("Chora_AAS_v1", "AAS", "Medium", "Medium"),
      mode("Chora_AAS_v2", "AAS", "Medium", "Medium"),
      mode("Chora_AAS_v3", "AAS", "Medium", "Medium"),
      mode("Chora_Insurgency_v1", "INS", "Medium", "Medium"),
      mode("Chora_Invasion_v1", "INV", "Medium", "Medium"),
      mode("Chora_Invasion_v2", "INV", "Medium", "Medium"),
      mode("Chora_RAAS_v1", "RAAS", "Medium", "Medium"),
      mode("Chora_Skirmish_v1", "SKR", "Small", "Medium"),
      mode("Chora_TC_v1", "TC", "Medium", "Medium")
    ]
  },
  {
    id: "Fallujah",
    name: "Fallujah",
    ecosystem: "MiddleEast",
    mapType: "LargeAmphibious",
    modes: [
      mode("Fallujah_AAS_v1", "AAS", "Large", "Medium"),
      mode("Fallujah_Insurgency_v1", "INS", "Large", "Medium"),
      mode("Fallujah_Invasion_v1", "INV", "Large", "Medium"),
      mode("Fallujah_Invasion_v2", "INV", "Large", "Medium"),
      mode("Fallujah_RAAS_v1", "RAAS", "Large", "Medium"),
      mode("Fallujah_RAAS_v2", "RAAS", "Large", "Medium"),
      mode("Fallujah_Seed_v1", "SEED", "Small", "Medium"),
      mode("Fallujah_Skirmish_v1", "SKR", "Small", "Medium"),
      mode("Fallujah_Skirmish_v2", "SKR", "Small", "Medium"),
      mode("Fallujah_TC_v1", "TC", "Large", "Medium")
    ]
  },
  {
    id: "Fools_Road",
    name: "Fools_Road",
    ecosystem: "EasternEurope",
    mapType: "Normal",
    modes: [
      mode("FoolsRoad_AAS_v1", "AAS", "Medium", "Medium"),
      mode("FoolsRoad_AAS_v2", "AAS", "Medium", "Medium"),
      mode("FoolsRoad_Destruction_v1", "DES", "Medium", "Medium"),
      mode("FoolsRoad_Invasion_v1", "INV", "Medium", "Medium"),
      mode("FoolsRoad_RAAS_v1", "RAAS", "Medium", "Medium"),
      mode("FoolsRoad_Skirmish_v1", "SKR", "Small", "Medium"),
      mode("FoolsRoad_Skirmish_v2", "SKR", "Small", "Medium"),
      mode("FoolsRoad_TC_v1", "TC", "Medium", "Medium")
    ]
  },
  {
    id: "GooseBay",
    name: "GooseBay",
    ecosystem: "NorthAmerica",
    mapType: "LargeAmphibious",
    modes: [
      mode("GooseBay_AAS_v1", "AAS", "Large", "Medium"),
      mode("GooseBay_Invasion_v1", "INV", "Large", "Medium"),
      mode("GooseBay_RAAS_v1", "RAAS", "Large", "Medium"),
      mode("GooseBay_RAAS_v2", "RAAS", "Large", "Medium"),
      mode("GooseBay_Seed_v1", "SEED", "Small", "Medium"),
      mode("GooseBay_Skirmish_v1", "SKR", "Small", "Medium")
    ]
  },
  {
    id: "Gorodok",
    name: "Gorodok",
    ecosystem: "EasternEurope",
    mapType: "Normal",
    modes: [
      mode("Gorodok_AAS_v1", "AAS", "Large", "Medium"),
      mode("Gorodok_Destruction_v1", "DES", "Large", "Medium"),
      mode("Gorodok_Insurgency_v1", "INS", "Large", "Medium"),
      mode("Gorodok_Invasion_v1", "INV", "Large", "Medium"),
      mode("Gorodok_Invasion_v2", "INV", "Large", "Medium"),
      mode("Gorodok_RAAS_v1", "RAAS", "Large", "Medium"),
      mode("Gorodok_RAAS_v2", "RAAS", "Large", "Medium"),
      mode("Gorodok_Skirmish_v1", "SKR", "Small", "Medium"),
      mode("Gorodok_TC_v1", "TC", "Large", "Medium")
    ]
  },
  {
    id: "Harju",
    name: "Harju",
    ecosystem: "NorthernEurope",
    mapType: "Normal",
    modes: [
      mode("Harju_AAS_v1", "AAS", "Large", "Medium"),
      mode("Harju_AAS_v2", "AAS", "Medium", "Medium"),
      mode("Harju_AAS_v3", "AAS", "Medium", "Medium"),
      mode("Harju_Invasion_v1", "INV", "Large", "Medium"),
      mode("Harju_Invasion_v2", "INV", "Large", "Medium"),
      mode("Harju_Invasion_v3", "INV", "Large", "Medium"),
      mode("Harju_RAAS_v1", "RAAS", "Large", "Medium"),
      mode("Harju_RAAS_v2", "RAAS", "Large", "Medium"),
      mode("Harju_TC_v1", "TC", "Medium", "Medium"),
      mode("Harju_Seed_v1", "SEED", "Small", "Medium"),
      mode("Harju_Skirmish_v1", "SKR", "Small", "Medium"),
      mode("Harju_Skirmish_v2", "SKR", "Small", "Medium")
    ]
  },
  {
    id: "Kamdesh",
    name: "Kamdesh",
    ecosystem: "CentralAsia",
    mapType: "Normal",
    modes: [
      mode("Kamdesh_AAS_v1", "AAS", "Large", "Medium"),
      mode("Kamdesh_Insurgency_v1", "INS", "Large", "Medium"),
      mode("Kamdesh_Invasion_v1", "INV", "Large", "Medium"),
      mode("Kamdesh_RAAS_v1", "RAAS", "Large", "Medium"),
      mode("Kamdesh_Skirmish_v1", "SKR", "Small", "Medium"),
      mode("Kamdesh_TC_v1", "TC", "Large", "Medium")
    ]
  },
  {
    id: "Kohat",
    name: "Kohat",
    ecosystem: "CentralAsia",
    mapType: "Normal",
    modes: [
      mode("Kohat_AAS_v1", "AAS", "Large", "Medium"),
      mode("Kohat_RAAS_v1", "RAAS", "Large", "Medium"),
      mode("Kohat_RAAS_v2", "RAAS", "Large", "Medium"),
      mode("Kohat_Skirmish_v1", "SKR", "Small", "Medium"),
      mode("Kohat_Insurgency_v1", "INS", "Large", "Medium"),
      mode("Kohat_Invasion_v1", "INV", "Large", "Medium"),
      mode("Kohat_Invasion_v2", "INV", "Large", "Medium"),
      mode("Kohat_TC_v1", "TC", "Large", "Medium")
    ]
  },
  {
    id: "Kokan",
    name: "Kokan",
    ecosystem: "CentralAsia",
    mapType: "Normal",
    modes: [
      mode("Kokan_AAS_v1", "AAS", "Medium", "Medium"),
      mode("Kokan_AAS_v2", "AAS", "Medium", "Medium"),
      mode("Kokan_Insurgency_v1", "INS", "Medium", "Medium"),
      mode("Kokan_Invasion_v1", "INV", "Medium", "Medium"),
      mode("Kokan_RAAS_v1", "RAAS", "Medium", "Medium"),
      mode("Kokan_Skirmish_v1", "SKR", "Small", "Medium"),
      mode("Kokan_TC_v1", "TC", "Medium", "Medium")
    ]
  },
  {
    id: "Lashkar",
    name: "Lashkar",
    ecosystem: "CentralAsia",
    mapType: "Normal",
    modes: [
      mode("Lashkar_AAS_v1", "AAS", "Large", "Medium"),
      mode("Lashkar_AAS_v2", "AAS", "Large", "Medium"),
      mode("Lashkar_Insurgency_v1", "INS", "Large", "Medium"),
      mode("Lashkar_Invasion_v1", "INV", "Large", "Medium"),
      mode("Lashkar_RAAS_v1", "RAAS", "Large", "Medium"),
      mode("Lashkar_Skirmish_v1", "SKR", "Small", "Medium"),
      mode("Lashkar_TC_v1", "TC", "Large", "Medium"),
      mode("Lashkar_TC_v2", "TC", "Large", "Medium")
    ]
  },
  {
    id: "Logar",
    name: "Logar",
    ecosystem: "CentralAsia",
    mapType: "Normal",
    modes: [
      mode("Logar_AAS_v1", "AAS", "Medium", "Medium"),
      mode("Logar_Insurgency_v1", "INS", "Medium", "Medium"),
      mode("Logar_RAAS_v1", "RAAS", "Medium", "Medium"),
      mode("Logar_Seed_v1", "SEED", "Small", "Medium"),
      mode("Logar_Skirmish_v1", "SKR", "Small", "Medium"),
      mode("Logar_TC_v1", "TC", "Medium", "Medium")
    ]
  },
  {
    id: "Manicouagan",
    name: "Manicouagan",
    ecosystem: "NorthAmerica",
    mapType: "LargeAmphibious",
    modes: [
      mode("Manicouagan_AAS_v1", "AAS", "Large", "Medium"),
      mode("Manicouagan_AAS_v2", "AAS", "Large", "Medium"),
      mode("Manicouagan_AAS_v3", "AAS", "Large", "Medium"),
      mode("Manicouagan_RAAS_v1", "RAAS", "Large", "Medium"),
      mode("Manicouagan_RAAS_v2", "RAAS", "Large", "Medium"),
      mode("Manicouagan_Invasion_v1", "INV", "Large", "Medium"),
      mode("Manicouagan_Invasion_v2", "INV", "Large", "Medium"),
      mode("Manicouagan_Seed_v1", "SEED", "Small", "Medium"),
      mode("Manicouagan_Skirmish_v1", "SKR", "Small", "Medium"),
      mode("Manicouagan_Skirmish_v2", "SKR", "Small", "Medium"),
      mode("Manicouagan_Skirmish_v3", "SKR", "Small", "Medium")
    ]
  },
  {
    id: "Mestia",
    name: "Mestia",
    ecosystem: "EasternEurope",
    mapType: "Normal",
    modes: [
      mode("Mestia_AAS_v1", "AAS", "Medium", "Medium"),
      mode("Mestia_AAS_v2", "AAS", "Medium", "Medium"),
      mode("Mestia_Invasion_v1", "INV", "Medium", "Medium"),
      mode("Mestia_RAAS_v1", "RAAS", "Medium", "Medium"),
      mode("Mestia_Skirmish_v1", "SKR", "Small", "Medium"),
      mode("Mestia_TC_v1", "TC", "Medium", "Medium")
    ]
  },
  {
    id: "Mutaha",
    name: "Mutaha",
    ecosystem: "MiddleEast",
    mapType: "Normal",
    modes: [
      mode("Mutaha_AAS_v1", "AAS", "Large", "Medium"),
      mode("Mutaha_AAS_v2", "AAS", "Large", "Medium"),
      mode("Mutaha_Invasion_v1", "INV", "Large", "Medium"),
      mode("Mutaha_RAAS_v1", "RAAS", "Large", "Medium"),
      mode("Mutaha_RAAS_v2", "RAAS", "Large", "Medium"),
      mode("Mutaha_Seed_v1", "SEED", "Small", "Medium"),
      mode("Mutaha_Skirmish_v1", "SKR", "Small", "Medium"),
      mode("Mutaha_TC_v1", "TC", "Large", "Medium")
    ]
  },
  {
    id: "Narva",
    name: "Narva",
    ecosystem: "NorthernEurope",
    mapType: "Normal",
    modes: [
      mode("Narva_AAS_v1", "AAS", "Large", "Medium"),
      mode("Narva_AAS_v2", "AAS", "Large", "Medium"),
      mode("Narva_AAS_v3", "AAS", "Large", "Medium"),
      mode("Narva_Destruction_v1", "DES", "Large", "Medium"),
      mode("Narva_Invasion_v1", "INV", "Large", "Medium"),
      mode("Narva_Invasion_v2", "INV", "Large", "Medium"),
      mode("Narva_RAAS_v1", "RAAS", "Large", "Medium"),
      mode("Narva_Skirmish_v1", "SKR", "Small", "Medium"),
      mode("Narva_TC_v1", "TC", "Large", "Medium")
    ]
  },
  {
    id: "Pacific Proving Grounds",
    name: "Pacific Proving Grounds",
    ecosystem: "Asia",
    mapType: "LargeAmphibious",
    modes: [
      mode("PacificProvingGrounds_AAS_v1", "AAS", "Large", "Medium"),
      mode("PacificProvingGrounds_Seed_v1", "SEED", "Small", "Medium")
    ]
  },
  {
    id: "Sanxian",
    name: "Sanxian",
    ecosystem: "Asia",
    mapType: "LargeAmphibious",
    modes: [
      mode("Sanxian_AAS_v1", "AAS", "Large", "Medium"),
      mode("Sanxian_AAS_v2", "AAS", "Large", "Medium"),
      mode("Sanxian_AAS_v3", "AAS", "Large", "Medium"),
      mode("Sanxian_Invasion_v1", "INV", "Large", "Medium"),
      mode("Sanxian_Invasion_v2", "INV", "Large", "Medium"),
      mode("Sanxian_RAAS_v1", "RAAS", "Large", "Medium"),
      mode("Sanxian_RAAS_v2", "RAAS", "Large", "Medium"),
      mode("Sanxian_Seed_v1", "SEED", "Small", "Medium"),
      mode("Sanxian_Skirmish_v1", "SKR", "Small", "Medium")
    ]
  },
  {
    id: "Skorpo",
    name: "Skorpo",
    ecosystem: "NorthernEurope",
    mapType: "Normal",
    modes: [
      mode("Skorpo_Invasion_v1", "INV", "Large", "Medium"),
      mode("Skorpo_Invasion_v2", "INV", "Large", "Medium"),
      mode("Skorpo_RAAS_v1", "RAAS", "Large", "Medium"),
      mode("Skorpo_Skirmish_v1", "SKR", "Small", "Medium")
    ]
  },
  {
    id: "Sumari",
    name: "Sumari",
    ecosystem: "CentralAsia",
    mapType: "Normal",
    modes: [
      mode("Sumari_AAS_v1", "AAS", "Small", "Medium"),
      mode("Sumari_AAS_v2", "AAS", "Small", "Medium"),
      mode("Sumari_AAS_v3", "AAS", "Small", "Medium"),
      mode("Sumari_Insurgency_v1", "INS", "Small", "Medium"),
      mode("Sumari_Invasion_v1", "INV", "Small", "Medium"),
      mode("Sumari_RAAS_v1", "RAAS", "Small", "Medium"),
      mode("Sumari_Seed_v1", "SEED", "Small", "Medium"),
      mode("Sumari_Skirmish_v1", "SKR", "Small", "Medium"),
      mode("Sumari_TC_v1", "TC", "Small", "Medium")
    ]
  },
  {
    id: "Tallil",
    name: "Tallil",
    ecosystem: "MiddleEast",
    mapType: "Normal",
    modes: [
      mode("Tallil_AAS_v1", "AAS", "Large", "Medium"),
      mode("Tallil_Invasion_v1", "INV", "Large", "Medium"),
      mode("Tallil_RAAS_v1", "RAAS", "Large", "Medium"),
      mode("Tallil_RAAS_v2", "RAAS", "Large", "Medium"),
      mode("Tallil_Seed_v1", "SEED", "Small", "Medium"),
      mode("Tallil_Skirmish_v1", "SKR", "Small", "Medium"),
      mode("Tallil_Skirmish_v2", "SKR", "Small", "Medium"),
      mode("Tallil_Skirmish_v3", "SKR", "Small", "Medium"),
      mode("Tallil_TC_v1", "TC", "Large", "Medium")
    ]
  },
  {
    id: "Yehorivka",
    name: "Yehorivka",
    ecosystem: "EasternEurope",
    mapType: "Normal",
    modes: [
      mode("Yehorivka_AAS_v1", "AAS", "Large", "Medium"),
      mode("Yehorivka_AAS_v2", "AAS", "Large", "Medium"),
      mode("Yehorivka_Destruction_v1", "DES", "Large", "Medium"),
      mode("Yehorivka_Invasion_v1", "INV", "Large", "Medium"),
      mode("Yehorivka_Invasion_v2", "INV", "Large", "Medium"),
      mode("Yehorivka_Skirmish_v1", "SKR", "Small", "Medium"),
      mode("Yehorivka_Skirmish_v2", "SKR", "Small", "Medium"),
      mode("Yehorivka_RAAS_v1", "RAAS", "Large", "Medium"),
      mode("Yehorivka_RAAS_v2", "RAAS", "Large", "Medium"),
      mode("Yehorivka_TC_v1", "TC", "Medium", "Medium"),
      mode("Yehorivka_TC_v2", "TC", "Medium", "Medium")
    ]
  }
];


  window.SQUAD_MAP_DATA = Object.freeze({ maps: MAPS });
})();