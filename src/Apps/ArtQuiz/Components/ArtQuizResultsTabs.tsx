import { ArtQuizLikedArtworksQueryRenderer } from "Apps/ArtQuiz/Components/ArtQuizLikedArtworks"
import { ArtQuizRecommendedArtistsQueryRenderer } from "Apps/ArtQuiz/Components/ArtQuizRecommendedArtists"
import { ArtQuizResultsRecommendedArtworksQueryRenderer } from "Apps/ArtQuiz/Components/ArtQuizResultsRecommendedArtworks"
import { TriggerCampaignButton } from "Apps/ArtQuiz/Components/TriggerCampaignButton"
import { Spacer, Tab, Tabs, Text } from "@artsy/palette"
import type { FC } from "react"

export const ArtQuizResultsTabs: FC<React.PropsWithChildren<unknown>> = () => {
  return (
    <>
      <Spacer y={[4, 6]} />

      <Text variant={["lg", "xl"]}>Explore Art We Think You’ll Love</Text>

      <Spacer y={[0, 1]} />

      <Text color="mono60" variant={["sm", "md"]}>
        Based on your responses, we think you’ll enjoy these artworks and
        artists. Keep saving and following to continue tailoring Artsy to you.
      </Text>

      <Spacer y={[2, 4]} />

      <TriggerCampaignButton />

      <Spacer y={[4, 6]} />

      <Tabs fill>
        <Tab name="Works You Liked">
          <ArtQuizLikedArtworksQueryRenderer />
        </Tab>

        <Tab name="Works for You">
          <ArtQuizResultsRecommendedArtworksQueryRenderer />
        </Tab>

        <Tab name="Artists for You">
          <Spacer y={4} />

          <ArtQuizRecommendedArtistsQueryRenderer />
        </Tab>
      </Tabs>

      <Spacer y={[4, 6]} />
    </>
  )
}
