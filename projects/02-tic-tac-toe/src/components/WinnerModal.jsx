import { WINNER } from '../constants'
import { Square } from './Square'

export function WinnerModal({ winner, resetGame }) {
    if (!winner) return null

    let winnerOrTie
    let winnerSquare

    if (winner === WINNER.TIE) {
        winnerOrTie = 'It\'s a tie!'
        winnerSquare = null
    } else {
        winnerOrTie = 'The winner is:'
        winnerSquare = <header className="win"><Square>{winner}</Square></header>
    }

    return (
        <section className='winner'>
            <div className="text">
                <h2>{winnerOrTie}</h2>

                {winnerSquare}

                <footer>
                    <button onClick={resetGame}>
                        Play again
                    </button>
                </footer>
            </div>
        </section>
    )
}