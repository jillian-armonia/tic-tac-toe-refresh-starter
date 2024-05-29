const Screen = require("./screen");
const Cursor = require("./cursor");

class TTT {

  constructor() {

    this.playerTurn = "O";

    this.grid = [[' ',' ',' '],
                 [' ',' ',' '],
                 [' ',' ',' ']]

    this.cursor = new Cursor(3, 3);

    // Initialize a 3x3 tic-tac-toe grid
    Screen.initialize(3, 3);
    Screen.setGridlines(true);

    // Replace this with real commands
    Screen.addCommand('up', 'move up', this.cursor.up.bind(this.cursor));
    Screen.addCommand('down', 'move down', this.cursor.down.bind(this.cursor));
    Screen.addCommand('left', 'move left', this.cursor.left.bind(this.cursor));
    Screen.addCommand('right', 'move right', this.cursor.right.bind(this.cursor));
    Screen.addCommand('return', 'place move', this.placeMove.bind(this));

    this.cursor.setBackgroundColor();
    Screen.render();
  }

  //Create a method to place a move
  placeMove(){


    if (this.playerTurn === "O" && this.grid[this.cursor.row][this.cursor.col] === ' '){
      Screen.setGrid(this.cursor.row, this.cursor.col, this.playerTurn);
      this.grid[this.cursor.row][this.cursor.col] = this.playerTurn;
      this.cursor.resetBackgroundColor();

      this.playerTurn = "X";
      this.cursor.cursorColor = "magenta";
      this.cursor.row = 0;
      this.cursor.col = 0;
      this.cursor.setBackgroundColor();

      if (TTT.checkWin(this.grid) === false){
        Screen.render();
      } else {
        TTT.endGame(TTT.checkWin(this.grid));
        Screen.render();
      }

      Screen.render();
    } else if (this.playerTurn === "X" && this.grid[this.cursor.row][this.cursor.col] === ' '){
      Screen.setGrid(this.cursor.row, this.cursor.col, this.playerTurn);
      this.grid[this.cursor.row][this.cursor.col] = this.playerTurn;
      this.cursor.resetBackgroundColor();

      this.playerTurn = "O";
      this.cursor.cursorColor = "yellow";
      this.cursor.row = 0;
      this.cursor.col = 0;
      this.cursor.setBackgroundColor();


      if (TTT.checkWin(this.grid) === false){
        Screen.render();
      } else {
        TTT.endGame(TTT.checkWin(this.grid));
        Screen.render();
      }


    }
  }


  static checkWin(grid) {
    //1. Loop through the grid by rows and check if there are consecutive symbols that fill up from start to end
    const checkX = box => box === 'X';
    const checkO = box => box === 'O';
    const checkEmpty = box => box === ' ';

    for (let i = 0; i < grid.length; i++){
      let row = grid[i];

      if (row.every(checkX)){
        return 'X';
      } else if (row.every(checkO)){
        return 'O';
      }
    }


      //2. If there are no row wins, check the columns if there is a completed row
      //2a. Loop through the rows the values of each column
      let column0 = [];
      let column1 = [];
      let column2 = [];

      grid.forEach(row => {
        for (let i = 0; i < row.length; i++){
          let column = row[i];

          switch (i){
            case 0:
              column0.push(column);
              break;
            case 1:
              column1.push(column);
              break;
            case 2:
              column2.push(column);
              break;
          }
        }
      })

      if (column0.every(checkX) || column1.every(checkX) || column2.every(checkX)){
        return 'X';
      } else if (column0.every(checkO) || column1.every(checkO) || column2.every(checkO)){
        return 'O';
      }

    //3. If there are no column wins either, check the diagonal lines if there is a completed line

    for (let i = 0; i < grid.length; i++){
      for (let j = 0; j < grid[i].length; j++){
        let diagonal1 = [grid[0][0], grid[1][1], grid[2][2]];
        let diagonal2 = [grid[0][2], grid[1][1], grid[2][0]];

        if (diagonal1.every(checkX) || diagonal2.every(checkX)){
          return 'X';
        } else if (diagonal1.every(checkO) || diagonal2.every(checkO)){
          return 'O';
        }
      }
    }

    // Return 'X' if player X wins
    // Return 'O' if player O wins
    // Return 'T' if the game is a tie
      if (!grid[0].some(checkEmpty) && !grid[1].some(checkEmpty) && !grid[2].some(checkEmpty)){
        return 'T';
      } else {
        return false;
      }

    // Return false if the game has not ended
  }

  static endGame(winner) {
    if (winner === 'O' || winner === 'X') {
      Screen.setMessage(`Player ${winner} wins!`);
    } else if (winner === 'T') {
      Screen.setMessage(`Tie game!`);
    } else {
      Screen.setMessage(`Game Over`);
    }
    Screen.render();
    Screen.quit();
  }

}

module.exports = TTT;
