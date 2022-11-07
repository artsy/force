import { FC } from "react"
import { OnboardingMarketingCollectionQueryRenderer } from "Components/Onboarding/Components/OnboardingMarketingCollection"

export const OnboardingCuratedArtworks: FC = () => {
  return (
    <OnboardingMarketingCollectionQueryRenderer
      slug="trove-editors-picks"
      description={
        <>
          The best works on Artsy each week, all available now. Click the heart
          to save artworks you love.
        </>
      }
    />
  )
}
