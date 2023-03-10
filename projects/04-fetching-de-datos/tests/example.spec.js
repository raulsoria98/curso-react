import { test, expect } from '@playwright/test'

const CAT_SAYS_IMAGE_URL = 'https://cataas.com/cat/says'
const LOCALHOST_URL = 'http://localhost:5173/'

test('app shows random fact and image', async ({ page }) => {
  await page.goto(LOCALHOST_URL)

  // Get fact and image
  const fact = await page.getByRole('paragraph')
  const image = await page.getByRole('img')

  const factText = await fact.textContent()
  const imageSrc = await image.getAttribute('src')

  await expect(factText?.length).toBeGreaterThan(0)
  await expect(imageSrc?.startsWith(CAT_SAYS_IMAGE_URL)).toBeTruthy()
})
