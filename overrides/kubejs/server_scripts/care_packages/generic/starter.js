const STARTER_CARE_PACKAGE_BLOCK_ID = "kubejs:starter_care_package";

const STARTER_FOOD_TAG = "mayview:high_low_foods";

const STARTER_CARE_PACKAGE_ITEM_COUNTS = {
  STARTER_FOOD: 4,
  "ftbquests:book": 1,
  "cobblemon:poke_ball": 3,
};

BlockEvents.rightClicked(STARTER_CARE_PACKAGE_BLOCK_ID, (event) => {
  var player = event.player;
  var block = event.block;
  var level = event.level;
  var server = event.server;

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

function toJsStringArray(javaList) {
  var out = [];
  if (!javaList) return out;

  javaList.forEach((id) => out.push(String(id)));
  return out;
}

function getStarterFoodsFromTag() {
  var javaList = Ingredient.of("#" + STARTER_FOOD_TAG).itemIds;
  return toJsStringArray(javaList);
}

function dropAllFromCounts(block, itemCounts) {
  var starterFoods = null;

  Object.entries(itemCounts).forEach(([key, rawCount]) => {
    var remaining = Number(rawCount) || 0;
    if (remaining <= 0) return;

    var itemId = key;

    if (key === "STARTER_FOOD") {
      if (starterFoods === null) starterFoods = getStarterFoodsFromTag();
      if (!starterFoods.length) return;

      itemId = randomFrom(starterFoods);
    }

    while (remaining > 0) {
      var stackSize = Math.min(remaining, 64);
      block.popItem(Item.of(itemId).withCount(stackSize));
      remaining -= stackSize;
    }
  });
}
