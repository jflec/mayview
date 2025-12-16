const TIER_ONE_CREATE_CARE_PACKAGE_BLOCK_ID =
  "kubejs:tier_one_create_care_package";

const TIER_ONE_CREATE_CARE_PACKAGE_ITEM_COUNTS = {
  "create:shaft": 16,
  "create:cogwheel": 16,
  "create:large_cogwheel": 8,
  "create:mechanical_bearing": 1,
  "create:andesite_encased_shaft": 8,
  "create:belt_connector": 8,
  "create:chute": 8,
  "create:mechanical_press": 1,
  "create:andesite_alloy": 16,
  "create:iron_sheet": 8,
  "create:copper_sheet": 8,
  "create:zinc_nugget": 16,
};

BlockEvents.rightClicked(TIER_ONE_CREATE_CARE_PACKAGE_BLOCK_ID, (event) => {
  let { player, block, level, server } = event;

  if (level.isClientSide()) return;
  if (!player.isCrouching()) return;
  if (!player.mainHandItem.isEmpty()) return;

  spawnRandomFromTable(block, TIER_ONE_CREATE_CARE_PACKAGE_ITEM_COUNTS, 4);

  global.CarePackageFX.generic(
    { server: server, player: player, block: block },
    {
      themeSound: "create:stock_ticker_trade",
      themeVol: 0.8,
      themePitch: 1.1,
    }
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
    var stackSize = Math.min(remaining, 64);
    block.popItem(Item.of(itemId, stackSize));
    remaining -= stackSize;
  }
}
