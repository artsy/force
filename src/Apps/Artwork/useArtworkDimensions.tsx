interface ArtworkDimensions {
  in: string | null | undefined
  cm: string | null | undefined
}

export const useArtworkDimensions = (
  dimensions: ArtworkDimensions | null | undefined
) => {
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
