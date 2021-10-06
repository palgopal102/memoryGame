const gameContainer = document.getElementById("game");

let cardCount = 12;
const cards = [
  "./gifs/1.gif",
  "./gifs/2.gif",
  "./gifs/3.gif",
  "./gifs/4.gif",
  "./gifs/5.gif",
  "./gifs/6.gif",
  "./gifs/1.gif",
  "./gifs/2.gif",
  "./gifs/3.gif",
  "./gifs/4.gif",
  "./gifs/5.gif",
  "./gifs/6.gif",
];
function shuffle(array) {
  let counter = array.length;

  while (counter > 0) {
    let index = Math.floor(Math.random() * counter);

    counter--;

    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }

  return array;
}

let shuffleCards = shuffle(cards);

let bestScore = localStorage.getItem(`bestScore`);
if (bestScore) {
  document.getElementById("score").innerHTML = `Best Score: ${bestScore}`;
} else {
  document.getElementById("score").innerHTML = `Best Score: --`;
}
document.getElementById("move").innerHTML = `Moves: 0`;
createDivsForColors(shuffleCards);

function createDivsForColors(shuffleCards) {
  let count = 1;
  for (let card of shuffleCards) {
    const newDiv = document.createElement("div");

    newDiv.classList.add(card);

    newDiv.setAttribute("id", count);

    count += 1;
    newDiv.addEventListener("click", handleCardClick);

    gameContainer.append(newDiv);
  }
}

function handleCardClick(event) {
  divClick(event.target.id, event.target.className);
}

function select() {
  let firstCard = null;
  let firstId = null;
  let secondCard = null;
  let secondId = null;
  let moveCount = 0;
  let matchCount = 0;
  let minimumMoves = localStorage.getItem(`bestScore`);

  return function selectDiv(divId, divClass) {
    if (divClass != "equal") {
      if (!firstCard) {
        firstCard = divClass;
        firstId = divId;
        document.getElementById(divId).style.background = `url(./${
          event.target.className.split(" ")[0]
        })`;
        document.getElementById(divId).style.backgroundSize = "cover";
        moveCount += 1;
      } else if (!secondCard && firstId != divId) {
        secondCard = divClass;
        secondId = divId;
        document.getElementById(divId).style.background = `url(./${
          event.target.className.split(" ")[0]
        })`;
        event.target.style.backgroundSize = "cover";
        moveCount += 1;
      }
      document.getElementById("move").innerHTML = `Moves: ${moveCount}`;

      if (firstCard === secondCard) {
        document.getElementById(firstId).setAttribute("class", "equal");
        document.getElementById(secondId).setAttribute("class", "equal");
        firstCard = null;
        firstId = null;
        secondCard = null;
        secondId = null;
        matchCount += 2;

        if (matchCount === cardCount) {
          if (moveCount < minimumMoves) {
            minimumMoves = moveCount;
            localStorage.setItem(`bestScore`, minimumMoves);

            document.getElementById(
              "score"
            ).innerHTML = `Best Score: ${minimumMoves}`;
          }
          document.getElementById(
            "result"
          ).innerHTML = `You won with ${moveCount} Moves`;
        }
      } else {
        setTimeout(() => {
          if (firstId && secondId) {
            document.getElementById(
              firstId
            ).style.background = `url("card.jpg")`;
            document.getElementById(firstId).style.backgroundSize = "cover";
            document.getElementById(
              secondId
            ).style.background = `url("card.jpg")`;
            document.getElementById(secondId).style.backgroundSize = "cover";
            secondId = null;
            firstId = null;
            firstCard = null;
            secondCard = null;
          }
        }, 1000);
      }
    }
  };
}
let divClick = select();

restart.addEventListener("click", () => {
  location.reload();
});
