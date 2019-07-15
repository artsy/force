// Helper method to determine how frequently ads should be rendered in Article components
export const shouldAdRender = (
  index: number,
  startIndex: number,
  frequency: number,
  articleType: string = null
): boolean => {
  // for Featured and Standard articles always return true
  if (articleType === "feature" || articleType === "standard") {
    return true
  }

  let position = index - startIndex
  return Math.abs(position) % frequency === 0
}
