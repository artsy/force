import { FC } from "react"
import { OnboardingMarketingCollectionQueryRenderer } from "../Components/OnboardingMarketingCollection"

export const OnboardingCuratedArtworks: FC = () => {
  return (
    <OnboardingMarketingCollectionQueryRenderer
      slug="trove-editors-picks"
      description={
        <>
          Follow to see the best works on Artsy each week, all available now.
          Click the heart to save artworks you love.
        </>
      }
    />
  )
}
