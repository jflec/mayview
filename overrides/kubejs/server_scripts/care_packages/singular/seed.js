const SEED_CARE_PACKAGE_BLOCK_ID = "kubejs:seed_care_package";

BlockEvents.rightClicked(SEED_CARE_PACKAGE_BLOCK_ID, (event) => {
  var player = event.player;
  var block = event.block;
  var level = event.level;
  var server = event.server;

  if (level.isClientSide()) return;
  if (!player.isCrouching()) return;
  if (!player.mainHandItem.isEmpty()) return;

  var tagList = Ingredient.of("#mayview:seeds").itemIds;
  var seeds = toJsStringArray(tagList);

  seeds = seeds.filter((id) => id && id !== "");

  if (seeds.length === 0) return;

  var count = randInt(2, 3);
  var chosen = pickRandomUniqueValid(seeds, count);

  if (chosen.length < 2) return;

  for (var i = 0; i < chosen.length; i++) {
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

function toJsStringArray(javaList) {
  var out = [];
  if (!javaList) return out;

  javaList.forEach((id) => out.push(String(id)));
  return out;
}

function randInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
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
