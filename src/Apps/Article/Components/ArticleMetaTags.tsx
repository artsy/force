import { FC } from "react"
import { Meta } from "react-head"
import { createFragmentContainer, graphql } from "react-relay"
import { MetaTags } from "Components/MetaTags"
import { ArticleMetaTags_article$data } from "__generated__/ArticleMetaTags_article.graphql"

interface ArticleMetaTagsProps {
  article: ArticleMetaTags_article$data
}

const ArticleMetaTags: FC<ArticleMetaTagsProps> = ({ article }) => {
  return (
    <>
      <MetaTags
        title={`${article.searchTitle || article.title} | Artsy`}
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
  }
)
