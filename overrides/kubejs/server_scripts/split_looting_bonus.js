// kubejs/server_scripts/split_looting_bonus.js
// Apply bonus split children based on stored looting from the death event.

var BONUS_PER_LOOTING_LEVEL = 2
var MAX_BONUS_CHILDREN = 8
// Future note: Setup Debug Boolean for toggled debug logging/messages
//const DEBUGSY = false

function isSplitter(entity) {
  var t = String(entity.type)
  return t === "minecraft:slime" || t === "minecraft:magma_cube"
}

function isClientSideSafe(level) {
  try { return level.isClientSide() } catch (e) {}
  return false
}

function getIntSafe(tag, key) {
  try { return tag.getInt(key) } catch (e) {}
  return 0
}

function getBoolSafe(tag, key) {
  try { return tag.getBoolean(key) } catch (e) {}
  return false
}

NativeEvents.onEvent(
  "net.neoforged.neoforge.event.entity.living.MobSplitEvent",
  function (event) {
    var parent = event.getParent()
    var kids = event.getChildren()

    // console.log("[MobSplitEvent DEBUG] fired parent=" + String(parent.type) + " kids=" + kids.size())

    if (!parent || !isSplitter(parent)) return

    var level = parent.level // property
    if (!level || isClientSideSafe(level)) return

    // Read persistent info set on death
    var looting = 0
    var armed = false
    try {
      var tag = parent.getPersistentData()
      looting = getIntSafe(tag, "kjs_last_looting")
      armed = getBoolSafe(tag, "kjs_looting_armed")
    } catch (e2) {
      looting = 0
      armed = false
    }

    //console.log("[Bonus DEBUG] type=" + String(parent.type) + " armed=" + armed + " looting=" + looting)

    // If not armed, do nothing
    if (!armed || looting <= 0) return

    // Consume the flag so it doesn’t apply multiple times in weird chains
    try {
      var tag2 = parent.getPersistentData()
      tag2.putBoolean("kjs_looting_armed", false)
    } catch (e3) {}

    var bonus = looting * BONUS_PER_LOOTING_LEVEL
    if (bonus > MAX_BONUS_CHILDREN) bonus = MAX_BONUS_CHILDREN
    if (bonus <= 0) return

    // Template child for size
    var template = null
    try { template = kids.get(0) } catch (e4) { template = null }

    var parentType = String(parent.type)
    //console.log("[Bonus] applying bonus=" + bonus + " for " + parentType)

    for (var i = 0; i < bonus; i++) {
      var extra = null
      try { extra = level.createEntity(parentType) } catch (e5) { extra = null }
      if (!extra) continue

      if (template) {
        try { extra.setSize(template.getSize(), true) } catch (e6) {}
      }

      try {
        extra.setPos(
          parent.getX() + (Math.random() - 0.5),
          parent.getY(),
          parent.getZ() + (Math.random() - 0.5)
        )
      } catch (e7) {}

      try { level.addFreshEntity(extra) } catch (e8) {
        return
        //console.log("[Bonus SPAWN] addFreshEntity failed err=" + e8)
      }
    }
  }
)
