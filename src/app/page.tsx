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
  onPlay: () => void
}

function Board({player, onPlay}: BoardProps) {
  const [cells, setCells] = useState(new Array(9).fill(''));

  function handleClick(indexSq:number)  {
    var nextCells:string[] = cells.slice()
    nextCells[indexSq] = player;
    onPlay();
    setCells(nextCells);
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

  function handlePlay(){
    setPlayer(player === 'X' ? '0': 'X');
  }

  return (
  <>
    <h1 className="mb-8 text-3xl font-bold">Tic Tac Toe</h1>
    <h3 className="mb-8 text-1xl">Player {player}'s turn</h3>
    <div className="flex place-content-center">
      <Board 
        player={player}
        onPlay={handlePlay}
      />
    </div>
  </>
  )
}
