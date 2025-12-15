const FOOD_CARE_PACKAGE_BLOCK_ID = "kubejs:food_care_package";

const LOW_FOODS = [
  "biomeswevegone:baobab_fruit",
  "biomeswevegone:blueberries",
  "biomeswevegone:yucca_fruit",
  "biomeswevegone:aloe_vera_juice",
  "biomeswevegone:green_apple",
  "biomeswevegone:soul_fruit",
  "biomeswevegone:cooked_white_puffball_cap",

  "brewinandchewin:jerky",
  "brewinandchewin:kimchi",
  "brewinandchewin:pickled_pickles",
  "brewinandchewin:cocoa_fudge",
  "brewinandchewin:flaxen_cheese_wedge",
  "brewinandchewin:scarlet_cheese_wedge",

  "cobblemon:lava_cookie",
  "cobblemon:ponigiri",
  "cobblemon:roasted_leek",
  "cobblemon:tasty_tail",
  "cobblemon:sweet_apple",
  "cobblemon:syrupy_apple",
  "cobblemon:tart_apple",
  "cobblemon:lumiose_galette",
  "cobblemon:potato_mochi",

  "create:builders_tea",
  "create:bar_of_chocolate",

  "endersdelight:mite_crust",
  "endersdelight:shulker_filet",
  "endersdelight:shulker_mollusk",

  "farmersdelight:cabbage",
  "farmersdelight:cabbage_leaf",
  "farmersdelight:chicken_cuts",
  "farmersdelight:cod_slice",
  "farmersdelight:salmon_slice",
  "farmersdelight:mutton_chops",
  "farmersdelight:raw_pasta",
  "farmersdelight:wheat_dough",
  "farmersdelight:tomato",
  "farmersdelight:onion",

  "minecraft:cookie",
  "minecraft:sweet_berries",
  "minecraft:dried_kelp",
  "minecraft:potato",
  "minecraft:apple",
  "minecraft:beetroot",
  "minecraft:melon_slice",
  "minecraft:rotten_flesh",
  "minecraft:spider_eye",
];

const MED_FOODS = [
  "biomeswevegone:cooked_oddion_bulb",
  "biomeswevegone:cooked_yucca_fruit",
  "biomeswevegone:green_apple_pie",
  "biomeswevegone:blueberry_pie",

  "brewinandchewin:pizza_slice",
  "brewinandchewin:apple_jelly",
  "brewinandchewin:glow_berry_marmalade",
  "brewinandchewin:sweet_berry_jam",
  "brewinandchewin:kippers",
  "brewinandchewin:ham_and_cheese_sandwich",

  "cobblemon:leek_and_potato_stew",
  "cobblemon:berry_sweet",
  "cobblemon:clover_sweet",
  "cobblemon:flower_sweet",
  "cobblemon:love_sweet",
  "cobblemon:ribbon_sweet",
  "cobblemon:star_sweet",
  "cobblemon:strawberry_sweet",
  "cobblemon:big_malasada",
  "cobblemon:jubilife_muffin",
  "cobblemon:pewter_crunchies",
  "cobblemon:casteliacone",
  "cobblemon:open_faced_sandwich",
  "cobblemon:whipped_dream",

  "create:sweet_roll",
  "create:chocolate_glazed_berries",
  "create:honeyed_apple",

  "endersdelight:chorus_stew",
  "endersdelight:endermite_stew",
  "endersdelight:uncanny_cookies",

  "farmersdelight:fried_egg",
  "farmersdelight:cooked_bacon",
  "farmersdelight:bone_broth",
  "farmersdelight:beef_patty",
  "farmersdelight:cooked_chicken_cuts",
  "farmersdelight:cooked_cod_slice",
  "farmersdelight:cooked_mutton_chops",
  "farmersdelight:cooked_salmon_slice",

  "minecraft:bread",
  "minecraft:baked_potato",
  "minecraft:cooked_cod",
  "minecraft:cooked_rabbit",
  "minecraft:mushroom_stew",
  "minecraft:beetroot_soup",
  "minecraft:pumpkin_pie",
];

const HIGH_FOODS = [
  "biomeswevegone:allium_oddion_soup",
  "biomeswevegone:white_puffball_stew",

  "brewinandchewin:cheesy_pasta",
  "brewinandchewin:fiery_fondue",
  "brewinandchewin:horror_lasagna",
  "brewinandchewin:scarlet_pierogi",
  "brewinandchewin:creamy_onion_soup",
  "brewinandchewin:vegetable_omelet",

  "cobblemon:smoked_tail_curry",
  "cobblemon:vivichoke_dip",

  "farmersdelight:baked_cod_stew",
  "farmersdelight:chicken_soup",
  "farmersdelight:beef_stew",
  "farmersdelight:fish_stew",
  "farmersdelight:vegetable_soup",
  "farmersdelight:pumpkin_soup",
  "farmersdelight:noodle_soup",

  "mynethersdelight:egg_soup",
  "mynethersdelight:rock_soup",
  "mynethersdelight:spicy_noodle_soup",

  "minecraft:rabbit_stew",
  "minecraft:golden_carrot",
];

BlockEvents.rightClicked(FOOD_CARE_PACKAGE_BLOCK_ID, (event) => {
  const { player, block, level, server } = event;

  if (level.isClientSide()) return;
  if (!player.isCrouching()) return;
  if (!player.mainHandItem.isEmpty()) return;

  const lows = pickRandomUnique(LOW_FOODS, 2);
  const meds = pickRandomUnique(MED_FOODS, 1);
  const highs = pickRandomUnique(HIGH_FOODS, 1);

  for (let i = 0; i < lows.length; i++) {
    block.popItem(Item.of(lows[i], randInt(3, 5)));
  }

  for (let i = 0; i < meds.length; i++) {
    block.popItem(Item.of(meds[i], randInt(2, 3)));
  }

  if (highs.length) {
    block.popItem(Item.of(highs[0], 1));
  }

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
