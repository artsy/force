import { Join, Text, Image, Box, Flex, Spacer } from "@artsy/palette"
import React from "react"
import { extractNodes } from "v2/Utils/extractNodes"
import { ArtistArticlesRoute_artist } from "v2/__generated__/ArtistArticlesRoute_artist.graphql"
import { createRefetchContainer, graphql, RelayRefetchProp } from "react-relay"
import { PaginationFragmentContainer } from "v2/Components/Pagination"
import { Title } from "react-head"

const REFETCH_PAGE_SIZE = 10

interface ArtistArticlesRouteProps {
  artist: ArtistArticlesRoute_artist
  relay: RelayRefetchProp
}

const ArtistArticlesRoute: React.FC<ArtistArticlesRouteProps> = ({
  artist,
  relay,
}) => {
  const nodes = extractNodes(artist.articlesConnection)

  // TODO: ZeroState
  if (nodes.length === 0) {
    return null
  }

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  }

  const loadNext = () => {
    const { hasNextPage, endCursor } = artist.articlesConnection?.pageInfo!

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
      },
      null,
      error => {
        if (error) {
          console.error(error)
        }
      }
    )
  }

  return (
    <>
      <Title>{`${artist.name} - Articles`}</Title>

      <Text variant="xl" mb={6}>
        {artist.name} Articles
      </Text>

      <Join separator={<Spacer py={2} />}>
        {nodes.map(article => {
          return (
            <Flex justifyContent="space-between" width="100%">
              <Flex width="100%" flexDirection={["column", "column", "row"]}>
                <Box width={["100%", "100%", "20%"]}>
                  <Text variant="md">{article.publishedAt}</Text>
                </Box>
                <Spacer mb={1} />
                <Box width={["100%", "100%", "60%"]} pr={2}>
                  <Text variant={["md", "lg", "lg"]}>
                    {article.thumbnailTitle}
                  </Text>
                  <Spacer mb={1} />
                  <Text variant="md" color="black60">
                    {article.author?.name}
                  </Text>
                </Box>
              </Flex>
              <Box>
                <Image
                  key={article.thumbnailImage?.resized?.src!}
                  src={article.thumbnailImage?.resized?.src!}
                  srcSet={article.thumbnailImage?.resized?.srcSet}
                  width={[105, 210]}
                  height={[75, 150]}
                  style={{ objectFit: "cover" }}
                  lazyLoad
                />
              </Box>
            </Flex>
          )
        })}
      </Join>

      <PaginationFragmentContainer
        getHref={() => ""}
        pageCursors={artist?.articlesConnection?.pageCursors!}
        onClick={loadAfter}
        onNext={loadNext}
        hasNextPage={artist?.articlesConnection?.pageInfo.hasNextPage!}
      />
    </>
  )
}

export const ArtistArticlesRouteFragmentContainer = createRefetchContainer(
  ArtistArticlesRoute,
  {
    artist: graphql`
      fragment ArtistArticlesRoute_artist on Artist
        @argumentDefinitions(
          first: { type: "Int", defaultValue: 10 }
          last: { type: "Int" }
          after: { type: "String" }
          before: { type: "String" }
        ) {
        articlesConnection(
          first: $first
          after: $after
          before: $before
          last: $last
          sort: PUBLISHED_AT_DESC
          inEditorialFeed: true
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
              href
              thumbnailTitle
              author {
                name
              }
              publishedAt(format: "MMM Do, YYYY")
              thumbnailImage {
                resized(width: 210, height: 150) {
                  src
                  srcSet
                  width
                  height
                }
              }
              href
            }
          }
        }

        name
        slug
      }
    `,
  },
  graphql`
    query ArtistArticlesRouteQuery(
      $first: Int
      $last: Int
      $after: String
      $before: String
      $artistID: String!
    ) {
      artist(id: $artistID) {
        ...ArtistArticlesRoute_artist
          @arguments(first: $first, last: $last, after: $after, before: $before)
      }
    }
  `
)
