BlockEvents.rightClicked("kubejs:pokemon_gamba_package", function (event) {
  let player = event.player;
  let block = event.block;
  let level = event.level;
  let server = event.server;

  if (level.isClientSide()) return;
  if (!player.isCrouching()) return;
  if (!player.mainHandItem.isEmpty()) return;

  // Call global CarePackage_Fx
  // Apply Sound and Particle Effects
  global.CarePackageFX.pokemon({
    server: event.server,
    player: player,
    block: block,
  });

  let x = block.pos.x + 0.5;
  let y = block.pos.y;
  let z = block.pos.z + 0.5;

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
