import { useRouter } from "System/Hooks/useRouter"
import { useIntersectionObserver } from "Utils/Hooks/useIntersectionObserver"
import type { ArticleVisibilityMetadata_article$data } from "__generated__/ArticleVisibilityMetadata_article.graphql"
import type { FC } from "react"
import { createFragmentContainer, graphql } from "react-relay"

interface ArticleVisibilityMetadataProps {
  article: ArticleVisibilityMetadata_article$data
}

/**
 * Updates the URL and document title when an article scrolls into view.
 * Uses `silentReplace` so this does not push a history entry — back/forward
 * across articles falls through to whatever the user explicitly navigated
 * from.
 */
const ArticleVisibilityMetadata: FC<
  React.PropsWithChildren<ArticleVisibilityMetadataProps>
> = ({ article, children }) => {
  const { silentReplace, match } = useRouter()

  const { ref } = useIntersectionObserver({
    once: false,
    onIntersection: () => {
      if (!article.href || !article.slug) return

      document.title = `${article.searchTitle || article.title} | Artsy`

      if (window.location.pathname !== article.href) {
        const search = match?.location.search ?? ""
        silentReplace(`${article.href}${search}`)
      }
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
        slug
        href
      }
    `,
  })
