import { FC } from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { SystemQueryRenderer } from "v2/System/Relay/SystemQueryRenderer"
import { ArticleVerticalRelatedArticles_article } from "v2/__generated__/ArticleVerticalRelatedArticles_article.graphql"
import { ArticleVerticalRelatedArticlesQuery } from "v2/__generated__/ArticleVerticalRelatedArticlesQuery.graphql"
import { Box, Image, Shelf, Skeleton, SkeletonText, Text } from "@artsy/palette"
import { RouterLink } from "v2/System/Router/RouterLink"

interface ArticleVerticalRelatedArticlesProps {
  article: ArticleVerticalRelatedArticles_article
}

const ArticleVerticalRelatedArticles: FC<ArticleVerticalRelatedArticlesProps> = ({
  article,
}) => {
  return (
    <>
      <Text variant="lg" mb={4}>
        Further Reading in {article.vertical}
      </Text>

      <Shelf alignItems="flex-start">
        {article.verticalRelatedArticles.map(article => {
          const image = article.thumbnailImage?.cropped

          return (
            <RouterLink
              key={article.internalID}
              to={article.href}
              display="block"
              width={300}
              textDecoration="none"
            >
              {image ? (
                <Image
                  src={image.src}
                  srcSet={image.srcSet}
                  width={300}
                  height={200}
                  alt=""
                  lazyLoad
                />
              ) : (
                <Box width={300} height={200} bg="black10" />
              )}

              <Text variant="xs" textTransform="uppercase" mt={1}>
                {article.vertical}
              </Text>

              <Text variant="lg" mt={0.5} lineClamp={3}>
                {article.title}
              </Text>

              <Text variant="md" mt={0.5} lineClamp={1}>
                By {article.byline}
              </Text>

              <Text variant="md" color="black60" mt={0.5}>
                {article.publishedAt}
              </Text>
            </RouterLink>
          )
        })}
      </Shelf>
    </>
  )
}

export const ArticleVerticalRelatedArticlesFragmentContainer = createFragmentContainer(
  ArticleVerticalRelatedArticles,
  {
    article: graphql`
      fragment ArticleVerticalRelatedArticles_article on Article {
        vertical
        verticalRelatedArticles: relatedArticles(inVertical: true, size: 8) {
          vertical
          internalID
          title
          byline
          href
          publishedAt(format: "MMM D, YYYY")
          thumbnailImage {
            cropped(width: 300, height: 200) {
              width
              height
              src
              srcSet
            }
          }
        }
      }
    `,
  }
)

interface ArticleVerticalRelatedArticlesQueryRendererProps {
  id: string
}

export const ArticleVerticalRelatedArticlesQueryRenderer: FC<ArticleVerticalRelatedArticlesQueryRendererProps> = ({
  id,
}) => {
  return (
    <SystemQueryRenderer<ArticleVerticalRelatedArticlesQuery>
      lazyLoad
      placeholder={<ArticleVericalRelatedArticlesPlaceholder />}
      variables={{ id }}
      query={graphql`
        query ArticleVerticalRelatedArticlesQuery($id: String!) {
          article(id: $id) {
            ...ArticleVerticalRelatedArticles_article
          }
        }
      `}
      render={({ error, props }) => {
        if (error) {
          console.error(error)
          return null
        }

        if (!props?.article) {
          return <ArticleVericalRelatedArticlesPlaceholder />
        }

        return (
          <ArticleVerticalRelatedArticlesFragmentContainer
            article={props.article}
          />
        )
      }}
    />
  )
}

const ArticleVericalRelatedArticlesPlaceholder: FC = () => {
  return (
    <Skeleton>
      <SkeletonText variant="lg" mb={4}>
        Further Reading in Vertical
      </SkeletonText>

      <Shelf alignItems="flex-start">
        {[...new Array(8)].map((_, index) => {
          return (
            <Box key={index} width={300}>
              <Box width={300} height={200} bg="black10" />

              <SkeletonText variant="xs" textTransform="uppercase" mt={1}>
                Vertical
              </SkeletonText>

              <SkeletonText variant="lg" mt={0.5} lineClamp={3}>
                The Example Article Title
              </SkeletonText>

              <SkeletonText variant="md" mt={0.5} lineClamp={1}>
                By Example Name
              </SkeletonText>

              <SkeletonText variant="md" mt={0.5}>
                Jan 1, 1970
              </SkeletonText>
            </Box>
          )
        })}
      </Shelf>
    </Skeleton>
  )
}
