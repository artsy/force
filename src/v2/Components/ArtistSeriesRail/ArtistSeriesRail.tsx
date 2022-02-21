import { Box } from "@artsy/palette"
import * as React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { ArtistSeriesRail_artist$data } from "v2/__generated__/ArtistSeriesRail_artist.graphql"
import { ArtistSeriesItemFragmentContainer as ArtistSeriesItem } from "./ArtistSeriesItem"
import { ContextModule } from "@artsy/cohesion"
import { extractNodes } from "v2/Utils/extractNodes"
import { SpaceProps } from "styled-system"
import { Rail } from "../Rail"

interface Props extends SpaceProps {
  artist: ArtistSeriesRail_artist$data
  showProgress?: boolean
  title?: string
  contextModule: ContextModule
}

const ArtistSeriesRail: React.FC<Props> = ({
  artist,
  contextModule,
  showProgress = false,
  title,
  ...rest
}) => {
  if (!artist) return null

  const { artistSeriesConnection } = artist
  const series = extractNodes(artistSeriesConnection)

  if (series.length === 0) {
    return null
  }

  return (
    <Box {...rest}>
      <Rail
        title={title ?? "Artist Series"}
        getItems={() => {
          return series.map((node, index) => {
            return (
              <ArtistSeriesItem
                key={node.internalID}
                artistSeries={node}
                index={index}
                contextModule={contextModule}
              />
            )
          })
        }}
      />
    </Box>
  )
}

export const ArtistSeriesRailFragmentContainer = createFragmentContainer(
  ArtistSeriesRail as React.FC<Props>,
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
