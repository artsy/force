import * as React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { ContextModule } from "@artsy/cohesion"
import { ArtistSeriesArtworkRailFragmentContainer as ArtistSeriesArtworkRail } from "Apps/Artwork/Components/ArtworkArtistSeries/ArtistSeriesArtworkRail"
import { ArtistSeriesRailFragmentContainer as ArtistSeriesRail } from "Components/ArtistSeriesRail/ArtistSeriesRail"
import { ArtworkArtistSeries_artwork$data } from "__generated__/ArtworkArtistSeries_artwork.graphql"
import { Skeleton, SkeletonBox, SkeletonText, Spacer } from "@artsy/palette"
import { SystemQueryRenderer } from "System/Relay/SystemQueryRenderer"
import { ArtworkArtistSeriesQuery } from "__generated__/ArtworkArtistSeriesQuery.graphql"
import { useSystemContext } from "System/Hooks/useSystemContext"
import { Rail } from "Components/Rail/Rail"
import { withSystemContext } from "System/Contexts/SystemContext"

interface ArtworkArtistSeriesProps {
  artwork: ArtworkArtistSeries_artwork$data
}

const ArtworkArtistSeries: React.FC<ArtworkArtistSeriesProps> = ({
  artwork,
}) => {
  const artworkArtistSeries = (artwork?.seriesForCounts?.edges ?? [])[0]?.node
  const artistArtistSeries = (artwork?.seriesArtist?.artistSeriesConnection
    ?.edges ?? [])[0]?.node

  if (!artworkArtistSeries && !artistArtistSeries) return null

  const hasArtistSeriesArtworks =
    artworkArtistSeries?.artworksCount && artworkArtistSeries?.artworksCount > 0

  return (
    <>
      {hasArtistSeriesArtworks && <ArtistSeriesArtworkRail artwork={artwork} />}

      {hasArtistSeriesArtworks && !!artistArtistSeries && <Spacer y={6} />}

      {!!artistArtistSeries && artwork.seriesArtist && (
        <ArtistSeriesRail
          artist={artwork.seriesArtist}
          title="Series by this artist"
          contextModule={ContextModule.moreSeriesByThisArtist}
        />
      )}
    </>
  )
}

export const ArtworkArtistSeriesFragmentContainer = createFragmentContainer(
  withSystemContext(ArtworkArtistSeries),
  {
    artwork: graphql`
      fragment ArtworkArtistSeries_artwork on Artwork {
        ...ArtistSeriesArtworkRail_artwork
        internalID
        slug
        seriesArtist: artist(shallow: true) {
          # The below fragment is used for an exist-y check.
          # Since it repeats the 'artistSeriesConnection' selection
          # from the component that actually renders it, keep the arguments
          # the same (first: 12).
          artistSeriesConnection(first: 12) {
            edges {
              node {
                internalID
              }
            }
          }
          ...ArtistSeriesRail_artist
        }
        seriesForCounts: artistSeriesConnection(first: 1) {
          edges {
            node {
              artworksCount
            }
          }
        }
      }
    `,
  }
)

const PLACEHOLDER = (
  <Skeleton>
    <Rail
      title="Artist Series"
      getItems={() => {
        return [...new Array(10)].map((_, i) => {
          return (
            <React.Fragment key={i}>
              <SkeletonBox width={325} height={244} />
              <SkeletonText
                variant="sm-display"
                mt={1}
                overflowEllipsis
                maxWidth={300}
              >
                Portraits of Artists and Sculptors
              </SkeletonText>
              <SkeletonText variant="sm-display">113 available</SkeletonText>
            </React.Fragment>
          )
        })
      }}
    />
  </Skeleton>
)

export const ArtworkArtistSeriesQueryRenderer: React.FC<{
  slug: string
}> = ({ slug }) => {
  const { relayEnvironment } = useSystemContext()

  return (
    <SystemQueryRenderer<ArtworkArtistSeriesQuery>
      lazyLoad
      environment={relayEnvironment}
      variables={{ slug }}
      placeholder={PLACEHOLDER}
      query={graphql`
        query ArtworkArtistSeriesQuery($slug: String!) {
          artwork(id: $slug) {
            ...ArtworkArtistSeries_artwork
          }
        }
      `}
      render={({ error, props }) => {
        if (error) {
          console.error(error)
          return null
        }
        if (!props) {
          return PLACEHOLDER
        }
        if (props.artwork) {
          return (
            <ArtworkArtistSeriesFragmentContainer artwork={props.artwork} />
          )
        }
      }}
    />
  )
}
