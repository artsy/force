import { FC } from "react"
import { createFragmentContainer, graphql } from "react-relay"
import {
  FullBleedHeader,
  FullBleedHeaderOverlay,
  useFullBleedHeaderHeight,
} from "Components/FullBleedHeader/FullBleedHeader"
import {
  Box,
  Column,
  Flex,
  FullBleed,
  GridColumns,
  Image,
  ResponsiveBox,
  Spacer,
  Text,
  useTheme,
} from "@artsy/palette"
import { ArticleHero_article$data } from "__generated__/ArticleHero_article.graphql"
import styled from "styled-components"
import { CENTERED_LAYOUT_COLUMNS } from "./ArticleBody"

interface ArticleHeroProps {
  article: ArticleHero_article$data
  fixed?: boolean
}

const ArticleHero: FC<ArticleHeroProps> = ({ article, fixed = true }) => {
  const height = useFullBleedHeaderHeight()

  const { theme } = useTheme()
  const rgb = theme.name === "light" ? "255, 255, 255" : "0, 0, 0"

  if (!article.hero) return null

  switch (article.hero.layout) {
    case "FULLSCREEN": {
      return (
        <FullBleedHeader
          fixed={fixed}
          {...(article.hero.media
            ? { src: article.hero.media, mode: "VIDEO" }
            : { src: article.hero.image?.url ?? "", mode: "IMAGE" })}
        >
          <FullBleedHeaderOverlay
            alignItems="flex-start"
            flexDirection="column"
            color="white100"
            p={4}
          >
            <Text variant="sm" fontWeight="bold">
              {article.vertical}
            </Text>

            <Text as="h1" variant={["xl", "xxl"]}>
              {article.title}
            </Text>

            <Text variant={["md", "lg-display"]} color={`rgba(${rgb}, 0.8)`}>
              {article.byline}
            </Text>
          </FullBleedHeaderOverlay>
        </FullBleedHeader>
      )
    }

    case "SPLIT": {
      const image = article.hero.image?.split

      return (
        <FullBleed display="flex" flexDirection={["column-reverse", "row"]}>
          <Flex
            flexDirection="column"
            justifyContent="flex-end"
            flex={1}
            p={[2, 4]}
          >
            <Box>
              <Text variant="sm" fontWeight="bold">
                {article.vertical}
              </Text>

              <Text as="h1" variant={["xl", "xxl"]}>
                {article.title}
              </Text>

              <Text variant={["md", "lg-display"]} color="black60">
                {article.byline}
              </Text>
            </Box>
          </Flex>

          <Box flex={1} bg="black10">
            {article.hero.media && (
              <Box
                display="block"
                width="100%"
                height={height}
                style={{ objectFit: "cover" }}
                as="video"
                // @ts-ignore
                src={article.hero.media}
                autoPlay
                loop
                playsInline
                muted
              />
            )}

            {image && (
              <Image
                src={image.src}
                srcSet={image.srcSet}
                width="100%"
                height={height}
                style={{ objectFit: "cover" }}
                alt=""
                lazyLoad
              />
            )}
          </Box>
        </FullBleed>
      )
    }

    case "BASIC": {
      return (
        <>
          <Spacer y={4} />

          {article.hero.embed && (
            <ResponsiveBox
              aspectWidth={16}
              aspectHeight={9}
              maxWidth="100%"
              bg="black10"
              mb={4}
              mx="auto"
            >
              <Embed dangerouslySetInnerHTML={{ __html: article.hero.embed }} />
            </ResponsiveBox>
          )}

          <GridColumns>
            <Column {...CENTERED_LAYOUT_COLUMNS}>
              {article.vertical && (
                <Text variant="sm" fontWeight="bold">
                  {article.vertical}
                </Text>
              )}

              <Text as="h1" variant={["xl", "xxl"]}>
                {article.title}
              </Text>

              <Text variant={["md", "lg-display"]} color="black60" mb={2}>
                {article.byline}
              </Text>
            </Column>
          </GridColumns>
        </>
      )
    }

    case "TEXT": {
      const image = article.hero.image?.text

      return (
        <>
          <Spacer y={4} />

          <GridColumns>
            <Column {...CENTERED_LAYOUT_COLUMNS}>
              <Text variant="sm" fontWeight="bold">
                {article.vertical}
              </Text>

              <Text as="h1" variant={["xl", "xxl"]}>
                {article.title}
              </Text>

              <Text variant={["md", "lg-display"]} color="black60">
                {article.byline}
              </Text>
            </Column>
          </GridColumns>

          {image && (
            <>
              <Spacer y={4} />

              <FullBleed>
                <Box mx={[2, 4]}>
                  <ResponsiveBox
                    aspectWidth={16}
                    aspectHeight={9}
                    maxWidth="100%"
                  >
                    <Image
                      src={image.src}
                      srcSet={image.srcSet}
                      width="100%"
                      height="100%"
                      alt=""
                      lazyLoad
                    />
                  </ResponsiveBox>
                </Box>
              </FullBleed>
            </>
          )}
        </>
      )
    }

    default:
      return null
  }
}

export const ArticleHeroFragmentContainer = createFragmentContainer(
  ArticleHero,
  {
    article: graphql`
      fragment ArticleHero_article on Article {
        title
        href
        vertical
        byline
        hero {
          ... on ArticleFeatureSection {
            layout
            embed
            media
            image {
              url
              split: resized(width: 900) {
                src
                srcSet
              }
              text: cropped(width: 1600, height: 900) {
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

const Embed = styled.div`
  width: 100%;
  height: 100%;

  > iframe {
    display: block;
    width: 100%;
    height: 100%;
  }
`
