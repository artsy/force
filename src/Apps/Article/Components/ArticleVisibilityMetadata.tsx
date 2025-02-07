import { useRouter } from "System/Hooks/useRouter"
import { useIntersectionObserver } from "Utils/Hooks/useIntersectionObserver"
import type { ArticleVisibilityMetadata_article$data } from "__generated__/ArticleVisibilityMetadata_article.graphql"
import type { FC } from "react"
import { createFragmentContainer, graphql } from "react-relay"

interface ArticleVisibilityMetadataProps {
  article: ArticleVisibilityMetadata_article$data
}

/**
 * Updates article URL and title when the article is in view
 */
const ArticleVisibilityMetadata: FC<
  React.PropsWithChildren<ArticleVisibilityMetadataProps>
> = ({ article, children }) => {
  const { silentReplace, match } = useRouter()

  const { ref } = useIntersectionObserver({
    once: false,
    onIntersection: () => {
      if (!article.href) return

      document.title = `${article.searchTitle || article.title} | Artsy`

      silentReplace(`${article.href}${match?.location.search}`)
    },
  })

  return <div ref={ref as any}>{children}</div>
}

export const ArticleVisibilityMetadataFragmentContainer =
  createFragmentContainer(ArticleVisibilityMetadata, {
    article: graphql`
      fragment ArticleVisibilityMetadata_article on Article {
        title
        searchTitle
        href
      }
    `,
  })
