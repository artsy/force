import { Box, Text } from "@artsy/palette"
import React from "react"
import { createFragmentContainer, graphql } from "react-relay"

import { ArtworkSidebarTitleInfo_artwork } from "v2/__generated__/ArtworkSidebarTitleInfo_artwork.graphql"

export interface ArtworkSidebarTitleInfoProps {
  artwork: ArtworkSidebarTitleInfo_artwork
}

export class ArtworkSidebarTitleInfo extends React.Component<
  ArtworkSidebarTitleInfoProps
> {
  render() {
    const { artwork } = this.props
    return (
      <Box color="black60">
        <Text variant="caption" as="h2">
          <i>{artwork.title}</i>
          {artwork.date &&
            artwork.date.replace(/\s+/g, "").length > 0 &&
            ", " + artwork.date}
        </Text>
        {artwork.medium && <Text variant="caption">{artwork.medium}</Text>}
      </Box>
    )
  }
}

export const ArtworkSidebarTitleInfoFragmentContainer = createFragmentContainer(
  ArtworkSidebarTitleInfo,
  {
    artwork: graphql`
      fragment ArtworkSidebarTitleInfo_artwork on Artwork {
        title
        date
        medium
      }
    `,
  }
)
