import { Box } from "@artsy/palette"
import React from "react"
import { storiesOf } from "storybook/storiesOf"
import { ArtworkFilterQueryRenderer } from "../v2/ArtworkFilter"

storiesOf("Components/ArtworkFilter", module).add("ArtworkFilter", () => {
  return (
    <Box p={4}>
      <ArtworkFilterQueryRenderer />
    </Box>
  )
})
