import React from "react"
import { Column, GridColumns, Box } from "@artsy/palette"
import {
  createPaginationContainer,
  graphql,
  RelayPaginationProp,
} from "react-relay"
import { Articles_partner } from "v2/__generated__/Articles_partner.graphql"
import { ArticleCardFragmentContainer } from "../../Components/PartnerArticles/ArticleCard"

interface ArticlesProps {
  partner: Articles_partner
  relay: RelayPaginationProp
}

const Articles: React.FC<ArticlesProps> = ({ partner, relay }) => {
  const {
    articlesConnection: { edges: articles },
  } = partner

  return (
    <Box mt={6}>
      <GridColumns gridRowGap={[2, 4]}>
        {articles.map(({ node: article }) => {
          return (
            <Column key={article.internalID} span={4}>
              <ArticleCardFragmentContainer article={article} />
            </Column>
          )
        })}
      </GridColumns>
    </Box>
  )
}

export const ARTICLES_QUERY = graphql`
  query ArticlesQuery($partnerId: String!, $first: Int!, $after: String) {
    partner(id: $partnerId) {
      ...Articles_partner @arguments(first: $first, after: $after)
    }
  }
`

export const ArticlesPaginationContainer = createPaginationContainer(
  Articles,
  {
    partner: graphql`
      fragment Articles_partner on Partner
        @argumentDefinitions(
          first: { type: "Int", defaultValue: 18 }
          after: { type: "String" }
        ) {
        slug
        articlesConnection(first: $first, after: $after)
          @connection(key: "ArticlesQuery_articlesConnection") {
          totalCount
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
  {
    query: ARTICLES_QUERY,
    direction: "forward",
    getVariables({ partner: { slug: id } }, { cursor: after }, { first }) {
      return { after, first, id }
    },
  }
)
