import { OnboardingMarketingCollectionQueryRenderer } from "Components/Onboarding/Components/OnboardingMarketingCollection"
import type { FC } from "react"

export const OnboardingArtistsOnTheRise: FC<
  React.PropsWithChildren<unknown>
> = () => {
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
