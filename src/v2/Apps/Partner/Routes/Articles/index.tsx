import React from "react"
import { Column, GridColumns, Box } from "@artsy/palette"
import { createRefetchContainer, graphql, RelayRefetchProp } from "react-relay"
import { useRouter } from "v2/Artsy/Router/useRouter"
import { Articles_partner } from "v2/__generated__/Articles_partner.graphql"
import { ArticleCardFragmentContainer } from "../../Components/PartnerArticles/ArticleCard"
import { PaginationFragmentContainer } from "v2/Components/Pagination"

interface ArticlesProps {
  partner: Articles_partner
  relay: RelayRefetchProp
}

const Articles: React.FC<ArticlesProps> = ({ partner, relay }) => {
  const {
    match: { location },
    router,
  } = useRouter()

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

    router.push({
      pathname: location.pathname,
      query: { ...location.query, page },
    })
  }

  const handleNext = (page: number) => {
    handleClick(endCursor, page)
  }

  return (
    <Box id="jumpto--articlesGrid">
      <GridColumns mt={6} gridRowGap={[2, 4]}>
        {articles.map(({ node: article }) => {
          return (
            <Column key={article.internalID} span={4}>
              <ArticleCardFragmentContainer article={article} />
            </Column>
          )
        })}
      </GridColumns>
      <Box mt={9}>
        <PaginationFragmentContainer
          hasNextPage={hasNextPage}
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
        ) {
        slug
        articlesConnection(
          first: $first
          last: $last
          after: $after
          before: $before
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
              ...ArticleCard_article
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
