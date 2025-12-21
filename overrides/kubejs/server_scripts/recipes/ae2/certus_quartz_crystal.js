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
