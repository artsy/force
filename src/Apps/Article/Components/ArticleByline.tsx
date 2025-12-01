import { Box, EntityHeader, Join, Spacer, Text } from "@artsy/palette"
import { RouterLink } from "System/Components/RouterLink"
import type { ArticleByline_article$data } from "__generated__/ArticleByline_article.graphql"
import type { FC } from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { OPTIMAL_READING_WIDTH } from "./Sections/ArticleSectionText"

interface ArticleBylineProps {
  article: ArticleByline_article$data
}

const ArticleByline: FC<React.PropsWithChildren<ArticleBylineProps>> = ({
  article,
}) => {
  if (article.authors.length === 0) {
    return (
      <Text
        variant={["xs", "md"]}
        color="mono60"
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
                href={`/articles/author/${author.slug}`}
                name={author.name || "Artsy Editorial"}
                initials={author.initials || "A"}
                meta={author.bio!}
                image={image!}
              />
            )
          }

          return (
            <Box key={author.internalID}>
              <RouterLink to={`/author/${author.slug}`} textDecoration="none">
                <Text variant={["xs", "md"]} color="mono60">
                  {author.name || "Artsy Editorial"}
                </Text>
              </RouterLink>

              {author.bio && (
                <Text variant="xs" color="mono60">
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
          slug
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
  },
)
