
const difficultyOptions = {
    easy: [10, 10, 15],
    medium: [15, 15, 17],
    hard: [20, 20, 20],
    custom: [20, 20, 15]
}

const difficultySelected = difficultyOptions.medium

const totalCells = (difficultySelected[0] * difficultySelected[1])
const bombsPositions = [];
const totalBombs = Math.floor((totalCells * difficultySelected[2]) / 100);
const cleanCells = totalCells - totalBombs;
// console.log("toma las bombas: " + totalBombs)
let totalFlags = totalBombs;
let gameStatus = false;

const table = document.querySelector("table");
const tableBombs = document.querySelector("div.total-bombs").querySelector("p").textContent = totalBombs + "💣";

// console.log(totalCells + " " + totalBombs + " " + cleanCells);

function buildBoard() {
    for (i = 0; i < difficultySelected[0]; i++) {
        const row = document.createElement("tr");
        for (j = 0; j < difficultySelected[1]; j++) {
            const column = document.createElement("td");
            column.classList.add("ux-undiscovered")
            row.appendChild(column);

            column.addEventListener('click', (event) => {

                const position = getPosition(event.target);
                const imBomb = checkBomb(position)
                column.classList.remove("ux-undiscovered");
                column.classList.add("ux-discovered")
                if (!imBomb) {
                    const bombsAround = checkBombsAround(position);
                    if (bombsAround != 0) {
                        event.target.innerText = bombsAround;
                    }

                    if (event.button == 2) {
                        changeCell(event)
                    }
                } else {
                    event.target.innerText = "💣";
                    const modal = document.querySelector('.modal');
                    modal.classList.remove('hidden');
                    modal.classList.add('show');
                }
            });

        }
        table.style.width = difficultySelected[0] * 20;
        table.appendChild(row)
    }
}

function placeMine() {

    for (let index = 0; index < totalBombs; index++) {

        let aleatoryRow = Math.floor(Math.random() * difficultySelected[0]);
        let aleatoryCell = Math.floor(Math.random() * difficultySelected[1]);

        bombsPositions.forEach(function (mine) {
            if (mine[0] === aleatoryRow && mine[1] === aleatoryCell) {
                aleatoryRow = Math.floor(Math.random() * difficultySelected[0]);
                aleatoryCell = Math.floor(Math.random() * difficultySelected[1]);
            }
        });
        bombsPositions.push([aleatoryRow, aleatoryCell]);
    }
}

function getPosition(element) {
    const row = element.parentNode.rowIndex;
    const cell = element.cellIndex;
    const position = [row, cell]
    return position;
}

function checkBomb(position) {
    const row = position[0];
    const cell = position[1];
    let result = false;

    bombsPositions.forEach(bombPosition => {

        if (bombPosition[0] == row && bombPosition[1] == cell) {
            result = true;
        }
    });

    return result;
}

function checkBombsAround(position) {
    let row = position[0];
    const cell = position[1];

    let bombsCounter = 0;

    const rows = [row + 1, row, row - 1];
    const cells = [cell + 1, cell, cell - 1]

    // recorremos las filas
    for (iRow = 0; iRow <= 2; iRow++) {
        for (iCell = 0; iCell <= 2; iCell++) {
            let position = [rows[iRow], cells[iCell]];
            // console.log("checkeando fila " + rows[iRow])
            // console.log("check celda " + cells[iCell])
            // console.log(position)
            // console.log(checkBomb(position))
            if (checkBomb(position)) {
                // console.log(" hay una bomba")
                bombsCounter++;
            }
        }
    }
    return bombsCounter;
}


function isInBoard(position) {
    const row = position[0].rowIndex;
    const cell = position[1].cellIndex;
    let result = true;
    if (row != undefined && cell != undefined) {
        if ((row > difficultySelected[0] - 1) && (cell > difficultySelected[1] - 1)) {
            result = false;
        }
    }

    return result
}

function autoDiscoverSelf(position) {
    if (checkBombsAround(position)) {

    }
}

function backToTheFuture() {
    document.querySelector("div.home").addEventListener('click', () => {
        window.location.href = "./";
    })
    document.querySelector("input").addEventListener('click', () => {
        window.location.href = "./";
    })
}
let seconds = 0;
let minutes = 0;
let gameSeconds = 0
let totalTime = 0;
setInterval(timer, 1000);
function timer() {
    gameSeconds++;
    seconds++;
    if (seconds == 60) {
        seconds = 0;
        minutes++;
    }

    const totalSeconds = seconds < 10 ? ("0" + seconds) : seconds;
    const totalMinutes = minutes < 10 ? ("0" + minutes) : minutes;
    const timeParsed = totalMinutes + ":" + totalSeconds;

    document.querySelector("div.timer").querySelector("p").textContent = timeParsed;
}

// console.log(bombsPositions)
//
function changeCell(element) {
    if (element.classList.contains("ux-undiscovered")) {
        if (element.target.textContent == "") {
            element.target.textContent = "🚩"
        } if (element.target.textContent == "🚩") {
            element.target.textContent = "❓"
        } else if (element.target.textContent == "❓") {
            element.target.textContent = "";
        }
    }
}

buildBoard()
placeMine()
timer();
backToTheFuture()