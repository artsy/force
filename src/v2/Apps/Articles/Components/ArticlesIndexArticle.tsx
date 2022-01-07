import { FC } from "react"
import {
  Column,
  GridColumns,
  ResponsiveBox,
  Text,
  Image,
  Spacer,
} from "@artsy/palette"
import { graphql, createFragmentContainer } from "react-relay"
import { ArticlesIndexArticle_article } from "v2/__generated__/ArticlesIndexArticle_article.graphql"
import { RouterLink } from "v2/System/Router/RouterLink"
import { ArticlesIndexArticleShare } from "./ArticlesIndexArticleShare"
import { getENV } from "v2/Utils/getENV"

interface ArticlesIndexArticleProps {
  article: ArticlesIndexArticle_article
}

const ArticlesIndexArticle: FC<ArticlesIndexArticleProps> = ({ article }) => {
  const image = article.thumbnailImage?.cropped

  return (
    <GridColumns gridRowGap={2}>
      <Column span={6}>
        <RouterLink to={article.href} display="block" textDecoration="none">
          <Text variant="xs" textTransform="uppercase" mb={1}>
            {article.publishedAt}
          </Text>

          <Text variant="xl">{article.title}</Text>

          <Text variant="xl" color="black60">
            {article.author?.name ?? "Artsy Editorial"}
          </Text>
        </RouterLink>

        <Spacer mt={2} />

        <ArticlesIndexArticleShare
          description={article.title ?? "Artsy Editorial"}
          url={`${getENV("APP_URL")}${article.href}`}
        />
      </Column>

      <Column span={6}>
        <RouterLink
          to={article.href}
          display="block"
          textDecoration="none"
          tabIndex={-1}
        >
          <ResponsiveBox
            bg="black30"
            aspectWidth={910}
            aspectHeight={511}
            maxWidth="100%"
          >
            {image && (
              <Image
                src={image.src}
                srcSet={image.srcSet}
                width="100%"
                height="100%"
                lazyLoad
              />
            )}
          </ResponsiveBox>
        </RouterLink>
      </Column>
    </GridColumns>
  )
}

export const ArticlesIndexArticleFragmentContainer = createFragmentContainer(
  ArticlesIndexArticle,
  {
    article: graphql`
      fragment ArticlesIndexArticle_article on Article {
        href
        title
        publishedAt(format: "MMMM Do YYYY")
        author {
          name
        }
        thumbnailImage {
          cropped(width: 910, height: 511) {
            src
            srcSet
          }
        }
      }
    `,
  }
)
