import { FC } from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { ArticlesIndexNews_viewer$data } from "__generated__/ArticlesIndexNews_viewer.graphql"
import { Flex, Stack, Text } from "@artsy/palette"
import { RouterLink } from "System/Components/RouterLink"

interface ArticlesIndexNewsProps {
  viewer: ArticlesIndexNews_viewer$data
}

const ArticlesIndexNews: FC<ArticlesIndexNewsProps> = ({ viewer }) => {
  const date = new Date().toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  })

  return (
    <Stack gap={4} border="1px solid" borderColor="black30" p={2}>
      <Flex alignItems="center" justifyContent="space-between">
        <Text variant="lg-display">News</Text>

        <Text variant="lg-display">{date}</Text>
      </Flex>

      <Stack gap={2}>
        {viewer.articles.map((article, i) => {
          return (
            <RouterLink
              key={article.internalID}
              to={article.href}
              textDecoration="none"
              inline
              borderBottom={
                i === viewer.articles.length - 1 ? "none" : "1px solid"
              }
              borderColor="black10"
              pb={2}
            >
              <Text variant="sm-display">{article.title}</Text>
            </RouterLink>
          )
        })}

        <RouterLink to="/news" inline>
          <Text variant="sm-display">More in News</Text>
        </RouterLink>
      </Stack>
    </Stack>
  )
}

export const ArticlesIndexNewsFragmentContainer = createFragmentContainer(
  ArticlesIndexNews,
  {
    viewer: graphql`
      fragment ArticlesIndexNews_viewer on Viewer {
        articles(
          published: true
          limit: 3
          sort: PUBLISHED_AT_DESC
          layout: NEWS
        ) {
          internalID
          title
          href
        }
      }
    `,
  }
)
