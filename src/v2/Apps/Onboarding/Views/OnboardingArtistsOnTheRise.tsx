import { FC } from "react"
import { OnboardingGeneQueryRenderer } from "../Components/OnboardingGene"

export const OnboardingArtistsOnTheRise: FC = () => {
  return (
    <OnboardingGeneQueryRenderer
      id="artists-on-the-rise"
      description={
        <>
          Follow to see fresh works from the studios of up-and-coming artists in
          your home feed. Click the heart to save artworks you love.
        </>
      }
    />
  )
}
