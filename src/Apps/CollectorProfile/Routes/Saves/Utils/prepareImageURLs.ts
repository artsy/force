export const prepareImageURLs = (imageURLs: (string | null)[]) => {
  // Ensure we have an array of exactly 4 images
  return Array.from(Array(4)).reduce(
    (acc, _, i) => [...acc, imageURLs[i] ?? null],
    [] as string[]
  )
}
