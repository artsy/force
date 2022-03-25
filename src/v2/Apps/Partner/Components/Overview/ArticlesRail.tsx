import * as React from "react"
import { Flex, Text, Shelf } from "@artsy/palette"
import { createFragmentContainer, graphql } from "react-relay"
import { ArticlesRail_partner } from "v2/__generated__/ArticlesRail_partner.graphql"
import { ViewAllButton } from "./ViewAllButton"
import { extractNodes } from "v2/Utils/extractNodes"
import { CellArticleFragmentContainer } from "v2/Components/Cells/CellArticle"

interface ArticlesRailProps {
  partner: ArticlesRail_partner
}

const ArticlesRail: React.FC<ArticlesRailProps> = ({ partner }) => {
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
        <Text variant="lg">Articles</Text>

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
        articlesConnection(first: 8) {
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
  }
)
