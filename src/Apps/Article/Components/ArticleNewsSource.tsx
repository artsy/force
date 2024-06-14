import { FC } from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { useArticleTracking } from "Apps/Article/useArticleTracking"
import { ArticleNewsSource_article$data } from "__generated__/ArticleNewsSource_article.graphql"
import { RouterLink } from "System/Components/RouterLink"

interface ArticleNewsSourceProps {
  article: ArticleNewsSource_article$data
}

const ArticleNewsSource: FC<ArticleNewsSourceProps> = ({ article }) => {
  const { clickedExternalNewsSource } = useArticleTracking()

  return (
    <>
      {article.newsSource && (
        <>
          , via&nbsp;
          {article.newsSource.url ? (
            <RouterLink
              inline
              to={article.newsSource.url}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => {
                if (!article.newsSource?.url) return
                clickedExternalNewsSource(article.newsSource.url)
              }}
            >
              {article.newsSource.title}
            </RouterLink>
          ) : (
            article.newsSource.title
          )}
        </>
      )}
    </>
  )
}

export const ArticleNewsSourceFragmentContainer = createFragmentContainer(
  ArticleNewsSource,
  {
    article: graphql`
      fragment ArticleNewsSource_article on Article {
        newsSource {
          title
          url
        }
      }
    `,
  }
)
