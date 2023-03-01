import { useState } from 'react'
import './App.css'

const TURNS = {
  X: 'X',
  O: 'O',
}

const WINNER = {
  ... TURNS,
  TIE: 'TIE',
}

const WINNER_COMBOS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
]

const Square = ({ children, isSelected, updateBoard, index }) => {
  const className = `square ${isSelected ? 'is-selected' : ''}`

  const handleClick = () => {
    updateBoard(index)
  }

  return (
    <div onClick={handleClick} className={className}>
      {children}
    </div>
  )
}

function App() {
  const [board, setBoard] = useState(Array(9).fill(null))
  const [turn, setTurn] = useState(TURNS.X)
  const [winner, setWinner] = useState(null)

  const checkWinner = (boardToCheck) => {
    WINNER_COMBOS.forEach((combo) => {
      const [a, b, c] = combo
      if (boardToCheck[a] &&
        boardToCheck[a] === boardToCheck[b] &&
        boardToCheck[a] === boardToCheck[c]) {
        setWinner(boardToCheck[a])
      }
    })
  }

  const isBoardFull = (boardToCheck) => {
    return boardToCheck.every((square) => square !== null)
  }

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
    // Change the turn
    setTurn(turn === TURNS.X ? TURNS.O : TURNS.X)
    // Check for a winner
    checkWinner(newBoard)
    // Check if the board is full
    if (isBoardFull(newBoard)) {
      setWinner(WINNER.TIE)
    }
  }

  return (
    <main className='board'>
      <h1>Tic Tac Toe</h1>
      <button onClick={resetGame}>Reset Game</button>
      <section className='game'>
        {
          board.map((square, index) => (
            <Square
              key={index}
              index={index}
              updateBoard={updateBoard}
            >
              {square}
            </Square>
          ))
        }
      </section>

      <section className='turn'>
        <Square isSelected={turn === TURNS.X}>
          {TURNS.X}
        </Square>
        <Square isSelected={turn === TURNS.O}>
          {TURNS.O}
        </Square>
      </section>
      {
        winner && (
          <section className='winner'>
            <div className="text">
              <h2>
                {
                  // If the winner is a tie, show a tie message,
                  // otherwise show the winner message
                  winner === WINNER.TIE
                    ? 'It\'s a tie!'
                    : 'The winner is:'
                }
              </h2>

              {
                // If the winner is not a tie, show the winner
                winner !== WINNER.TIE &&
                <header className="win">
                  {winner && <Square>{winner}</Square>}
                </header>
              }

              <footer>
                <button onClick={resetGame}>
                  Play again
                </button>
              </footer>
            </div>
          </section>
        )
      }
    </main>
  )
}

export default App
