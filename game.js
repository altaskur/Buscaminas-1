class Game {
  constructor(options) {
    this.status = 0;
    this.casillas = 64;
  }
  comprobarEstadoPartida() {
    if (this.status === 0) {
      const button_start = document.getElementById("start-game");
      button_start.addEventListener("click", () => {
        const tablero = document.getElementById("tablero");
        tablero.style = "display: block";
        button_start.style = "display: none";
        this.status++;
        this.dibujarTablero();
      });
    }
  }
  dibujarTablero() {
    let tablero = document.getElementById("tablero");
    let button_start = document.getElementById("start-game");
    for (let i = 0; i < this.casillas; i++) {
      const table = document.createElement("p");
      table.className = "section";
      table.innerHTML = `
        casilla
      `;
      tablero.appendChild(table);
    }
    this.girarCasilla();
  }
  girarCasilla() {
    const casilla = document.getElementsByClassName("section");
    for (let i = 0; i < casilla.length; i++) {
      casilla[i].addEventListener("click", function() {
        casilla[i].innerHTML = "PUM!";
      });
    }
  }
}
