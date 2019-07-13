class Game {
  constructor() {
    this.status = 0;
    this.juego = {
      cols: 8,
      rows: 8,
      mines: 8
    };
    this.over = undefined;
    this.win = undefined;
    this.arr = [];
  }
  makeArray() {
    for (let i = 0; i < this.juego.rows; i++) {
      this.arr.push([]);
      for (let j = 0; j < this.juego.cols; j++) {
        this.arr[i].push(0);
      }
    }
    this.getBomb();

    window.arr = this.arr;
  }
  dibujarTablero() {
    this.getCountBombs();
    const tablero = document.getElementById("tablero");
    for (let i = 0; i < this.arr.length; i++) {
      const row = document.createElement("div");
      row.className = "row";
      row.id = "row";
      for (let j = 0; j < this.arr.length; j++) {
        const cols = document.createElement("div");
        cols.className = "col";
        cols.id = "col";
        cols.setAttribute("x", i);
        cols.setAttribute("y", j);
        cols.setAttribute("bombsCount", this.arr[i][j]);
        if (this.arr[i][j] === "B") {
          console.log("bomba " + i + "-" + j);
          cols.className += " b";
        } else {
        }

        row.appendChild(cols);
      }
      tablero.appendChild(row);
    }
    this.reveal();
  }
  startGame() {
    if (this.status === 0) {
      const button_start = document.getElementById("start-game");
      button_start.addEventListener("click", () => {
        const tablero = document.getElementById("tablero");
        tablero.style = "display: block";
        button_start.style = "display: none";
        this.status++;
        this.time();
        this.dibujarTablero();
      });
    }
  }
  reveal() {
    const tablero = document.getElementById("tablero");
    tablero.addEventListener("click", e => {
      console.log(e);
      console.log("click", e.target);
      let x = e.target.attributes[2].value;
      let y = e.target.attributes[3].value;
      console.log(this.arr[x][y]);
      if (this.checkBomb(e)) {
      } else {
        const cols = document.getElementsByClassName("col");
        e.target.textContent = this.arr[x][y];
        e.target.classList += " revealed";
      }
    });
  }
  gameOver() {
    let message;
    if (this.win === 1) {
      message = "YOU WIN";
    } else if (this.over === 1) {
      message = "YOU LOST";
      const tablero = document.getElementById("tablero");
      tablero.style = "display: none";
      const lost = document.getElementById("lost");
      lost.style = "display: block";
    }
    // console.log(message);
  }
  getBomb() {
    for (let i = 0; i < this.juego.mines; i++) {
      let randomX = Math.floor(Math.random() * this.juego.rows);
      let randomY = Math.floor(Math.random() * this.juego.cols);
      if (this.arr[randomX][randomY] !== "B") {
        this.arr[randomX][randomY] = "B";
      }
    }
    // console.log(this.arr);
  }
  getCountBombs() {
    const bomba = document.getElementsByClassName("bomba");
    const col = document.getElementsByClassName("col");
    const tablero = document.getElementById("tablero");
    // console.log(col);
    for (let x = 0; x < this.arr.length; x++) {
      for (let y = 0; y < this.arr.length; y++) {
        console.log(`estoy en x: ${x} y:${y}`);
        if (this.arr[x][y] !== "B") {
          this.arr[x][y] = this.count(x, y);
        }
      }
    }
    // console.log(this.arr);
  }
  count(x, y) {
    let count = 0;
    // console.log(this.arr[x + 1][y]);

    if (this.arr[x][y + 1] === "B") {
      console.log(
        `compruebo en x: ${x} y:${y + 1} tiene ${this.arr[x][y + 1]}`
      );
      count += 1;
    }
    if (this.arr[x][y - 1] === "B") {
      console.log(
        `compruebo en x: ${x} y:${y - 1} tiene ${this.arr[x][y - 1]}`
      );
      count += 1;
    }
    if (x > 0) {
      if (this.arr[x - 1][y] === "B") {
        count += 1;
      }
      if (this.arr[x - 1][y + 1] === "B") {
        count += 1;
      }
      if (this.arr[x - 1][y - 1] === "B") {
        count += 1;
      }
    }
    if (x < 7) {
      if (this.arr[x + 1][y] === "B") {
        console.log(
          `compruebo en x: ${x + 1} y:${y} tiene ${this.arr[x + 1][y]}`
        );
        count += 1;
      }
      if (this.arr[x + 1][y + 1] === "B") {
        count += 1;
      }
      if (this.arr[x + 1][y - 1] === "B") {
        count += 1;
      }
    }
    return count;
  }
  checkBomb(e) {
    const x = e.target.attributes[2].value;
    const y = e.target.attributes[3].value;
    if (this.arr[x][y] === "B") {
      console.log("BOMBA");
      this.over = 1;
      this.gameOver();
    }
  }
  time() {
    let s = 0;
    let m = 0;
    const p_minutes = document.getElementById("minutes");
    const p_seconds = document.getElementById("seconds");
    const times = document.getElementById("time");
    times.style = "display: block";
    //times.style = "display: block";

    let game_time = setInterval(() => {
      if (s === 60) {
        s = 0;
        m++;
        p_minutes.innerHTML = m + " Minutes";
      }
      if (m === 60) {
        m = 0;
      }
      p_seconds.innerHTML = s + " Seconds";
      s++;
      if (this.over === 1) {
        clearInterval(game_time);
      }
    }, 1000);
  }
}
