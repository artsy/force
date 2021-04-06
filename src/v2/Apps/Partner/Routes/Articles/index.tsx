import React from "react"
import { Column, GridColumns, Box, Col, Row } from "@artsy/palette"
import { createRefetchContainer, graphql, RelayRefetchProp } from "react-relay"
import { Articles_partner } from "v2/__generated__/Articles_partner.graphql"
import { ArticleCardFragmentContainer as ArticleCard } from "../../Components/PartnerArticles/ArticleCard"
import { PaginationFragmentContainer as Pagination } from "v2/Components/Pagination"

interface ArticlesProps {
  partner: Articles_partner
  relay: RelayRefetchProp
}

const Articles: React.FC<ArticlesProps> = ({ partner, relay }) => {
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

  const loadAfter = cursor => {
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
  }

  const loadNext = () => {
    if (hasNextPage) {
      loadAfter(endCursor)
    }
  }

  return (
    <Box>
      <GridColumns mt={6} gridRowGap={[2, 4]}>
        {articles.map(({ node: article }) => {
          return (
            <Column key={article.internalID} span={4}>
              <ArticleCard article={article} />
            </Column>
          )
        })}
      </GridColumns>
      <Row>
        <Col>
          <Box mt={9}>
            <Pagination
              getHref={() => ""}
              hasNextPage={hasNextPage}
              pageCursors={pageCursors}
              onClick={loadAfter}
              onNext={loadNext}
              scrollTo="#jumpto-PartnerNavBar"
            />
          </Box>
        </Col>
      </Row>
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
        ) @connection(key: "ArticlesQuery_articlesConnection") {
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
