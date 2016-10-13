const readline = require('readline');

const reader = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

class Game {
  constructor() {
    this.stacks = [[3, 2, 1], [], []];
  }

  promptMove() {
    this.renderStacks();
    reader.question("Where would you like to move from and to (ex 0,2)? ",
      res => this.moveDisk(res));
  }

  moveDisk(moveString) {
    let move = moveString.split(',').map( el => parseInt(el) );
    if (this.validMove(move)) {
      this.stacks[move[1]].push(this.stacks[move[0]].pop());
      this.nextMove();
    } else {
      console.log("Invalid move!");
      this.promptMove();
    }
  }

  renderStacks() {
    let renderString = "";
    for (var i = 0; i < 3; i++) {
      for (var j = 0; j < 3; j++) {
        renderString += this.stacks[j].length >= (3 - i) ? ` + ` : '   ';
      }
      renderString += "\n";
    }
    renderString += ` _  _  _ `;
    console.log(renderString);
    console.log(this.stacks);
  }

  validMove(move) {
    let fromTower = this.stacks[move[0]];
    let toTower = this.stacks[move[1]];
    return fromTower.length > 0 && (toTower.length === 0 ||
      fromTower[fromTower.length - 1] < toTower[toTower.length - 1]);
  }

  gameOver() {
    return this.stacks[1].length === 3 || this.stacks[2].length === 3;
  }

  nextMove() {
    if (this.gameOver()) {
      this.renderStacks();
      reader.close();
    } else {
      this.promptMove();
    }
  }

  run() {
    // untill game over
      // render game
      // ask for move
      // make move
    this.promptMove();
  }
}

let game = new Game();
game.run();
