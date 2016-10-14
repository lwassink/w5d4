// const readline = require('readline');
//
// const reader2 = readline.createInterface({
//   input: process.stdin,
//   output: process.stdout,
//   terminal: false
// });

const TTT = require('./game');

let ttt = new TTT(completionCB);

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

ttt.run();
