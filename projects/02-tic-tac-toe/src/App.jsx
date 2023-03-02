import { useState } from 'react'
import confetti from 'canvas-confetti'

import { Square } from './components/Square'
import { Board } from './components/Board'
import { WinnerModal } from './components/WinnerModal'

import { TURNS, WINNER } from './constants'
import { checkWinner, isBoardFull } from './logic/board'
import { storage } from './logic/storage'

function App() {
  // Load the game state from local storage if it exists or create a new game
  const [board, setBoard] = useState(() => {
    const savedBoard = storage.get('board')
    return savedBoard ?? Array(9).fill(null)
  })
  // Load the turn from local storage if it exists or start with X
  const [turn, setTurn] = useState(() => {
    const savedTurn = storage.get('turn')
    return savedTurn ?? TURNS.X
  })
  // Keep track of the winner
  const [winner, setWinner] = useState(null)

  const resetGame = () => {
    setBoard(Array(9).fill(null))
    setTurn(TURNS.X)
    setWinner(null)

    // Reset the game in local storage
    storage.resetGame()
  }

  const updateBoard = (index) => {
    // If there is already a value in the square or there is a winner, do nothing
    if (board[index] || winner) return

    // Create a new array with the new value
    const newBoard = [...board]
    newBoard[index] = turn
    setBoard(newBoard)

    // Change the turn
    const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X
    setTurn(newTurn)

    // Save game in local storage
    storage.saveGame({ board: newBoard, turn: newTurn })

    // Check for a winner or tie
    const newWinner = checkWinner(newBoard)
    if (newWinner) {
      setWinner(newWinner)
      confetti()
    } else if (isBoardFull(newBoard)) {
      setWinner(WINNER.TIE)
    }

    // If the game is over, reset the game in local storage
    if (newWinner || isBoardFull(newBoard)) {
      storage.resetGame()
    }
  }

  return (
    <main className='board'>
      <h1>Tic Tac Toe</h1>
      <button onClick={resetGame}>Reset Game</button>

      <Board board={board} updateBoard={updateBoard} />

      <section className='turn'>
        <Square isSelected={turn === TURNS.X}>
          {TURNS.X}
        </Square>
        <Square isSelected={turn === TURNS.O}>
          {TURNS.O}
        </Square>
      </section>

      <WinnerModal resetGame={resetGame} winner={winner} />
    </main>
  )
}

export default App
