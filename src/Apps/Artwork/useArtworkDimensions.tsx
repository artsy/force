interface ArtworkDimensions {
  in: string | null | undefined
  cm: string | null | undefined
}

const hasDimensions = (dims: ArtworkDimensions | null | undefined) => {
  return /\d/.test(dims?.in ?? "") || /\d/.test(dims?.cm ?? "")
}

const formatDimensions = (
  dims: ArtworkDimensions | null | undefined,
): string | null => {
  const hasCm = !!dims?.cm
  const hasIn = !!dims?.in

  if (hasIn && hasCm) {
    return `${dims?.in} | ${dims.cm}`
  }

  return dims?.in ?? dims?.cm ?? null
}

interface FramedInfo {
  details?: string | null
}

const getFrameString = (frameDetails?: string | null, isUnlisted?: boolean) => {
  if (frameDetails !== "Included") {
    if (isUnlisted) {
      return "Frame not included"
    } else {
      return null
    }
  }

  return `Frame ${frameDetails.toLowerCase()}`
}

interface UseArtworkDimensionsOptions {
  dimensions: ArtworkDimensions | null | undefined
  framedDimensions?: ArtworkDimensions | null | undefined
  framed?: FramedInfo | null
  isUnlisted?: boolean
}

export const useArtworkDimensions = ({
  dimensions,
  framedDimensions,
  framed,
  isUnlisted,
}: UseArtworkDimensionsOptions) => {
  const shouldUseFramedDims = hasDimensions(framedDimensions)
  const activeDimensions = shouldUseFramedDims ? framedDimensions : dimensions

  const hasActiveDimensions = hasDimensions(activeDimensions)

  const shouldShowFrameText = !shouldUseFramedDims
  const frameText = shouldShowFrameText
    ? getFrameString(framed?.details, isUnlisted)
    : null

  const formattedDimensions = formatDimensions(activeDimensions)
  const dimensionsLabel: string | null =
    shouldUseFramedDims && formattedDimensions
      ? `${formattedDimensions} with frame included`
      : formattedDimensions

  return {
    hasDimensions: hasActiveDimensions,
    dimensionsLabel,
    dimensionsLabelWithoutFrameText: formattedDimensions,
    isShowingFramedDimensions: shouldUseFramedDims,
    shouldShowFrameText,
    frameText,
  }
}
