import { THEME } from "@artsy/palette"
import { __internal__useMatchMedia } from "Utils/Hooks/useMatchMedia"

type MobileSteps = "Artwork" | "Photos"

type DesktopSteps = "Artwork Details" | "Upload Photos"

export const submissionFlowSteps: DesktopSteps[] = [
  "Artwork Details",
  "Upload Photos",
]

export const submissionFlowStepsMobile: MobileSteps[] = ["Artwork", "Photos"]

export const useSubmissionFlowSteps = (): DesktopSteps[] | MobileSteps[] => {
  const isMobile = __internal__useMatchMedia(THEME.mediaQueries.xs)
  if (isMobile) {
    return ["Artwork", "Photos"]
  }
  return ["Artwork Details", "Upload Photos"]
}
