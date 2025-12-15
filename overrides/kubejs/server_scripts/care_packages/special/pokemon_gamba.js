BlockEvents.rightClicked("kubejs:pokemon_gamba_package", function (event) {
  let player = event.player;
  let block = event.block;
  let level = event.level;
  let server = event.server;

  if (level.isClientSide()) return;
  if (!player.isCrouching()) return;
  if (!player.mainHandItem.isEmpty()) return;

  let x = block.pos.x + 0.5;
  let y = block.pos.y;
  let z = block.pos.z + 0.5;

  let asPlayer = 'execute as @a[name="' + player.username + '"] run ';

  server.runCommandSilent(
    asPlayer +
      "playsound cobblemon:evolution.ui player @s " +
      x +
      " " +
      (y + 0.6) +
      " " +
      z +
      " 1 1"
  );
  server.runCommandSilent(
    asPlayer +
      "playsound minecraft:entity.player.levelup player @s " +
      x +
      " " +
      (y + 0.9) +
      " " +
      z +
      " 0.9 1.25"
  );
  server.runCommandSilent(
    asPlayer +
      "playsound minecraft:entity.allay.ambient_without_item player @s " +
      x +
      " " +
      (y + 0.9) +
      " " +
      z +
      " 0.7 1.6"
  );
  server.runCommandSilent(
    asPlayer +
      "particle minecraft:totem_of_undying " +
      x +
      " " +
      (y + 0.9) +
      " " +
      z +
      " 0.35 0.35 0.35 0.10 18 normal"
  );

  let lvl = randInt(10, 50);
  server.runCommandSilent(
    'execute as @a[name="' +
      player.username +
      '"] positioned ' +
      x +
      " " +
      y +
      " " +
      z +
      " run pokespawn random level=" +
      lvl
  );

  block.set("minecraft:air");
});

function randInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
