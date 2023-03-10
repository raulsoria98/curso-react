import { useState, useEffect } from 'react'
import { getRandomFact } from '../services/facts'

// Custom hook to get fact and refresh it
export function useCatFact () {
  const [fact, setFact] = useState()

  const refreshFact = () => {
    getRandomFact().then(newFact => setFact(newFact))
  }

  // Fetching fact from API
  useEffect(() => {
    refreshFact()
  }, [])

  return { fact, refreshFact }
}
