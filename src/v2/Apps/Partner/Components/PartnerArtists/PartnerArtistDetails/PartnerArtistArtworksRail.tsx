import { useEffect, useState } from "react"
import * as React from "react"
import { Carousel } from "v2/Components/Carousel"
import {
  createPaginationContainer,
  graphql,
  RelayPaginationProp,
} from "react-relay"
import { PartnerArtistArtworksRail_partnerArtist$data } from "v2/__generated__/PartnerArtistArtworksRail_partnerArtist.graphql"
import { extractNodes } from "v2/Utils/extractNodes"
import FillwidthItem from "v2/Components/Artwork/FillwidthItem"
import { PartnerArtistArtworkCarouselItemPlaceholder } from "./PartnerArtistDetailsPlaceholder"

export interface PartnerArtistArtworksRailProps {
  partnerArtist: PartnerArtistArtworksRail_partnerArtist$data
  partnerId: string
  artistId: string
  relay: RelayPaginationProp
}

const PAGE_SIZE = 12

export const PartnerArtistArtworksRail: React.FC<PartnerArtistArtworksRailProps> = ({
  partnerArtist,
  relay,
}) => {
  const artworks = extractNodes(partnerArtist.artworksConnection)

  const [isLoading, setIsLoading] = useState(false)
  const [page, setPage] = useState(0)
  const [pageCount, setPageCount] = useState(0)

  useEffect(() => {
    // check that the current page is close to the end of the carousel
    if (relay.hasMore() && pageCount > 0 && pageCount - (page + 1) <= 1) {
      loadMore()
    }
  }, [page, pageCount])

  const loadMore = () => {
    if (!relay.hasMore() || relay.isLoading()) return

    setIsLoading(true)
    relay.loadMore(PAGE_SIZE, error => {
      if (error) console.error(error)

      setIsLoading(false)
    })
  }

  return (
    <Carousel
      onChange={setPage}
      onPageCountChange={setPageCount}
      arrowHeight={160}
    >
      {artworks
        .map(artwork => {
          return (
            <FillwidthItem
              key={artwork.id}
              artwork={artwork}
              imageHeight={160}
              lazyLoad
              // @ts-ignore TODO: Add relevant contextModule
              contextModule={null}
            />
          )
        })
        .concat(
          isLoading
            ? [
                <PartnerArtistArtworkCarouselItemPlaceholder key="artwork-placeholder" />,
              ]
            : []
        )}
    </Carousel>
  )
}

export const ARTISTS_ARTWORKS_QUERY = graphql`
  query PartnerArtistArtworksRailQuery(
    $partnerId: String!
    $artistId: String!
    $first: Int
    $after: String
  ) {
    partner(id: $partnerId) {
      artistsConnection(artistIDs: [$artistId], first: 1) {
        edges {
          ...PartnerArtistArtworksRail_partnerArtist
            @arguments(first: $first, after: $after)
        }
      }
    }
  }
`

export const PartnerArtistArtworksRailPaginationContainer = createPaginationContainer(
  PartnerArtistArtworksRail,
  {
    partnerArtist: graphql`
      fragment PartnerArtistArtworksRail_partnerArtist on ArtistPartnerEdge
        @argumentDefinitions(
          first: { type: "Int", defaultValue: 12 }
          after: { type: "String" }
        ) {
        artworksConnection(first: $first, after: $after)
          @connection(key: "PartnerArtistArtworksRail_artworksConnection") {
          edges {
            node {
              id
              ...FillwidthItem_artwork
            }
          }
        }
      }
    `,
  },
  {
    query: ARTISTS_ARTWORKS_QUERY,
    direction: "forward",
    getVariables({ partnerId, artistId }, { cursor: after }, { first }) {
      return { partnerId, artistId, after, first }
    },
  }
)
