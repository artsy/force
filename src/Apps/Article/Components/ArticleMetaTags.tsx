import { MetaTags } from "Components/MetaTags"
import type { ArticleMetaTags_article$data } from "__generated__/ArticleMetaTags_article.graphql"
import type { FC } from "react"
import { Meta } from "react-head"
import { createFragmentContainer, graphql } from "react-relay"

interface ArticleMetaTagsProps {
  article: ArticleMetaTags_article$data
}

const ArticleMetaTags: FC<React.PropsWithChildren<ArticleMetaTagsProps>> = ({
  article,
}) => {
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

      {article.byline && <Meta name="author" content={article.byline} />}

      {article.keywords && <Meta name="keywords" content={article.keywords.join(", ")} />}

      {article.keywords && <Meta property="article:tag" content={article.keywords.join(", ")} />}

      {article.metaPublishedAt && (
        <Meta
          property="article:published_time"
          content={article.metaPublishedAt}
        />
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
