import React, { useEffect } from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { ArtistArtworkFilterRefetchContainer } from "./Components/ArtistArtworkFilter"
import { ArtistWorksForSaleRoute_artist$data } from "__generated__/ArtistWorksForSaleRoute_artist.graphql"
import { SharedArtworkFilterContextProps } from "Components/ArtworkFilter/ArtworkFilterContext"
import { ArtistSeriesRailFragmentContainer } from "Components/ArtistSeriesRail/ArtistSeriesRail"
import { ContextModule } from "@artsy/cohesion"
import { computeTitle } from "Apps/Artist/Utils/computeTitle"
import { Title } from "react-head"
import { useRouter } from "System/Router/useRouter"
import { useJump } from "Utils/Hooks/useJump"

interface ArtistWorksForSaleRouteProps {
  artist: ArtistWorksForSaleRoute_artist$data
}

const ArtistWorksForSaleRoute: React.FC<ArtistWorksForSaleRouteProps> = ({
  artist,
}) => {
  const title = computeTitle(
    artist.name!,
    artist?.counts?.forSaleArtworks!,
    true
  )
  const { match } = useRouter()

  const { jumpTo } = useJump({ behavior: "smooth", offset: 10 })

  useEffect(() => {
    if (!match?.location?.query?.search_criteria_id) return

    const timeout = setTimeout(() => {
      jumpTo("artworkFilter")
    }, 0)

    return () => {
      clearTimeout(timeout)
    }
  }, [jumpTo, match.location.query.search_criteria_id])

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
