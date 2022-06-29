import { FC } from "react"
import { OnboardingGeneQueryRenderer } from "../Components/OnboardingGene"

export const OnboardingArtistsOnTheRise: FC = () => {
  return (
    <OnboardingGeneQueryRenderer
      id="artists-on-the-rise"
      description={
        <>
          Click the heart to save artworks you love.
          <br />
          Follow the collection to stay up-to-date with artists on the rise.
        </>
      }
    />
  )
}
