import { Column, GridColumns, Spacer } from "@artsy/palette"
import { CellArticleFragmentContainer } from "Components/Cells/CellArticle"
import { LoadingArea } from "Components/LoadingArea"
import { PaginationFragmentContainer } from "Components/Pagination"
import { useRouter } from "System/Hooks/useRouter"
import { Jump } from "Utils/Hooks/useJump"
import { extractNodes } from "Utils/extractNodes"
import type { Articles_partner$data } from "__generated__/Articles_partner.graphql"
import { useState } from "react"
import type * as React from "react"
import {
  type RelayRefetchProp,
  createRefetchContainer,
  graphql,
} from "react-relay"

const PAGE_SIZE = 18

interface ArticlesProps {
  partner: Articles_partner$data
  relay: RelayRefetchProp
}

const Articles: React.FC<React.PropsWithChildren<ArticlesProps>> = ({
  partner,
  relay,
}) => {
  const {
    match: { location },
    router,
  } = useRouter()

  const [isLoading, setIsLoading] = useState(false)

  if (!partner.articlesConnection) {
    return null
  }

  const {
    articlesConnection,
    articlesConnection: {
      pageInfo: { hasNextPage, endCursor },
      pageCursors,
    },
    slug,
  } = partner

  const articles = extractNodes(articlesConnection)

  const handleClick = (cursor: string | null | undefined, page: number) => {
    const query = page === 1 ? {} : { ...location.query, page }

    setIsLoading(true)

    relay.refetch(
      { first: PAGE_SIZE, after: cursor, partnerID: slug },
      null,
      error => {
        if (error) {
          console.error(error)
        }

        setIsLoading(false)

        router.push({ pathname: location.pathname, query })
      },
    )
  }

  const handleNext = (page: number) => {
    handleClick(endCursor, page)
  }

  return (
    <Jump id="articlesGrid">
      <Spacer y={6} />

      <LoadingArea isLoading={isLoading}>
        <GridColumns gridRowGap={[2, 4]}>
          {articles.map(article => {
            return (
              <Column key={article.internalID} span={4}>
                <CellArticleFragmentContainer mode="GRID" article={article} />
              </Column>
            )
          })}
        </GridColumns>
      </LoadingArea>

      <Spacer y={6} />

      <PaginationFragmentContainer
        hasNextPage={hasNextPage}
        pageCursors={pageCursors}
        onClick={handleClick}
        onNext={handleNext}
        scrollTo="articlesGrid"
        offset={20}
      />
    </Jump>
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
  `,
)
