class Board {
  constructor() {
    this.grid = [];
    for (var i = 0; i < 3; i++) {
      let row = [];
      for (var j = 0; j < 3; j++) {
        row.push(null);
      }
      this.grid.push(row);
    }
  }



  get(pos) {
    return this.grid[pos[0]][pos[1]];
  }

  set(pos, mark) {
    this.grid[pos[0]][pos[1]] = mark;
  }

  won(mark) {
    let hasWon = false;
    Board.winningSets.forEach(set => {
      let hasWonSet = true;
      set.forEach(pos => {
        if (this.get(pos) !== mark) hasWonSet = false;
      })
      if (hasWonSet) hasWon = true;
    })

    return hasWon;
  }

  over() {
    return this.won('x') || this.won('o') || this.full();
  }

  full() {
    for (var i = 0; i < 3; i++) {
      for (var j = 0; j < 3; j++) {
        if (this.get([i,j]) === null) {
          return false;
        }
      }
    }

    return true;
  }

  tied() {
    return !this.won('x') && !this.won('o');
  }

  validPos(pos) {
    return this.get(pos) === null;
  }

  render() {
    let renderString = '';
    for (var i = 0; i < 3; i++) {
      for (var j = 0; j < 3; j++) {
        let mark = this.get([i,j]);
        renderString += mark === null ? ' - ' : ` ${mark} `;
      }
      renderString += "\n";
    }

    console.log(renderString);
  }
}

Board.winningSets = [
  [[0,0], [0,1], [0,2]],
  [[1,0], [1,1], [1,2]],
  [[2,0], [2,1], [2,2]],
  [[0,0], [1,0], [2,0]],
  [[0,1], [1,1], [2,1]],
  [[0,2], [1,2], [2,2]],
  [[0,0], [1,1], [2,2]],
  [[0,2], [1,1], [2,0]]
];

module.exports = Board;
