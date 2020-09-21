import { Box, Sans } from "@artsy/palette"
import { Carousel } from "v2/Components/Carousel"
import React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { ArtistSeriesRail_artist } from "v2/__generated__/ArtistSeriesRail_artist.graphql"
import { ArtistSeriesItemFragmentContainer as ArtistSeriesItem } from "./ArtistSeriesItem"
import { ContextModule, PageOwnerType } from "@artsy/cohesion"

interface Props {
  artist: ArtistSeriesRail_artist
  title?: string
  contextPageOwnerId: string
  contextPageOwnerSlug: string
  contextModule: ContextModule
  contextPageOwnerType: PageOwnerType
}

const ArtistSeriesRail: React.FC<Props> = props => {
  const {
    artist,
    contextPageOwnerId,
    contextPageOwnerSlug,
    contextModule,
    contextPageOwnerType,
  } = props

  if (!artist) return null

  const displayTitle = props.title ?? "Artist Series"

  const { artistSeriesConnection } = artist
  const edges = artistSeriesConnection && artistSeriesConnection.edges

  if (edges && edges.length) {
    return (
      <Box mb={3}>
        <Sans size="4" color="black100" my={1}>
          {displayTitle}
        </Sans>

        <Carousel>
          {edges.map(({ node }, index) => {
            return (
              <ArtistSeriesItem
                key={node.internalID}
                contextPageOwnerSlug={contextPageOwnerSlug}
                contextPageOwnerId={contextPageOwnerId}
                lazyLoad={index > 5}
                artistSeries={node}
                index={index}
                contextModule={contextModule}
                contextPageOwnerType={contextPageOwnerType}
              />
            )
          })}
        </Carousel>
      </Box>
    )
  } else {
    return null
  }
}

export const ArtistSeriesRailFragmentContainer = createFragmentContainer(
  ArtistSeriesRail,
  {
    artist: graphql`
      fragment ArtistSeriesRail_artist on Artist {
        artistSeriesConnection(first: 50) {
          edges {
            node {
              internalID
              ...ArtistSeriesItem_artistSeries
            }
          }
        }
      }
    `,
  }
)
