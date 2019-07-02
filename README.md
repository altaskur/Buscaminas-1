# Buscaminas

## Description

El juego es un clon del clásico buscaminas, que su objetivo principal es despejar un campo de minas sin explotar ninguna.

## MVP (DOM - CANVAS)

MVP: DIbujar una tabla de 10 x 10 donde se vayan descubriendo las casillas, poner bombas, indicar distancia de bombas y pantalla de inicio y final.

He decidido estructurar el juego con DOM.

## Backlog

- Poner diferentes niveles
- Poner puntuación
- Multijugador
- Booster

## Data structure


```javascript
class Game {
  property,
  method()
}
```

- Clase juego(Pausa, inicio, final)
  -- Inicio, final, dibujar tablero
- Clase bomba(anchura, rango de explosión, bombas en la partida)
  -- colocar bomba, comprobar explosion, poner bombas en el tablero
- Clase jugador(Vidas, puntuación, nivel)
  -- puntuacion, nivel
- Clase booster(boosters en la partida, duracion)
  -- Añadir vida extra, si toco una bomba no muera.

## States y States Transitions

Definition of the different states and their transition (transition functions)

- splashScreen
- gameScreen
- gameoverScreen
- winScreen

## Task

Crear la clase juego y jugador, dibujar la tabla en la pantalla, añadir las casillas. Comprobar como de cerca estas de una bomba, si hay una bomba en la casilla que he pulsado que se acabe el juego. Añadir puntuación, añadir booster.

## Links

### Trello

[Link url](https://trello.com/b/vWeldmEq/juego-modulo1)

### Git

URls for the project repo and deploy
[Link Repo](https://github.com/bypepe77/Buscaminas)
[Link Deploy](http://github.com)

### Slides

URls for the project presentation (slides)
[Link Slides.com](http://slides.com)
