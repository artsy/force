import { useState } from "react"
import * as React from "react"
import { Text, GridColumns, Column, Message, Spacer } from "@artsy/palette"
import { createRefetchContainer, graphql, RelayRefetchProp } from "react-relay"
import { FairArticles_fair$data } from "__generated__/FairArticles_fair.graphql"
import { extractNodes } from "Utils/extractNodes"
import { CellArticleFragmentContainer } from "Components/Cells/CellArticle"
import { LoadingArea } from "Components/LoadingArea"
import { Jump } from "Utils/Hooks/useJump"
import { PaginationFragmentContainer } from "Components/Pagination"

interface FairArticlesProps {
  fair: FairArticles_fair$data
  relay: RelayRefetchProp
}

const FairArticles: React.FC<FairArticlesProps> = ({ fair, relay }) => {
  const articles = extractNodes(fair.articlesConnection)

  const [isLoading, setIsLoading] = useState(false)

  const handleNext = (page: number) => {
    handleClick(null, page)
  }

  const handleClick = (_cursor: string | null, page: number) => {
    setIsLoading(true)

    relay.refetch({ id: fair.slug, page }, null, error => {
      if (error) {
        console.error(error)
      }

      setIsLoading(false)
    })
  }

  if (articles.length === 0) {
    return <Message>There aren’t any articles at this time.</Message>
  }

  return (
    <>
      <Spacer y={4} />

      <Jump id="top" />

      <Text as="h1" variant="xl">
        Articles
      </Text>

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
        pageCursors={fair?.articlesConnection?.pageCursors!}
        onClick={handleClick}
        onNext={handleNext}
        hasNextPage={fair?.articlesConnection?.pageInfo.hasNextPage!}
        scrollTo="top"
        offset={40}
      />
    </>
  )
}

export const FairArticlesPaginationContainer = createRefetchContainer(
  FairArticles,
  {
    fair: graphql`
      fragment FairArticles_fair on Fair
        @argumentDefinitions(page: { type: "Int", defaultValue: 1 }) {
        slug
        articlesConnection(page: $page, size: 12) {
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
    query FairArticlesQuery($id: String!, $page: Int) {
      fair(id: $id) {
        ...FairArticles_fair @arguments(page: $page)
      }
    }
  `
)
