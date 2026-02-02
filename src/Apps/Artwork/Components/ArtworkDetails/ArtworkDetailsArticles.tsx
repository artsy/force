import { BorderBox, Box, Image, Stack, Text } from "@artsy/palette"
import { RouterLink } from "System/Components/RouterLink"
import { useClientQuery } from "Utils/Hooks/useClientQuery"
import type { ArtworkDetailsArticlesQuery } from "__generated__/ArtworkDetailsArticlesQuery.graphql"
import type { ArtworkDetailsArticles_artwork$data } from "__generated__/ArtworkDetailsArticles_artwork.graphql"
import type * as React from "react"
import { createFragmentContainer, graphql } from "react-relay"

interface ArtworkDetailsArticlesProps {
  artwork: ArtworkDetailsArticles_artwork$data
}

const ArtworkDetailsArticles: React.FC<ArtworkDetailsArticlesProps> = ({
  artwork,
}) => {
  const { articles } = artwork

  if (!articles?.length) return null

  return (
    <BorderBox flexDirection="column">
      <Stack gap={2}>
        {articles.map((article, index) => {
          if (!article) return null

          const image = article.thumbnailImage?.cropped

          return (
            <RouterLink
              key={article.href ?? index}
              to={article.href ?? ""}
              style={{ display: "block", textDecoration: "none" }}
            >
              <Stack gap={2} flexDirection="row">
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

                <Stack gap={0.5}>
                  <Text variant="xs">
                    {article.byline ?? "Artsy Editorial"}
                  </Text>

                  <Text variant="lg-display">{article.thumbnailTitle}</Text>

                  <Text variant="sm-display">{article.publishedAt}</Text>
                </Stack>
              </Stack>
            </RouterLink>
          )
        })}
      </Stack>
    </BorderBox>
  )
}

export const ArtworkDetailsArticlesFragmentContainer = createFragmentContainer(
  ArtworkDetailsArticles,
  {
    artwork: graphql`
      fragment ArtworkDetailsArticles_artwork on Artwork {
        articles(size: 10) {
          byline
          href
          publishedAt(format: "MMM Do, YYYY")
          thumbnailTitle
          thumbnailImage {
            cropped(width: 200, height: 150) {
              src
              srcSet
            }
          }
        }
      }
    `,
  },
)

export const useArtworkArticles = (slug: string) => {
  const { data } = useClientQuery<ArtworkDetailsArticlesQuery>({
    variables: { slug },
    query: graphql`
      query ArtworkDetailsArticlesQuery($slug: String!) {
        artwork(id: $slug) {
          ...ArtworkDetailsArticles_artwork
          articles(size: 10) {
            internalID
          }
        }
      }
    `,
  })

  if (!data?.artwork?.articles?.length) return null

  return data.artwork
}
