const FARMING_CARE_PACKAGE_BLOCK_ID = "kubejs:farming_care_package";

const FARMING_CARE_PACKAGE_ITEM_COUNTS = {
  "minecraft:iron_hoe": 1,
  "minecraft:bone_meal": 32,
  "minecraft:water_bucket": 1,
  "farmersdelight:rich_soil_farmland": 16,
};

BlockEvents.rightClicked(FARMING_CARE_PACKAGE_BLOCK_ID, (event) => {
  const { player, block, level, server } = event;

  if (level.isClientSide()) return;
  if (!player.isCrouching()) return;
  if (!player.mainHandItem.isEmpty()) return;

  dropAllFromCounts(block, FARMING_CARE_PACKAGE_ITEM_COUNTS);

  let x = block.pos.x + 0.5;
  let y = block.pos.y;
  let z = block.pos.z + 0.5;

  let asPlayer = 'execute as @a[name="' + player.username + '"] run ';

  server.runCommandSilent(
    asPlayer +
      "playsound block.composter.fill_success player @s " +
      x +
      " " +
      (y + 0.6) +
      " " +
      z +
      " 1 1"
  );
  server.runCommandSilent(
    asPlayer +
      "particle minecraft:poof " +
      x +
      " " +
      (y + 0.9) +
      " " +
      z +
      " 0.35 0.35 0.35 0.10 18 normal"
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
