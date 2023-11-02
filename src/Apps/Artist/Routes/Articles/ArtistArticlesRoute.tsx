import { Text, Spacer, Column, GridColumns, Message } from "@artsy/palette"
import * as React from "react"
import { extractNodes } from "Utils/extractNodes"
import { ArtistArticlesRoute_artist$data } from "__generated__/ArtistArticlesRoute_artist.graphql"
import { createRefetchContainer, graphql, RelayRefetchProp } from "react-relay"
import { PaginationFragmentContainer } from "Components/Pagination"
import { Title } from "react-head"
import { Jump } from "Utils/Hooks/useJump"
import { CellArticleFragmentContainer } from "Components/Cells/CellArticle"
import { LoadingArea } from "Components/LoadingArea"
import { useState } from "react"

interface ArtistArticlesRouteProps {
  artist: ArtistArticlesRoute_artist$data
  relay: RelayRefetchProp
}

const ArtistArticlesRoute: React.FC<ArtistArticlesRouteProps> = ({
  artist,
  relay,
}) => {
  const [isLoading, setIsLoading] = useState(false)

  const articles = extractNodes(artist.articlesConnection)

  if (articles.length === 0) {
    return <Message>There aren’t any articles at this time.</Message>
  }

  const handleNext = (page: number) => {
    handleClick(null, page)
  }

  const handleClick = (_cursor: string | null, page: number) => {
    setIsLoading(true)

    relay.refetch({ artistID: artist.slug, page }, null, error => {
      if (error) {
        console.error(error)
      }

      setIsLoading(false)
    })
  }

  return (
    <>
      <Title>{`${artist.name} - Articles`}</Title>

      <Jump id="top" />

      <Text variant="xl">{artist.name} Articles</Text>

      <Spacer y={6} />

      <LoadingArea isLoading={isLoading}>
        <GridColumns gridRowGap={[2, 4]}>
          {articles.map(article => {
            return (
              <Column key={article.internalID} span={[6, 4, 3]}>
                <CellArticleFragmentContainer article={article} mode="GRID" />
              </Column>
            )
          })}
        </GridColumns>
      </LoadingArea>

      <PaginationFragmentContainer
        getHref={() => ""}
        pageCursors={artist?.articlesConnection?.pageCursors!}
        onClick={handleClick}
        onNext={handleNext}
        hasNextPage={artist?.articlesConnection?.pageInfo.hasNextPage!}
        scrollTo="top"
        offset={40}
      />
    </>
  )
}

export const ArtistArticlesRouteFragmentContainer = createRefetchContainer(
  ArtistArticlesRoute,
  {
    artist: graphql`
      fragment ArtistArticlesRoute_artist on Artist
        @argumentDefinitions(page: { type: "Int", defaultValue: 1 }) {
        name
        slug
        articlesConnection(page: $page, size: 12, sort: PUBLISHED_AT_DESC) {
          pageInfo {
            hasNextPage
          }
          pageCursors {
            ...Pagination_pageCursors
          }
          edges {
            node {
              ...CellArticle_article
              internalID
            }
          }
        }
      }
    `,
  },
  graphql`
    query ArtistArticlesRouteQuery($page: Int, $artistID: String!) {
      artist(id: $artistID) {
        ...ArtistArticlesRoute_artist @arguments(page: $page)
      }
    }
  `
)
