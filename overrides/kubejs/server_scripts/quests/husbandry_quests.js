const TASK_ID = "58871EA8BAAA7528";
const REQUIRED = 5;

const ServerPlayer = Java.loadClass("net.minecraft.server.level.ServerPlayer");

FTBQuestsEvents.customTask(TASK_ID, (event) => {
  event.maxProgress = REQUIRED;
});

NativeEvents.onEvent(
  "net.neoforged.neoforge.event.entity.living.BabyEntitySpawnEvent",
  (event) => {
    const player = event.getCausedByPlayer();
    if (!player) return;

    if (!(player instanceof ServerPlayer)) return;

    if (event.isCanceled && event.isCanceled()) return;

    FTBQuests.getServerDataFromPlayer(player).addProgress(TASK_ID, 1);
  }
);
