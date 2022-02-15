import { EntityHeader, Join, Spacer, Text } from "@artsy/palette"
import { FC } from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { ArticleByline_article } from "v2/__generated__/ArticleByline_article.graphql"

interface ArticleBylineProps {
  article: ArticleByline_article
}

const ArticleByline: FC<ArticleBylineProps> = ({ article }) => {
  if (article.authors.length === 0) {
    return (
      <Text variant="md" fontWeight="bold">
        —{article.byline}
      </Text>
    )
  }

  return (
    <Join separator={<Spacer mt={2} />}>
      {article.authors.map(author => {
        const image = author.image?.cropped

        return (
          <EntityHeader
            name={author.name || "Artsy Editorial"}
            initials={author.initials || "A"}
            meta={author.bio!}
            image={image!}
          />
        )
      })}
    </Join>
  )
}

export const ArticleBylineFragmentContainer = createFragmentContainer(
  ArticleByline,
  {
    article: graphql`
      fragment ArticleByline_article on Article {
        byline
        authors {
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
