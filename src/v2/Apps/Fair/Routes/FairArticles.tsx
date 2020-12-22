import React from "react"
import {
  ResponsiveBox,
  Text,
  GridColumns,
  Column,
  Box,
  Image,
} from "@artsy/palette"
import { createFragmentContainer, graphql } from "react-relay"
import { FairArticles_fair } from "v2/__generated__/FairArticles_fair.graphql"
import { Masonry } from "v2/Components/Masonry"
import { RouterLink } from "v2/Artsy/Router/RouterLink"

interface FairArticlesProps {
  fair: FairArticles_fair
}

const FairArticles: React.FC<FairArticlesProps> = ({ fair }) => {
  const {
    articlesConnection: { articles },
  } = fair

  const [{ article: heroArticle }, ...remainingArticles] = articles

  return (
    <>
      <Text as="h1" variant="largeTitle" fontSize={60} my={2}>
        Articles
      </Text>

      <GridColumns>
        <Column
          span={6}
          start={4}
          borderBottom="1px solid"
          borderColor="black10"
        >
          <RouterLink
            to={heroArticle.href}
            style={{ display: "block", textDecoration: "none" }}
          >
            <ResponsiveBox
              aspectWidth={1}
              aspectHeight={1}
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

            <Text as="h3" mt={2} mb={1.5} variant="largeTitle">
              {heroArticle.title}
            </Text>

            {heroArticle.author && (
              <Text mt={1} variant="mediumText">
                {heroArticle.author.name}
              </Text>
            )}

            <Text mb={2} color="black60">
              {heroArticle.publishedAt}
            </Text>
          </RouterLink>
        </Column>
      </GridColumns>

      <Masonry columnCount={[1, 3]} gridColumnGap={20} my={4}>
        {remainingArticles.map(({ article }) => {
          return (
            <Box key={article.internalID} mb={4}>
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
                      alt={article.thumbnailTitle}
                      width="100%"
                      height="100%"
                      lazyLoad
                    />
                  </ResponsiveBox>
                )}

                <Text as="h3" mt={1.5} mb={1} variant="subtitle">
                  {article.title}
                </Text>

                {article.author && (
                  <Text variant="mediumText">{article.author.name}</Text>
                )}

                <Text color="black60">{article.publishedAt}</Text>
              </RouterLink>
            </Box>
          )
        })}
      </Masonry>
    </>
  )
}

export const FairArticlesFragmentContainer = createFragmentContainer(
  FairArticles,
  {
    fair: graphql`
      fragment FairArticles_fair on Fair {
        articlesConnection(first: 10) {
          articles: edges {
            article: node {
              internalID
              title
              href
              author {
                name
              }
              publishedAt(format: "MMM Do, YYYY")
              thumbnailTitle
              thumbnailImage {
                large: cropped(width: 546, height: 546) {
                  width
                  height
                  src
                  srcSet
                }
                medium: cropped(width: 360, height: 270) {
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
  }
)
