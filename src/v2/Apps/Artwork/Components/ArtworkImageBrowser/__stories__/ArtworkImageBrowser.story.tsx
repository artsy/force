import { Box, Col } from "@artsy/palette"
import { ArtworkImageBrowserQueryRenderer } from "v2/Apps/Artwork/Components/ArtworkImageBrowser"
import React from "react"
import { storiesOf } from "storybook/storiesOf"
import { Section } from "v2/Utils/Section"

storiesOf("Apps/Artwork/Components/ArtworkImageBrowser", module).add(
  "ArtworkBrowser",
  () => {
    return (
      <>
        <Section title="Multiple images (responsive)">
          <Box width={"100%"}>
            <ArtworkImageBrowserQueryRenderer artworkID="andy-warhol-lenin-fs-ii-dot-402-1" />
          </Box>
        </Section>
        <Section title="Single image">
          <Col sm="8">
            <ArtworkImageBrowserQueryRenderer artworkID="pablo-picasso-david-et-bethsabee" />
          </Col>
        </Section>
      </>
    )
  }
)
