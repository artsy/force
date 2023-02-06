import { FC, useRef } from "react"
import { Box, useClickOutside } from "@artsy/palette"
import { useReady } from "Utils/Hooks/useReady"
import { useProgressiveOnboarding } from "Components/ProgressiveOnboarding/ProgressiveOnboardingContext"
import { getTip } from "Components/ProgressiveOnboarding/ProgressiveOnboardingTips"

interface ProgressiveOnboardingHighlightProps {
  name: string
}

export const ProgressiveOnboardingHighlight: FC<ProgressiveOnboardingHighlightProps> = ({
  name,
}) => {
  const { close } = useProgressiveOnboarding()

  const { ready } = useReady({ delay: getTip(name).delay })

  const handleClickOutside = () => {
    close()
  }

  const ref = useRef<HTMLElement | null>(null)

  useClickOutside({
    ref,
    onClickOutside: handleClickOutside,
    when: true,
    type: "click",
  })

  if (!ready) return null

  return (
    <Box
      ref={ref as any}
      width="100%"
      height="100%"
      bg="blue100"
      opacity={0.1}
      style={{ pointerEvents: "none" }}
    />
  )
}
