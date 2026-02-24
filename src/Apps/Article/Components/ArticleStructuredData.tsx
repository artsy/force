import { ORGANIZATION_STUB_SCHEMA } from "Apps/About/Components/AboutStructuredData"
import { StructuredData } from "Components/Seo/StructuredData"
import { getENV } from "Utils/getENV"
import { getAuthorPath } from "Utils/getAuthorPath"
import type { ArticleStructuredData_article$key } from "__generated__/ArticleStructuredData_article.graphql"
import compact from "lodash/compact"
import { graphql } from "react-relay"
import { useFragment } from "react-relay"

interface ArticleStructuredDataProps {
  article: ArticleStructuredData_article$key
}

export const ArticleStructuredData: React.FC<
  React.PropsWithChildren<ArticleStructuredDataProps>
> = props => {
  const article = useFragment(ARTICLE_STRUCTURD_DATA_FRAGMENT, props.article)
  const url = `${getENV("APP_URL")}${article.href}`

  return (
    <StructuredData
      schemaData={{
        "@context": "https://schema.org",
        "@type": article.layout === "NEWS" ? "NewsArticle" : "Article",
        "@id": `${getENV("APP_URL")}${article.href}#article`,
        url: `${getENV("APP_URL")}${article.href}`,
        headline: article.title ?? undefined,
        description:
          article.description ?? article.searchDescription ?? undefined,
        image: compact([
          article.thumbnailImage?._1x1?.src,
          article.thumbnailImage?._4x3?.src,
          article.thumbnailImage?._16x9?.src,
        ]),
        datePublished: article.publishedAt ?? undefined,
        dateModified: article.updatedAt ?? undefined,
        isAccessibleForFree: true,
        author: compact(
          article.authors.map(author => {
            if (!author.name) return null

            const path = getAuthorPath({
              slug: author.slug,
              name: author.name,
              internalID: author.internalID,
            })
            return {
              "@type": "Person",
              name: author.name,
              href: `${getENV("APP_URL")}${path}`,
            }
          }),
        ),
        publisher: ORGANIZATION_STUB_SCHEMA,
        sourceOrganization: {
          "@id": "https://www.artsy.net/#organization",
        },
        inLanguage: "en",
        mainEntityOfPage: {
          "@type": "WebPage",
          "@id": url,
        },
        potentialAction: {
          "@type": "ReadAction",
          target: url,
        },
        keywords: article.keywords ?? undefined,
        articleSection: article.vertical ?? undefined,
        // about: TODO: Expose `featuring` / `additionalAppearances` fields
        // wordCount: TODO: Expose `wordCount` field
        // timeRequired: TODO: Expose `timeRequired` field
      }}
    />
  )
}

const ARTICLE_STRUCTURD_DATA_FRAGMENT = graphql`
  fragment ArticleStructuredData_article on Article {
    title
    href
    vertical
    layout
    publishedAt
    updatedAt
    searchDescription
    description
    keywords
    authors {
      internalID
      slug
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
