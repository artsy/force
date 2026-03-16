import { SystemContext } from "System/Contexts/SystemContext"
import { useContext } from "react"

interface ArtworkDimensions {
  in: string | null | undefined
  cm: string | null | undefined
}

const hasDimensions = (dims: ArtworkDimensions | null | undefined) => {
  return /\d/.test(dims?.in ?? "") || /\d/.test(dims?.cm ?? "")
}

const formatDimensions = (dims: ArtworkDimensions | null | undefined) => {
  const hasCm = !!dims?.cm
  const hasIn = !!dims?.in

  if (hasIn && hasCm) {
    return `${dims?.in} | ${dims.cm}`
  }

  return dims?.in ?? dims?.cm ?? ""
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

export const useArtworkDimensions = (
  dimensions: ArtworkDimensions | null | undefined,
  framedDimensions?: ArtworkDimensions | null | undefined,
  framed?: FramedInfo | null,
  isUnlisted?: boolean,
) => {
  const { featureFlags } = useContext(SystemContext)
  const isFeatureEnabled =
    featureFlags?.isEnabled("topaz_framed-dims-on-artwork-page") ?? false

  // Decide which dimensions to use based on feature flag and availability
  const hasFramedDims = hasDimensions(framedDimensions)
  const shouldUseFramedDims = isFeatureEnabled && hasFramedDims
  const activeDimensions = shouldUseFramedDims ? framedDimensions : dimensions

  const hasCmDimensions = !!activeDimensions?.cm
  const hasInDimensions = !!activeDimensions?.in

  const shouldShowFrameText = !shouldUseFramedDims
  const frameText = shouldShowFrameText
    ? getFrameString(framed?.details, isUnlisted)
    : null

  const formattedDimensions = formatDimensions(activeDimensions)
  const dimensionsLabel =
    shouldUseFramedDims && formattedDimensions
      ? `${formattedDimensions} with frame included`
      : formattedDimensions

  return {
    hasCmDimensions,
    hasInDimensions,
    dimensionsLabel,
    dimensionsLabelWithoutFrameText: formattedDimensions,
    isShowingFramedDimensions: shouldUseFramedDims,
    shouldShowFrameText,
    frameText,
  }
}
