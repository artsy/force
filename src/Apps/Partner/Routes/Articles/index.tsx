import { useState } from "react"
import * as React from "react"
import { Column, GridColumns, Box } from "@artsy/palette"
import { createRefetchContainer, graphql, RelayRefetchProp } from "react-relay"
import { useRouter } from "System/Router/useRouter"
import { Articles_partner$data } from "__generated__/Articles_partner.graphql"
import { PaginationFragmentContainer } from "Components/Pagination"
import { LoadingArea } from "Components/LoadingArea"
import { CellArticleFragmentContainer } from "Components/Cells/CellArticle"

interface ArticlesProps {
  partner: Articles_partner$data
  relay: RelayRefetchProp
}

const Articles: React.FC<ArticlesProps> = ({ partner, relay }) => {
  const {
    match: { location },
    router,
  } = useRouter()

  const [isLoading, setIsLoading] = useState(false)

  if (!partner.articlesConnection) {
    return null
  }

  const {
    articlesConnection: {
      edges: articles,
      pageInfo: { hasNextPage, endCursor },
      pageCursors,
    },
    slug,
  } = partner

  const handleClick = (cursor: string, page: number) => {
    const paramsPage = +location.query.page || 1
    const canRefetch = paramsPage !== page

    canRefetch && setIsLoading(true)

    canRefetch &&
      relay.refetch(
        {
          first: 18,
          after: cursor,
          partnerID: slug,
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

    const query = page === 1 ? {} : { ...location.query, page }

    router.push({
      pathname: location.pathname,
      query,
    })

    setIsLoading(false)
  }

  const handleNext = (page: number) => {
    // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
    handleClick(endCursor, page)
  }

  return (
    <Box id="jumpto--articlesGrid">
      <LoadingArea isLoading={isLoading}>
        <GridColumns mt={6} gridRowGap={[2, 4]}>
          {/* @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION */}
          {articles.map(({ node: article }) => {
            return (
              <Column key={article.internalID} span={4}>
                <CellArticleFragmentContainer mode="GRID" article={article} />
              </Column>
            )
          })}
        </GridColumns>
      </LoadingArea>

      <Box mt={6}>
        <PaginationFragmentContainer
          hasNextPage={hasNextPage}
          // @ts-ignore RELAY UPGRADE 13
          pageCursors={pageCursors}
          onClick={handleClick}
          onNext={handleNext}
          scrollTo="#jumpto--articlesGrid"
          offset={200}
        />
      </Box>
    </Box>
  )
}

export const ArticlesPaginationContainer = createRefetchContainer(
  Articles,
  {
    partner: graphql`
      fragment Articles_partner on Partner
        @argumentDefinitions(
          first: { type: "Int", defaultValue: 18 }
          last: { type: "Int" }
          after: { type: "String" }
          before: { type: "String" }
          page: { type: "Int" }
        ) {
        slug
        articlesConnection(
          first: $first
          last: $last
          after: $after
          before: $before
          page: $page
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
              internalID
              ...CellArticle_article
            }
          }
        }
      }
    `,
  },
  graphql`
    query ArticlesQuery(
      $partnerId: String!
      $first: Int
      $last: Int
      $after: String
      $before: String
    ) {
      partner(id: $partnerId) {
        ...Articles_partner
          @arguments(first: $first, last: $last, after: $after, before: $before)
      }
    }
  `
)
