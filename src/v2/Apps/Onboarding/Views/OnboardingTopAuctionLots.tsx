import { FC } from "react"
import { OnboardingGeneQueryRenderer } from "v2/Apps/Onboarding/Components/OnboardingGene"

export const OnboardingTopAuctionLots: FC = () => {
  return (
    <OnboardingGeneQueryRenderer
      id="our-top-auction-lots"
      description={
        <>
          Follow for works by emerging and established market stars—now open for
          bidding. Click the heart to save artworks you love.
        </>
      }
    />
  )
}
