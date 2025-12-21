const STONE_CARE_PACKAGE_BLOCK_ID = "kubejs:stone_care_package";

const STONE_CARE_PACKAGE_ITEM_IDS = [
  "create:limestone",
  "minecraft:tuff",
  "minecraft:smooth_basalt",
  "minecraft:deepslate",
  "minecraft:granite",
  "minecraft:andesite",
  "minecraft:diorite",
  "minecraft:cobblestone",
  "minecraft:stone",
  "ae2:sky_stone_block",
];

BlockEvents.rightClicked(STONE_CARE_PACKAGE_BLOCK_ID, (event) => {
  let { player, block, level, server } = event;

  if (level.isClientSide()) return;
  if (!player.isCrouching()) return;
  if (!player.mainHandItem.isEmpty()) return;

  const chosen = pickRandomUnique(STONE_CARE_PACKAGE_ITEM_IDS, 2);

  for (let i = 0; i < chosen.length; i++) {
    block.popItem(Item.of(chosen[i], 64 * 4));
  }

  global.CarePackageFX.generic(
    { server: server, player: player, block: block },
    {
      themeSound: "minecraft:block.deepslate_bricks.place",
      themeVol: 0.8,
      themePitch: 1.1,
    }
  );

  block.set("minecraft:air");
});

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
