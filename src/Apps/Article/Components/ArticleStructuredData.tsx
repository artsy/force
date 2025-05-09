import { StructuredData } from "Components/Seo/StructuredData"
import type { ArticleStructuredData_article$key } from "__generated__/ArticleStructuredData_article.graphql"
import { compact } from "lodash"
import { graphql } from "react-relay"
import { useFragment } from "react-relay"

interface ArticleStructuredDataProps {
  article: ArticleStructuredData_article$key
}

export const ArticleStructuredData: React.FC<
  React.PropsWithChildren<ArticleStructuredDataProps>
> = props => {
  const article = useFragment(ARTICLE_STRUCTURD_DATA_FRAGMENT, props.article)

  return (
    <StructuredData
      schemaData={{
        "@context": "https://schema.org",
        "@type": "NewsArticle",
        headline: article.title ?? undefined,
        image: compact([
          article.thumbnailImage?._1x1?.src,
          article.thumbnailImage?._4x3?.src,
          article.thumbnailImage?._16x9?.src,
        ]),
        datePublished: article.publishedAt ?? undefined,
        dateModified: article.updatedAt ?? undefined,
        author: compact(
          article.authors.map(author => {
            if (!author.name) return null

            return {
              "@type": "Person",
              name: author.name,
            }
          }),
        ),
        publisher: {
          "@type": "Organization",
          name: "Artsy",
          url: "https://www.artsy.net",
        },
      }}
    />
  )
}

const ARTICLE_STRUCTURD_DATA_FRAGMENT = graphql`
  fragment ArticleStructuredData_article on Article {
    title
    publishedAt
    updatedAt
    authors {
      name
    }
    thumbnailImage {
      _1x1: cropped(width: 1200, height: 1200) {
        src
      }
      _4x3: cropped(width: 1200, height: 900) {
        src
      }
      _16x9: cropped(width: 1200, height: 675) {
        src
      }
    }
  }
`
