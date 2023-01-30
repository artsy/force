export const prepareImageURLs = (imageURLs: string[]) => {
  // Ensure we have an array of exactly 4 images
  return [null, null, null, null].reduce(
    (acc, _, i) => [...acc, imageURLs[i] ?? null],
    [] as string[]
  )
}
