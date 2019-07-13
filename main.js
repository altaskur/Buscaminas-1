window.onload = function() {
  game = new Game();
  game.startGame();
  game.makeArray();
  bomba = new Bomba();
  bomba.generarBomba();
};
