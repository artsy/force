import { Box, Skeleton, SkeletonBox, SkeletonText } from "@artsy/palette"
import * as React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { ArtistSeriesRail_artist$data } from "__generated__/ArtistSeriesRail_artist.graphql"
import { ArtistSeriesItemFragmentContainer as ArtistSeriesItem } from "./ArtistSeriesItem"
import { ContextModule } from "@artsy/cohesion"
import { extractNodes } from "Utils/extractNodes"
import { SpaceProps } from "styled-system"
import { Rail } from "Components/Rail/Rail"
import { SystemQueryRenderer } from "System/Relay/SystemQueryRenderer"
import { ArtistSeriesRailQuery } from "__generated__/ArtistSeriesRailQuery.graphql"

interface Props extends SpaceProps {
  artist: ArtistSeriesRail_artist$data
  title?: string
  contextModule: ContextModule
}

const ArtistSeriesRail: React.FC<Props> = ({
  artist,
  contextModule,
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

const ArtistSeriesRailPlaceholder = () => {
  return (
    <Skeleton>
      <Rail
        title="Artist Series"
        getItems={() => {
          return [...new Array(8)].map((_, i) => {
            return (
              <Box width={325} key={i}>
                <SkeletonBox width={325} height={244} />
                <SkeletonText variant="md">Example Series Name</SkeletonText>
                <SkeletonText variant="xs">3 items</SkeletonText>
              </Box>
            )
          })
        }}
      />
    </Skeleton>
  )
}

export const ArtistSeriesRailQueryRenderer: React.FC<{
  id: string
  title?: string
}> = ({ id, title }) => {
  return (
    <Box data-test="ArtistSeriesRailQueryRenderer">
      <SystemQueryRenderer<ArtistSeriesRailQuery>
        lazyLoad
        variables={{ id }}
        placeholder={<ArtistSeriesRailPlaceholder />}
        query={graphql`
          query ArtistSeriesRailQuery($id: String!) {
            artist(id: $id) {
              ...ArtistSeriesRail_artist
            }
          }
        `}
        render={({ error, props }) => {
          if (error) {
            console.error(error)
            return null
          }
          if (!props) {
            return <ArtistSeriesRailPlaceholder />
          }
          if (props.artist) {
            return (
              <ArtistSeriesRailFragmentContainer
                artist={props.artist}
                title={title}
                contextModule={ContextModule.artistSeriesRail}
              />
            )
          }
        }}
      />
    </Box>
  )
}
