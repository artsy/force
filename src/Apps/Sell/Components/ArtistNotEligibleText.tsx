import { Spacer, Text } from "@artsy/palette"
import { RouterLink } from "System/Components/RouterLink"
import * as React from "react"

export const ArtistNotEligiblText: React.FC = () => {
  return (
    <Text mt={2} variant="sm">
      Try again with another artist or add your artwork to My Collection, your
      personal space to manage your collection, track demand for your artwork
      and see updates about the artist.
      <Spacer y={2} />
      If you'd like to know more, you can&nbsp;
      <RouterLink to="#">contact an advisor&nbsp;</RouterLink>
      or read about&nbsp;
      <RouterLink to="#">what our specialists are looking for</RouterLink>.
      <Spacer y={2} />
      After adding to My Collection, an Artsy Advisor will be in touch if there
      is an opportunity to sell your work in the future.
    </Text>
  )
}
