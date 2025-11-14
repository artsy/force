import { Flex, Shelf, Text } from "@artsy/palette"
import { CellArticleFragmentContainer } from "Components/Cells/CellArticle"
import { extractNodes } from "Utils/extractNodes"
import type { ArticlesRail_partner$data } from "__generated__/ArticlesRail_partner.graphql"
import type * as React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { ViewAllButton } from "./ViewAllButton"

interface ArticlesRailProps {
  partner: ArticlesRail_partner$data
}

const ArticlesRail: React.FC<React.PropsWithChildren<ArticlesRailProps>> = ({
  partner,
}) => {
  const { articlesConnection, slug } = partner
  const articles = extractNodes(articlesConnection)

  if (!articles.length) {
    return null
  }

  return (
    <>
      <Flex
        justifyContent="space-between"
        alignItems="center"
        mb={4}
        position="relative"
      >
        <Text variant="lg-display">Articles</Text>

        <ViewAllButton to={`/partner/${slug}/articles`} />
      </Flex>

      <Shelf alignItems="flex-start">
        {articles.map(article => {
          return (
            <CellArticleFragmentContainer
              key={article.internalID}
              article={article}
            />
          )
        })}
      </Shelf>
    </>
  )
}

export const ArticlesRailFragmentContainer = createFragmentContainer(
  ArticlesRail,
  {
    partner: graphql`
      fragment ArticlesRail_partner on Partner {
        slug
        articlesConnection(first: 8, sort: PUBLISHED_AT_DESC) {
          totalCount
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
)
