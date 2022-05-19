import { Text, Flex, Box, Image } from "@artsy/palette"
import * as React from "react"
import { createRefetchContainer, graphql, RelayRefetchProp } from "react-relay"
import { extractNodes } from "v2/Utils/extractNodes"
import { ArtistShowsGroup_artist } from "v2/__generated__/ArtistShowsGroup_artist.graphql"
import { PaginationFragmentContainer } from "v2/Components/Pagination"

const REFETCH_PAGE_SIZE = 10

interface ArtistShowsGroupProps {
  artist: ArtistShowsGroup_artist
  relay: RelayRefetchProp
  title: string
  sort: string
  status: string
}

const ArtistShowsGroup: React.FC<ArtistShowsGroupProps> = ({
  artist,
  relay,
  sort,
  status,
}) => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  }

  const loadNext = () => {
    const { hasNextPage, endCursor } = artist.showsConnection?.pageInfo!

    if (hasNextPage) {
      scrollToTop()
      loadAfter(endCursor)
    }
  }

  const loadAfter = cursor => {
    scrollToTop()
    relay.refetch(
      {
        first: REFETCH_PAGE_SIZE,
        after: cursor,
        artistID: artist.slug,
        before: null,
        last: null,
        status,
        sort,
      },
      null,
      error => {
        if (error) {
          console.error(error)
        }
      }
    )
  }

  const nodes = extractNodes(artist.showsConnection)

  if (nodes.length === 0) {
    return null
  }

  return (
    <>
      <Text variant="xl" mb={6}>
        Upcoming Shows
      </Text>

      <Flex flexWrap="wrap" justifyContent="space-between">
        {nodes.map(show => {
          return (
            <Box width={["100%", "32%"]} mb={4}>
              <Box>
                <Image
                  key={show.coverImage?.cropped?.src!}
                  src={show.coverImage?.cropped?.src!}
                  srcSet={show.coverImage?.cropped?.srcSet}
                  width={"100%"}
                  height={"auto"}
                  style={{ objectFit: "cover" }}
                  lazyLoad
                />
              </Box>
              <Text variant="lg-display">{show.name}</Text>
              {show?.partner?.name && (
                <Text variant="sm">{show.partner.name}</Text>
              )}
              <Text variant="sm">{show.exhibitionPeriod}</Text>
            </Box>
          )
        })}
      </Flex>

      <PaginationFragmentContainer
        getHref={() => ""}
        pageCursors={artist?.showsConnection?.pageCursors!}
        onClick={loadAfter}
        onNext={loadNext}
        hasNextPage={artist?.showsConnection?.pageInfo.hasNextPage!}
      />
    </>
  )
}

export const ArtistShowsGroupRefetchContainer = createRefetchContainer(
  ArtistShowsGroup,
  {
    artist: graphql`
      fragment ArtistShowsGroup_artist on Artist
        @argumentDefinitions(
          first: { type: "Int", defaultValue: 10 }
          last: { type: "Int" }
          after: { type: "String" }
          before: { type: "String" }
          sort: { type: "ShowSorts" }
          status: { type: "String" }
        ) {
        slug
        showsConnection(
          first: $first
          after: $after
          before: $before
          last: $last
          sort: $sort
          status: $status
        ) {
          pageInfo {
            hasNextPage
            endCursor
          }
          pageCursors {
            ...Pagination_pageCursors
          }
          edges {
            node {
              partner {
                ... on ExternalPartner {
                  name
                }
                ... on Partner {
                  name
                }
              }
              name
              href
              exhibitionPeriod
              coverImage {
                cropped(width: 440, height: 315) {
                  src
                  srcSet
                }
              }
              city
            }
          }
        }
      }
    `,
  },
  graphql`
    query ArtistShowsGroupQuery(
      $first: Int
      $last: Int
      $after: String
      $before: String
      $artistID: String!
      $sort: ShowSorts
      $status: String!
    ) {
      artist(id: $artistID) {
        ...ArtistShowsGroup_artist
          @arguments(
            sort: $sort
            first: $first
            last: $last
            after: $after
            before: $before
            status: $status
          )
      }
    }
  `
)
