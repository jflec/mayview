// directory
buildAnAnimalPen();
useALead();
raiseTwoBabies("cow", "336B70BEDF760BA9");
raiseTwoBabies("sheep", "2FACAE3E4E3C808D");
raiseTwoBabies("pig", "3112AFAE532AFAF5");
raiseTwoBabies("chicken", "5DA14EFCCDE9C358");
milkFourCows();
shearFourSheep();
rideAPig();
throwEightEggs();

function buildAnAnimalPen() {
  const FENCES_TASK_ID = "379F871E52F24C28";
  const GATE_TASK_ID = "38CAC70B8CA25B27";

  const FENCES_GOAL = 11;
  const GATE_GOAL = 1;

  FTBQuestsEvents.customTask(
    FENCES_TASK_ID,
    (e) => (e.maxProgress = FENCES_GOAL)
  );
  FTBQuestsEvents.customTask(GATE_TASK_ID, (e) => (e.maxProgress = GATE_GOAL));

  const toIdArray = (list) => {
    const out = [];
    list.forEach((id) => out.push(String(id)));
    return out;
  };

  const FENCE_IDS = toIdArray(Ingredient.of("#minecraft:fences").itemIds);
  const GATE_IDS = toIdArray(Ingredient.of("#minecraft:fence_gates").itemIds);

  BlockEvents.placed((event) => {
    if (event.level.isClientSide()) return;

    const player = event.player;
    if (!player) return;

    const id = String(event.block.id);
    const isDiagonal = id.indexOf("diagonalfences:") === 0;

    if (isDiagonal || FENCE_IDS.indexOf(id) !== -1) {
      FTBQuests.getServerDataFromPlayer(player).addProgress(FENCES_TASK_ID, 1);
    }

    if (GATE_IDS.indexOf(id) !== -1) {
      FTBQuests.getServerDataFromPlayer(player).addProgress(GATE_TASK_ID, 1);
    }
  });
}

function useALead() {
  const TASK_ID = "6EF1A122A946BC29";

  ItemEvents.entityInteracted(function (event) {
    const player = event.player;
    const item = event.item;
    const hand = event.hand;

    if (hand !== "main_hand") return;
    if (!player || !item || item.id !== "minecraft:lead") return;

    if (event.level && event.level.isClientSide()) return;

    FTBQuests.getServerDataFromPlayer(player).addProgress(TASK_ID, 1);
  });
}

function raiseTwoBabies(entitySimpleId, taskId, goal) {
  if (goal === undefined) goal = 2;

  FTBQuestsEvents.customTask(taskId, (e) => (e.maxProgress = goal));

  const ServerPlayer = Java.loadClass(
    "net.minecraft.server.level.ServerPlayer"
  );

  NativeEvents.onEvent(
    "net.neoforged.neoforge.event.entity.living.BabyEntitySpawnEvent",
    (event) => {
      if (event.isCanceled && event.isCanceled()) return;

      const player = event.getCausedByPlayer();
      if (!player || !(player instanceof ServerPlayer)) return;

      const child = event.getChild();
      if (!child) return;

      const typeId = String(child.getType().toString());
      const simple = typeId.includes(":") ? typeId.split(":")[1] : typeId;

      if (simple !== entitySimpleId) return;

      FTBQuests.getServerDataFromPlayer(player).addProgress(taskId, 1);
    }
  );
}

function isAdult(entity) {
  if (!entity) return false;

  if (typeof entity.isBaby === "function") return !entity.isBaby();
  if (entity.isBaby !== undefined) return !entity.isBaby;

  return false;
}

function getNbtPathString(nbt, path) {
  if (!nbt || !path) return null;

  var parts = String(path).split(".");
  var cur = nbt;
  var i = 0;
  var val = null;

  for (i = 0; i < parts.length; i++) {
    val = null;

    try {
      if (cur[parts[i]] !== undefined && cur[parts[i]] !== null)
        val = cur[parts[i]];
    } catch (e1) {}

    if (val === null) {
      try {
        if (typeof cur.get === "function") val = cur.get(parts[i]);
      } catch (e2) {}
    }

    if (val === null) {
      try {
        if (typeof cur.getString === "function") val = cur.getString(parts[i]);
      } catch (e3) {}
    }

    if (val === null || val === undefined) return null;
    cur = val;
  }

  try {
    return String(cur);
  } catch (e4) {
    return null;
  }
}

