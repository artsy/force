import { Box } from "@artsy/palette"
import React from "react"
import { storiesOf } from "storybook/storiesOf"
import { Section } from "v2/Utils/Section"
import { ArtistInfoQueryRenderer } from "../ArtistInfo"

storiesOf("Apps/Artwork/Components", module).add("ArtistInfo", () => {
  return (
    <React.Fragment>
      <Section title="ArtistInfoQueryRenderer">
        <Box width="100%">
          <ArtistInfoQueryRenderer artistID="pablo-picasso" />
        </Box>
      </Section>
      <Section title="Artist with little content">
        <Box width="100%">
          <ArtistInfoQueryRenderer artistID="chonat-getz" />
        </Box>
      </Section>
    </React.Fragment>
  )
})
