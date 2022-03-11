import { Box, EntityHeader, Join, Spacer, Text } from "@artsy/palette"
import { FC } from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { ArticleByline_article } from "v2/__generated__/ArticleByline_article.graphql"
import { OPTIMAL_READING_WIDTH } from "./Sections/ArticleSectionText"

interface ArticleBylineProps {
  article: ArticleByline_article
}

const ArticleByline: FC<ArticleBylineProps> = ({ article }) => {
  if (article.authors.length === 0) {
    return (
      <Text
        variant="md"
        fontWeight="bold"
        maxWidth={OPTIMAL_READING_WIDTH}
        mx="auto"
      >
        {article.byline}
      </Text>
    )
  }

  return (
    <Box maxWidth={OPTIMAL_READING_WIDTH} mx="auto">
      <Join separator={<Spacer mt={2} />}>
        {article.authors.map(author => {
          const image = author.image?.cropped

          if (image) {
            return (
              <EntityHeader
                key={author.internalID}
                name={author.name || "Artsy Editorial"}
                initials={author.initials || "A"}
                meta={author.bio!}
                image={image!}
              />
            )
          }

          return (
            <Box>
              <Text variant="md" fontWeight="bold">
                {author.name || "Artsy Editorial"}
              </Text>

              {author.bio && (
                <Text variant="xs" color="black60">
                  {author.bio}
                </Text>
              )}
            </Box>
          )
        })}
      </Join>
    </Box>
  )
}

export const ArticleBylineFragmentContainer = createFragmentContainer(
  ArticleByline,
  {
    article: graphql`
      fragment ArticleByline_article on Article {
        byline
        authors {
          internalID
          name
          initials
          bio
          image {
            cropped(width: 60, height: 60) {
              src
              srcSet
            }
          }
        }
      }
    `,
  }
)
