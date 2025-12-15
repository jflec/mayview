const SAPLING_CARE_PACKAGE_BLOCK_ID = "kubejs:sapling_care_package";

const SAPLING_CARE_PACKAGE_ITEM_IDS = [
  "biomeswevegone:araucaria_sapling",
  "biomeswevegone:aspen_sapling",
  "biomeswevegone:baobab_sapling",
  "biomeswevegone:blue_enchanted_sapling",
  "biomeswevegone:blue_spruce_sapling",
  "biomeswevegone:brown_birch_sapling",
  "biomeswevegone:brown_oak_sapling",
  "biomeswevegone:brown_zelkova_sapling",
  "biomeswevegone:cika_sapling",
  "biomeswevegone:cypress_sapling",
  "biomeswevegone:ebony_sapling",
  "biomeswevegone:fir_sapling",
  "biomeswevegone:green_enchanted_sapling",
  "biomeswevegone:holly_sapling",
  "biomeswevegone:indigo_jacaranda_sapling",
  "biomeswevegone:ironwood_sapling",
  "biomeswevegone:jacaranda_sapling",
  "biomeswevegone:mahogany_sapling",
  "biomeswevegone:maple_sapling",
  "biomeswevegone:orange_birch_sapling",
  "biomeswevegone:orange_oak_sapling",
  "biomeswevegone:orange_spruce_sapling",
  "biomeswevegone:orchard_sapling",
  "biomeswevegone:palm_sapling",
  "biomeswevegone:palo_verde_sapling",
  "biomeswevegone:pine_sapling",
  "biomeswevegone:rainbow_eucalyptus_sapling",
  "biomeswevegone:red_birch_sapling",
  "biomeswevegone:red_maple_sapling",
  "biomeswevegone:red_oak_sapling",
  "biomeswevegone:red_spruce_sapling",
  "biomeswevegone:redwood_sapling",
  "biomeswevegone:silver_maple_sapling",
  "biomeswevegone:skyris_sapling",
  "biomeswevegone:spirit_sapling",
  "biomeswevegone:white_mangrove_sapling",
  "biomeswevegone:white_sakura_sapling",
  "biomeswevegone:willow_sapling",
  "biomeswevegone:witch_hazel_sapling",
  "biomeswevegone:yellow_birch_sapling",
  "biomeswevegone:yellow_sakura_sapling",
  "biomeswevegone:yellow_spruce_sapling",
  "biomeswevegone:yucca_sapling",
  "biomeswevegone:zelkova_sapling",
  "cluttered:crabapple_sapling",
  "cluttered:fluorescent_maple_sapling",
  "cluttered:poplar_sapling",
  "cluttered:sycamore_sapling",
  "cluttered:willow_sapling",
  "cobblemon:saccharine_sapling",
  "minecraft:acacia_sapling",
  "minecraft:birch_sapling",
  "minecraft:cherry_sapling",
  "minecraft:dark_oak_sapling",
  "minecraft:jungle_sapling",
  "minecraft:oak_sapling",
  "minecraft:spruce_sapling",
  "vinery:apple_tree_sapling",
  "vinery:dark_cherry_sapling",
];

BlockEvents.rightClicked(SAPLING_CARE_PACKAGE_BLOCK_ID, (event) => {
  const { player, block, level } = event;

  if (level.isClientSide()) return;
  if (!player.isCrouching()) return;
  if (!player.mainHandItem.isEmpty()) return;

  const count = randInt(3, 4);
  const chosen = pickRandomUnique(SAPLING_CARE_PACKAGE_ITEM_IDS, count);

  for (let i = 0; i < chosen.length; i++) {
    block.popItem(Item.of(chosen[i], 1));
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
