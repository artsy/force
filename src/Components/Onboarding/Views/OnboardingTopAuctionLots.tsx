import { OnboardingMarketingCollectionQueryRenderer } from "Components/Onboarding/Components/OnboardingMarketingCollection"
import type { FC } from "react"

export const OnboardingTopAuctionLots: FC<
  React.PropsWithChildren<unknown>
> = () => {
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
