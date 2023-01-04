import { themeProps } from "@artsy/palette"
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
  const isMobile = __internal__useMatchMedia(themeProps.mediaQueries.xs)
  if (isMobile) {
    return ["Contact", "Artwork", "Photos"]
  }
  return ["Contact Information", "Artwork Details", "Upload Photos"]
}
