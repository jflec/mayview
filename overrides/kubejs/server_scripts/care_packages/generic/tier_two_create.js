const TIER_TWO_CREATE_CARE_PACKAGE_BLOCK_ID =
  "kubejs:tier_two_create_care_package";

const TIER_TWO_CREATE_CARE_PACKAGE_ITEM_COUNTS = {
  "create:brass_ingot": 12,
  "create:brass_sheet": 8,
  "create:precision_mechanism": 4,
  "create:smart_chute": 4,
  "create:smart_fluid_pipe": 4,
  "create:filter": 4,
  "create:attribute_filter": 2,
  "create:content_observer": 2,
  "create:fluid_pipe": 8,
  "create:electron_tube": 8,
  "create:copper_sheet": 8,
  "create:iron_sheet": 8,
};

BlockEvents.rightClicked(TIER_TWO_CREATE_CARE_PACKAGE_BLOCK_ID, (event) => {
  const { player, block, level, server } = event;

  if (level.isClientSide()) return;
  if (!player.isCrouching()) return;
  if (!player.mainHandItem.isEmpty()) return;

  spawnRandomFromTable(block, TIER_TWO_CREATE_CARE_PACKAGE_ITEM_COUNTS, 4);

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

function spawnRandomFromTable(block, itemCounts, pickCount) {
  const pool = Object.keys(itemCounts).filter((id) => Item.exists(id));
  const target = Math.min(pickCount, pool.length);

  let spawned = 0;

  while (spawned < target && pool.length > 0) {
    var rollIndex = Utils.random.nextInt(pool.length);
    var itemId = pool.splice(rollIndex, 1)[0];

    popCountAsStacks(block, itemId, itemCounts[itemId]);
    spawned++;
  }
}

function popCountAsStacks(block, itemId, total) {
  let remaining = Number(total) || 0;

  while (remaining > 0) {
    const stackSize = Math.min(remaining, 64);
    block.popItem(Item.of(itemId, stackSize));
    remaining -= stackSize;
  }
}
