import { useState } from "react"
import * as React from "react"
import { ResponsiveBox, Box, Flex, Text } from "@artsy/palette"
import { createFragmentContainer, graphql } from "react-relay"
import { Carousel } from "../Carousel"
import { ArticleCardFragmentContainer as ArticleCard } from "v2/Apps/Partner/Components/PartnerArticles/ArticleCard"
import { ArticlesRail_articles } from "v2/__generated__/ArticlesRail_articles.graphql"
import { ViewAllButton } from "./ViewAllButton"
import { RouterLink } from "v2/System/Router/RouterLink"
import { ScrollToPartnerHeader } from "v2/Apps/Partner/Components/ScrollToPartnerHeader"
import { flatten } from "lodash"

interface ArticlesRailProps {
  articles: ArticlesRail_articles
  partnerSlug: string
}

const ArticlesRail: React.FC<ArticlesRailProps> = ({
  articles,
  partnerSlug,
}) => {
  // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
  const [isSeeAllAvaliable, setIsSeeAllAvaliable] = useState<boolean>(undefined)
  return (
    <>
      <Flex
        justifyContent="space-between"
        alignItems="center"
        mb={4}
        position="relative"
      >
        <Text variant="lg">Articles</Text>

        <ViewAllButton to={`/partner/${partnerSlug}/articles`} />
      </Flex>

      <Carousel
        itemsPerViewport={[2, 2, 3]}
        onRailOverflowChange={setIsSeeAllAvaliable}
      >
        {/* @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION */}
        {flatten([
          articles.map(({ node: article }) => {
            return (
              // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
              <Box width={["280px", "100%"]} key={article.internalID}>
                {/* @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION */}
                <ArticleCard article={article} />
              </Box>
            )
          }),
          isSeeAllAvaliable && (
            <Box key="see-all-button" width={[300, "100%"]}>
              <RouterLink to={`/partner/${partnerSlug}/articles`}>
                <ScrollToPartnerHeader width="100%">
                  <ResponsiveBox
                    aspectWidth={4}
                    aspectHeight={3}
                    maxWidth={"100%"}
                    bg="black10"
                  >
                    <Flex
                      height="100%"
                      alignItems="center"
                      justifyContent="center"
                    >
                      <Text style={{ textDecoration: "underline" }}>
                        See all articles
                      </Text>
                    </Flex>
                  </ResponsiveBox>
                </ScrollToPartnerHeader>
              </RouterLink>
            </Box>
          ),
        ])}
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
