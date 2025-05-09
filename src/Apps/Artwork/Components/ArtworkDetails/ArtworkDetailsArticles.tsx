import { BorderBox, Box, Flex, Image, Join, Spacer, Text } from "@artsy/palette"
import { RouterLink } from "System/Components/RouterLink"
import type { ArtworkDetailsArticles_artwork$data } from "__generated__/ArtworkDetailsArticles_artwork.graphql"
import type * as React from "react"
import { createFragmentContainer, graphql } from "react-relay"

export interface ArtworkDetailsArticlesProps {
  artwork: ArtworkDetailsArticles_artwork$data
}

export const ArtworkDetailsArticles: React.FC<
  React.PropsWithChildren<ArtworkDetailsArticlesProps>
> = ({ artwork: { articles } }) => {
  if (!articles || articles.length < 1) {
    return null
  }

  return (
    <BorderBox flexDirection="column">
      <Join separator={<Spacer y={2} />}>
        {articles.map((article, index) => {
          if (!article) return null

          const image = article.thumbnailImage?.cropped

          return (
            <RouterLink
              key={article.href ?? index}
              to={article.href ?? ""}
              style={{ display: "block", textDecoration: "none" }}
            >
              <Flex>
                {image ? (
                  <Image
                    src={image.src}
                    srcSet={image.srcSet}
                    width={200}
                    height={150}
                    alt=""
                  />
                ) : (
                  <Box width={200} height={150} bg="mono5" />
                )}

                <Box ml={2}>
                  <Text variant="xs">
                    {article.author?.name ?? "Artsy Editorial"}
                  </Text>

                  <Text variant="lg-display" my={0.5}>
                    {article.thumbnailTitle}
                  </Text>

                  <Text variant="sm-display">{article.publishedAt}</Text>
                </Box>
              </Flex>
            </RouterLink>
          )
        })}
      </Join>
    </BorderBox>
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
          publishedAt(format: "MMM Do, YYYY")
          thumbnailImage {
            # 4:3
            cropped(width: 200, height: 150) {
              src
              srcSet
            }
          }
          thumbnailTitle
        }
      }
    `,
  },
)
