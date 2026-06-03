import { useEffect, useState } from "react";
import "./App.css";

function createEmptyBoard() {
  return [
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
  ];
}

function createInitialBoard() {
  let board = createEmptyBoard();

  board = addRandomTile(board);
  board = addRandomTile(board);

  return board;
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
  let points = 0;

  for (let i = 0; i < newRow.length - 1; i++) {
    if (newRow[i] !== 0 && newRow[i] === newRow[i + 1]) {
      newRow[i] *= 2;
      points += newRow[i];
      newRow[i + 1] = 0;
    }
  }

  return { row: newRow, points };
}

function transpose(board) {
  return board[0].map((_, colIndex) =>
    board.map((row) => row[colIndex])
  );
}

function moveLeft(board) {
  let totalPoints = 0;

  const newBoard = board.map((row) => {
    let newRow = compressRow(row);

    const merged = mergeRow(newRow);
    totalPoints += merged.points;

    newRow = compressRow(merged.row);

    return newRow;
  });

  return {
    board: newBoard,
    points: totalPoints,
  };
}

function moveRight(board) {
  let totalPoints = 0;

  const newBoard = board.map((row) => {
    let newRow = [...row].reverse();

    newRow = compressRow(newRow);

    const merged = mergeRow(newRow);

    totalPoints += merged.points;

    newRow = compressRow(merged.row);

    return newRow.reverse();
  });

  return {
    board: newBoard,
    points: totalPoints,
  };
}

function moveUp(board) {
  const transposed = transpose(board);

  const result = moveLeft(transposed);

  return {
    board: transpose(result.board),
    points: result.points,
  };
}

function moveDown(board) {
  const transposed = transpose(board);

  const result = moveRight(transposed);

  return {
    board: transpose(result.board),
    points: result.points,
  };
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
  const [board, setBoard] = useState(() => {
    const savedBoard = localStorage.getItem("board");

    return savedBoard
      ? JSON.parse(savedBoard)
      : createInitialBoard();
  });
  const [won, setWon] = useState(false);
  const [score, setScore] = useState(() => {
    const savedScore = localStorage.getItem("score");

    return savedScore ? Number(savedScore) : 0;
  });
  const [gameOver, setGameOver] = useState(false);


  function resetGame() {
    localStorage.removeItem("board");
    localStorage.removeItem("score");

    setBoard(createInitialBoard());
    setWon(false);
    setScore(0);
    setGameOver(false);
  }

  useEffect(() => {
    function handleKeyDown(event) {
      let moveResult = null;

      if (event.key === "ArrowLeft") {
        moveResult = moveLeft(board);
      }
      else if (event.key === "ArrowRight") {
        moveResult = moveRight(board);
      }
      else if (event.key === "ArrowUp") {
        moveResult = moveUp(board);
      }
      else if (event.key === "ArrowDown") {
        moveResult = moveDown(board);
      }

      if (!moveResult) return;
      const newBoard = moveResult.board;

      const boardChanged = JSON.stringify(board) !== JSON.stringify(newBoard);
      
      if (!boardChanged) return;

      const finalBoard = addRandomTile(newBoard);

      setBoard(finalBoard);
      setScore((prev) => prev + moveResult.points);

      if (hasWon(finalBoard) && !won) {
        setWon(true);
      }

      if (!canMove(finalBoard)) {
      setGameOver(true);
      }
    }

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [board, won]);

  useEffect(() => {
    localStorage.setItem("board", JSON.stringify(board));
  }, [board]);

  useEffect(() => {
    localStorage.setItem("score", score);
  }, [score]);

  return (
    <div className="game">
      <h1>2048</h1>

      <button className="reset-button" onClick={resetGame}>
        Reset Game
      </button>

      <h2>Score: {score}</h2>

      {won && <h2>You reached 2048! Keep going!</h2>}
      {gameOver && <h2>Game Over!</h2>}

      <div className="board">
        {board.flat().map((tile, index) => (
          <div className={
             tile > 2048 ? "tile tile-super" : `tile tile-${tile}` 
            }
            key={index}
          >
            {tile !== 0 ? tile : ""}
          </div>
        ))}
      </div>
      <p>Use Arrow Keys to Move Tiles</p>

    </div>
  );
}

export default App;