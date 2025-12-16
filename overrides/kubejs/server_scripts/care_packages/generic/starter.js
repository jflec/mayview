const STARTER_CARE_PACKAGE_BLOCK_ID = "kubejs:starter_care_package";

const STARTER_FOODS = [
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

const STARTER_CARE_PACKAGE_ITEM_COUNTS = {
  STARTER_FOOD: 4,
  "minecraft:torch": 8,
  "ftbquests:book": 1,
  "cobblemon:poke_ball": 3,
  "mayview:piggy_bank": 1,
};

BlockEvents.rightClicked(STARTER_CARE_PACKAGE_BLOCK_ID, (event) => {
  let { player, block, level, server } = event;

  if (level.isClientSide()) return;
  if (!player.isCrouching()) return;
  if (!player.mainHandItem.isEmpty()) return;
  dropAllFromCounts(block, STARTER_CARE_PACKAGE_ITEM_COUNTS);

  global.CarePackageFX.generic(
    { server: server, player: player, block: block },
    {
      themeSound: "create:sanding_short",
      themeVol: 0.8,
      themePitch: 1.1,
    }
  );

  block.set("minecraft:air");
});

function randomFrom(array) {
  return array[Math.floor(Math.random() * array.length)];
}

function dropAllFromCounts(block, itemCounts) {
  Object.entries(itemCounts).forEach(([key, rawCount]) => {
    let remaining = Number(rawCount) || 0;
    if (remaining <= 0) return;

    let itemId = key;
    if (key === "STARTER_FOOD") {
      itemId = randomFrom(STARTER_FOODS);
    }

    while (remaining > 0) {
      const stackSize = Math.min(remaining, 64);
      block.popItem(Item.of(itemId).withCount(stackSize));
      remaining -= stackSize;
    }
  });
}
