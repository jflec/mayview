ItemEvents.modifyTooltips((event) => {
  var COMMON_USAGE_LINES = [Text.gray("Place, then Sneak + Right Click")];

  var CARE_PACKAGE_TOOLTIPS = {
    "kubejs:seed_care_package": [
      Text.aqua("Contains a random selection of seeds!"),
    ],
    "kubejs:wood_care_package": [
      Text.aqua("Contains a random selection of logs!"),
    ],
    "kubejs:stone_care_package": [
      Text.aqua("Contains a random selection of stone!"),
    ],
    "kubejs:food_care_package": [
      Text.aqua("Contains a random selection of food!"),
    ],
    "kubejs:farming_care_package": [
      Text.aqua("Contains a collection of farming essentials!"),
    ],
    "kubejs:sapling_care_package": [
      Text.aqua("Contains a random selection of saplings!"),
    ],
    "kubejs:starter_care_package": [
      Text.aqua("Contains a collection of items to get you started!"),
    ],
  };

  Object.keys(CARE_PACKAGE_TOOLTIPS).forEach(function (itemId) {
    event.modify(itemId, function (tooltip) {
      tooltip.add(CARE_PACKAGE_TOOLTIPS[itemId]);
      tooltip.add(COMMON_USAGE_LINES);
    });
  });

  event.modify("kubejs:pokemon_care_package", function (tooltip) {
    tooltip.clear();
    tooltip.add(Text.lightPurple("Pokémon Care Package"));
    tooltip.add([
      Text.aqua("Contains a random Pokémon!"),
      Text.gray("Place, then Sneak + Right Click"),
    ]);
  });
});
