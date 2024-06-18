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
import { ArticlesIndexArticle_article$data } from "__generated__/ArticlesIndexArticle_article.graphql"
import { RouterLink } from "System/Components/RouterLink"
import { ArticleShare } from "Components/ArticleShare"

interface ArticlesIndexArticleProps {
  article: ArticlesIndexArticle_article$data
}

const ArticlesIndexArticle: FC<ArticlesIndexArticleProps> = ({ article }) => {
  const image = article.thumbnailImage?.cropped

  return (
    <GridColumns gridRowGap={2}>
      <Column span={6}>
        <RouterLink
          data-testid="ArticlesIndexArticle"
          to={article.href}
          display="block"
          textDecoration="none"
        >
          <Text variant="xs" mb={1}>
            {article.publishedAt}
          </Text>

          <Text as="h2" variant="xl">
            {article.thumbnailTitle}
          </Text>

          <Text as="h3" variant="xl" color="black60">
            {article.byline}
          </Text>
        </RouterLink>

        <Spacer y={2} />

        <ArticleShare
          description={article.thumbnailTitle}
          pathname={article.href}
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
            aspectHeight={607}
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
        thumbnailTitle
        byline
        publishedAt(format: "MMMM Do YYYY")
        thumbnailImage {
          # 3:2 aspect ratio
          cropped(width: 910, height: 607) {
            src
            srcSet
            width
            height
          }
        }
      }
    `,
  }
)
