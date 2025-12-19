// kubejs/server_scripts/split_looting_tracker.js
// Reliable: record looting on death using KubeJS events (has event.source.player).

// Future note: Setup Debug Boolean for toggled debug logging/messages
//const DEBUGSY = false

function isSplitter(entity) {
  var t = String(entity.type)
  return t === "minecraft:slime" || t === "minecraft:magma_cube"
}

function getLootingLevelSafe(player) {
  var looting = 0
  try {
    var held = player.getMainHandItem()
    if (held && held.getEnchantmentLevel) {
      looting = held.getEnchantmentLevel("minecraft:looting")
    }
  } catch (e) {
    looting = 0
  }
  return looting
}

EntityEvents.death(function (event) {
  var victim = event.entity
  if (!victim || !isSplitter(victim)) return

  var player = event.source.player
  // console.log("[Death DEBUG KJS] victim=" + String(victim.type) + " player=" + (player ? "yes" : "no"))
  if (!player) return

  var looting = getLootingLevelSafe(player)

  var heldStr = "unknown"
  try { heldStr = String(player.getMainHandItem()) } catch (e2) {}

  // console.log("[Tracker KJS] victim=" + String(victim.type) + " held=" + heldStr + " looting=" + looting)

  // store on the dying entity so MobSplitEvent can read it
  try {
    var tag = victim.getPersistentData()
    tag.putInt("kjs_last_looting", looting)

    // mark as "armed" so only intentional looting is counted
    tag.putBoolean("kjs_looting_armed", true)

    // console.log("[Tracker WRITE KJS] ok looting=" + looting + " armed=true")
  } catch (e3) {
    // console.log("[Tracker WRITE KJS] FAILED err=" + e3)
  }
})
