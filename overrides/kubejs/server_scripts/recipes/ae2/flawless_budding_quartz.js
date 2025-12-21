ServerEvents.recipes((event) => {
  const recipe = {
    type: "create:mechanical_crafting",
    accept_mirrored: false,
    category: "misc",
    key: {
      F: {
        item: "ae2:chipped_budding_quartz",
      },
      N: {
        item: "minecraft:nether_star",
      },
      O: {
        item: "minecraft:obsidian",
      },
    },
    pattern: [" F F ", "FFOFF", " ONO ", "FFOFF", " F F "],
    result: {
      count: 1,
      id: "ae2:flawless_budding_quartz",
    },
    show_notification: false,
  };

  event.custom(recipe);
});
