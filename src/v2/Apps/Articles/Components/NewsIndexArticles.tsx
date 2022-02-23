import { Box, Button, Join, Separator, Text } from "@artsy/palette"
import { FC, useState } from "react"
import {
  createPaginationContainer,
  graphql,
  RelayPaginationProp,
} from "react-relay"
import { ArticleBodyFragmentContainer } from "v2/Apps/Article/Components/ArticleBody"
import { extractNodes } from "v2/Utils/extractNodes"
import { NewsIndexArticles_viewer } from "v2/__generated__/NewsIndexArticles_viewer.graphql"

interface NewsIndexArticlesProps {
  viewer: NewsIndexArticles_viewer
  relay: RelayPaginationProp
}

export const NewsIndexArticles: FC<NewsIndexArticlesProps> = ({
  viewer,
  relay,
}) => {
  const [loading, setLoading] = useState(false)

  const articles = extractNodes(viewer.articlesConnection)

  const handleClick = () => {
    if (!relay.hasMore() || relay.isLoading()) return

    setLoading(true)

    relay.loadMore(15, err => {
      if (err) console.error(err)
      setLoading(false)
    })
  }

  if (articles.length === 0) {
    return <Text variant="lg">Nothing yet.</Text>
  }

  return (
    <>
      <Join separator={<Separator my={4} />}>
        {articles.map((article, i) => {
          return (
            <ArticleBodyFragmentContainer
              key={article.internalID}
              article={article}
            />
          )
        })}
      </Join>

      {relay.hasMore() && (
        <Box textAlign="center" mt={4}>
          <Button onClick={handleClick} loading={loading}>
            Show More
          </Button>
        </Box>
      )}
    </>
  )
}

export const NEWS_INDEX_ARTICLES_QUERY = graphql`
  query NewsIndexArticlesQuery($after: String) {
    viewer {
      ...NewsIndexArticles_viewer @arguments(after: $after)
    }
  }
`

export const NewsIndexArticlesPaginationContainer = createPaginationContainer(
  NewsIndexArticles,
  {
    viewer: graphql`
      fragment NewsIndexArticles_viewer on Viewer
        @argumentDefinitions(after: { type: "String" }) {
        articlesConnection(
          first: 15
          after: $after
          layout: NEWS
          sort: PUBLISHED_AT_DESC
        ) @connection(key: "NewsIndexArticles_articlesConnection") {
          edges {
            node {
              internalID
              ...ArticleBody_article
            }
          }
        }
      }
    `,
  },
  {
    direction: "forward",
    getFragmentVariables(prevVars, totalCount) {
      return { ...prevVars, totalCount }
    },
    getVariables(_, { cursor: after }, fragmentVariables) {
      return { ...fragmentVariables, after }
    },
    query: NEWS_INDEX_ARTICLES_QUERY,
  }
)
