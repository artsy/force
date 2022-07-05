import { FC } from "react"
import { OnboardingGeneQueryRenderer } from "../Components/OnboardingGene"

export const OnboardingCuratedArtworks: FC = () => {
  return (
    <OnboardingGeneQueryRenderer
      id="trove"
      description={
        <>
          Follow to see the best works on Artsy each week, all available now.
          <br />
          Click the heart to save artworks you love.
        </>
      }
    />
  )
}
