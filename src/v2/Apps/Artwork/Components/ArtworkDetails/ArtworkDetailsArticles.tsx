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
            const imageUrl = get(article, p => p.thumbnail_image.resized.url)
            return (
              <ArticleItem
                title={article.thumbnail_title}
                imageUrl={imageUrl}
                date={article.published_at}
                author={article.author.name}
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
