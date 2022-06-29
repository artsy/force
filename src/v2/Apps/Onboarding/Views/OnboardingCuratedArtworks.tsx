import { FC } from "react"
import { OnboardingGeneQueryRenderer } from "../Components/OnboardingGene"

export const OnboardingCuratedArtworks: FC = () => {
  return (
    <OnboardingGeneQueryRenderer
      id="trove"
      description={
        <>
          Save artworks to your profile by clicking the heart.
          <br />
          Follow the collection to stay up-to-date with emerging and
          sought-after artists.
        </>
      }
    />
  )
}
