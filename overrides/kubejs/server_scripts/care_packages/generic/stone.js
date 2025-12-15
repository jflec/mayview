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
];

BlockEvents.rightClicked(STONE_CARE_PACKAGE_BLOCK_ID, (event) => {
  const { player, block, level, server } = event;

  if (level.isClientSide()) return;
  if (!player.isCrouching()) return;
  if (!player.mainHandItem.isEmpty()) return;

  const chosen = pickRandomUnique(STONE_CARE_PACKAGE_ITEM_IDS, 2);

  for (let i = 0; i < chosen.length; i++) {
    block.popItem(Item.of(chosen[i], 64 * 4));
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
