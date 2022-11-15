import { themeProps } from "@artsy/palette"
import { useFeatureFlag } from "System/useFeatureFlag"
import { __internal__useMatchMedia } from "Utils/Hooks/useMatchMedia"

function typedArray<T extends string>(...elems: T[]): T[] {
  return elems
}

export const submissionFlowSteps = typedArray(
  "Artwork Details",
  "Upload Photos",
  "Contact Information"
)

export const submissionFlowStepsMobile = typedArray(
  "Artwork",
  "Photos",
  "Contact"
)

export const useSubmissionFlowSteps = () => {
  const enableFlowReorder = useFeatureFlag(
    "reorder-swa-artwork-submission-flow"
  )
  const isMobile = __internal__useMatchMedia(themeProps.mediaQueries.xs)
  if (enableFlowReorder && isMobile) {
    return typedArray("Contact", "Artwork", "Photos")
  } else if (enableFlowReorder) {
    return typedArray("Contact Information", "Artwork Details", "Upload Photos")
  }
  if (isMobile) {
    return submissionFlowStepsMobile
  }
  return submissionFlowSteps
}
