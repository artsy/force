import { FC } from "react"
import { OnboardingGeneQueryRenderer } from "v2/Apps/Onboarding/Components/OnboardingGene"

export const OnboardingTopAuctionLots: FC = () => {
  return (
    <OnboardingGeneQueryRenderer
      id="our-top-auction-lots"
      description={
        <>
          Click the heart to save artworks you love.
          <br />
          Follow the collection to stay up-to-date with the latest auction lots.
        </>
      }
    />
  )
}
