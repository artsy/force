import { getFullEditorialHref } from "v2/Components/Publishing/Constants"
import { ArticleData } from "v2/Components/Publishing/Typings"
import React from "react"
import { data as sd } from "sharify"
import { crop } from "v2/Utils/resizer"
import { createMediaStyle } from "v2/Utils/Responsive"

const responsiveCss = createMediaStyle()

export const ArticleMeta: React.SFC<{
  article: ArticleData
}> = props => {
  const { article } = props
  const title = article.search_title || article.thumbnail_title || ""
  const titleExtension = article.layout === "news" ? "Artsy News" : "Artsy"
  const url = getFullEditorialHref(article.layout, article.slug)
  const socialTitle = article.social_title || article.thumbnail_title || ""
  const searchDescription = article.search_description || article.description
  const socialDescription = article.social_description || article.description
  const socialImage = article.social_image || article.thumbnail_image
  const authors = article.authors || article.contributing_authors || []
  const keywords = (article.keywords && article.keywords.join(", ")) || ""
  const sailthruKeywords = [`article${keywords && `, ${keywords}`}`]
  const emailMetadata = article.published && article.email_metadata

  if (article.featured) {
    sailthruKeywords.push("magazine")
  }

  return (
    <>
      <title>{`${title} - ${titleExtension}`}</title>
      <link rel="canonical" href={url} />
      <meta name="description" content={searchDescription} />

      {/** amp url, do we need? */
        article.featured &&
        article.published &&
        ["standard", "feature"].includes(article.layout) && (
          <link rel="amphtml" href={`${url}/amp`} />
        )}

      {/** OpenGraph / Facebook */}
      <meta property="og:site_name" content="Artsy" />
      <meta property="og:title" name="og:title" content={socialTitle} />
      <meta property="og:url" content={url} />
      <meta property="og:type" content="article" />
      <meta property="og:published_time" content={article.published_at} />
      <meta property="og:description" content={socialDescription} />
      <meta property="og:image" content={socialImage} />
      <meta property="fb:app_id" content={sd.FACEBOOK_ID} />
      <meta property="article:published_time" content={article.published_at} />
      <meta
        property="article:publisher"
        content="https://www.facebook.com/artsy/"
      />

      {/** Twitter */}
      <meta name="twitter:site" content="@artsy" />
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={url} />
      <meta property="twitter:description" content={socialDescription} />
      <meta property="twitter:image" content={socialImage} />
      <meta name="twitter:title" content={socialTitle} />

      {/** Sailthru */
        emailMetadata && (
          <>
            <meta name="sailthru.date" content={article.published_at} />
            {emailMetadata.headline && (
              <meta name="sailthru.title" content={emailMetadata.headline} />
            )}
            {emailMetadata.author && (
              <meta name="sailthru.author" content={emailMetadata.author} />
            )}
            {emailMetadata.image_url && (
              <>
                <meta
                  name="sailthru.image.full"
                  content={crop(emailMetadata.image_url, {
                    width: 1200,
                    height: 800,
                  })}
                />
                <meta
                  name="sailthru.image.thumb"
                  content={crop(emailMetadata.image_url, {
                    width: 600,
                    height: 400,
                  })}
                />
              </>
            )}
            <meta name="sailthru.tags" content={sailthruKeywords.join(", ")} />
          </>
        )}

      {keywords.length > 0 && (
        <>
          <meta property="news_keywords" content={keywords} />
          <meta name="keywords" content={keywords} />
          <meta property="article:tag" content={keywords} />
        </>
      )}

      {authors.map(
        (author, i) =>
          author.name && <meta key={i} name="author" content={author.name} />
      )}
      {!article.indexable && <meta name="robots" content="noindex" />}
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <style>{responsiveCss}</style>
    </>
  )
}
