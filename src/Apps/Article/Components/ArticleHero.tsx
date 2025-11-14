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
import { CommaList } from "Components/CommaList"
import {
  FullBleedHeader,
  FullBleedHeaderOverlay,
  useFullBleedHeaderHeight,
} from "Components/FullBleedHeader/FullBleedHeader"
import { RouterLink } from "System/Components/RouterLink"
import { getAuthorPath } from "Utils/getAuthorPath"
import type { ArticleHero_article$data } from "__generated__/ArticleHero_article.graphql"
import { type FC, useMemo } from "react"
import { Link } from "react-head"
import { createFragmentContainer, graphql } from "react-relay"
import styled from "styled-components"
import { CENTERED_LAYOUT_COLUMNS } from "./ArticleBody"

interface ArticleHeroProps {
  article: ArticleHero_article$data
  fixed?: boolean
}

const ArticleHero: FC<React.PropsWithChildren<ArticleHeroProps>> = ({
  article,
  fixed = true,
}) => {
  const height = useFullBleedHeaderHeight()

  const { theme } = useTheme()
  const rgb = theme.name === "light" ? "255, 255, 255" : "0, 0, 0"

  const byline = useMemo(() => {
    return (
      <>
        {" "}
        {article.authors.length === 0 ? (
          "Artsy Editors"
        ) : (
          <CommaList>
            {article.authors.map(author => (
              <RouterLink
                key={author.internalID}
                to={getAuthorPath({
                  slug: author.slug,
                  name: author.name,
                  internalID: author.internalID,
                })}
                textDecoration="none"
              >
                {author.name}
              </RouterLink>
            ))}
          </CommaList>
        )}
      </>
    )
  }, [article.authors])

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
            color="mono0"
            p={4}
          >
            <Text variant="sm" fontWeight="bold">
              {article.vertical}
            </Text>

            <Text as="h1" variant={["xl", "xxl"]}>
              {article.title}
            </Text>

            <Text variant={["md", "lg-display"]} color={`rgba(${rgb}, 0.8)`}>
              {byline}
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

              <Text variant={["md", "lg-display"]} color="mono60">
                {byline}
              </Text>
            </Box>
          </Flex>

          <Box flex={1} bg="mono10">
            {article.hero.media && (
              <Box
                display="block"
                width="100%"
                height={height as unknown as string}
                style={{ objectFit: "cover" }}
                as="video"
                src={article.hero.media as string}
                autoPlay
                loop
                playsInline
                muted
              />
            )}

            {image && (
              <Box
                position="relative"
                width="100%"
                minHeight={height}
                height="100%"
                bg="mono10"
              >
                <Link
                  rel="preload"
                  as="image"
                  href={image.src}
                  imageSrcSet={image.srcSet}
                  fetchPriority="high"
                />
                <Image
                  src={image.src}
                  srcSet={image.srcSet}
                  width="100%"
                  height="100%"
                  style={{
                    objectFit: "cover",
                    position: "absolute",
                    top: 0,
                    left: 0,
                  }}
                  alt=""
                  fetchPriority="high"
                />
              </Box>
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
              bg="mono10"
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

              <Text variant={["md", "lg-display"]} color="mono60" mb={2}>
                {byline}
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

              <Text variant={["md", "lg-display"]} color="mono60">
                {byline}
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
                      fetchPriority="high"
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
        authors {
          internalID
          slug
          name
        }
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
  },
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
