const WOOD_CARE_PACKAGE_BLOCK_ID = "kubejs:wood_care_package";

BlockEvents.rightClicked(WOOD_CARE_PACKAGE_BLOCK_ID, (event) => {
  let { player, block, level, server } = event;

  if (level.isClientSide()) return;
  if (!player.isCrouching()) return;
  if (!player.mainHandItem.isEmpty()) return;

  const logIds = Ingredient.of("#mayview:logs").itemIds;
  if (!logIds.length) {
    console.log("[WoodCarePackage] ERROR: #mayview:logs is empty");
    return;
  }

  const chosen = pickRandomUnique(logIds, randInt(2, 3));

  for (let i = 0; i < chosen.length; i++) {
    block.popItem(Item.of(chosen[i], 64 * 2));
  }

  global.CarePackageFX.generic(
    { server: server, player: player, block: block },
    {
      themeSound: "minecraft:item.axe.strip",
      themeVol: 0.1,
      themePitch: 1.1,
    }
  );

  block.set("minecraft:air");
});

function randInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function pickRandomUnique(list, count) {
  if (!Array.isArray(list) || list.length === 0) return [];

  const pool = list.slice();
  const picked = [];

  const n = Math.min(count, pool.length);
  for (let i = 0; i < n; i++) {
    const idx = Math.floor(Math.random() * pool.length);
    picked.push(pool[idx]);
    pool.splice(idx, 1);
  }

  return picked;
}
