import { Text } from "@artsy/palette"
import { Component } from "react"
import { createFragmentContainer, graphql } from "react-relay"

import { ArtworkSidebarTitleInfo_artwork } from "v2/__generated__/ArtworkSidebarTitleInfo_artwork.graphql"

export interface ArtworkSidebarTitleInfoProps {
  artwork: ArtworkSidebarTitleInfo_artwork
}

export class ArtworkSidebarTitleInfo extends Component<
  ArtworkSidebarTitleInfoProps
> {
  render() {
    const { artwork } = this.props

    return (
      <>
        <Text variant="lg-display" as="h1" color="black60" mb={0.5}>
          <i>{artwork.title?.trim()}</i>
          {artwork.date &&
            artwork.date.replace(/\s+/g, "").length > 0 &&
            ", " + artwork.date}
        </Text>

        {artwork.medium && <Text variant="sm-display">{artwork.medium}</Text>}
      </>
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
