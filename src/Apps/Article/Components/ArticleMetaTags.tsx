import { MetaTags } from "Components/MetaTags"
import type { ArticleMetaTags_article$data } from "__generated__/ArticleMetaTags_article.graphql"
import type { FC } from "react"
import { Link, Meta } from "react-head"
import { createFragmentContainer, graphql } from "react-relay"
import { cropped, resized } from "Utils/resized"

interface ArticleMetaTagsProps {
  article: ArticleMetaTags_article$data
}

const ArticleMetaTags: FC<React.PropsWithChildren<ArticleMetaTagsProps>> = ({
  article,
}) => {
  // generate hero image preload for fullscreen and split layouts
  const heroPreload = (() => {
    if (!article.hero?.image?.url || !article.hero?.layout) {
      return null
    }

    const { layout } = article.hero
    const imageUrl = article.hero.image.url

    // only preload for layouts that show hero images as lcp
    if (layout !== "FULLSCREEN" && layout !== "SPLIT") {
      return null
    }

    let preloadData: { href: string; imagesrcset: string }

    if (layout === "FULLSCREEN") {
      // match FullBleedHeaderPicture dimensions
      // preload the small and medium sizes for mobile/tablet
      const sm = cropped(imageUrl, { width: 767, height: 329 })
      const md = cropped(imageUrl, { width: 1024, height: 600 })

      preloadData = {
        href: sm.src,
        imagesrcset: `${sm.srcSet}, ${md.src} 1024w, ${md.quality2x} 2048w`,
      }
    } else {
      // for split layout
      const split = resized(imageUrl, { width: 900 })

      preloadData = {
        href: split.src,
        imagesrcset: split.srcSet,
      }
    }
    return preloadData
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
            }
          }
        }
      }
    `,
  },
)
