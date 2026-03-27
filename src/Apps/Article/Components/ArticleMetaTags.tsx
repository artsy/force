import { MetaTags } from "Components/MetaTags"
import type { ArticleMetaTags_article$data } from "__generated__/ArticleMetaTags_article.graphql"
import { DateTime } from "luxon"
import type { FC } from "react"
import { Meta } from "react-head"
import { createFragmentContainer, graphql } from "react-relay"
import { UPDATED_AT_THRESHOLD_SECONDS } from "./ArticleTimestamp"

interface ArticleMetaTagsProps {
  article: ArticleMetaTags_article$data
}

const ArticleMetaTags: FC<React.PropsWithChildren<ArticleMetaTagsProps>> = ({
  article,
}) => {
  const shouldShowUpdatedAt =
    article.metaPublishedAt &&
    article.updatedAt &&
    DateTime.fromISO(article.updatedAt)
      .diff(DateTime.fromISO(article.metaPublishedAt))
      .as("seconds") > UPDATED_AT_THRESHOLD_SECONDS

  return (
    <>
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

      {shouldShowUpdatedAt && (
        <Meta property="article:modified_time" content={article.updatedAt} />
      )}

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
        updatedAt
        title
        searchTitle
        description
        searchDescription
        thumbnailImage {
          url
        }
      }
    `,
  },
)
