import { OnboardingMarketingCollectionQueryRenderer } from "Components/Onboarding/Components/OnboardingMarketingCollection"
import type { FC } from "react"

export const OnboardingCuratedArtworks: FC<
  React.PropsWithChildren<unknown>
> = () => {
  return (
    <OnboardingMarketingCollectionQueryRenderer
      slug="curators-picks-emerging"
      description={<>Fresh standout works handpicked by our chief curator.</>}
    />
  )
}
