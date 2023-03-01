import { useState } from 'react'
import confetti from 'canvas-confetti'

import { Square } from './components/Square'
import { Board } from './components/Board'
import { WinnerModal } from './components/WinnerModal'

import { TURNS, WINNER } from './constants'
import { checkWinner, isBoardFull } from './logic/board'

function App() {
  const [board, setBoard] = useState(Array(9).fill(null))
  const [turn, setTurn] = useState(TURNS.X)
  const [winner, setWinner] = useState(null)

  const resetGame = () => {
    setBoard(Array(9).fill(null))
    setTurn(TURNS.X)
    setWinner(null)
  }

  const updateBoard = (index) => {
    // If there is already a value in the square or there is a winner, do nothing
    if (board[index] || winner) return

    // Create a new array with the new value
    const newBoard = [...board]
    newBoard[index] = turn
    setBoard(newBoard)

    // Check for a winner or tie
    const newWinner = checkWinner(newBoard)
    if (newWinner) {
      setWinner(newWinner)
      confetti()
    } else if (isBoardFull(newBoard)) {
      setWinner(WINNER.TIE)
    }

    // Change the turn
    setTurn(turn === TURNS.X ? TURNS.O : TURNS.X)
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
