import { Box } from "@artsy/palette"
import { themeGet } from "@styled-system/theme-get"
import { useProgressiveOnboarding } from "Components/ProgressiveOnboarding/ProgressiveOnboardingContext"
import { PROGRESSIVE_ONBOARDING_FOLLOW_ARTIST } from "Components/ProgressiveOnboarding/ProgressiveOnboardingFollowArtist"
import { FC, useEffect } from "react"
import styled, { keyframes } from "styled-components"

export const PROGRESSIVE_ONBOARDING_FOLLOWS_HIGHLIGHT = "follows-highlight"

export const ProgressiveOnboardingFollowsHighlight: FC = ({ children }) => {
  const { isDismissed, dismiss, enabled } = useProgressiveOnboarding()

  useEffect(() => {
    if (!enabled) return
    if (isDismissed(PROGRESSIVE_ONBOARDING_FOLLOWS_HIGHLIGHT)) return

    const handleClick = () => {
      dismiss(PROGRESSIVE_ONBOARDING_FOLLOWS_HIGHLIGHT)
    }

    document.addEventListener("click", handleClick, { once: true })

    return () => {
      document.removeEventListener("click", handleClick)
    }
  }, [dismiss, enabled, isDismissed])

  if (
    !enabled ||
    // If you've already dismissed this
    isDismissed(PROGRESSIVE_ONBOARDING_FOLLOWS_HIGHLIGHT) ||
    // Or you haven't yet dismissed the follow artist step
    !isDismissed(PROGRESSIVE_ONBOARDING_FOLLOW_ARTIST)
  ) {
    return <>{children}</>
  }

  return (
    <Box position="relative">
      <Highlight />

      {children}
    </Box>
  )
}

const pulse = keyframes`
  0% { transform: scale(0.8); }
  50% { transform: scale(1); }
  100% { transform: scale(0.8); }
`

const Highlight = styled(Box)`
  position: absolute;
  pointer-events: none;
  border: 3px solid ${themeGet("colors.blue10")};
  animation: ${pulse} 2s ease-in-out infinite;
  border-radius: 50%;
  /* Apologies for the magic numbers: */
  top: 4px;
  left: 9.5px;
  height: 38px;
  width: 38px;
`
