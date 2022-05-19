import { FC } from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { useArticleTracking } from "../useArticleTracking"
import { ArticleNewsSource_article } from "v2/__generated__/ArticleNewsSource_article.graphql"

interface ArticleNewsSourceProps {
  article: ArticleNewsSource_article
}

const ArticleNewsSource: FC<ArticleNewsSourceProps> = ({ article }) => {
  const { clickedExternalNewsSource } = useArticleTracking()

  return (
    <>
      {article.newsSource && (
        <>
          , via&nbsp;
          {article.newsSource.url ? (
            <a
              href={article.newsSource.url}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => {
                if (!article.newsSource?.url) return
                clickedExternalNewsSource(article.newsSource.url)
              }}
            >
              {article.newsSource.title}
            </a>
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
