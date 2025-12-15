const WOOD_CARE_PACKAGE_BLOCK_ID = "kubejs:wood_care_package";

const WOOD_CARE_PACKAGE_ITEM_IDS = [
  "biomeswevegone:aspen_log",
  "biomeswevegone:baobab_log",
  "biomeswevegone:blue_enchanted_log",
  "biomeswevegone:cika_log",
  "biomeswevegone:cypress_log",
  "biomeswevegone:ebony_log",
  "biomeswevegone:fir_log",
  "biomeswevegone:green_enchanted_log",
  "biomeswevegone:holly_log",
  "biomeswevegone:ironwood_log",
  "biomeswevegone:jacaranda_log",
  "biomeswevegone:mahogany_log",
  "biomeswevegone:maple_log",
  "biomeswevegone:palm_log",
  "biomeswevegone:palo_verde_log",
  "biomeswevegone:pine_log",
  "biomeswevegone:rainbow_eucalyptus_log",
  "biomeswevegone:redwood_log",
  "biomeswevegone:sakura_log",
  "biomeswevegone:skyris_log",
  "biomeswevegone:spirit_log",
  "biomeswevegone:white_mangrove_log",
  "biomeswevegone:willow_log",
  "biomeswevegone:witch_hazel_log",
  "biomeswevegone:zelkova_log",
  "cluttered:blue_mushroom_log",
  "cluttered:crabapple_log",
  "cluttered:flowering_crabapple_log",
  "cluttered:flowering_poplar_log",
  "cluttered:flowering_willow_log",
  "cluttered:fluorescent_maple_log",
  "cluttered:poplar_log",
  "cluttered:red_mushroom_log",
  "cluttered:sycamore_log",
  "cluttered:willow_log",
  "cobblemon:apricorn_log",
  "cobblemon:saccharine_log",
  "minecraft:acacia_log",
  "minecraft:birch_log",
  "minecraft:cherry_log",
  "minecraft:dark_oak_log",
  "minecraft:jungle_log",
  "minecraft:mangrove_log",
  "minecraft:oak_log",
  "minecraft:spruce_log",
  "vinery:apple_log",
  "vinery:dark_cherry_log",
];

BlockEvents.rightClicked(WOOD_CARE_PACKAGE_BLOCK_ID, (event) => {
  const { player, block, level } = event;

  if (level.isClientSide()) return;
  if (!player.isCrouching()) return;
  if (!player.mainHandItem.isEmpty()) return;

  const chosen = pickRandomUnique(WOOD_CARE_PACKAGE_ITEM_IDS, randInt(2, 3));

  for (let i = 0; i < chosen.length; i++) {
    block.popItem(Item.of(chosen[i], 64 * 2));
  }

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
