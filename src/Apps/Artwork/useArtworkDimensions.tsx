interface ArtworkDimensions {
  in: string | null
  cm: string | null
}

export const useArtworkDimensions = (dimensions: ArtworkDimensions | null) => {
  const hasCmDimensions = !!dimensions?.cm
  const hasInDimensions = !!dimensions?.in

  if (hasInDimensions && hasCmDimensions) {
    return {
      hasCmDimensions,
      hasInDimensions,
      dimensionsLabel: `${dimensions?.in} | ${dimensions.cm}`,
    }
  }

  return {
    hasCmDimensions,
    hasInDimensions,
    dimensionsLabel: dimensions?.in ?? dimensions?.cm,
  }
}
