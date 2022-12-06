import { Box, EntityHeader, Join, Spacer, Text } from "@artsy/palette"
import { FC } from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { ArticleByline_article$data } from "__generated__/ArticleByline_article.graphql"
import { OPTIMAL_READING_WIDTH } from "./Sections/ArticleSectionText"

interface ArticleBylineProps {
  article: ArticleByline_article$data
}

const ArticleByline: FC<ArticleBylineProps> = ({ article }) => {
  if (article.authors.length === 0) {
    return (
      <Text
        variant={["xs", "md"]}
        color="black60"
        maxWidth={OPTIMAL_READING_WIDTH}
      >
        {article.byline}
      </Text>
    )
  }

  return (
    <Box maxWidth={OPTIMAL_READING_WIDTH}>
      <Join separator={<Spacer y={2} />}>
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
            <Box key={author.internalID}>
              <Text variant={["xs", "md"]} color="black60">
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
