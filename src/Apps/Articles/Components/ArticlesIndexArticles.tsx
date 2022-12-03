import { Box, Button, Join, Spacer, Text } from "@artsy/palette"
import { FC, useState } from "react"
import {
  createPaginationContainer,
  graphql,
  RelayPaginationProp,
} from "react-relay"
import { extractNodes } from "Utils/extractNodes"
import { ArticlesIndexArticles_viewer$data } from "__generated__/ArticlesIndexArticles_viewer.graphql"
import { ArticlesIndexArticleFragmentContainer } from "./ArticlesIndexArticle"

interface ArticlesIndexArticlesProps {
  viewer: ArticlesIndexArticles_viewer$data
  relay: RelayPaginationProp
}

export const ArticlesIndexArticles: FC<ArticlesIndexArticlesProps> = ({
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
    return <Text variant="lg-display">Nothing yet.</Text>
  }

  return (
    <>
      <Join separator={<Spacer y={4} />}>
        {articles.map((article, i) => {
          return (
            <ArticlesIndexArticleFragmentContainer
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

export const ARTICLES_INDEX_ARTICLES_QUERY = graphql`
  query ArticlesIndexArticlesQuery($after: String) {
    viewer {
      ...ArticlesIndexArticles_viewer @arguments(after: $after)
    }
  }
`

export const ArticlesIndexArticlesPaginationContainer = createPaginationContainer(
  ArticlesIndexArticles,
  {
    viewer: graphql`
      fragment ArticlesIndexArticles_viewer on Viewer
        @argumentDefinitions(after: { type: "String" }) {
        articlesConnection(
          first: 15
          after: $after
          sort: PUBLISHED_AT_DESC
          featured: true
        ) @connection(key: "ArticlesIndexArticles_articlesConnection") {
          edges {
            node {
              internalID
              ...ArticlesIndexArticle_article
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
    query: ARTICLES_INDEX_ARTICLES_QUERY,
  }
)
