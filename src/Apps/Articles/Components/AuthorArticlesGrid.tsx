import {
  Button,
  Column,
  GridColumns,
  Image,
  ResponsiveBox,
  Stack,
  Text,
} from "@artsy/palette"
import { CellArticleFragmentContainer } from "Components/Cells/CellArticle"
import { RouterLink } from "System/Components/RouterLink"
import type { AuthorArticlesGridQuery } from "__generated__/AuthorArticlesGridQuery.graphql"
import type { FC } from "react"
import { graphql, useLazyLoadQuery } from "react-relay"

interface AuthorArticlesGridProps {
  id: string
}

export const AuthorArticlesGrid: FC<
  React.PropsWithChildren<AuthorArticlesGridProps>
> = ({ id }) => {
  const { author } = useLazyLoadQuery<AuthorArticlesGridQuery>(QUERY, { id })

  if (!author?.articles || author.articles.length === 0) {
    return null
  }

  const [firstArticle, ...restOfArticles] = author.articles.slice(0, 5)

  return (
    <Stack gap={4}>
      <GridColumns>
        <Column span={[6]}>
          <RouterLink
            to={firstArticle.href}
            display="block"
            textDecoration="none"
            width="100%"
          >
            <Stack gap={2}>
              <ResponsiveBox
                aspectWidth={1}
                aspectHeight={1}
                maxWidth="100%"
                bg="mono10"
              >
                {firstArticle.thumbnailImage?.large && (
                  <Image
                    src={firstArticle.thumbnailImage.large.src}
                    srcSet={firstArticle.thumbnailImage.large.srcSet}
                    width="100%"
                    height="100%"
                    alt=""
                    lazyLoad
                  />
                )}
              </ResponsiveBox>

              <Stack gap={1}>
                <Text variant="xs" fontWeight="bold">
                  {firstArticle.vertical}
                </Text>

                <Text variant="xl" lineClamp={3}>
                  {firstArticle.thumbnailTitle ?? firstArticle.title}
                </Text>

                <Text variant="lg-display" lineClamp={1}>
                  By {firstArticle.byline}
                </Text>
              </Stack>
            </Stack>
          </RouterLink>
        </Column>

        <Column span={[6]}>
          <GridColumns gridRowGap={4} gridColumnGap={2}>
            {restOfArticles.map(article => {
              return (
                <Column span={[12, 6]} key={article.internalID}>
                  <CellArticleFragmentContainer article={article} mode="GRID" />
                </Column>
              )
            })}
          </GridColumns>
        </Column>
      </GridColumns>

      <Button alignSelf="center">Show more</Button>
    </Stack>
  )
}

const QUERY = graphql`
  query AuthorArticlesGridQuery($id: String!) {
    author(id: $id) {
      articles {
        ...CellArticle_article
        internalID
        href
        vertical
        thumbnailTitle
        title
        byline
        publishedAt(format: "MMM D, YYYY")
        thumbnailImage {
          large: cropped(width: 600, height: 600) {
            src
            srcSet
          }
        }
      }
    }
  }
`

export const AuthorArticlesGridPlaceholder: FC<
  React.PropsWithChildren<unknown>
> = () => {
  return (
    <Stack gap={4}>
      <Text variant="lg-display" as="h3">
        Loading articles...
      </Text>

      <GridColumns>
        <Column span={[6]}>
          <ResponsiveBox
            aspectWidth={1}
            aspectHeight={1}
            maxWidth="100%"
            bg="mono10"
          />
        </Column>

        <Column span={[6]}>
          <GridColumns gridRowGap={4} gridColumnGap={2}>
            {Array.from({ length: 4 }).map((_, index) => (
              <Column span={[12, 6]} key={index}>
                <ResponsiveBox
                  aspectWidth={1.5}
                  aspectHeight={1}
                  maxWidth="100%"
                  bg="mono10"
                />
              </Column>
            ))}
          </GridColumns>
        </Column>
      </GridColumns>
    </Stack>
  )
}
