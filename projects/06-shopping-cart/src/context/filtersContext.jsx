import { createContext, useState } from 'react'

// Create a context for the filters
export const FiltersContext = createContext()

// Create a provider for the filters
export const FiltersProvider = ({ children }) => {
  // Create a state for the filters
  const [filters, setFilters] = useState({
    category: 'all',
    minPrice: 250
  })

  // Return the provider
  return (
    <FiltersContext.Provider value={{ filters, setFilters }}>
      {children}
    </FiltersContext.Provider>
  )
}
