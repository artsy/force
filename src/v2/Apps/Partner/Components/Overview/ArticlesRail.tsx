import React from "react"
import { Box, Flex, Text } from "@artsy/palette"
import { createFragmentContainer, graphql } from "react-relay"
import { Carousel } from "v2/Components/Carousel"
import { ArticleCardFragmentContainer as ArticleCard } from "v2/Apps/Partner/Components/PartnerArticles/ArticleCard"
import { ArticlesRail_articles } from "v2/__generated__/ArticlesRail_articles.graphql"
import { ViewAllButton } from "./ViewAllButton"

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

        <ViewAllButton to={`/partner2/${partnerSlug}/articles`} />
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
