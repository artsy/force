import React from "react"
import { withSystemContext } from "v2/System"
import { createFragmentContainer, graphql } from "react-relay"
import { ContextModule } from "@artsy/cohesion"
import { ArtistSeriesArtworkRailFragmentContainer as ArtistSeriesArtworkRail } from "v2/Apps/Artwork/Components/ArtworkArtistSeries/ArtistSeriesArtworkRail"
import { ArtistSeriesRailFragmentContainer as ArtistSeriesRail } from "v2/Components/ArtistSeriesRail/ArtistSeriesRail"
import { ArtworkArtistSeries_artwork } from "v2/__generated__/ArtworkArtistSeries_artwork.graphql"
import { Spacer } from "@artsy/palette"

interface ArtworkArtistSeriesProps {
  artwork: ArtworkArtistSeries_artwork
}

const ArtworkArtistSeries: React.FC<ArtworkArtistSeriesProps> = ({
  artwork,
}) => {
  const artworkArtistSeries = (artwork?.seriesForCounts?.edges ?? [])[0]?.node
  const artistArtistSeries = (artwork?.seriesArtist?.artistSeriesConnection
    ?.edges ?? [])[0]?.node

  if (!artworkArtistSeries && !artistArtistSeries) {
    return null
  }

  const hasArtistSeriesArtworks =
    artworkArtistSeries?.artworksCount && artworkArtistSeries?.artworksCount > 0

  return (
    <>
      {hasArtistSeriesArtworks && (
        <>
          <ArtistSeriesArtworkRail artwork={artwork} />
        </>
      )}

      {hasArtistSeriesArtworks && !!artistArtistSeries && <Spacer mt={6} />}

      {!!artistArtistSeries && (
        <>
          {artwork.seriesArtist && (
            <ArtistSeriesRail
              artist={artwork.seriesArtist}
              title="Series by this artist"
              contextModule={ContextModule.moreSeriesByThisArtist}
              showProgress
            />
          )}
        </>
      )}
    </>
  )
}

export const ArtworkArtistSeriesFragmentContainer = createFragmentContainer<{
  artwork: ArtworkArtistSeries_artwork
}>(withSystemContext(ArtworkArtistSeries), {
  artwork: graphql`
    fragment ArtworkArtistSeries_artwork on Artwork {
      ...ArtistSeriesArtworkRail_artwork
      internalID
      slug
      seriesArtist: artist(shallow: true) {
        # The below fragment is used for an exist-y check.
        # Since it repeats the 'artistSeriesConnection' selection
        # from the component that actually renders it, keep the arguments
        # the same (first: 50).
        artistSeriesConnection(first: 50) {
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
})
