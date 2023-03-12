import { useState } from 'react'
import { searchMovies } from '../services/movies'

export function useMovies ({ search }) {
  const [movies, setMovies] = useState([])
  const [, setError] = useState(null)
  const [loading, setLoading] = useState(false)

  const getMovies = async () => {
    try {
      setLoading(true)
      setError(null)
      const newMovies = await searchMovies({ search })
      setMovies(newMovies)
    } catch (error) {
      setError(error.message)
    } finally {
      setLoading(false)
    }
  }

  return { movies, getMovies, loading }
}
