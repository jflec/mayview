ServerEvents.recipes((event) => {
  event.remove({ output: "farmersdelight:organic_compost" });
});

ServerEvents.recipes((event) => {
  event.shaped(
    Item.of("farmersdelight:organic_compost", 1),
    ["DRR", "SSF", "FFF"],
    {
      D: "#minecraft:dirt",
      R: "minecraft:rotten_flesh",
      S: "farmersdelight:straw",
      F: "#c:fertilizers",
    }
  );
});

ServerEvents.recipes((event) => {
  event.shaped(
    Item.of("farmersdelight:organic_compost", 1),
    ["DSS", "FFT", "TTT"],
    {
      D: "#minecraft:dirt",
      T: "farmersdelight:tree_bark",
      S: "farmersdelight:straw",
      F: "#c:fertilizers",
    }
  );
});
