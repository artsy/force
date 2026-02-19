import {
  Button,
  Column,
  GridColumns,
  Image,
  ResponsiveBox,
  Skeleton,
  SkeletonText,
  Stack,
  Text,
} from "@artsy/palette"
import {
  CellArticleFragmentContainer,
  CellArticlePlaceholder,
} from "Components/Cells/CellArticle"
import { RouterLink } from "System/Components/RouterLink"
import type { AuthorArticlesGridQuery } from "__generated__/AuthorArticlesGridQuery.graphql"
import type { AuthorArticlesGrid_query$key } from "__generated__/AuthorArticlesGrid_query.graphql"
import { compact } from "es-toolkit"
import type { FC } from "react"
import { graphql, useLazyLoadQuery, usePaginationFragment } from "react-relay"

const PAGE_SIZE = 21

interface AuthorArticlesGridProps {
  id: string
}

export const AuthorArticlesGrid: FC<
  React.PropsWithChildren<AuthorArticlesGridProps>
> = ({ id }) => {
  const data = useLazyLoadQuery<AuthorArticlesGridQuery>(QUERY, {
    id,
    first: PAGE_SIZE,
  })

  const {
    data: fragmentData,
    loadNext,
    hasNext,
    isLoadingNext,
  } = usePaginationFragment(FRAGMENT, data as AuthorArticlesGrid_query$key)

  const connection = fragmentData.author?.articlesConnection
  const edges = compact(connection?.edges ?? [])

  if (edges.length === 0) {
    return null
  }

  const firstFive = edges.slice(0, 5)
  const firstArticleNode = firstFive[0].node
  const nextFourNodes = compact(firstFive.slice(1).map(edge => edge.node))
  const remainingNodes = compact(edges.slice(5).map(edge => edge.node))

  const handleShowMore = () => {
    if (!hasNext || isLoadingNext) return
    loadNext(PAGE_SIZE)
  }

  return (
    <Stack gap={4}>
      {/* Featured + first four articles */}
      {firstArticleNode && (
        <GridColumns gridRowGap={4} gridColumnGap={2}>
          {/* Featured article on the left */}
          <Column span={[12, 6]}>
            <RouterLink
              to={firstArticleNode.href}
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
                  {firstArticleNode.thumbnailImage?.large && (
                    <Image
                      src={firstArticleNode.thumbnailImage.large.src}
                      srcSet={firstArticleNode.thumbnailImage.large.srcSet}
                      width="100%"
                      height="100%"
                      alt=""
                      lazyLoad
                    />
                  )}
                </ResponsiveBox>

                <Stack gap={1}>
                  <Text variant="xs" fontWeight="bold">
                    {firstArticleNode.vertical}
                  </Text>

                  <Text variant="xl" lineClamp={3}>
                    {firstArticleNode.thumbnailTitle ?? firstArticleNode.title}
                  </Text>

                  <Text variant="lg-display" lineClamp={1}>
                    By {firstArticleNode.byline}
                  </Text>
                </Stack>
              </Stack>
            </RouterLink>
          </Column>

          {/* Grid with the next four */}
          <Column span={[12, 6]}>
            <GridColumns gridRowGap={4} gridColumnGap={2}>
              {nextFourNodes.map(article => (
                <Column span={[12, 6]} key={article!.internalID}>
                  <CellArticleFragmentContainer
                    article={article!}
                    mode="GRID"
                  />
                </Column>
              ))}
            </GridColumns>
          </Column>
        </GridColumns>
      )}

      {remainingNodes.length > 0 && (
        <GridColumns gridRowGap={4} gridColumnGap={2}>
          {remainingNodes.map(article => (
            <Column span={[12, 4, 3]} key={article!.internalID}>
              <CellArticleFragmentContainer article={article!} mode="GRID" />
            </Column>
          ))}
        </GridColumns>
      )}

      {hasNext && (
        <Button
          alignSelf="center"
          onClick={handleShowMore}
          loading={isLoadingNext}
        >
          Show More
        </Button>
      )}
    </Stack>
  )
}

const QUERY = graphql`
  query AuthorArticlesGridQuery($id: String!, $first: Int!, $after: String) {
    ...AuthorArticlesGrid_query
      @arguments(id: $id, first: $first, after: $after)
  }
`

const FRAGMENT = graphql`
  fragment AuthorArticlesGrid_query on Query
  @argumentDefinitions(
    id: { type: "String!" }
    first: { type: "Int", defaultValue: 20 }
    after: { type: "String" }
  )
  @refetchable(queryName: "AuthorArticlesGridPaginationQuery") {
    author(id: $id) {
      articlesConnection(first: $first, after: $after)
        @connection(key: "AuthorArticlesGrid_articlesConnection") {
        edges {
          node {
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
    }
  }
`

export const AuthorArticlesGridPlaceholder: FC<
  React.PropsWithChildren<unknown>
> = () => {
  return (
    <Skeleton>
      <GridColumns>
        <Column span={[6]}>
          <ResponsiveBox
            aspectWidth={1}
            aspectHeight={1}
            maxWidth="100%"
            bg="mono10"
          />

          <SkeletonText variant="xs" mt={1}>
            Vertical
          </SkeletonText>

          <SkeletonText variant="xl" mt={0.5} lineClamp={3}>
            The Example Article Title Longer Than The Line
          </SkeletonText>

          <SkeletonText variant="lg-display" mt={0.5} lineClamp={1}>
            By Example Name
          </SkeletonText>
        </Column>

        <Column span={[6]}>
          <GridColumns gridRowGap={4} gridColumnGap={2}>
            {Array.from({ length: 4 }).map((_, index) => (
              <Column span={[12, 6]} key={index}>
                <CellArticlePlaceholder />
              </Column>
            ))}
          </GridColumns>
        </Column>
      </GridColumns>
    </Skeleton>
  )
}
