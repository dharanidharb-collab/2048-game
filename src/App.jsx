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

function compressRow(row) {
  const filteredRow = row.filter((tile) => tile !== 0);

  while (filteredRow.length < 4) {
    filteredRow.push(0);
  }

  return filteredRow;
}

function mergeRow(row) {
  const newRow = [...row];

  for (let i = 0; i < newRow.length - 1; i++) {
    if (newRow[i] !== 0 && newRow[i] === newRow[i + 1]) {
      newRow[i] *= 2;
      newRow[i + 1] = 0;
    }
  }

  return newRow;
}

function moveLeft(board) {
  return board.map((row) => {
    let newRow = compressRow(row);
    newRow = mergeRow(newRow);
    newRow = compressRow(newRow);

    return newRow;
  });
}

function moveRight(board) {
  return board.map((row) => {
    let newRow = [...row].reverse();

    newRow = compressRow(newRow);
    newRow = mergeRow(newRow);
    newRow = compressRow(newRow);

    return newRow.reverse();
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
      if (event.key === "ArrowRight") {
        const movedBoard = moveRight(board);
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