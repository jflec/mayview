PlayerEvents.loggedIn((e) => {
  if (!e.player.stages.has("started")) {
    e.player.stages.add("started");
    e.player.give(Item.of("cobblemon:poke_ball", 3));
    e.player.give(Item.of("farmersdelight:fruit_salad", 3));
  }
});
