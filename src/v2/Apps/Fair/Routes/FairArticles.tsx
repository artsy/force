import React, { useState } from "react"
import {
  ResponsiveBox,
  Text,
  GridColumns,
  Column,
  Image,
  Box,
  Button,
  Message,
} from "@artsy/palette"
import {
  createPaginationContainer,
  graphql,
  RelayPaginationProp,
} from "react-relay"
import { FairArticles_fair } from "v2/__generated__/FairArticles_fair.graphql"
import { RouterLink } from "v2/Artsy/Router/RouterLink"
import { FairEditorialShare } from "../Components/FairEditorialShare"

interface FairArticlesProps {
  fair: FairArticles_fair
  relay: RelayPaginationProp
}

const FairArticles: React.FC<FairArticlesProps> = ({ fair, relay }) => {
  const {
    articlesConnection: { edges: articles, totalCount },
  } = fair

  const [isLoading, setIsLoading] = useState(false)

  const handleClick = () => {
    if (!relay.hasMore() || relay.isLoading()) return

    setIsLoading(true)

    relay.loadMore(
      9, // 3 rows of 3
      err => {
        setIsLoading(false)

        if (err) {
          console.error(err)
        }
      }
    )
  }

  if (totalCount === 0) {
    return <Message>There aren’t any articles at this time.</Message>
  }

  const [{ node: heroArticle }, ...remainingArticles] = articles

  return (
    <>
      <Text as="h1" variant="largeTitle" my={3}>
        Articles
      </Text>

      <GridColumns gridRowGap={[3, 6]}>
        <Column span={12} position="relative">
          {heroArticle.thumbnailImage && (
            <GridColumns>
              <Column span={8}>
                <RouterLink
                  to={heroArticle.href}
                  style={{ display: "block", textDecoration: "none" }}
                >
                  <ResponsiveBox
                    aspectWidth={heroArticle.thumbnailImage.large.width}
                    aspectHeight={heroArticle.thumbnailImage.large.height}
                    maxWidth="100%"
                    bg="black10"
                  >
                    <Image
                      src={heroArticle.thumbnailImage.large.src}
                      srcSet={heroArticle.thumbnailImage.large.srcSet}
                      alt={heroArticle.thumbnailTitle}
                      width="100%"
                      height="100%"
                    />
                  </ResponsiveBox>
                </RouterLink>
              </Column>
            </GridColumns>
          )}

          <Box
            width={["75%", "50%"]}
            position="absolute"
            bottom={0}
            right={0}
            bg="white100"
            p={2}
          >
            <RouterLink
              to={heroArticle.href}
              style={{ display: "block", textDecoration: "none" }}
            >
              <Text as="h3" pt={[0, 6]} mb={0.5} variant="title">
                {heroArticle.title}
              </Text>

              {heroArticle.author && (
                <Text variant="caption" color="black60">
                  {heroArticle.author.name}
                </Text>
              )}

              <Text variant="caption">{heroArticle.publishedAt}</Text>
            </RouterLink>

            <FairEditorialShare
              mt={1}
              subject={heroArticle.title}
              url={`https://www.artsy.net${heroArticle.href}`}
            />
          </Box>
        </Column>

        {remainingArticles.map(({ node: article }) => {
          return (
            <Column key={article.internalID} span={4}>
              <RouterLink
                to={article.href}
                style={{ display: "block", textDecoration: "none" }}
              >
                {article.thumbnailImage && (
                  <ResponsiveBox
                    aspectWidth={article.thumbnailImage.medium.width}
                    aspectHeight={article.thumbnailImage.medium.height}
                    maxWidth="100%"
                  >
                    <Image
                      src={article.thumbnailImage.medium.src}
                      srcSet={article.thumbnailImage.medium.srcSet}
                      alt=""
                      width="100%"
                      height="100%"
                      lazyLoad
                    />
                  </ResponsiveBox>
                )}

                <Text as="h3" variant="subtitle" mt={1} mb={0.5}>
                  {article.title}
                </Text>

                {article.author && (
                  <Text color="black60" variant="caption">
                    {article.author.name}
                  </Text>
                )}

                <Text variant="caption">{article.publishedAt}</Text>
              </RouterLink>

              <FairEditorialShare
                mt={1}
                subject={article.title}
                url={`https://www.artsy.net${article.href}`}
              />
            </Column>
          )
        })}

        {totalCount >= 7 && (
          <Column span={6} start={4}>
            <Button
              width="100%"
              variant="secondaryGray"
              onClick={handleClick}
              loading={isLoading}
              disabled={!relay.hasMore()}
            >
              Show more
            </Button>
          </Column>
        )}
      </GridColumns>
    </>
  )
}

export const FAIR_ARTICLES_QUERY = graphql`
  query FairArticlesQuery($id: String!, $first: Int!, $after: String) {
    fair(id: $id) {
      ...FairArticles_fair @arguments(first: $first, after: $after)
    }
  }
`

export const FairArticlesPaginationContainer = createPaginationContainer(
  FairArticles,
  {
    fair: graphql`
      fragment FairArticles_fair on Fair
        @argumentDefinitions(
          # 1 hero article + 2 rows of 3
          first: { type: "Int", defaultValue: 7 }
          after: { type: "String" }
        ) {
        slug
        articlesConnection(first: $first, after: $after)
          @connection(key: "FairArticlesQuery_articlesConnection") {
          totalCount
          edges {
            node {
              internalID
              title
              href
              author {
                name
              }
              publishedAt(format: "MMM Do, YYYY")
              thumbnailTitle
              thumbnailImage {
                large: cropped(width: 733, height: 550) {
                  width
                  height
                  src
                  srcSet
                }
                medium: cropped(width: 267, height: 150) {
                  width
                  height
                  src
                  srcSet
                }
              }
            }
          }
        }
      }
    `,
  },
  {
    query: FAIR_ARTICLES_QUERY,
    direction: "forward",
    getVariables({ fair: { slug: id } }, { cursor: after }, { first }) {
      return { after, first, id }
    },
  }
)
