import { Box, ProgressBar } from "@artsy/palette"
import { BackLink } from "Components/Links/BackLink"
import { FC } from "react"
import { useDebouncedValue } from "Utils/Hooks/useDebounce"
import { useOnboardingContext } from "../Hooks/useOnboardingContext"

interface OnboardingProgressProps {
  preview?: boolean
}

export const OnboardingProgress: FC<OnboardingProgressProps> = ({
  preview = false,
}) => {
  const { back, progress, workflowEngine } = useOnboardingContext()

  const nextProgress = progress + 100 / workflowEngine.total()

  const { debouncedValue: debouncedProgress } = useDebouncedValue({
    value: preview ? nextProgress : progress,
    delay: 250,
  })

  return (
    <Box position="relative">
      <BackLink
        to="/"
        top={-20}
        left={-5}
        position="absolute"
        textDecoration="none"
        onClick={event => {
          event.preventDefault()
          back()
        }}
      >
        Back
      </BackLink>
      <ProgressBar
        width="100%"
        my={2}
        transition="transform 250ms"
        percentComplete={debouncedProgress}
      />
    </Box>
  )
}
