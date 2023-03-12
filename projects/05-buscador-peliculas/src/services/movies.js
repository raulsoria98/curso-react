const API_KEY = '4a3b711b'

export const searchMovies = async ({ search }) => {
  if (!search) return null

  try {
    const response = await fetch(`https://www.omdbapi.com/?apikey=${API_KEY}&s=${search}`)
    const json = await response.json()

    if (json.Response === 'False') return []

    const movies = json.Search

    const mappedMovies = movies?.map(movie => ({
      id: movie.imdbID,
      title: movie.Title,
      year: movie.Year,
      poster: movie.Poster
    }))

    return mappedMovies
  } catch (error) {
    throw new Error('Error al buscar películas')
  }
}
