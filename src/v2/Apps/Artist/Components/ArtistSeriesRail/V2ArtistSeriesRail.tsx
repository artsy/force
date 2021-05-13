import { Box, BoxProps, Sans } from "@artsy/palette"
import { Carousel } from "v2/Components/Carousel"
import React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { ArtistSeriesRail_artist } from "v2/__generated__/ArtistSeriesRail_artist.graphql"
import { V2ArtistSeriesItemFragmentContainer as ArtistSeriesItem } from "./V2ArtistSeriesItem"
import { ContextModule } from "@artsy/cohesion"

interface Props extends BoxProps {
  artist: ArtistSeriesRail_artist
  title?: string
  contextModule: ContextModule
}

/**
 * TODO: When this page is migrated to V3:
 * This component can be deleted and replaced with the V3 ArtistSeriesRail in
 * v2/Components/ArtistSeriesRail
 */
const V2ArtistSeriesRail: React.FC<Props> = props => {
  const { artist, contextModule, ...rest } = props

  if (!artist) return null

  const displayTitle = props.title ?? "Artist Series"

  const { artistSeriesConnection } = artist
  const edges = artistSeriesConnection && artistSeriesConnection.edges

  if (edges && edges.length) {
    return (
      <Box mb={3} {...rest}>
        <Sans size="4" color="black100" my={1}>
          {displayTitle}
        </Sans>

        <Carousel>
          {/* @ts-expect-error STRICT_NULL_CHECK */}
          {edges.map(({ node }, index) => {
            return (
              <ArtistSeriesItem
                key={node.internalID}
                lazyLoad={index > 5}
                artistSeries={node}
                index={index}
                contextModule={contextModule}
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

export const V2ArtistSeriesRailFragmentContainer = createFragmentContainer(
  V2ArtistSeriesRail as React.FC<Props>,
  {
    artist: graphql`
      fragment V2ArtistSeriesRail_artist on Artist {
        artistSeriesConnection(first: 50) {
          edges {
            node {
              internalID
              ...V2ArtistSeriesItem_artistSeries
            }
          }
        }
      }
    `,
  }
)
