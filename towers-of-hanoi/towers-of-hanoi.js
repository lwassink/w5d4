const readline = require('readline');

const reader = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false
});

class Game {
  constructor(completion = () => console.log('Goodby')) {
    this.completion = completion;
    // this.stacks = [[1], [3, 2], []];
  }

  promptMove() {
    this.renderStacks();
    reader.question("Where would you like to move from and to (ex 0,2)? ",
      res => this.moveDisk(res));
  }

  moveDisk(moveString) {
    let move = moveString.split(',').map( el => parseInt(el) );
    console.log(moveString);
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
    if (fromTower === undefined) return false;
    return fromTower.length > 0 && (toTower.length === 0 ||
      fromTower[fromTower.length - 1] < toTower[toTower.length - 1]);
  }

  gameOver() {
    return this.stacks[1].length === 3 || this.stacks[2].length === 3;
  }

  nextMove() {
    if (this.gameOver()) {
      this.renderStacks();
      this.completion(reader, this.run.bind(this));
    } else {
      this.promptMove();
    }
  }

  resetStacks() {
    this.stacks = [[1], [3, 2], []];
  }

  run() {
    // this.completion = completionCallback;
    this.resetStacks();

    this.promptMove();
  }
}

// let game = new Game();
// game.run();
module.exports = Game;
