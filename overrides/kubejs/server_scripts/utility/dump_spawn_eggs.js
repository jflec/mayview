// // kubejs/server_scripts/utility/dump_spawn_eggs.js

// let dump = false;

// ServerEvents.tick((event) => {
//   if (dump) return;
//   dump = true; // run once

//   console.info("=== Spawn Egg Dump Start ===");

//   const itemReg = event.server
//     .registryAccess()
//     .registryOrThrow("minecraft:item");

//   itemReg.keySet().forEach((id) => {
//     const s = id.toString();
//     if (s.includes("_spawn_egg")) {
//       console.info(s);
//     }
//   });

//   console.info("=== Spawn Egg Dump End ===");
// });
