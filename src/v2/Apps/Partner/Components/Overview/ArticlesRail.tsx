import React from "react"
import { Box, Flex, Sans, Text } from "@artsy/palette"
import { createFragmentContainer, graphql } from "react-relay"
import { Carousel } from "v2/Components/Carousel"
import { ArticleCardFragmentContainer as ArticleCard } from "v2/Apps/Partner/Components/PartnerArticles/ArticleCard"
import { data as sd } from "sharify"
import { ArticlesRail_articles } from "v2/__generated__/ArticlesRail_articles.graphql"

interface ArticlesRailProps {
  articles: ArticlesRail_articles
  partnerSlug: string
}

const ArticlesRail: React.FC<ArticlesRailProps> = ({
  articles,
  partnerSlug,
}) => {
  return (
    <>
      <Flex justifyContent="space-between" alignItems="center">
        <Text variant="title">Articles</Text>
        <Sans fontSize={14} size="2" color="black60">
          <a href={`${sd.APP_URL}/partner2/${partnerSlug}/articles`}>
            View all
          </a>
        </Sans>
      </Flex>

      <Carousel arrowHeight={320} mt={4}>
        {articles.map(({ node: article }) => (
          <Box
            width={["280px", "334px", "301px", "357px"]}
            key={article.internalID}
          >
            <ArticleCard article={article} />
          </Box>
        ))}
      </Carousel>
    </>
  )
}

export const ArticlesRailFragmentContainer = createFragmentContainer(
  ArticlesRail,
  {
    articles: graphql`
      fragment ArticlesRail_articles on ArticleEdge @relay(plural: true) {
        node {
          internalID
          ...ArticleCard_article
        }
      }
    `,
  }
)
