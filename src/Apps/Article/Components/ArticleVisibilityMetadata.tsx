import { FC } from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { useIntersectionObserver } from "Utils/Hooks/useIntersectionObserver"
import { ArticleVisibilityMetadata_article$data } from "__generated__/ArticleVisibilityMetadata_article.graphql"

interface ArticleVisibilityMetadataProps {
  article: ArticleVisibilityMetadata_article$data
}

/**
 * Updates article URL and title when the article is in view
 */
const ArticleVisibilityMetadata: FC<ArticleVisibilityMetadataProps> = ({
  article,
  children,
}) => {
  const { ref } = useIntersectionObserver({
    once: false,
    onIntersection: () => {
      if (!article.href) return

      document.title = `${article.searchTitle || article.title} | Artsy`

      window.history.replaceState({}, "", article.href)
    },
  })

  return <div ref={ref as any}>{children}</div>
}

export const ArticleVisibilityMetadataFragmentContainer = createFragmentContainer(
  ArticleVisibilityMetadata,
  {
    article: graphql`
      fragment ArticleVisibilityMetadata_article on Article {
        title
        searchTitle
        href
      }
    `,
  }
)
