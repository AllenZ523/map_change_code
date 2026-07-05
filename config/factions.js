"use strict";

(() => {
  const { formation, country } = window.SQUAD_CONFIG_CORE.helpers;

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
  country("RGF", "Russia", ["CentralAsia", "MiddleEast", "EasternEurope", "NorthAmerica", "Asia", "NorthernEurope"], [
    formation("CombinedArms", 0),
    formation("Armored", 35),
    formation("LightInfantry", -20),
    formation("Motorized", -10),
    formation("Mechanized", 35),
    formation("Support", -40)
  ]),
  country("VDV", "Russia", ["CentralAsia", "MiddleEast", "EasternEurope", "NorthAmerica", "Asia", "NorthernEurope"], [
    formation("CombinedArms", 10),
    formation("Armored", 25),
    formation("AirAssault", -15),
    formation("Mechanized", 30),
    formation("Support", -40)
  ]),
  country("PLA", "China", ["CentralAsia", "MiddleEast", "EasternEurope", "NorthAmerica", "Asia", "NorthernEurope"], [
    formation("CombinedArms", 25),
    formation("Armored", 35),
    formation("AirAssault", -10),
    formation("LightInfantry", -35),
    formation("Motorized", 30),
    formation("Support", -40)
  ]),
  country("PLAAGF", "China", ["CentralAsia", "MiddleEast", "EasternEurope", "NorthAmerica", "Asia", "NorthernEurope"], [
    formation("CombinedArms", 5),
    formation("Armored", 15),
    formation("Mechanized", 10),
    formation("AmphibiousAssault", 10)
  ], true),
  country("PLANMC", "China", ["CentralAsia", "MiddleEast", "EasternEurope", "NorthAmerica", "Asia", "NorthernEurope"], [
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
  ]),
  country("AFU", "Independent", ["CentralAsia", "MiddleEast", "EasternEurope", "NorthAmerica", "Asia", "NorthernEurope"], [
    formation("CombinedArms", 0),
    formation("Armored", 20),
    formation("LightInfantry", -20),
    formation("Motorized", 15),
    formation("Mechanized", 10),
    formation("Support", -30)
  ])
];


  window.SQUAD_FACTION_DATA = Object.freeze({ countries: COUNTRIES });
})();