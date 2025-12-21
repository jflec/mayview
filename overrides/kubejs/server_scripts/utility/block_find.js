// // kubejs/server_scripts/log_block_above.js

// BlockEvents.rightClicked((event) => {
//   const { player, level, block } = event;
//   if (!player || player.isFake()) return;
//   if (level.isClientSide()) return;

//   const pos = block.pos; // has x/y/z

//   // Get the block one block above
//   const above = level.getBlock(pos.x, pos.y + 1, pos.z);

//   console.log(`Clicked: ${block.id}`);
//   console.log(`Above: ${above.id}`);
// });
