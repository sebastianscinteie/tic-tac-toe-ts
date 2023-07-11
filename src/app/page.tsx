"use client";

import React, { useEffect, useState } from "react";
import io from "socket.io-client";

let socket: any; //used in home

type SquareProps = {
  value: string | null;
  indexSq: number;
  onSquareClick: () => void;
};
function Square({ value, indexSq, onSquareClick }: SquareProps) {
  return (
    <button
      className="border-blue-200 border-2 rounded-xl bg-teal-200 hover:bg-slate-100 w-20 h-20 m-1 font-mono text-2xl"
      data-cy={`square-${indexSq}`}
      onClick={onSquareClick}
    >
      <b>{value}</b>
    </button>
  );
}

function Board() {
  const [player, setPlayer] = useState<"X" | "O">("X");
  const [cells, setCells] = useState<(typeof player)[] | null[]>(
    new Array(9).fill(null)
  );
  const [gameWon, setGameWon] = useState(false);
  const [score, setScore] = useState({ X: 0, O: 0 });
  const [gameNo, setGameNo] = useState(0);

  function resetBoard() {
    setCells(new Array(9).fill(null));
    setPlayer("X");
    setGameWon(false);
  }

  function resetScore() {
    setScore({ X: 0, O: 0 });
    setGameNo(0);
    resetBoard();
  }

  function handleClick(indexSq: number) {
    let nextCells = cells.slice();
    if (nextCells[indexSq] === null) {
      nextCells[indexSq] = player;
      setCells(nextCells);
      setPlayer(player === "X" ? "O" : "X");

      const [w, isWinner] = calculateWinner(nextCells) as [
        typeof player,
        boolean,
      ];
      if (isWinner) {
        setGameWon(true);
        setScore({
          ...score,
          [w]: score[w] + 1,
        });
        setGameNo(gameNo + 1);
      }
    }
  }

  function calculateWinner(
    squares: typeof cells
  ): [typeof player | null, typeof gameWon] {
    const winnerLines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < winnerLines.length; i++) {
      const [a, b, c] = winnerLines[i];
      if (
        squares[a] &&
        squares[a] === squares[b] &&
        squares[a] === squares[c]
      ) {
        return [squares[a], true];
      }
    }
    return [null, false];
  }

  function mapSquares(x: number) {
    return (
      <Square
        value={cells[x]}
        indexSq={x}
        key={x}
        onSquareClick={() => (gameWon ? null : handleClick(x))}
      />
    );
  }

  const decimalFont = (deci: keyof typeof score | typeof gameNo) => (
    <span className="font-mono">{deci}</span>
  );
  return (
    <>
      <h3 className="mb-8 text-2xl font-serif">
        Game: {decimalFont(gameNo)} Score X: {decimalFont(score.X)} O:{" "}
        {decimalFont(score.O)}
      </h3>
      <h3 className="mb-8 text-1xl">Player {player}&aposs turn</h3>
      {/* <h3 className="mb-8 text-1xl text-red-500">{(winner == null)?<>&nbsp;</>:`Winner is ${winner}`}</h3> commented this so I won't lose the nbsp stuff*/}
      {/* &nbsp; or non-breaking space is used to preserver the layout of the page when this h3 has text null, otherwise the entire layout will be shifted*/}

      <div className="flex place-content-center">
        <div className="grid grid-cols-3 place-content-center content-center rounded-xl w-72 h-72  ">
          {[...Array(9).keys()].map(mapSquares)}
        </div>
      </div>
      <button
        className="border border-black rounded bg-slate-100 m-10 p-2"
        onClick={resetBoard}
      >
        {gameWon ? "Next Game" : "Reset Board"}
      </button>
      {score.X + score.O ? (
        <button
          className="border border-black rounded bg-slate-100 m-10 p-2"
          onClick={resetScore}
        >
          Reset Score
        </button>
      ) : null}
    </>
  );
}

export default function Home() {
  const [input, setInput] = useState("");

  useEffect(() => {
    fetch("/socket").finally(() => {
      socket = io();
      socket.on("test", () => {
        console.log("test");
        socket.emit("hello", "world");
      });
    });
  }, []);

  function socketChange(e: any) {
    setInput(e.target.value);
    socket.emit("input-change", e.target.value);
  }

  return (
    <>
      <h1 className="mb-8 text-3xl font-bold">Tic Tac Toe</h1>
      <input placeholder="Type" value={input} onChange={socketChange}></input>
      <Board />
    </>
  );
}
