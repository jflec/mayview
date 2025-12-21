const FOOD_CARE_PACKAGE_BLOCK_ID = "kubejs:food_care_package";

const FOOD_BUCKET_TAGS = {
  LOW_LOW_FOODS: "mayview:low_low_foods",
  MED_LOW_FOODS: "mayview:med_low_foods",
  HIGH_LOW_FOODS: "mayview:high_low_foods",

  LOW_MED_FOODS: "mayview:low_med_foods",
  MED_MED_FOODS: "mayview:med_med_foods",
  HIGH_MED_FOODS: "mayview:high_med_foods",

  LOW_HIGH_FOODS: "mayview:low_high_foods",
  MED_HIGH_FOODS: "mayview:med_high_foods",
  HIGH_HIGH_FOODS: "mayview:high_high_foods",
};

BlockEvents.rightClicked(FOOD_CARE_PACKAGE_BLOCK_ID, (event) => {
  var player = event.player;
  var block = event.block;
  var level = event.level;
  var server = event.server;

  if (level.isClientSide()) return;
  if (!player.isCrouching()) return;
  if (!player.mainHandItem.isEmpty()) return;

  var hungerTiers = ["LOW", "MED", "HIGH"];

  for (var i = 0; i < hungerTiers.length; i++) {
    dropOneFromBucketTag(block, hungerTiers[i] + "_LOW_FOODS");
  }

  for (var j = 0; j < hungerTiers.length; j++) {
    if (coinFlip()) dropOneFromBucketTag(block, hungerTiers[j] + "_MED_FOODS");
  }

  for (var k = 0; k < hungerTiers.length; k++) {
    if (chance(1 / 3))
      dropOneFromBucketTag(block, hungerTiers[k] + "_HIGH_FOODS");
  }

  global.CarePackageFX.generic(
    { server: server, player: player, block: block },
    {
      themeSound: "minecraft:entity.frog.eat",
      themeVol: 0.8,
      themePitch: 1.0,
    }
  );

  block.set("minecraft:air");
});

function dropOneFromBucketTag(block, bucketName) {
  var tagId = FOOD_BUCKET_TAGS[bucketName];
  if (!tagId) return;

  var javaList = Ingredient.of("#" + tagId).itemIds;
  var list = toJsStringArray(javaList).filter((id) => id && id !== "");

  if (!list.length) return;

  var picked = pickRandomUniqueValid(list, 1);
  if (!picked.length) return;

  block.popItem(Item.of(picked[0], 1));
}

function toJsStringArray(javaList) {
  var out = [];
  if (!javaList) return out;

  javaList.forEach((id) => out.push(String(id)));
  return out;
}

function chance(p) {
  return Math.random() < p;
}

function coinFlip() {
  return chance(0.5);
}

function pickRandomUniqueValid(list, count) {
  var pool = list.slice();
  var picked = [];

  var idx, id;

  while (picked.length < count && pool.length > 0) {
    idx = Math.floor(Math.random() * pool.length);
    id = pool[idx];
    pool.splice(idx, 1);

    if (!id) continue;

    try {
      Item.of(id, 1);
      picked.push(id);
    } catch (e) {}
  }

  return picked;
}
