// const readline = require('readline');
//
// const reader2 = readline.createInterface({
//   input: process.stdin,
//   output: process.stdout,
//   terminal: false
// });

const Towers = require('./towers-of-hanoi');

let towers = new Towers(completionCB);

// let ttt = new TTT(completionCB);

function completionCB(r, gameCallBack) {
  r.question("Do you want to play? ", res =>{
    if (res === 'yes') {
      gameCallBack();
    } else {
      console.log('Goodbye');
      r.close();
    }
  });
}

towers.run();
