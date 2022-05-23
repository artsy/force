import {
  Box,
  Column,
  GridColumns,
  ResponsiveBox,
  Text,
  Image,
  Spacer,
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
  const context = article.seriesArticle?.title ?? article.vertical

  return (
    <RouterLink to={article.href} display="block" textDecoration="none">
      <GridColumns border="1px solid" borderColor="black10" p={2}>
        <Column span={6} order={[1, 0]}>
          {context && (
            <Text variant="sm-display" fontWeight="bold" mb={1}>
              {context}
            </Text>
          )}

          <Text variant="xl" mb={1}>
            {article.thumbnailTitle ?? article.title}
          </Text>

          <Text variant="lg-display">{article.description}</Text>

          <Spacer mt={4} />

          <Text variant="md" color="black60">
            {article.byline}
          </Text>

          <Spacer mt={4} />

          <Text variant="xs" fontWeight="bold">
            {article.publishedAt}
          </Text>
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
        vertical
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
        seriesArticle {
          title
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
