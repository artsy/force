import React from "react"
import { Box, Flex, Text } from "@artsy/palette"
import { createFragmentContainer, graphql } from "react-relay"
import { Carousel } from "v2/Components/Carousel"
import { ArticleCardFragmentContainer as ArticleCard } from "v2/Apps/Partner/Components/PartnerArticles/ArticleCard"
import { ArticlesRail_articles } from "v2/__generated__/ArticlesRail_articles.graphql"
import { RouterLink } from "v2/Artsy/Router/RouterLink"
import { ScrollIntoView } from "v2/Utils"
import { useNavBarHeight } from "v2/Components/NavBar/useNavBarHeight"

interface ArticlesRailProps {
  articles: ArticlesRail_articles
  partnerSlug: string
}

const ArticlesRail: React.FC<ArticlesRailProps> = ({
  articles,
  partnerSlug,
}) => {
  const navBarHeight = useNavBarHeight()

  return (
    <>
      <Flex justifyContent="space-between" alignItems="center">
        <Text variant="title">Articles</Text>
        <RouterLink to={`/partner2/${partnerSlug}/articles`}>
          <ScrollIntoView
            selector="#jumpto--PartnerHeader"
            offset={navBarHeight}
          >
            <Text variant="text" color="black">
              View all
            </Text>
          </ScrollIntoView>
        </RouterLink>
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
