// useState: tic tac toe
// http://localhost:3000/isolated/exercise/04.js

// 🐨 squares is the state for this component. Add useState for squares (ok)
// const squares = Array(9).fill(null)
// 🐨 We'll need the following bits of derived state:
// - nextValue ('X' or 'O')
// - winner ('X', 'O', or null)
// - status (`Winner: ${winner}`, `Scratch: Cat's game`, or `Next player: ${nextValue}`)
// 💰 I've written the calculations for you! So you can use my utilities
// below to create these variables

// This is the function your square click handler will call. `square` should
// be an index. So if they click the center square, this will be `4`.

// 🐨 first, if there's already winner or there's already a value at the
// given square index (like someone clicked a square that's already been
// clicked), then return early so we don't make any state changes

// 🦉 It's typically a bad idea to mutate or directly change state in React.
// Doing so can lead to subtle bugs that can easily slip into production.
// 🐨 make a copy of the squares array (ok)
// 💰 `[...squares]` will do it!)

// 🐨 set the value of the square that was selected (ok)
// 💰 `squaresCopy[square] = nextValue`

// 🐨 set the squares to your copy

// 🐨 reset the squares (ok)
// 💰 `Array(9).fill(null)` will do it!
import * as React from 'react'
import {useLocalStorageState} from '../utils'

function Board({onClick, squares}) {
  function renderSquare(i) {
    return (
      <button className="square" onClick={() => onClick(i)}>
        {squares[i]}
      </button>
    )
  }

  return (
    <div>
      {/* 🐨 put the status in the div below */}
      <div className="board-row">
        {renderSquare(0)}
        {renderSquare(1)}
        {renderSquare(2)}
      </div>
      <div className="board-row">
        {renderSquare(3)}
        {renderSquare(4)}
        {renderSquare(5)}
      </div>
      <div className="board-row">
        {renderSquare(6)}
        {renderSquare(7)}
        {renderSquare(8)}
      </div>
    </div>
  )
}

function Game() {
  const initialSquares = Array(9).fill(null)
  // Deprecated because we are managing several currentSquare states depending on the step (see**)
  // const [squares, setSquares] = useLocalStorageState('game', initialSquares)
  const [currentStep, setCurrentStep] = useLocalStorageState(
    'tic-tac-toe:step',
    0,
  )
  const [rec, setRec] = useLocalStorageState('tic-tac-toe:rec', [
    initialSquares,
  ])
  // **
  const currentSquares = rec[currentStep]

  const nextValue = calculateNextValue(currentSquares)
  const winner = calculateWinner(currentSquares)
  const status = calculateStatus(winner, currentSquares, nextValue)

  function selectSquare(square) {
    if (winner || currentSquares[square]) {
      return
    }

    // We dont' use spread operator because we are going to substitute the history depending on the selected step
    const newRec = rec.slice(0, currentStep + 1)

    const squaresCopy = [...currentSquares]
    squaresCopy[square] = nextValue

    setRec([...newRec, squaresCopy])

    setCurrentStep(newRec.length)
    // setSquares(squaresCopy)
  }

  function restart() {
    // Deprecated because rec is the new state handler
    // setSquares(initialSquares)
    setRec([initialSquares])
    setCurrentStep(0)
  }

  const moves = rec.map((stepSquares, step) => {
    const desc = step === 0 ? 'Go to game start' : `Go to move #${step}`
    const isCurrentStep = step === currentStep
    return (
      <li key={step}>
        <button disabled={isCurrentStep} onClick={() => setCurrentStep(step)}>
          {desc}
          {isCurrentStep ? '(current)' : null}
        </button>
      </li>
    )
  })

  return (
    <div className="game">
      <div className="game-board">
        <Board onClick={selectSquare} squares={currentSquares} />
        <button className="restart" onClick={restart}>
          restart
        </button>
      </div>
      <div className="game-info">
        <div>
          <h3>{status}</h3>
          <p>List of moves</p>
          <ol>{moves}</ol>
        </div>
      </div>
    </div>
  )
}

// eslint-disable-next-line no-unused-vars
function calculateStatus(winner, squares, nextValue) {
  return winner
    ? `Winner: ${winner}`
    : squares.every(Boolean)
    ? `Scratch: Cat's game`
    : `Next player: ${nextValue}`
}

// eslint-disable-next-line no-unused-vars
function calculateNextValue(squares) {
  return squares.filter(Boolean).length % 2 === 0 ? 'X' : 'O'
}

// eslint-disable-next-line no-unused-vars
function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ]
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i]
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a]
    }
  }
  return null
}

function App() {
  return <Game />
}

export default App
