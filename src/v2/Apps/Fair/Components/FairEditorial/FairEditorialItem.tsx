import React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { FairEditorialItem_article } from "v2/__generated__/FairEditorialItem_article.graphql"
import { Box, Text } from "@artsy/palette"
import { RouterLink } from "v2/Artsy/Router/RouterLink"
import styled from "styled-components"

const Container = styled(RouterLink)`
  display: flex;
  text-decoration: none;
`

const Thumbnail = styled.img`
  display: block;
  width: 100%;
  height: 100%;
`

interface FairEditorialItemProps {
  article: FairEditorialItem_article
}

export const FairEditorialItem: React.FC<FairEditorialItemProps> = ({
  article,
}) => {
  return (
    <Container
      to={article.href}
      aria-label={`${article.title} (${article.publishedAt})`}
    >
      <Box flex="1" pr={3}>
        <Text variant="subtitle" as="h4" mb={0.5}>
          {article.title}
        </Text>

        <Text variant="text" color="black60">
          {article.publishedAt}
        </Text>
      </Box>

      <Box
        bg="black10"
        width={140}
        height={80}
        borderRadius={2}
        overflow="hidden"
      >
        {article.thumbnailImage && (
          <Thumbnail
            src={article.thumbnailImage._1x.src}
            srcSet={`${article.thumbnailImage._1x.src} 1x, ${article.thumbnailImage._2x.src} 2x`}
            alt={article.thumbnailTitle}
          />
        )}
      </Box>
    </Container>
  )
}

export const FairEditorialItemFragmentContainer = createFragmentContainer(
  FairEditorialItem,
  {
    article: graphql`
      fragment FairEditorialItem_article on Article {
        id
        title
        href
        publishedAt(format: "MMM Do, YY")
        thumbnailTitle
        thumbnailImage {
          _1x: cropped(width: 140, height: 80) {
            width
            height
            src: url
          }
          _2x: cropped(width: 280, height: 160) {
            width
            height
            src: url
          }
        }
      }
    `,
  }
)
