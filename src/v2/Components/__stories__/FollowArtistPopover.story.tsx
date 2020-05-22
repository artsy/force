import React from "react"
import { storiesOf } from "storybook/storiesOf"

import { SystemContextProvider } from "v2/Artsy"
import { FollowArtistPopoverQueryRenderer } from "v2/Components/FollowArtistPopover"

storiesOf("Components/FollowArtistPopover", module).add("Pablo Picasso", () => {
  return (
    <SystemContextProvider>
      <FollowArtistPopoverQueryRenderer artistID="pablo-picasso" />
    </SystemContextProvider>
  )
})
