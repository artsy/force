import { Column, GridColumns, Text } from "@artsy/palette"
import React from "react"
import {
  createFragmentContainer,
  createRefetchContainer,
  graphql,
} from "react-relay"

interface ArtistArticlesRouteProps {
  artist: any
}

const ArtistArticlesRoute: React.FC<ArtistArticlesRouteProps> = ({
  artist,
}) => {
  return (
    <>
      <Text variant="xl">{artist.name} Articles</Text>

      <GridColumns>
        <Column span={2}>Hi</Column>
        <Column span={4}>hello</Column>
        <Column span={4}>there</Column>
      </GridColumns>
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
        slug
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
              thumbnail_title: thumbnailTitle
              author {
                name
              }
              published_at: publishedAt(format: "MMM Do, YYYY")
              thumbnail_image: thumbnailImage {
                resized(width: 300) {
                  url
                }
              }
              href
            }
          }
        }
      }
    `,
  },
  graphql`
    query ArtistArticlesQuery(
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
