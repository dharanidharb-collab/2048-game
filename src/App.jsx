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

function transpose(board) {
  return board[0].map((_, colIndex) =>
    board.map((row) => row[colIndex])
  );
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

function moveUp(board) {
  const transposed = transpose(board);

  const moved = moveLeft(transposed);

  return transpose(moved);
}

function moveDown(board) {
  const transposed = transpose(board);

  const moved = moveRight(transposed);

  return transpose(moved);
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

function hasEmptyCells(board) {
  return board.some((row) =>
    row.some((tile) => tile === 0)
  );
}

function canMove(board) {
  if (hasEmptyCells(board)) {
    return true;
  }

  for (let row = 0; row < 4; row++) {
    for (let col = 0; col < 4; col++) {

      if (
        row < 3 &&
        board[row][col] === board[row + 1][col]
      ) {
        return true;
      }

      if (
        col < 3 &&
        board[row][col] === board[row][col + 1]
      ) {
        return true;
      }
    }
  }

  return false;
}

function hasWon(board) {
  return board.some((row) =>
    row.some((tile) => tile === 2048)
  );
}

function App() {
  const [board, setBoard] = useState(createInitialBoard());

  function resetGame() {
    setBoard(createInitialBoard());
  }

  useEffect(() => {
    function handleKeyDown(event) {
      let newBoard = board;

      if (event.key === "ArrowLeft") {
        newBoard = moveLeft(board);
      }
      if (event.key === "ArrowRight") {
        newBoard = moveRight(board);
      }
      if (event.key === "ArrowUp") {
        newBoard = moveUp(board);
      }
      if(event.key === "ArrowDown") {
        newBoard = moveDown(board);
      }

      const boardChanged = JSON.stringify(board) !== JSON.stringify(newBoard);
      
      if (boardChanged) {
        setBoard(addRandomTile(newBoard));
      }
      
      const finalBoard = addRandomTile(newBoard);

      setBoard(finalBoard);

      if (hasWon(newBoard)) {
      alert("You Win!");
      }

      if (!canMove(finalBoard)) {
      alert("Game Over!");
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