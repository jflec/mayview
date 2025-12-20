function PlantSixteenCrops() {
  const TASK_ID = "410D515B16A65B06";
  const REQUIRED = 16;
  const PLANTED_TAG = "c:planted_crops";

  FTBQuestsEvents.customTask(TASK_ID, (event) => {
    event.maxProgress = REQUIRED;
  });

  BlockEvents.rightClicked((e) => {
    const { player, block, level, hand, server } = e;

    if (level.isClientSide()) return;
    if (hand !== "main_hand") return;

    const held = player.mainHandItem;
    if (held.isEmpty()) return;

    if (!block.hasTag("c:farmland")) return;
    if (!held.hasTag("minecraft:villager_plantable_seeds")) return;

    const pos = block.pos;
    const beforeAboveId = level.getBlock(pos.x, pos.y + 1, pos.z).id;

    server.scheduleInTicks(1, () => {
      const afterAbove = level.getBlock(pos.x, pos.y + 1, pos.z);

      if (afterAbove.id !== beforeAboveId && afterAbove.hasTag(PLANTED_TAG)) {
        FTBQuests.getServerDataFromPlayer(player).addProgress(TASK_ID, 1);
      }
    });
  });
}

PlantSixteenCrops();
