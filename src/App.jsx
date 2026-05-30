import { useEffect, useState } from "react";
import "./App.css";

function createInitialBoard() {
  return [
    [2, 0, 0, 2],
    [0, 4, 0, 0],
    [0, 0, 8, 0],
    [0, 0, 0, 16],
  ];
}

function moveLeft(board) {
  return board.map((row) => {
    let filteredRow = row.filter((tile) => tile !== 0);

    for (let i = 0; i < filteredRow.length - 1; i++) {
      if (filteredRow[i] === filteredRow[i + 1]) {
        filteredRow[i] *= 2;
        filteredRow[i + 1] = 0;
      }
    }

    filteredRow = filteredRow.filter((tile) => tile !== 0);

    while (filteredRow.length < 4) {
      filteredRow.push(0);
    }

    return filteredRow;
  });
}

function addRandomTile(board) {
  const newBoard = board.map(row => [...row]);

  const emptyCells = [];

  for (let row = 0; row < 4; row++) {
    for (let col = 0; col < 4; col++) {
      if (newBoard[row][col] === 0) {
        emptyCells.push([row, col]);
      }
    }
  }

  if (emptyCells.length === 0) {
    return newBoard;
  }

  const randomIndex =
    Math.floor(Math.random() * emptyCells.length);

  const [row, col] = emptyCells[randomIndex];

  newBoard[row][col] = 2;

  return newBoard;
}

function App() {
  const [board, setBoard] = useState(createInitialBoard());

  function resetGame() {
    setBoard(createInitialBoard());
  }

  useEffect(() => {
    function handleKeyDown(event) {
      if (event.key === "ArrowLeft") {
        const movedBoard = moveLeft(board);
        const newBoard = addRandomTile(movedBoard);
        setBoard(newBoard);
      }
    }

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [board]);

  return (
    <div className="game">
      <h1>2048</h1>

      <button className="reset-button" onClick={resetGame}>
        Reset Game
      </button>

      <div className="board">
        {board.flat().map((tile, index) => (
          <div className="tile" key={index}>
            {tile !== 0 ? tile : ""}
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;