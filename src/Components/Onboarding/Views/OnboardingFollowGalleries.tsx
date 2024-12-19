import { OnboardingFollows } from "Components/Onboarding/Components/OnboardingFollows"
import type { FC } from "react"

export const OnboardingFollowGalleries: FC<
  React.PropsWithChildren<unknown>
> = () => {
  return <OnboardingFollows kind="galleries" />
}
