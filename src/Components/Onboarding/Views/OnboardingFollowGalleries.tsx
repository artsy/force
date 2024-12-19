import type { FC } from "react"
import { OnboardingFollows } from "Components/Onboarding/Components/OnboardingFollows"

export const OnboardingFollowGalleries: FC<
  React.PropsWithChildren<unknown>
> = () => {
  return <OnboardingFollows kind="galleries" />
}