function normalizeNbtString(s) {
  if (s === null || s === undefined) return null;
  s = String(s);

  while (s.length > 0 && (s.charAt(0) === " " || s.charAt(0) === "\t"))
    s = s.substring(1);
  while (
    s.length > 0 &&
    (s.charAt(s.length - 1) === " " || s.charAt(s.length - 1) === "\t")
  )
    s = s.substring(0, s.length - 1);

  if (s.length >= 2 && s.charAt(0) === '"' && s.charAt(s.length - 1) === '"') {
    s = s.substring(1, s.length - 1);
  }

  return s;
}

function isCobblemonSpecies(entity, speciesId1, speciesId2) {
  try {
    if (!entity) return false;
    if (String(entity.type) !== "cobblemon:pokemon") return false;

    var nbtObj = null;
    try {
      if (entity.nbt) nbtObj = entity.nbt;
      else if (typeof entity.getNbt === "function") nbtObj = entity.getNbt();
    } catch (e) {
      nbtObj = null;
    }

    var species = getNbtPathString(nbtObj, "Pokemon.Species");
    species = normalizeNbtString(species);

    if (!species) return false;
    return species === speciesId1 || (speciesId2 && species === speciesId2);
  } catch (e2) {
    return false;
  }
}

function milkFourCows() {
  var TASK_ID = "6A18DAE81415AC80";
  var GOAL = 4;

  FTBQuestsEvents.customTask(TASK_ID, function (e) {
    e.maxProgress = GOAL;
  });

  ItemEvents.entityInteracted(function (event) {
    var player = event.player;
    var item = event.item;
    var hand = event.hand;
    var target = event.target;

    if (hand !== "main_hand") return;
    if (!player || !item || !target) return;

    if (item.id !== "minecraft:bucket") return;

    if (event.level && event.level.isClientSide()) return;

    var isVanillaCow = String(target.type) === "minecraft:cow";
    var isMiltank = isCobblemonSpecies(target, "cobblemon:miltank", "miltank");

    if (!isVanillaCow && !isMiltank) return;

    if (isVanillaCow && !isAdult(target)) return;

    FTBQuests.getServerDataFromPlayer(player).addProgress(TASK_ID, 1);
  });
}

function shearFourSheep() {
  var TASK_ID = "130C9CBC6B8C373E";
  var GOAL = 4;

  FTBQuestsEvents.customTask(TASK_ID, function (e) {
    e.maxProgress = GOAL;
  });

  ItemEvents.entityInteracted(function (event) {
    var player = event.player;
    var item = event.item;
    var hand = event.hand;
    var target = event.target;

    if (hand !== "main_hand") return;
    if (!player || !item || !target) return;

    if (item.id !== "minecraft:shears") return;

    if (event.level && event.level.isClientSide()) return;

    var isVanillaSheep = String(target.type) === "minecraft:sheep";
    var isWooloo = isCobblemonSpecies(target, "cobblemon:wooloo", "wooloo");
    var isDubwool = isCobblemonSpecies(target, "cobblemon:dubwool", "dubwool");

    if (!isVanillaSheep && !isWooloo && !isDubwool) return;

    if (isVanillaSheep && !isAdult(target)) return;

    FTBQuests.getServerDataFromPlayer(player).addProgress(TASK_ID, 1);
  });
}

function rideAPig() {
  const TASK_ID = "42ACC96B69881E92";

  NativeEvents.onEvent(
    "net.neoforged.neoforge.event.entity.EntityMountEvent",
    function (event) {
      if (!event.isMounting()) return;

      const mounting = event.getEntityMounting();
      const mounted = event.getEntityBeingMounted();
      const level = event.getLevel();

      if (!mounting || !mounted || !level) return;
      if (level.isClientSide()) return;

      if (String(mounting.getType().toString()) !== "minecraft:player") return;

      if (String(mounted.getType().toString()) !== "minecraft:pig") return;

      const player = mounting;

      FTBQuests.getServerDataFromPlayer(player).addProgress(TASK_ID, 1);
    }
  );
}

function throwEightEggs() {
  const TASK_ID = "763BC514D02929B5";
  const GOAL = 8;

  FTBQuestsEvents.customTask(TASK_ID, function (e) {
    e.maxProgress = GOAL;
  });

  ItemEvents.rightClicked(function (event) {
    const player = event.player;
    const item = event.item;
    const hand = event.hand;

    if (hand !== "main_hand") return;
    if (!player || !item) return;

    if (item.id !== "minecraft:egg") return;

    if (event.level && event.level.isClientSide()) return;

    FTBQuests.getServerDataFromPlayer(player).addProgress(TASK_ID, 1);
  });
}
