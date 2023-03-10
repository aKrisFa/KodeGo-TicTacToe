const gameboard = document.getElementById("gameboard");
const infoDisplay = document.getElementById("info"); /*to assign text which turn it is*/
const grid = [ "", "", "", "", "", "", "", "", "",];

let go = "circle";
infoDisplay.innerHTML = "Circle's turn first.";


function createBoard() {
    grid.forEach((_box, index) => {
        const boxElement = document.createElement("div");
        boxElement.classList.add("square");
        boxElement.id = index;
        boxElement.addEventListener('click', addGo)
        gameboard.append(boxElement);
    })
}
createBoard() 

function addGo(e) {
    const goDisplay = document.createElement("div")
    goDisplay.classList.add(go)
    e.target.append(goDisplay)
    go = go === "circle" ? "cross" : "circle"
    infoDisplay.textContent = "Now it's " + go + "'s turn."
    e.target.removeEventListener("click", addGo); /*this is to prevent to make 2nd click on the same box*/
    checkScore()
}

function checkScore() {
    const allSquares = document.querySelectorAll(".square")
    const winningCombos =  [
        [0,1,2], [3,4,5], [6,7,8],
        [0,3,6], [1,4,7], [2,5,8],
        [0,4,8], [2,4,6]
    ]

    winningCombos.forEach(array => {
        const circleWins = array.every(box => allSquares[box].firstChild?.classList.contains("circle"))

        if (circleWins) {
            infoDisplay.textContent = "Circle Wins!"
            /* */
            allSquares.forEach(square => square.replaceWith(square.cloneNode(true)))
            return
        }
    
    })

    winningCombos.forEach(array => {
        const crossWins = array.every(box => allSquares[box].firstChild?.classList.contains("cross"))

        if (crossWins) {
            infoDisplay.textContent = "Cross Wins!"
            allSquares.forEach(square => square.replaceWith(square.cloneNode(true)))
            return
        }
    
    })

}


