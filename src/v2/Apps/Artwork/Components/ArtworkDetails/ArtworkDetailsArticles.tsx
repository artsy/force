import { Box, Col, Row } from "@artsy/palette"
import { ArticleItem } from "v2/Apps/Artist/Routes/Articles/ArtistArticle"
import React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { get } from "v2/Utils/get"

import { ArtworkDetailsArticles_artwork } from "v2/__generated__/ArtworkDetailsArticles_artwork.graphql"

export interface ArtworkDetailsArticlesProps {
  artwork: ArtworkDetailsArticles_artwork
}

export const ArtworkDetailsArticles: React.SFC<ArtworkDetailsArticlesProps> = props => {
  const { articles } = props.artwork
  if (!articles || articles.length < 1) {
    return null
  }
  return (
    <Row>
      <Col>
        <Box>
          {articles.map((article, index) => {
            // @ts-expect-error STRICT_NULL_CHECK
            const imageUrl = get(article, p => p.thumbnail_image.resized.url)
            return (
              <ArticleItem
                // @ts-expect-error STRICT_NULL_CHECK
                title={article.thumbnail_title}
                // @ts-expect-error STRICT_NULL_CHECK
                imageUrl={imageUrl}
                // @ts-expect-error STRICT_NULL_CHECK
                date={article.published_at}
                // @ts-expect-error STRICT_NULL_CHECK
                author={article.author.name}
                // @ts-expect-error STRICT_NULL_CHECK
                href={article.href}
                key={index}
                lastChild={index === articles.length - 1}
              />
            )
          })}
        </Box>
      </Col>
    </Row>
  )
}

export const ArtworkDetailsArticlesFragmentContainer = createFragmentContainer(
  ArtworkDetailsArticles,
  {
    artwork: graphql`
      fragment ArtworkDetailsArticles_artwork on Artwork {
        articles(size: 10) {
          author {
            name
          }
          href
          published_at: publishedAt(format: "MMM Do, YYYY")
          thumbnail_image: thumbnailImage {
            resized(width: 300) {
              url
            }
          }
          thumbnail_title: thumbnailTitle
        }
      }
    `,
  }
)
