const SEED_CARE_PACKAGE_BLOCK_ID = "kubejs:seed_care_package";

const SEED_CARE_PACKAGE_ITEM_IDS = [
  "minecraft:wheat_seeds",
  "minecraft:beetroot_seeds",
  "minecraft:pumpkin_seeds",
  "minecraft:melon_seeds",
  "minecraft:torchflower_seeds",
  "farmersdelight:cabbage_seeds",
  "farmersdelight:tomato_seeds",
  "farm_and_charm:barley_seeds",
  "farm_and_charm:lettuce_seeds",
  "farm_and_charm:oat_seeds",
  "farm_and_charm:strawberry_seeds",
  "farm_and_charm:tomato_seeds",
  "cobblemon:blue_mint_seeds",
  "cobblemon:cyan_mint_seeds",
  "cobblemon:green_mint_seeds",
  "cobblemon:pink_mint_seeds",
  "cobblemon:red_mint_seeds",
  "cobblemon:white_mint_seeds",
  "cobblemon:vivichoke_seeds",
  "biomeswevegone:pale_pumpkin_seeds",
  "brewery:hops_seeds",
  "vinery:red_grape_seeds",
  "vinery:white_grape_seeds",
];

BlockEvents.rightClicked(SEED_CARE_PACKAGE_BLOCK_ID, (event) => {
  let { player, block, level, server } = event;

  if (level.isClientSide()) return;
  if (!player.isCrouching()) return;
  if (!player.mainHandItem.isEmpty()) return;

  const count = randInt(2, 3);
  const chosen = pickRandomUnique(SEED_CARE_PACKAGE_ITEM_IDS, count);

  for (let i = 0; i < chosen.length; i++) {
    block.popItem(Item.of(chosen[i], 1));
  }

  global.CarePackageFX.generic(
    { server: server, player: player, block: block },
    {
      themeSound: "minecraft:block.composter.fill_success",
      themeVol: 0.8,
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
