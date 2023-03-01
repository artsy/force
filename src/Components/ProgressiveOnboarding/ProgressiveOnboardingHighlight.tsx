import { Box } from "@artsy/palette"
import { themeGet } from "@styled-system/theme-get"
import { useProgressiveOnboardingTracking } from "Components/ProgressiveOnboarding/useProgressiveOnboardingTracking"
import { FC } from "react"
import styled, { keyframes } from "styled-components"

interface ProgressiveOnboardingHighlightProps {
  name: string
}

export const ProgressiveOnboardingHighlight: FC<ProgressiveOnboardingHighlightProps> = ({
  children,
  name,
}) => {
  useProgressiveOnboardingTracking({ name })

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

export const Highlight = styled(Box)`
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
