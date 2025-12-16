const FARMING_CARE_PACKAGE_BLOCK_ID = "kubejs:farming_care_package";

const FARMING_CARE_PACKAGE_ITEM_COUNTS = {
  "minecraft:iron_hoe": 1,
  "minecraft:bone_meal": 32,
  "minecraft:water_bucket": 1,
  "farmersdelight:rich_soil_farmland": 16,
};

BlockEvents.rightClicked(FARMING_CARE_PACKAGE_BLOCK_ID, (event) => {
  let player = event.player;
  let block = event.block;
  let level = event.level;
  let server = event.server;

  if (level.isClientSide()) return;
  if (!player.isCrouching()) return;
  if (!player.mainHandItem.isEmpty()) return;

  dropAllFromCounts(block, FARMING_CARE_PACKAGE_ITEM_COUNTS);

  // Call global CarePackage_Fx 
  // Apply Sound and Particle Effects
  global.CarePackageFX.generic(
    { server: event.server, player: player, block: block },
    {
      themeSound: "minecraft:item.hoe.till",
      themeVol: 0.8,
      themePitch: 1.1
    }
  );
  
  block.set("minecraft:air");
});

function dropAllFromCounts(block, itemCounts) {
  Object.entries(itemCounts).forEach(([itemId, rawCount]) => {
    let remaining = Number(rawCount) || 0;
    if (remaining <= 0) return;

    while (remaining > 0) {
      const stackSize = Math.min(remaining, 64);
      block.popItem(Item.of(itemId).withCount(stackSize));
      remaining -= stackSize;
    }
  });
}
