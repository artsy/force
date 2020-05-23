import { Box, Theme } from "@artsy/palette"
import { ArtistCollectionsRailContent as ArtistCollectionsRail } from "v2/Apps/Artist/Components/ArtistCollectionsRail"
import React from "react"
import { storiesOf } from "storybook/storiesOf"

storiesOf("Apps/Artist/Components/ArtistCollectionsRail", module).add(
  "Artist Collections Rail",
  () => (
    <Theme>
      <Box maxWidth={1192} px={4}>
        <ArtistCollectionsRail artistID="4d8b92b34eb68a1b2c0003f4" />
        <ArtistCollectionsRail artistID="4db443766c0cee66480004ca" />
        <ArtistCollectionsRail artistID="4d8d12a3876c697ae1000059" />
      </Box>
    </Theme>
  )
)
