import { Box } from "@artsy/palette"
import { ArtistRecommendationsQueryRenderer as ArtistRecommendations } from "v2/Apps/Artist/Routes/Overview/Components/ArtistRecommendations"
import React from "react"
import { storiesOf } from "storybook/storiesOf"

storiesOf("Apps/Artist/Components", module).add(
  "Artist Recommendations",
  () => {
    return (
      <Box m={3}>
        <ArtistRecommendations artistID="pablo-picasso" />
      </Box>
    )
  }
)
