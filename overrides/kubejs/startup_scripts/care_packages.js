StartupEvents.registry("block", function (event) {
  var CARE_PACKAGE_BLOCK_DEFINITIONS = [
    {
      id: "starter_care_package",
      displayName: "Starter Care Package",
      soundType: "wool",
    },
    {
      id: "seed_care_package",
      displayName: "Seed Care Package",
      soundType: "wool",
    },
    {
      id: "sapling_care_package",
      displayName: "Sapling Care Package",
      soundType: "wool",
    },
    {
      id: "wood_care_package",
      displayName: "Wood Care Package",
      soundType: "wool",
    },
    {
      id: "stone_care_package",
      displayName: "Stone Care Package",
      soundType: "wool",
    },
    {
      id: "food_care_package",
      displayName: "Food Care Package",
      soundType: "wool",
    },
    {
      id: "farming_care_package",
      displayName: "Farming Care Package",
      soundType: "wool",
    },

    {
      id: "pokemon_care_package",
      displayName: "Pokémon Care Package",
      soundType: "stone",
    },
  ];

  CARE_PACKAGE_BLOCK_DEFINITIONS.forEach(function (definition) {
    var blockBuilder = event
      .create(definition.id)
      .displayName(definition.displayName)
      .hardness(1)
      .resistance(1);

    if (definition.soundType === "stone") {
      blockBuilder.stoneSoundType();
    } else {
      blockBuilder.soundType(definition.soundType);
    }
  });
});
