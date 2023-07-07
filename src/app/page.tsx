'use client'

import { useState } from "react";

type SquareProps = {
  value: string,
  indexSq: number,
  onSquareClick: ()=>void
}

function Square({value, indexSq, onSquareClick}: SquareProps) {
  return (
    <button 
      className="border-blue-200 border-2 rounded-xl bg-blue-400 hover:bg-slate-100 w-20 h-20 m-1 font-mono text-2xl"
      data-cy={`square-${indexSq}`}
      onClick={onSquareClick}
    >
      <b>{value}</b>
    </button>
  )
}

type BoardProps = {
  player: string,
  onPlay: () => void,
  onWinner: (winner:string) => void
}

function Board({player, onPlay, onWinner}: BoardProps) {
  const [cells, setCells] = useState<string[]>(new Array(9).fill(''));

  async function handleClick(indexSq:number)  {
    var nextCells:string[] = cells.slice()
    if (nextCells[indexSq] === '') {
      nextCells[indexSq] = player;
      setCells(nextCells);
      onPlay();

      var winner:string|null = calculateWinner(nextCells);
      if (winner) onWinner(winner);
    }
  }

  function mapSquares(x:number) {
    return <Square value={cells[x]} indexSq={x} key={x} onSquareClick={() => handleClick(x)} />
  }

  return (
    <div className="grid grid-cols-3 place-content-center content-center rounded-xl w-72 h-72  ">
      {[...Array(9).keys()].map(mapSquares)}
    </div>
  );
}

export default function Home() {
  const [player, setPlayer] = useState('X');
  const [winner, setWinner] = useState<string|null>(null);

  function handlePlay(){
    setPlayer(player === 'X' ? '0': 'X');
  }

  function handleWinner(w:string){
    setWinner(w);
  }

  return (
  <>
    <h1 className="mb-8 text-3xl font-bold">Tic Tac Toe</h1>
    <h3 className="mb-8 text-1xl">Player {player}'s turn</h3>
    <h3 className="mb-8 text-1xl">Winner {winner}</h3>
    <div className="flex place-content-center">
      <Board 
        player={player}
        onPlay={handlePlay}
        onWinner={handleWinner}
      />
    </div>
  </>
  )
}

function calculateWinner(squares:string[]):string|null {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}
