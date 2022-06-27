import { ProgressBar } from "@artsy/palette"
import { FC } from "react"
import { useDebouncedValue } from "v2/Utils/Hooks/useDebounce"
import { useOnboardingContext } from "../useOnboardingContext"

interface OnboardingProgressProps {
  preview?: boolean
}

export const OnboardingProgress: FC<OnboardingProgressProps> = ({
  preview = false,
}) => {
  const { progress, workflowEngine } = useOnboardingContext()

  const nextProgress = progress + 100 / workflowEngine.total()

  const { debouncedValue: debouncedProgress } = useDebouncedValue({
    value: preview ? nextProgress : progress,
    delay: 250,
  })

  return (
    <ProgressBar
      width="100%"
      my={0}
      transition="transform 250ms"
      percentComplete={debouncedProgress}
    />
  )
}
