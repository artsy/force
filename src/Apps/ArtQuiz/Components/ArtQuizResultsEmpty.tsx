import { ArtQuizTrendingArtistsQueryRenderer } from "Apps/ArtQuiz/Components/ArtQuizTrendingArtists"
import { ArtQuizTrendingCollectionsQueryRenderer } from "Apps/ArtQuiz/Components/ArtQuizTrendingCollections"
import { Spacer, Tab, Tabs, Text } from "@artsy/palette"
import type { FC } from "react"

export const ArtQuizResultsEmpty: FC<React.PropsWithChildren<unknown>> = () => {
  return (
    <>
      <Spacer y={[4, 6]} />

      <Text variant={["lg-display", "xl"]}>
        Explore Trending Collections and Artists
      </Text>

      <Spacer y={[0, 1]} />

      <Text color="mono60" variant={["lg-display", "md"]}>
        There are almost 2 million artworks on Artsy—keep exploring to find
        something you love.
      </Text>

      <Spacer y={[4, 6]} />

      <Tabs fill>
        <Tab name="Trending Collections">
          <Spacer y={4} />

          <ArtQuizTrendingCollectionsQueryRenderer />
        </Tab>

        <Tab name="Trending Artists">
          <Spacer y={4} />

          <ArtQuizTrendingArtistsQueryRenderer />
        </Tab>
      </Tabs>

      <Spacer y={[4, 6]} />
    </>
  )
}
