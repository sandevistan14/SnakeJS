let interval;
let directionSnake = "left";
let Matrice = [];
let Snake = [[10, 20], [10, 21], [10, 22], [10, 23]];
let score = 0;

function Main() {
    Matrice = InitMatrice(20, 30);
    SetSnake();
    genereApple();
    CreateViewMatrice(Matrice);
    ColorMatrice(Matrice);
    interval = setInterval(GameLoop, 80);
}

function InitMatrice(rows, columns) {
    return new Array(rows).fill(0).map(() => new Array(columns).fill(0));
}

function CreateViewMatrice(Matrice) {
    for (let i = 0; i < Matrice.length; i++) {
        let row = document.createElement("div");
        row.classList.add("row");
        for (let j = 0; j < Matrice[i].length; j++) {
            let cell = document.createElement("div");
            cell.classList.add("cell");
            row.appendChild(cell);
        }
        document.getElementById("Matrice").appendChild(row);
    }
}

function SetSnake() {
    for (let i = 0; i < Snake.length; i++) {
        Matrice[Snake[i][0]][Snake[i][1]] = 3;
    }
}

function ColorMatrice(Matrice) {
    const rows = document.getElementsByClassName("row");
    for (let i = 0; i < Matrice.length; i++) {
        const cells = rows[i].getElementsByClassName("cell");
        for (let j = 0; j < Matrice[i].length; j++) {
            if (Matrice[i][j] === 1) {
                color(cells[j], "red");
            } else if (Matrice[i][j] === 2) {
                color(cells[j], "blue");
            } else if (Matrice[i][j] === 3) {
                color(cells[j], "green");
            } else if (Matrice[i][j] === 4) {
                color(cells[j], "yellow");
            } else {
                color(cells[j], "#B6B3B3A1");
            }
        }
    }
}

function color(element, color) {
    element.style.backgroundColor = color;
}

function GameLoop() {
    MoveSnake();
    ColorMatrice(Matrice);
}

document.addEventListener('keydown', function(event) {
    switch(event.key) {
        case 'ArrowLeft':
            if (directionSnake !== "right")
                directionSnake = "left";
                break;
        case 'ArrowRight':
            if (directionSnake !== "left")
                directionSnake = "right";
                break;
        case 'ArrowUp':
            if (directionSnake !== "down")
                directionSnake = "up";
                break;
        case 'ArrowDown':
            if (directionSnake !== "up")
                directionSnake = "down";
                break;
        default:
            break;
    }
});

function MoveSnake() {
    let newHead = [Snake[0][0], Snake[0][1]];

    if (directionSnake === "right") {
        newHead[1] += 1;
    } else if (directionSnake === "left") {
        newHead[1] -= 1;
    } else if (directionSnake === "up") {
        newHead[0] -= 1;
    } else if (directionSnake === "down") {
        newHead[0] += 1;
    }

    Verifmort(newHead);
    Snake.unshift(newHead);

    if (Matrice[newHead[0]][newHead[1]] === 1) {
        Matrice[newHead[0]][newHead[1]] = 0;
        UpScore();
        genereApple();
    } else {
        Matrice[Snake[Snake.length - 1][0]][Snake[Snake.length - 1][1]] = 0;
        Snake.pop();
    }

    Matrice[Snake[0][0]][Snake[0][1]] = 4;
    for (let i = 1; i < Snake.length; i++) {
        Matrice[Snake[i][0]][Snake[i][1]] = 3;
    }

}

function Verifmort(newHead){
    if (newHead[0] < 0 || newHead[0] >= Matrice.length || newHead[1] < 0 || newHead[1] >= Matrice[0].length) {
        clearInterval(interval);
        alert("Game Over");
        window.location.replace("../index.html");
    }
    for (let i = 1; i < Snake.length; i++) {
        if (newHead[0] === Snake[i][0] && newHead[1] === Snake[i][1]) {
            clearInterval(interval);
            alert("Game Over");
            window.location.replace("../index.html");
        }
    }
}

function genereApple() {
    let x = Math.floor(Math.random() * 20);
    let y = Math.floor(Math.random() * 30);
    while (Matrice[x][y] !== 0) {
        x = Math.floor(Math.random() * 20);
        y = Math.floor(Math.random() * 30);
    }
    Matrice[x][y] = 1;
}

function UpScore() {
    score += 1;
    document.getElementById("score").innerText = score;
}

let startX, startY;

document.addEventListener('touchstart', function(event) {
    startX = event.touches[0].clientX;
    startY = event.touches[0].clientY;
});

document.addEventListener('touchmove', function(event) {
    event.preventDefault(); // Empêche le défilement pendant le glissement
    let endX = event.touches[0].clientX;
    let endY = event.touches[0].clientY;

    let deltaX = endX - startX;
    let deltaY = endY - startY;

    if (Math.abs(deltaX) > Math.abs(deltaY)) {
        // Déplacement horizontal
        if (deltaX > 0 && directionSnake !== "left") {
            directionSnake = "right";
        } else if (deltaX < 0 && directionSnake !== "right") {
            directionSnake = "left";
        }
    } else {
        // Déplacement vertical
        if (deltaY > 0 && directionSnake !== "up") {
            directionSnake = "down";
        } else if (deltaY < 0 && directionSnake !== "down") {
            directionSnake = "up";
        }
    }

    startX = endX;
    startY = endY;
});

document.addEventListener('touchend', function(event) {
    // Réinitialiser les positions de départ
    startX = null;
    startY = null;
    event.preventDefault(); // Empêche le défilement après le relâchement du toucher

});


