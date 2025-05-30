import {
  Box,
  Column,
  GridColumns,
  Image,
  ResponsiveBox,
  Spacer,
  Text,
  useTheme,
} from "@artsy/palette"
import { RouterLink } from "System/Components/RouterLink"
import type { ArticleSeriesItem_article$data } from "__generated__/ArticleSeriesItem_article.graphql"
import type { FC } from "react"
import { createFragmentContainer, graphql } from "react-relay"
import styled from "styled-components"

interface ArticleSeriesItemProps {
  article: ArticleSeriesItem_article$data
}

const ArticleSeriesItem: FC<
  React.PropsWithChildren<ArticleSeriesItemProps>
> = ({ article }) => {
  const image = article.thumbnailImage?.display
  const context = article.seriesArticle?.title ?? article.vertical

  const { theme } = useTheme()

  return (
    <RouterLink to={article.href} display="block" textDecoration="none">
      <GridColumns border="1px solid" borderColor="mono10" p={2}>
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

          <Spacer y={4} />

          <Text variant="md" color="mono60">
            {article.byline}
          </Text>

          <Spacer y={4} />

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
            bg="mono30"
          >
            {image && (
              <>
                <Image
                  src={image.src}
                  srcSet={image.srcSet}
                  width="100%"
                  height="100%"
                  lazyLoad
                />
                <Box
                  width="100%"
                  height="100%"
                  position="absolute"
                  bottom={0}
                  left={0}
                  style={{ background: theme.effects.overlayGradient }}
                ></Box>
              </>
            )}

            {article.media && (
              <>
                <Play position="absolute" bottom={2} left={2} color="mono0" />

                <Text
                  variant="xs"
                  color="mono0"
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
  },
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
