import React, { useEffect } from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { ArtistArtworkFilterRefetchContainer } from "./Components/ArtistArtworkFilter"
import { ArtistWorksForSaleRoute_artist$data } from "v2/__generated__/ArtistWorksForSaleRoute_artist.graphql"
import { SharedArtworkFilterContextProps } from "v2/Components/ArtworkFilter/ArtworkFilterContext"
import { ArtistSeriesRailFragmentContainer } from "v2/Components/ArtistSeriesRail/ArtistSeriesRail"
import { ContextModule } from "@artsy/cohesion"
import { computeTitle } from "v2/Apps/Artist/Utils/computeTitle"
import { Title } from "react-head"
import { useScrollTo } from "v2/Utils/Hooks/useScrollTo"
import { useRouter } from "v2/System/Router/useRouter"

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
  const { scrollTo, isReadyForUse } = useScrollTo({
    selectorOrRef: "#jump--artworkFilter",
    behavior: "smooth",
    offset: 10,
  })

  /**
   * We should perform scroll only when isReadyForUse is true
   * Otherwise the wrong offset will be used for mWeb
   *
   * scrollTo without requestAnimationFrame doesn't work in Safari
   * when it is used in useEffect hook
   */
  useEffect(() => {
    if (isReadyForUse && match?.location?.query?.search_criteria_id) {
      requestAnimationFrame(() => {
        scrollTo()
      })
    }
  }, [isReadyForUse])

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
