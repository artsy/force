import React from "react"
import { withSystemContext } from "v2/Artsy"
import { createFragmentContainer, graphql } from "react-relay"
import { ContextModule, OwnerType } from "@artsy/cohesion"
import { ArtistSeriesArtworkRailFragmentContainer as ArtistSeriesArtworkRail } from "v2/Apps/Artwork/Components/ArtworkArtistSeries/ArtistSeriesArtworkRail"
import { ArtistSeriesRailFragmentContainer as ArtistSeriesRail } from "v2/Components/ArtistSeriesRail/ArtistSeriesRail"
import { ArtworkArtistSeries_artwork } from "v2/__generated__/ArtworkArtistSeries_artwork.graphql"
import { Separator, Spacer } from "@artsy/palette"

interface ArtworkArtistSeriesProps {
  artwork: ArtworkArtistSeries_artwork
}

const ArtworkArtistSeries: React.FC<ArtworkArtistSeriesProps> = props => {
  const { artwork } = props
  const artistSeries = artwork?.seriesForCounts?.edges[0]?.node

  if (!artistSeries) {
    return null
  }

  const hasArtistSeriesArtworks =
    artistSeries.artworksCount && artistSeries.artworksCount > 0

  return (
    <>
      {hasArtistSeriesArtworks && (
        <>
          <Separator my={3} />
          <ArtistSeriesArtworkRail artwork={props.artwork} />
        </>
      )}

      {artistSeries && (
        <>
          {!hasArtistSeriesArtworks && <Separator mt={3} />}
          <Spacer my={3} />
          <ArtistSeriesRail
            artist={artwork.seriesArtist}
            title="Series by this artist"
            contextPageOwnerId={artwork.internalID}
            contextPageOwnerSlug={artwork.slug}
            contextModule={ContextModule.moreSeriesByThisArtist}
            contextPageOwnerType={OwnerType.artwork}
          />
        </>
      )}

      {(artistSeries || artistSeries.artworksCount) && <Spacer my={6} />}
    </>
  )
}

export const ArtworkArtistSeriesFragmentContainer = createFragmentContainer<{
  artwork: ArtworkArtistSeries_artwork
}>(withSystemContext(ArtworkArtistSeries), {
  artwork: graphql`
    fragment ArtworkArtistSeries_artwork on Artwork
      @argumentDefinitions(
        shouldFetchArtistSeriesData: { type: "Boolean!", defaultValue: false }
      ) {
      ...ArtistSeriesArtworkRail_artwork
        @include(if: $shouldFetchArtistSeriesData)
      internalID
      slug
      seriesArtist: artist(shallow: true) {
        ...ArtistSeriesRail_artist @include(if: $shouldFetchArtistSeriesData)
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
