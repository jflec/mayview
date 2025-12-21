// BlockEvents.rightClicked((event) => {
//   const { player, level, hand } = event;

//   // server only
//   if (level.isClientSide()) return;

//   // only run for MAIN_HAND (prevents offhand double-fire)
//   if (hand !== "MAIN_HAND") return;

//   // optional: only when empty hand
//   if (!player.mainHandItem.isEmpty()) return;

//   const gates = Ingredient.of("#minecraft:fence_gates").itemIds;
//   if (!gates || gates.length === 0) {
//     console.log("[FenceGateTest] #minecraft:fence_gates is empty");
//     return;
//   }

//   gates.forEach((id) => player.give(Item.of(String(id), 1)));

//   console.log(`[FenceGateTest] Gave ${gates.length} fence gates`);
// });
