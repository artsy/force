import { ProgressBar } from "@artsy/palette"
import { FC } from "react"
import { useOnboardingContext } from "../useOnboardingContext"

export const OnboardingProgress: FC = () => {
  const { progress } = useOnboardingContext()

  return <ProgressBar my={0} percentComplete={progress} />
}
