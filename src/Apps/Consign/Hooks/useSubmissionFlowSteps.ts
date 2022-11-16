import { themeProps } from "@artsy/palette"
import { useFeatureFlag } from "System/useFeatureFlag"
import { __internal__useMatchMedia } from "Utils/Hooks/useMatchMedia"

type MobileSteps = "Artwork" | "Photos" | "Contact"

type DesktopSteps = "Artwork Details" | "Upload Photos" | "Contact Information"

export const submissionFlowSteps: DesktopSteps[] = [
  "Artwork Details",
  "Upload Photos",
  "Contact Information",
]

export const submissionFlowStepsMobile: MobileSteps[] = [
  "Artwork",
  "Photos",
  "Contact",
]

export const useSubmissionFlowSteps = (): DesktopSteps[] | MobileSteps[] => {
  const enableFlowReorder = useFeatureFlag(
    "reorder-swa-artwork-submission-flow"
  )
  const isMobile = __internal__useMatchMedia(themeProps.mediaQueries.xs)
  if (enableFlowReorder && isMobile) {
    return ["Contact", "Artwork", "Photos"]
  }
  if (enableFlowReorder) {
    return ["Contact Information", "Artwork Details", "Upload Photos"]
  }
  if (isMobile) {
    return submissionFlowStepsMobile
  }
  return submissionFlowSteps
}
