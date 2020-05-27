import { Box, Col, Row } from "@artsy/palette"
import { ArtistArticles_artist } from "v2/__generated__/ArtistArticles_artist.graphql"
import { PaginationFragmentContainer as Pagination } from "v2/Components/Pagination"
import React, { Component } from "react"
import { RelayRefetchProp, createRefetchContainer, graphql } from "react-relay"
import styled from "styled-components"
import { ArticleItem } from "./ArtistArticle"

import { LoadingArea, LoadingAreaState } from "v2/Components/LoadingArea"

const PAGE_SIZE = 10

const Container = styled.div`
  &:last-child {
    border-bottom: none;
  }
`

interface ArtistArticlesProps {
  relay: RelayRefetchProp
  artist: ArtistArticles_artist
}

export class ArtistArticles extends Component<
  ArtistArticlesProps,
  LoadingAreaState
> {
  state = {
    isLoading: false,
  }

  loadNext = () => {
    const {
      artist: {
        articlesConnection: {
          pageInfo: { hasNextPage, endCursor },
        },
      },
    } = this.props

    if (hasNextPage) {
      this.loadAfter(endCursor)
    }
  }

  loadAfter = cursor => {
    this.toggleLoading(true)

    this.props.relay.refetch(
      {
        first: PAGE_SIZE,
        after: cursor,
        artistID: this.props.artist.slug,
        before: null,
        last: null,
      },
      null,
      error => {
        this.toggleLoading(false)

        if (error) {
          console.error(error)
        }
      }
    )
  }

  toggleLoading = isLoading => {
    this.setState({
      isLoading,
    })
  }

  render() {
    const articlesLength = this.props.artist.articlesConnection.edges.length
    return (
      <>
        <span id="jumpto--artistArticles" />

        <Row>
          <Col>
            <LoadingArea isLoading={this.state.isLoading}>
              <Container>
                {this.props.artist.articlesConnection.edges.map(
                  ({ node }, index) => {
                    return (
                      <ArticleItem
                        title={node.thumbnail_title}
                        imageUrl={node.thumbnail_image.resized.url}
                        date={node.published_at}
                        author={node.author.name}
                        href={node.href}
                        key={index}
                        lastChild={index === articlesLength - 1}
                      />
                    )
                  }
                )}
              </Container>
            </LoadingArea>
          </Col>
        </Row>
        <Row>
          <Col>
            <Box>
              <Pagination
                pageCursors={this.props.artist.articlesConnection.pageCursors}
                onClick={this.loadAfter}
                onNext={this.loadNext}
                scrollTo="#jumpto-ArtistHeader"
                hasNextPage={
                  this.props.artist.articlesConnection.pageInfo.hasNextPage
                }
              />
            </Box>
          </Col>
        </Row>
      </>
    )
  }
}

export const ArtistArticlesRefetchContainer = createRefetchContainer(
  ArtistArticles,
  {
    artist: graphql`
      fragment ArtistArticles_artist on Artist
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
        ...ArtistArticles_artist
          @arguments(first: $first, last: $last, after: $after, before: $before)
      }
    }
  `
)
