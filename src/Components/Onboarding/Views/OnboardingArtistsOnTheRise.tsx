import { FC } from "react"
import { OnboardingMarketingCollectionQueryRenderer } from "Components/Onboarding/Components/OnboardingMarketingCollection"

export const OnboardingArtistsOnTheRise: FC = () => {
  return (
    <OnboardingMarketingCollectionQueryRenderer
      slug="artists-on-the-rise"
      description={
        <>
          Fresh works from the studios of up-and-coming artists in your home
          feed. Click the heart to save artworks you love.
        </>
      }
    />
  )
}
