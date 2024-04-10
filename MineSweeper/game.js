let gametable = document.getElementById("gametable");
let flag = document.getElementById("placeFlag");
let result = document.getElementById("result");
console.log(gametable);
let globalclickedcount = 0;
result.innerHTML = "Good Luck";
let rows = 10;
let columns = 20;
let mines = 22;
let gamefinished = false;

const gamerows = [];
const gamecells = [];
let node;

for (let i = 0; i < rows; i++) {
  gamerows[i] = gametable.firstElementChild.appendChild(
    document.createElement("tr")
  );
  gamecells[i] = [];
  for (let j = 0; j < columns; j++) {
    gamecells[i][j] = gamerows[i].appendChild(document.createElement("td"));
    gamecells[i][j].isFlagged = false;
    gamecells[i][j].onclick = function () {
      flag.checked
        ? placeFlag(gamecells[i][j])
        : !gamecells[i][j].isFlagged
        ? checkMines(gamecells[i][j], i, j)
        : "";
    };
    gamecells[i][j].value = 0;
  }
}
for (let i = 0; i < mines; i++) {
  cellToMine =
    gamecells[Math.floor(Math.random() * rows)][
      Math.floor(Math.random() * columns)
    ];
  cellToMine.value === -1 ? i-- : (cellToMine.value = -1);
  console.log("Mine added");
}

function placeFlag(node) {
  if (node.isFlagged) {
    node.style.setProperty("background-color", "white");
    node.innerHTML = "";
  } else {
    node.style.setProperty("background-color", "gray");
    node.innerHTML = "&#127988";
  }
  node.isFlagged = !node.isFlagged;
}

function checkMines(node, posX, posY) {
  switch (node.value) {
    case -1:
      node.style.setProperty("background-color", "black");
      if (!gamefinished) {
        result.innerHTML = "You Lose";
        gamefinished = true;
      }
      result.style.setProperty("color", "red");
      revealAll();
      return;
    case 0:
      switch (checkSurroundings(node, posX, posY)) {
        case 0:
          node.style.setProperty("background-color", "aqua");
          node.onclick = "";
          clickSurroundings(node, posX, posY);
          break;
        case 1:
          node.style.setProperty("background-color", "yellow");
          break;
        case 2:
          node.style.setProperty("background-color", "orange");
          break;
        case 3:
          node.style.setProperty("background-color", "red");
          node.style.setProperty("color", "white");
          break;
        default:
          node.style.setProperty("background-color", "blue");
          node.style.setProperty("color", "white");
          break;
      }
      break;
  }
  node.onclick = "";
  globalclickedcount++;
  if (!gamefinished)
    if (globalclickedcount >= rows * columns - mines) {
      result.innerHTML = "You Win!!!";
      result.style.setProperty("color", "green");
      gamefinished = true;
    }
}

function checkSurroundings(node, posX, posY) {
  let count = 0;
  count += checkCell(posX - 1, posY - 1);
  count += checkCell(posX - 1, posY);
  count += checkCell(posX - 1, posY + 1);
  count += checkCell(posX, posY - 1);
  count += checkCell(posX, posY + 1);
  count += checkCell(posX + 1, posY - 1);
  count += checkCell(posX + 1, posY);
  count += checkCell(posX + 1, posY + 1);
  node.innerHTML = count;
  return count;
}
function checkCell(posX, posY) {
  if (posX < 0 || posX >= rows || posY < 0 || posY >= columns) return 0;
  else return gamecells[posX][posY].value === -1 ? 1 : 0;
}
function clickSurroundings(node, posX, posY) {
  for (let i = posX - 1; i <= posX + 1; i++)
    for (let j = posY - 1; j <= posY + 1; j++) {
      if (i >= 0 && i < rows && j >= 0 && j < columns) gamecells[i][j].click();
      console.log("Gamecell " + i + " " + j + " clicked!");
    }
}
function revealAll() {
  for (let i = 0; i < rows; i++)
    for (let j = 0; j < columns; j++) {
      if (i >= 0 && i < rows && j >= 0 && j < columns) {
        gamecells[i][j].click();
        gamecells[i][j].onclick = "";
      }
      console.log("Gamecell " + i + " " + j + " clicked!");
    }
}
