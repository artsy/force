import { FC } from "react"
import { OnboardingMarketingCollectionQueryRenderer } from "Components/Onboarding/Components/OnboardingMarketingCollection"

export const OnboardingTopAuctionLots: FC = () => {
  return (
    <OnboardingMarketingCollectionQueryRenderer
      slug="top-auction-lots"
      description={
        <>
          Works by emerging and established market stars—now open for bidding.
          Click the heart to save artworks you love.
        </>
      }
    />
  )
}
