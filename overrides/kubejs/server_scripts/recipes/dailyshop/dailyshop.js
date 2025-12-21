ServerEvents.recipes((event) => {
  event.shaped(Item.of("dailyshop:daily_shop", 1), ["WWW", "F F", "PPP"], {
    W: "#minecraft:wool",
    F: "#minecraft:fences",
    P: "#minecraft:planks",
  });
});
