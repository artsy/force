import { FC } from "react"
import { OnboardingMarketingCollectionQueryRenderer } from "Components/Onboarding/Components/OnboardingMarketingCollection"

export const OnboardingCuratedArtworks: FC = () => {
  return (
    <OnboardingMarketingCollectionQueryRenderer
      slug="curators-picks-emerging"
      description={
        <>The best works by rising talents on Artsy, all available now.</>
      }
    />
  )
}
