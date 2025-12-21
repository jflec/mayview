MoreJS.villagerTrades((event) => {
  const fluix = "ae2:fluix_researcher";

  event.removeVanillaTypedTrades([fluix], 1);
  event.removeModdedTypedTrades([fluix], 1);

  event.addTrade(
    fluix,
    1,
    { id: "mayview:gold_coin", count: 3 },
    { id: "ae2:certus_quartz_crystal", count: 4 }
  );
});
