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
    Medium: "中等",
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

  // 可用国家/阵营配置：名称、所属阵营、可用地图生态、可用编制、是否仅大型两栖。
  const COUNTRIES = [
    country("USA", "NATO", ["CentralAsia", "MiddleEast", "EasternEurope", "NorthAmerica", "Asia", "NorthernEurope"], [
      formation("CombinedArms", 0),
      formation("Armored", 30),
      formation("AirAssault", -20),
      formation("LightInfantry", -30),
      formation("Motorized", 35),
      formation("Mechanized", 25),
      formation("Support", -40)
    ]),
    country("USMC", "NATO", ["CentralAsia", "MiddleEast", "EasternEurope", "NorthAmerica", "Asia", "NorthernEurope"], [
      formation("CombinedArms", 10),
      formation("Armored", 15),
      formation("LightInfantry", -20),
      formation("Motorized", 5),
      formation("Support", -40)
    ]),
    country("RGF", "Russia", ["CentralAsia", "MiddleEast", "EasternEurope", "NorthAmerica", "NorthernEurope"], [
      formation("CombinedArms", 0),
      formation("Armored", 35),
      formation("LightInfantry", -20),
      formation("Motorized", -10),
      formation("Mechanized", 35),
      formation("Support", -40)
    ]),
    country("VDV", "Russia", ["CentralAsia", "MiddleEast", "EasternEurope", "NorthAmerica", "NorthernEurope"], [
      formation("CombinedArms", 10),
      formation("Armored", 25),
      formation("AirAssault", -15),
      formation("Mechanized", 30),
      formation("Support", -40)
    ]),
    country("PLA", "China", ["CentralAsia", "MiddleEast", "EasternEurope", "NorthAmerica", "Asia"], [
      formation("CombinedArms", 25),
      formation("Armored", 35),
      formation("AirAssault", -10),
      formation("LightInfantry", -35),
      formation("Motorized", 30),
      formation("Support", -40)
    ]),
    country("PLAAGF", "China", ["CentralAsia", "MiddleEast", "EasternEurope", "NorthAmerica", "Asia"], [
      formation("CombinedArms", 5),
      formation("Armored", 15),
      formation("Mechanized", 10),
      formation("AmphibiousAssault", 10)
    ], true),
    country("PLANMC", "China", ["CentralAsia", "MiddleEast", "EasternEurope", "NorthAmerica", "Asia"], [
      formation("CombinedArms", -5),
      formation("Armored", 10),
      formation("AirAssault", -15),
      formation("LightInfantry", -40),
      formation("Motorized", 20),
      formation("Mechanized", 10),
      formation("Support", -40),
      formation("AmphibiousAssault", 10)
    ], true),
    country("ADF", "NATO", ["CentralAsia", "MiddleEast", "EasternEurope", "NorthAmerica", "Asia", "NorthernEurope"], [
      formation("CombinedArms", 0),
      formation("AirAssault", -15),
      formation("Mechanized", 15)
    ]),
    country("BAF", "NATO", ["CentralAsia", "MiddleEast", "EasternEurope", "NorthAmerica", "Asia", "NorthernEurope"], [
      formation("CombinedArms", 5),
      formation("Armored", 15),
      formation("AirAssault", -15),
      formation("Mechanized", 10),
      formation("Support", -40)
    ]),
    country("CAF", "NATO", ["CentralAsia", "MiddleEast", "EasternEurope", "NorthAmerica", "Asia", "NorthernEurope"], [
      formation("CombinedArms", 20),
      formation("Armored", 10),
      formation("AirAssault", -10),
      formation("Motorized", 10),
      formation("Mechanized", 30),
      formation("Support", -40)
    ]),
    country("IMF", "Independent", ["EasternEurope", "NorthernEurope"], [
      formation("CombinedArms", 10),
      formation("Armored", 15),
      formation("Motorized", -15),
      formation("Mechanized", 20),
      formation("Support", -40)
    ]),
    country("MEI", "Independent", ["CentralAsia", "MiddleEast"], [
      formation("CombinedArms", -10),
      formation("Armored", 10),
      formation("LightInfantry", -35),
      formation("Motorized", -15),
      formation("Mechanized", 10),
      formation("Support", -40)
    ]),
    country("GFI", "Independent", ["CentralAsia", "MiddleEast"], [
      formation("CombinedArms", 10),
      formation("Armored", 30),
      formation("AirAssault", -10),
      formation("LightInfantry", -25),
      formation("Mechanized", 20),
      formation("Support", -40)
    ]),
    country("TLF", "Independent", ["CentralAsia", "MiddleEast", "EasternEurope"], [
      formation("CombinedArms", 15),
      formation("Armored", 35),
      formation("AirAssault", -10),
      formation("LightInfantry", -25),
      formation("Motorized", -5),
      formation("Mechanized", 10),
      formation("Support", -40)
    ]),
    country("CRF", "Independent", ["NorthAmerica"], [
      formation("CombinedArms", -15)
    ]),
    country("WPMC", "Independent", ["CentralAsia", "MiddleEast", "EasternEurope", "NorthAmerica", "Asia", "NorthernEurope"], [
      formation("CombinedArms", 5),
      formation("AirAssault", 10),
      formation("LightInfantry", 5)
    ])
  ];

  const MAP_LABELS = Object.fromEntries(MAPS.map((map) => [map.id, map.name]));

  const COUNTRY_LABELS_ZH = {
    USA: "美国陆军",
    USMC: "美国海军陆战队",
    RGF: "俄罗斯陆军",
    VDV: "俄罗斯空降军",
    PLA: "中国人民解放军陆军",
    PLAAGF: "中国人民解放军两栖地面部队",
    PLANMC: "中国人民解放军海军陆战队",
    ADF: "澳大利亚国防军",
    BAF: "英国陆军",
    CAF: "加拿大武装部队",
    IMF: "非正规民兵",
    MEI: "中东联盟",
    GFI: "全球叛军",
    TLF: "土耳其陆军",
    CRF: "加拿大叛军",
    WPMC: "西方私营军事公司"
  };

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
    MEI: "Middle Eastern Alliance",
    GFI: "Global Insurgent Forces",
    TLF: "Turkish Land Forces",
    CRF: "Canadian Rebel Forces",
    WPMC: "Western Private Military Contractors"
  };

  const FORMATION_LABELS_ZH = {
    CombinedArms: "合成兵种",
    Armored: "装甲",
    AirAssault: "空中突击",
    LightInfantry: "轻步兵",
    Motorized: "摩托化",
    Mechanized: "机械化",
    Support: "支援",
    AmphibiousAssault: "两栖突击"
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

  const I18N = {
    "zh-CN": {
      localeName: "中文",
      appTitle: "Squad Map Manager WebUI",
      ui: {
        mainTitle: "地图预设GUI管理器",
        author: "作者",
        reset: "重置",
        commandView: "编辑代码",
        poolView: "随机图池",
        metrics: "数据概览",
        mapsMetric: "地图",
        layersMetric: "图层",
        factionsMetric: "阵营",
        mapSection: "地图",
        search: "搜索",
        searchPlaceholder: "Map / Layer",
        ecosystem: "生态",
        type: "类型",
        operation: "操作",
        preset: "预设",
        changeLayer: "换图",
        mode: "模式",
        matchup: "阵营与编制",
        allowCivilWar: "允许内战",
        force1: "阵营 1",
        force2: "阵营 2",
        faction: "阵营",
        formation: "编制",
        command: "命令",
        copyCommand: "复制命令",
        poolStrategy: "图池策略",
        difficulty: "难度",
        size: "大小",
        balanceThreshold: "平衡阈值",
        generateCount: "生成数量",
        generatePool: "生成图池",
        copyAll: "复制全部",
        results: "结果",
        language: "语言",
        allEcosystems: "全部生态",
        allTypes: "全部类型",
        mapCount: "{count} 张",
        layerCount: "{count} 个图层",
        layerTag: "{count} 图层",
        validOptions: "{count} 个可选",
        candidateCount: "{count} 个组合",
        resultCount: "{count} 条",
        emptyMaps: "没有匹配的地图",
        invalidCommand: "无法生成命令：当前选择缺少有效阵营或编制。",
        balanceEmpty: "平衡值 -",
        balanceValue: "平衡值 {value}",
        balancePlain: "平衡",
        faction1Advantage: "阵营1 +{value}",
        faction2Advantage: "阵营2 +{value}",
        faction1TooStrong: "阵营1优势过大",
        faction2TooStrong: "阵营2优势过大",
        balanceChip: "平衡 {value}",
        balanceSuffix: "平衡值: {value}",
        poolEmpty: "尚未生成图池",
        noCombinations: "没有符合条件的组合",
        generated: "已生成 {count} 条命令",
        nothingToCopy: "没有可复制的内容",
        copied: "已复制",
        copyFailed: "复制失败",
        resetDone: "已重置"
      },
      ecosystems: ECOSYSTEM_LABELS,
      mapTypes: MAP_TYPE_LABELS,
      difficulties: DIFFICULTY_LABELS,
      sizes: SIZE_LABELS,
      modeTypes: MODE_TYPE_LABELS,
      alliances: {
        NATO: "北约",
        Russia: "俄罗斯",
        China: "中国",
        Independent: "独立阵营"
      },
      maps: MAP_LABELS,
      countries: COUNTRY_LABELS_ZH,
      formations: FORMATION_LABELS_ZH
    },
    "en-US": {
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
      alliances: ALLIANCE_LABELS,
      maps: MAP_LABELS,
      countries: COUNTRY_LABELS_EN,
      formations: FORMATION_LABELS_EN
    }
  };

  window.SQUAD_MAP_CONFIG = Object.freeze({
    defaultLocale: "zh-CN",
    author: "[POST]MirageStar",
    i18n: I18N,
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
    maps: MAPS,
    countries: COUNTRIES
  });
})();
