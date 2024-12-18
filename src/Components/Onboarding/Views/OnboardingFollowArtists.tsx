import { FC } from "react"
import { OnboardingFollows } from "Components/Onboarding/Components/OnboardingFollows"

export const OnboardingFollowArtists: FC<
  React.PropsWithChildren<unknown>
> = () => {
  return <OnboardingFollows kind="artists" />
}
