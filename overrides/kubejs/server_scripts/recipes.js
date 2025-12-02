ServerEvents.tags("item", (e) => {
  e.add("c:foods/dough", "create:dough");
});

ServerEvents.recipes((event) => {
  event.shaped(Item.of("dailyshop:daily_shop", 1), ["WWW", "F F", "PPP"], {
    W: "#minecraft:wool",
    F: "#minecraft:fences",
    P: "#minecraft:planks",
  });
});

ServerEvents.recipes((event) => {
  const recipe = {
    type: "ae2:charger",
    ingredient: [{ item: "minecraft:quartz" }],
    result: {
      id: "ae2:certus_quartz_crystal",
      count: 1,
    },
  };

  event.custom(recipe);
});

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
