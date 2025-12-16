ItemEvents.modifyTooltips((event) => {
  var COMMON_USAGE_LINES = [Text.gray("Place, then Sneak + Right Click")];

  var CARE_PACKAGE_TOOLTIPS = {
    "kubejs:seed_care_package": [Text.aqua("Contains a random selection of seeds!")],
    "kubejs:wood_care_package": [Text.aqua("Contains a random selection of logs!")],
    "kubejs:stone_care_package": [Text.aqua("Contains a random selection of stone!")],
    "kubejs:food_care_package": [Text.aqua("Contains a random selection of food!")],
    "kubejs:farming_care_package": [Text.aqua("Contains a collection of farming essentials!")],
    "kubejs:sapling_care_package": [Text.aqua("Contains a random selection of saplings!")],
    "kubejs:starter_care_package": [Text.aqua("Contains a collection of items to get you started!")],
    "kubejs:tier_one_create_care_package": [Text.aqua("Contains a collection of Create essentials!")],
    "kubejs:tier_two_create_care_package": [Text.aqua("Contains a collection of Create essentials!")],

    // Pokemon Packages
    "kubejs:pokemon_gamba_package": [Text.aqua("Contains a random Pokémon!")],
    "kubejs:shiny_pokemon_gamba_package": [Text.aqua("Contains a random shiny Pokémon!")],
  };

  var TITLE_OVERRIDES = {
    "kubejs:pokemon_gamba_package": "Pokémon Gamba Package",
    "kubejs:shiny_pokemon_gamba_package": "Shiny Pokémon Gamba Package",
  };

  Object.keys(CARE_PACKAGE_TOOLTIPS).forEach(function (itemId) {
    event.modify(itemId, function (tooltip) {
      tooltip.clear();

	  // pokemon package text color
	  if (itemId === "kubejs:pokemon_gamba_package") {
		tooltip.add(Text.lightPurple("Pokémon Gamba Package"));
	  }

	  // shiny pokemon package text color
	  if (itemId === "kubejs:shiny_pokemon_gamba_package") {
		tooltip.add(Text.gold("Shiny Pokémon Gamba Package"));
      }

      // common
      tooltip.add(CARE_PACKAGE_TOOLTIPS[itemId]);
      tooltip.add(COMMON_USAGE_LINES);
    });
  });
});
