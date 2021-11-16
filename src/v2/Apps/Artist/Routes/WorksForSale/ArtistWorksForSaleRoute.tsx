import * as React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { ArtistArtworkFilterRefetchContainer } from "./Components/ArtistArtworkFilter"
import { ArtistWorksForSaleRoute_artist } from "v2/__generated__/ArtistWorksForSaleRoute_artist.graphql"
import { SharedArtworkFilterContextProps } from "v2/Components/ArtworkFilter/ArtworkFilterContext"
import { ArtistSeriesRailFragmentContainer } from "v2/Components/ArtistSeriesRail/ArtistSeriesRail"
import { ContextModule } from "@artsy/cohesion"
import { computeTitle } from "v2/Apps/Artist/Utils/computeTitle"
import { Title } from "react-head"

interface ArtistWorksForSaleRouteProps {
  artist: ArtistWorksForSaleRoute_artist
}

const ArtistWorksForSaleRoute: React.FC<ArtistWorksForSaleRouteProps> = ({
  artist,
}) => {
  const title = computeTitle(
    artist.name!,
    artist?.counts?.forSaleArtworks!,
    true
  )

  return (
    <>
      <Title>{title}</Title>

      <ArtistSeriesRailFragmentContainer
        artist={artist}
        contextModule={ContextModule.artistSeriesRail}
        showProgress
        mb={6}
      />
      <ArtistArtworkFilterRefetchContainer
        artist={artist}
        aggregations={
          artist.sidebarAggregations
            ?.aggregations as SharedArtworkFilterContextProps["aggregations"]
        }
      />
    </>
  )
}

export const ArtistWorksForSaleRouteFragmentContainer = createFragmentContainer(
  ArtistWorksForSaleRoute,
  {
    artist: graphql`
      fragment ArtistWorksForSaleRoute_artist on Artist
        @argumentDefinitions(
          aggregations: { type: "[ArtworkAggregation]" }
          input: { type: "FilterArtworksInput" }
        ) {
        ...ArtistSeriesRail_artist
        ...ArtistArtworkFilter_artist @arguments(input: $input)
        sidebarAggregations: filterArtworksConnection(
          aggregations: $aggregations
          first: 1
        ) {
          aggregations {
            slice
            counts {
              name
              value
              count
            }
          }
        }
        counts {
          forSaleArtworks
        }
        name
        internalID
        slug
        id
      }
    `,
  }
)
