import { useState, useEffect } from 'react'

const CAT_SAYS_IMAGE_URL = 'https://cataas.com/cat/says'

// Custom hook to set image url based on fact
export function useCatImage ({ fact }) {
  const [imageUrl, setImageUrl] = useState()

  useEffect(() => {
    if (!fact) return

    const firstThreeWords = fact.split(' ', 3).join(' ')
    // encodeURIComponent() encodes special characters, including: , / ? : @ & = + $ #
    const url = `/${encodeURIComponent(firstThreeWords)}`
    setImageUrl(url)
  }, [fact])

  return { imageUrl: imageUrl ? `${CAT_SAYS_IMAGE_URL}${imageUrl}` : null }
}
