import { FC } from "react"
import { createFragmentContainer, graphql } from "react-relay"
import {
  FullBleedHeader,
  FullBleedHeaderOverlay,
  MIN_HEIGHT,
} from "v2/Components/FullBleedHeader"
import { Box, FullBleed, Image, Text } from "@artsy/palette"
import { ArticleHeader_article } from "v2/__generated__/ArticleHeader_article.graphql"
import { useNavBarHeight } from "v2/Components/NavBar/useNavBarHeight"

interface ArticleHeaderProps {
  article: ArticleHeader_article
}

const ArticleHeader: FC<ArticleHeaderProps> = ({ article }) => {
  const { desktop, mobile } = useNavBarHeight()

  if (!article.hero) {
    return (
      <>
        <Text variant="xs" textTransform="uppercase" mb={1}>
          {article.vertical}
        </Text>

        <Text variant="xxl">{article.title}</Text>

        <Text variant="xxl" color="black60">
          {article.byline}
        </Text>
      </>
    )
  }

  switch (article.hero.layout) {
    case "FULLSCREEN":
      return (
        <FullBleedHeader src={article.hero.image?.url!}>
          <FullBleedHeaderOverlay
            alignItems="flex-start"
            flexDirection="column"
            color="white100"
            p={4}
          >
            <Text variant="xs" textTransform="uppercase" mb={1}>
              {article.vertical}
            </Text>

            <Text variant="xxl">{article.title}</Text>

            <Text variant="xxl" color="rgba(255, 255, 255, 0.8)">
              {article.byline}
            </Text>
          </FullBleedHeaderOverlay>
        </FullBleedHeader>
      )

    case "SPLIT":
      const image = article.hero.image?.split

      return (
        <FullBleed display="flex">
          <Box flex={1} p={4}>
            <Text variant="xs" textTransform="uppercase" mb={1}>
              {article.vertical}
            </Text>

            <Text variant="xxl" flex={1}>
              {article.title}
            </Text>

            <Text variant="xxl" color="black60" mb={2}>
              {article.byline}
            </Text>
          </Box>

          <Box flex={1} bg="black10">
            {image && (
              <Image
                src={image.src}
                srcSet={image.srcSet}
                width="100%"
                height={[
                  `max(calc(90vh - ${mobile}px), ${MIN_HEIGHT}px)`,
                  `max(calc(90vh - ${desktop}px), ${MIN_HEIGHT}px)`,
                ]}
                style={{ objectFit: "cover" }}
                alt=""
                lazyLoad
              />
            )}
          </Box>
        </FullBleed>
      )

    case "BASIC":
      // TODO: Implement basic layout
      return null

    case "TEXT":
      // TODO: Implement text layout
      return null

    default:
      return null
  }
}

export const ArticleHeaderFragmentContainer = createFragmentContainer(
  ArticleHeader,
  {
    article: graphql`
      fragment ArticleHeader_article on Article {
        title
        vertical
        byline
        hero {
          ... on ArticleFeatureSection {
            layout
            image {
              url
              split: resized(width: 900) {
                src
                srcSet
              }
            }
          }
        }
      }
    `,
  }
)
