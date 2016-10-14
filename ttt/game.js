const Board = require('./board');

const readline = require('readline');

const reader = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false
});

class Game {
  constructor(completionCB = () => console.log("Goodbye");) {
    this.currentMark = 'x';
    this.board = new Board();
    this.completion = completionCB;
  }

  run() {
    this.board = new Board();
    this.promptMove();
  }

  promptMove() {
    this.board.render();
    reader.question(`${this.currentMark}'s turn: Where would to move? `, pos => this.makeMove(pos));
  }

  makeMove(pos) {
    pos = this.parseMove(pos);
    if (this.board.validPos(pos)) {
      this.board.set(pos, this.currentMark);
      this.nextMove();
    } else {
      console.log("Invalid move");
      this.promptMove();
    }
  }

  nextMove() {
    if (this.board.over()) {
      this.board.render();
      if (this.board.tied()) {
        console.log('Tied Game!');
      } else {
        console.log(`${this.currentMark} has won!`);
      }
      this.completion(reader, this.run.bind(this));
    } else {
      this.switchPlayers();
      this.promptMove();
    }
  }

  parseMove(posString) {
    return posString.split(',').map( el => parseInt(el) );
  }

  switchPlayers() {
    if (this.currentMark === 'x'){
      this.currentMark = 'o';
    } else {
      this.currentMark = 'x';
    }
  }
}

module.exports = Game;
