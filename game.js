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
    this.config = undefined;
    this.arr = [];
    this.zeros = [];
    this.visited = [];
  }
  startGame() {
    const customize = document.getElementById("customize");
    const customize_game = document.getElementById("customize-game");
    const start = document.getElementById("start");
    const button_start = document.getElementById("start-game");
    customize_game.addEventListener("click", () => {
      this.config = 1;
      console.log("click");
      console.log(this.config);
      if (this.config === 1) {
        customize.style = "display: block";
        button_start.style = "display: none";
        start.style = "display: none";
        this.customGame(customize);
      }
    });
    button_start.addEventListener("click", () => {
      const tablero = document.getElementById("tablero");
      tablero.style = "display: block";
      button_start.style = "display: none";
      start.style = "display: none";
      this.status++;
      this.time();
      this.makeArray();
      this.dibujarTablero();
    });
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
    window.zeros = this.zeros;
    window.visited = this.visited;
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
    // this.makeArryZeros();
    this.reveal();
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
    if (this.juego.rows < x) {
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
    let s = 1;
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
  test() {
    for (let i = 0; i < positions.length; i++) {
      console.log(positions[i].x);
      console.log(positions[i].y);
    }
  }
  /*
  revealZeros(e, x, y) {
    // this.zeros.push({ cord_x: x, cord_y: y });
    console.log("la x es " + x);
    console.log("la y es " + y);
    //FIRST ZERO:
    let get_x = parseInt(x);
    let get_y = parseInt(y);

    if (this.arr[get_x][get_y + 1] === 0) {
      this.zeros.push({ cord_x: get_x, cord_y: get_y + 1 });
    }
    if (this.arr[get_x][get_y - 1] === 0) {
      this.zeros.push({ cord_x: get_x, cord_y: get_y - 1 });
    }
    if (get_x > 0) {
      if (this.arr[get_x - 1][get_y] === 0) {
        this.zeros.push({ cord_x: get_x - 1, cord_y: get_y });
      }
      if (this.arr[get_x - 1][get_y + 1] === 0) {
        this.zeros.push({ cord_x: get_x - 1, cord_y: get_y + 1 });
      }
      if (this.arr[get_x - 1][get_y - 1] === 0) {
        this.zeros.push({ cord_x: get_x - 1, cord_y: get_y - 1 });
      }
    }
    if (get_x < 7) {
      if (this.arr[get_x + 1][get_y] === 0) {
        this.zeros.push({ cord_x: get_x + 1, cord_y: get_y });
      }
      if (this.arr[get_x + 1][get_y + 1] === 0) {
        this.zeros.push({ cord_x: get_x + 1, cord_y: get_y + 1 });
      }
      if (this.arr[get_x + 1][get_y - 1] === 0) {
        this.zeros.push({ cord_x: get_x + 1, cord_y: get_y - 1 });
      }
    }

    //for (let i = 0; i < this.zeros.length; i++) {
    // console.log("LONGITUD: " + this.zeros.length);
    //this.countZeros(e, get_x, get_y);
    //}
    this.countZeros(e, get_x, get_y, x, y);

    e.target.textContent = this.arr[x][y];
    e.target.classList += " revealed";
    const cols = document.getElementsByClassName("col");
    for (let i = 0; i < this.zeros.length; i++) {
      for (let j = 0; j < cols.length; j++) {
        let x1 = this.zeros[i].cord_x;
        let y1 = this.zeros[i].cord_y;
        let x2 = parseInt(cols[j].attributes[2].value);
        let y2 = parseInt(cols[j].attributes[3].value);
        if (x1 === x2 && y1 === y2) {
          cols[j].textContent = this.arr[x1][y1];
          cols[j].className += " revealed";
        }
      }
    }
  }
  countZeros(e, get_x, get_y, x, y) {
    console.log("Entro en contar 0");
    let count = 0;
    for (let j = 0; j < this.zeros.length; j++) {
      var get_x = this.zeros[j].cord_x;
      var get_y = this.zeros[j].cord_y;
      if (this.checkNewZero(get_x, get_y)) {
        console.log("true");
      } else {
        if (this.arr[get_x][get_y + 1] === 0) {
          this.zeros.push({ cord_x: get_x, cord_y: get_y + 1 });
          console.log("hago push");
          count += 1;
        }
        if (this.arr[get_x][get_y - 1] === 0) {
          this.zeros.push({ cord_x: get_x, cord_y: get_y - 1 });
          console.log("hago push");
          count += 1;
        }
        if (get_x > 0) {
          if (this.arr[get_x - 1][get_y] === 0) {
            this.zeros.push({ cord_x: get_x - 1, cord_y: get_y });
            console.log("hago push");
            count += 1;
          }
          if (this.arr[get_x - 1][get_y + 1] === 0) {
            this.zeros.push({ cord_x: get_x - 1, cord_y: get_y + 1 });
            console.log("hago push");
            count += 1;
          }
          if (this.arr[get_x - 1][get_y - 1] === 0) {
            this.zeros.push({ cord_x: get_x - 1, cord_y: get_y - 1 });
            console.log("hago push");
            count += 1;
          }
        }
        if (get_x < 7) {
          if (this.arr[get_x + 1][get_y] === 0) {
            this.zeros.push({ cord_x: get_x + 1, cord_y: get_y });
            console.log("hago push");
            count += 1;
          }
          if (this.arr[get_x + 1][get_y + 1] === 0) {
            this.zeros.push({ cord_x: get_x + 1, cord_y: get_y + 1 });
            console.log("hago push");
            count += 1;
          }
          if (this.arr[get_x + 1][get_y - 1] === 0) {
            this.zeros.push({ cord_x: get_x + 1, cord_y: get_y - 1 });
            console.log("hago push");
            count += 1;
          }
        }
      }
    }
    for (let i = 0; i < this.zeros.length; i++) {
      if (i === this.zeros.length) {
        console.log("Hago BREAK");
        break;
      } else {
        this.countZeros(e, get_x, get_y, x, y);
      }
    }

    console.log("EL count es:" + count);
  }
  checkNewZero(x, y) {
    for (let i = 0; i < this.zeros.length; i++) {
      if (x === this.zeros[i].cord_x && y === this.zeros[i].cord_y) {
        console.log("Ya esta dentro");
        return true;
      }
    }
  }
  */
  /*
  makeArryZeros() {
    for (let i = 0; i < this.juego.rows; i++) {
      this.visited.push([]);
      for (let j = 0; j < this.juego.cols; j++) {
        this.visited[i].push(true);
      }
    }
  }
  revealZeros(x, y) {
    if (this.visited[x][y]) {
      this.visited[x][y] = false;
      if (x >= 0) {
        if (this.juego.rows < x) {
          if (this.arr[x][y] === 0) {
            console.log("ENTRO 0");
            this.revealZeros(x - 1, y);
            console.log("ENTRO 1");
            this.revealZeros(x - 1, y - 1);
            console.log("ENTRO 2");
            this.revealZeros(x - 1, y + 1);
            this.revealZeros(x + 1, y);
            this.revealZeros(x + 1, y - 1);
            this.revealZeros(x + 1, y + 1);
            this.revealZeros(x, y - 1);
            this.revealZeros(x, y + 1);
            this.draw(x, y);
          }
        }
      }
    }
  }
  draw(x, y) {
    let cols = document.getElementsByClassName("cols");
    for (let i = 0; i < cols.length; i++) {
      let x2 = parseInt(cols[i].attributes[2].value);
      let y2 = parseInt(cols[i].attributes[3].value);
      if (x === x2 && y === y2) {
        cols[i].textContent = this.arr[x][y];
        cols[i].className += " revealed";
      }
    }
  }
  */
  customGame(customize) {
    const game_custom = document.getElementById("game-custom");
    const tablero = document.getElementById("tablero");
    const input_rows = document.getElementById("input-rows");
    const input_cols = document.getElementById("input-cols");
    const input_bombs = document.getElementById("input-bombs");

    game_custom.addEventListener("click", e => {
      customize.style = "display: none";
      tablero.style = "display: block";
      this.juego.rows = input_rows.value;
      this.juego.cols = input_cols.value;
      this.juego.mines = input_bombs.value;
      console.log("rows" + this.juego.rows);
      console.log(this.juego.cols);
      console.log(this.juego.mines);
      this.status++;
      this.time();
      this.makeArray();
      this.dibujarTablero();
    });
  }
}
