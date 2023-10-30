const container = document.querySelector(".container");
const play = document.querySelector("button");
const level = document.getElementById("mySelect");
const introHtml = document.getElementById(".intro");

let width = "cell10";
let totOfCell = 100;
let score = 0;
let maxClick = 0;
let bombArray = [];
let gameOver = false;

play.addEventListener("click", function()
{
    switch (level.selectedIndex) {
        case 0:
            width = "cell10";
            totOfCell = 100;
            break;
        case 1:
            width = "cell9";
            totOfCell = 81;
            break;
        case 2:
            width = "cell7";
            totOfCell = 49;
            break;
    };

    gameOver = false;

    maxClick = totOfCell - 16;

    newGrid(width, totOfCell, container);

    randomArray(totOfCell);

    console.log(bombArray);
}
// , {once : true}
);

// FUNCTIONS

function newGrid(width, totOfCell, container) {
    container.innerHTML = "";
    for (let i = 1; i < totOfCell + 1; i++) {
        const newCell = createGrid([i], width);
        newCell.addEventListener("click", onClick)
        container.append(newCell);
    }
}

function createGrid(numberOfCells, string) {
    const cell = document.createElement("div");
    cell.classList.add(string);
    cell.innerHTML = numberOfCells;
    return cell;
}

function onClick() {
    if(!gameOver) {
        const textCell = parseInt(this.textContent);
    if (bombArray.includes(textCell)) {
        console.log("Hai beccato una bomba!");
        console.log("il tuo punteggio è di: ", score);
        this.classList.add("bomb");
        gameOver = true;
        // this.removeEventListener("click", onClick);
    } else {
        this.classList.add("afterClick");
        score ++;
        console.log("il tuo punteggio è di: ", score);
    }
    if(score == maxClick) {
        container.innerHTML = "";
        container.innerHTML = `<h1>Complimenti, hai concluso il livello con ${score} punti<h1>`;
        gameOver = true;
    }
    console.log(score);
    return score;
    }    
}

function randomNum(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomArray(max) {
    bombArray = [];
    while (bombArray.length < 16) {
        const randomN = randomNum(1, max);
        if (!bombArray.includes(randomN)) {
            bombArray.push(randomN);
        }
    }
    return bombArray;
}