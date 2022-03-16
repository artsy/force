import {
  Box,
  Column,
  Flex,
  GridColumns,
  ResponsiveBox,
  Text,
  Image,
} from "@artsy/palette"
import { FC } from "react"
import { RouterLink } from "v2/System/Router/RouterLink"
import styled from "styled-components"
import { createFragmentContainer, graphql } from "react-relay"
import { ArticleSeriesItem_article } from "v2/__generated__/ArticleSeriesItem_article.graphql"

interface ArticleSeriesItemProps {
  article: ArticleSeriesItem_article
}

const ArticleSeriesItem: FC<ArticleSeriesItemProps> = ({ article }) => {
  const image = article.thumbnailImage?.display

  return (
    <RouterLink to={article.href} display="block" textDecoration="none">
      <GridColumns
        border="1px solid"
        borderColor="black100"
        gridRowGap={2}
        p={[2, 4]}
      >
        <Column span={6} order={[1, 0]}>
          <Flex
            flexDirection="column"
            justifyContent="space-between"
            height="100%"
          >
            <Box>
              <Text variant="xs" textTransform="uppercase" mb={0.5}>
                {article.title}
              </Text>

              <Text variant="xl" mb={2}>
                {article.thumbnailTitle ?? article.title}
              </Text>

              <Text variant="lg">{article.description}</Text>
            </Box>

            <Flex mt={4}>
              <Text variant="xs" textTransform="uppercase">
                {article.byline}
              </Text>

              <Text variant="xs" textTransform="uppercase" ml={2}>
                {article.publishedAt}
              </Text>
            </Flex>
          </Flex>
        </Column>

        <Column span={6}>
          <ResponsiveBox
            position="relative"
            aspectWidth={869}
            aspectHeight={580}
            maxWidth="100%"
            bg="black30"
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

            {article.media && (
              <>
                <Play
                  position="absolute"
                  bottom={2}
                  left={2}
                  color="white100"
                />

                <Text
                  variant="xs"
                  color="white100"
                  position="absolute"
                  bottom={1}
                  right={2}
                >
                  {article.media.duration}
                </Text>
              </>
            )}
          </ResponsiveBox>
        </Column>
      </GridColumns>
    </RouterLink>
  )
}

export const ArticleSeriesItemFragmentContainer = createFragmentContainer(
  ArticleSeriesItem,
  {
    article: graphql`
      fragment ArticleSeriesItem_article on Article {
        href
        title
        thumbnailTitle
        byline
        description
        publishedAt(format: "MMM DD, YYYY")
        thumbnailImage {
          # 3:2 aspect ratio
          display: cropped(width: 869, height: 580) {
            src
            srcSet
          }
        }
        media {
          duration
        }
      }
    `,
  }
)

const Play = styled(Box)`
  &:after {
    content: "";
    display: block;
    color: currentColor;
    border-top: 15px solid transparent;
    border-bottom: 15px solid transparent;
    border-left: 30px solid;
  }
`
