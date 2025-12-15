BlockEvents.rightClicked(
  "kubejs:shiny_pokemon_gamba_package",
  function (event) {
    const { player, block, level, server } = event;

    if (level.isClientSide()) return;
    if (!player.isCrouching()) return;
    if (!player.mainHandItem.isEmpty()) return;

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
        " run pokespawn random shiny level=" +
        lvl
    );

    block.set("minecraft:air");
  }
);

function randInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
