import React, { useEffect } from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { ArtistArtworkFilterRefetchContainer } from "./Components/ArtistArtworkFilter"
import { ArtistWorksForSaleRoute_artist$data } from "__generated__/ArtistWorksForSaleRoute_artist.graphql"
import { SharedArtworkFilterContextProps } from "Components/ArtworkFilter/ArtworkFilterContext"
import { Title, Meta } from "react-head"
import { useRouter } from "System/Router/useRouter"
import { useJump } from "Utils/Hooks/useJump"

interface ArtistWorksForSaleRouteProps {
  artist: ArtistWorksForSaleRoute_artist$data
}

const ArtistWorksForSaleRoute: React.FC<ArtistWorksForSaleRouteProps> = ({
  artist,
}) => {
  const { match } = useRouter()
  const { title, description } = artist.meta

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
      <Meta name="title" content={title} />
      <Meta name="description" content={description} />

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
        ...ArtistArtworkFilter_artist @arguments(input: $input)
        meta(page: ARTWORKS) {
          description
          title
        }
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
      }
    `,
  }
)
