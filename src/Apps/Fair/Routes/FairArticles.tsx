import { CellArticleFragmentContainer } from "Components/Cells/CellArticle"
import { EmptyState } from "Components/EmptyState"
import { LoadingArea } from "Components/LoadingArea"
import { PaginationFragmentContainer } from "Components/Pagination"
import { extractNodes } from "Utils/extractNodes"
import { Jump } from "Utils/Hooks/useJump"
import { Column, GridColumns, Spacer, Text } from "@artsy/palette"
import type { FairArticles_fair$data } from "__generated__/FairArticles_fair.graphql"
import type * as React from "react"
import { useState } from "react"
import {
  createRefetchContainer,
  graphql,
  type RelayRefetchProp,
} from "react-relay"

interface FairArticlesProps {
  fair: FairArticles_fair$data
  relay: RelayRefetchProp
}

const FairArticles: React.FC<React.PropsWithChildren<FairArticlesProps>> = ({
  fair,
  relay,
}) => {
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
    return <EmptyState title="There aren’t any articles at this time." />
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
        pageCursors={fair?.articlesConnection?.pageCursors}
        onClick={handleClick}
        onNext={handleNext}
        hasNextPage={fair?.articlesConnection?.pageInfo.hasNextPage as boolean}
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
