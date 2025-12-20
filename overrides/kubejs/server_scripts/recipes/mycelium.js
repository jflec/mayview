ServerEvents.recipes((event) => {
  event.shapeless(Item.of("minecraft:mycelium", 1), [
    "#c:mushrooms",
    "minecraft:dirt",
  ]);
});
