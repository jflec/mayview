// kubejs/startup_scripts/carepackage_fx.js

global.CarePackageFX = (function () {

  function center(block, yOffset) {
    return {
      x: block.pos.x + 0.5,
      y: block.pos.y + (yOffset == null ? 0.6 : yOffset),
      z: block.pos.z + 0.5
    };
  }

  function asPlayerPrefix(player) {
    return 'execute as @a[name="' + player.username + '"] run ';
  }

  function playsound(ctx, sound, category, p, vol, pitch) {
    ctx.server.runCommandSilent(
      ctx.asPlayer +
        "playsound " + sound + " " + category + " @s " +
        p.x + " " + p.y + " " + p.z + " " +
        vol + " " + pitch
    );
  }

  function particle(ctx, particleId, p, dx, dy, dz, speed, count, mode) {
    ctx.server.runCommandSilent(
      ctx.asPlayer +
        "particle " + particleId + " " +
        p.x + " " + p.y + " " + p.z + " " +
        dx + " " + dy + " " + dz + " " +
        speed + " " + count + " " + (mode == null ? "normal" : mode)
    );
  }

  function generic(context, opts) {
    opts = opts || {};

    var ctx = {
      server: context.server,
      player: context.player,
      block: context.block,
      asPlayer: asPlayerPrefix(context.player)
    };

    var p = center(ctx.block, 0.6);

    if (opts.themeSound) {
      playsound(ctx, opts.themeSound, "block", p,
        (opts.themeVol == null ? 0.8 : opts.themeVol),
        (opts.themePitch == null ? 1.1 : opts.themePitch)
      );
    }

    playsound(ctx,
      (opts.pickupSound == null ? "minecraft:entity.item.pickup" : opts.pickupSound),
      "block", p,
      (opts.pickupVol == null ? 0.6 : opts.pickupVol),
      (opts.pickupPitch == null ? 0.7 : opts.pickupPitch)
    );

    playsound(ctx,
      (opts.bundleSound == null ? "minecraft:item.bundle.drop_contents" : opts.bundleSound),
      "block", p,
      (opts.bundleVol == null ? 0.5 : opts.bundleVol),
      (opts.bundlePitch == null ? 0.9 : opts.bundlePitch)
    );

    particle(ctx, "minecraft:poof", p, 0.10, 0.30, 0.10, 0.05,
      (opts.poofCount == null ? 10 : opts.poofCount),
      "normal"
    );

    particle(ctx, "minecraft:cloud", p, 0.45, 0.45, 0.45, 0.05,
      (opts.cloudCount == null ? 12 : opts.cloudCount),
      "normal"
    );

    var accents = opts.accents;
    if (!accents) {
      accents = [
        { id: "minecraft:glow", dx: 0.35, dy: 0.25, dz: 0.35, speed: 0.08, count: 8, mode: "normal" },
        { id: "minecraft:happy_villager", dx: 0.35, dy: 0.20, dz: 0.35, speed: 0.01, count: 4, mode: "normal" }
      ];
    }

    for (var i = 0; i < accents.length; i++) {
      var a = accents[i];
      particle(ctx, a.id, p, a.dx, a.dy, a.dz, a.speed, a.count, (a.mode == null ? "normal" : a.mode));
    }
  }

  function pokemon(context, opts) {
    opts = opts || {};

    var ctx = {
      server: context.server,
      player: context.player,
      block: context.block,
      asPlayer: asPlayerPrefix(context.player)
    };

    var p0 = center(ctx.block, 0.6);
    var p1 = center(ctx.block, 1.9);

    playsound(ctx, "cobblemon:evolution.ui", "block", p0, 0.8, 0.75);
    playsound(ctx, "minecraft:entity.player.levelup", "block", p0, 0.9, 1.25);
    playsound(ctx, "minecraft:entity.allay.ambient_without_item", "block", p0, 0.7, 1.6);

    particle(ctx, "minecraft:poof", p0, 0.10, 0.30, 0.10, 0.05, 8, "normal");
    particle(ctx, "minecraft:cloud", p0, 0.50, 0.50, 0.50, 0.05, 14, "normal");
    particle(ctx, "minecraft:totem_of_undying", p1, 0.40, 0.35, 0.40, 0.05, 14, "normal");
    particle(ctx, "minecraft:happy_villager", p0, 0.40, 0.40, 0.40, 0.005, 18, "normal");

    if (opts.variant === "shiny") {
      particle(ctx, "minecraft:firework", p1, 0.25, 0.25, 0.25, 0.08, 10, "normal");
    }
  }

  return {
    generic: generic,
    pokemon: pokemon
  };
})();
