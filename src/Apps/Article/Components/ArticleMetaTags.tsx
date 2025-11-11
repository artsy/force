import { MetaTags } from "Components/MetaTags"
import { cropped } from "Utils/resized"
import type { ArticleMetaTags_article$data } from "__generated__/ArticleMetaTags_article.graphql"
import type { FC } from "react"
import { Link, Meta } from "react-head"
import { createFragmentContainer, graphql } from "react-relay"

interface ArticleMetaTagsProps {
  article: ArticleMetaTags_article$data
}

const ArticleMetaTags: FC<React.PropsWithChildren<ArticleMetaTagsProps>> = ({
  article,
}) => {
  const heroPreload = (() => {
    const layout = article.hero?.layout
    const imageUrl = article.hero?.image?.url

    if (!layout || !imageUrl) return null

    if (layout === "SPLIT" && article.hero.image?.split) {
      return {
        href: article.hero.image.split.src,
        imagesrcset: article.hero.image.split.srcSet,
      }
    }

    if (layout === "FULLSCREEN" && article.hero.image?.url) {
      // FULLSCREEN uses the cropped image passed to FullBleedHeaderPicture
      const xs = cropped(imageUrl, { width: 450, height: 320 })
      return {
        href: xs.src,
        imagesrcset: xs.srcSet,
      }
    }

    return null
  })()
  return (
    <>
      {heroPreload && (
        <Link
          rel="preload"
          as="image"
          href={heroPreload.href}
          imageSrcSet={heroPreload.imagesrcset}
          fetchPriority="high"
        />
      )}
      <MetaTags
        title={`${article.searchTitle || article.title} | Artsy`}
        socialTitle={article.title}
        pathname={article.href}
        description={article.searchDescription || article.description}
        imageURL={article.thumbnailImage?.url}
      />

      <Meta property="og:type" content="article" />

      <Meta name="author" content={article.byline} />

      <Meta name="keywords" content={article.keywords} />

      <Meta property="article:tag" content={article.keywords} />

      <Meta
        property="article:published_time"
        content={article.metaPublishedAt}
      />

      <Meta
        property="article:publisher"
        content="https://www.facebook.com/artsy"
      />

      <Meta name="robots" content="max-image-preview:large" />
    </>
  )
}

export const ArticleMetaTagsFragmentContainer = createFragmentContainer(
  ArticleMetaTags,
  {
    article: graphql`
      fragment ArticleMetaTags_article on Article {
        byline
        href
        keywords
        metaPublishedAt: publishedAt
        title
        searchTitle
        description
        searchDescription
        thumbnailImage {
          url
        }
        hero {
          ... on ArticleFeatureSection {
            layout
            image {
              url
              split: resized(width: 900) {
                src
                srcSet
              }
            }
          }
        }
      }
    `,
  },
)
