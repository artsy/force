import {
  Box,
  boxMixin,
  BoxProps,
  Clickable,
  Column,
  Flex,
  FullBleed,
  GridColumns,
  HTML,
  Image,
  Spacer,
  Text,
} from "@artsy/palette"
import { themeGet } from "@styled-system/theme-get"
import { FC } from "react"
import { createFragmentContainer, graphql } from "react-relay"
import styled, { css } from "styled-components"
import { ResponsiveValue, variant } from "styled-system"
import { AppContainer } from "Apps/Components/AppContainer"
import { HorizontalPadding } from "Apps/Components/HorizontalPadding"
import { ArticleAd } from "./ArticleAd/ArticleAd"
import { ArticleShare } from "Components/ArticleShare"
import { useMode } from "Utils/Hooks/useMode"
import { ArticleVideo_article$data } from "__generated__/ArticleVideo_article.graphql"
import { ArticleSponsorFragmentContainer } from "./ArticleSponsor"
import { RouterLink } from "System/Components/RouterLink"
import { ArticleSeriesItemFragmentContainer } from "./ArticleSeriesItem"
import { ArticleHTML } from "./ArticleHTML"
import { useArticleTracking } from "Apps/Article/useArticleTracking"
import { useFullBleedHeaderHeight } from "Components/FullBleedHeader/FullBleedHeader"

interface ArticleVideoProps {
  article: ArticleVideo_article$data
}

const ArticleVideo: FC<ArticleVideoProps> = ({ article }) => {
  const { clickedPlayVideo } = useArticleTracking()

  const height = useFullBleedHeaderHeight()

  const [mode, setMode] = useMode<"Pending" | "Playing">("Pending")

  const handleClick = () => {
    setMode("Playing")
  }

  if (!article.media?.url) return null

  return (
    <>
      <FullBleed position="relative" height={height} bg="black10">
        {article.media.coverImage?.url && (
          <Image
            src={article.media.coverImage.url}
            width="100%"
            height="100%"
            lazyLoad
            style={{ objectFit: "cover" }}
          />
        )}

        {mode === "Playing" ? (
          <Video
            src={article.media.url}
            position="absolute"
            top={0}
            left={0}
            width="100%"
            height="100%"
            bg="black100"
            autoPlay
            controls
            onPlay={clickedPlayVideo}
          />
        ) : (
          <Cover
            width="100%"
            height="100%"
            position="absolute"
            top={0}
            left={0}
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="flex-end"
            py={[2, 4]}
            onClick={handleClick}
          >
            <AppContainer>
              <HorizontalPadding>
                <GridColumns>
                  <Column span={12}>
                    <Flex alignItems="center">
                      <Play variant={["sm", "lg"]} mr={[2, 4]} />

                      <Box>
                        {(article.seriesArticle || article.media.duration) && (
                          <Text
                            variant="sm-display"
                            fontWeight="bold"
                            display="flex"
                            color="white100"
                          >
                            {article.seriesArticle && (
                              <Box mr={2}>{article.seriesArticle.title}</Box>
                            )}

                            {article.media.duration && (
                              <Box color="black10">
                                {article.media.duration}
                              </Box>
                            )}
                          </Text>
                        )}

                        <Text as="h1" variant={["xl", "xxl"]} color="white100">
                          {article.title}
                        </Text>
                      </Box>
                    </Flex>
                  </Column>

                  {article.description && (
                    <Column span={12}>
                      <HTML
                        variant={["sm-display", "lg-display"]}
                        color="black10"
                        html={article.description}
                      />
                    </Column>
                  )}
                </GridColumns>
              </HorizontalPadding>
            </AppContainer>
          </Cover>
        )}
      </FullBleed>

      <GridColumns mt={4} gridRowGap={6}>
        {article.media.description && (
          <Column span={7}>
            <Text variant="lg-display" mb={2}>
              About the Film
            </Text>

            <ArticleHTML>{article.media.description}</ArticleHTML>
          </Column>
        )}

        <Column span={4} start={9} wrap={!article.media.description}>
          {article.media.credits && (
            <Box mb={4}>
              <Text variant="lg-display" mb={2}>
                Credits
              </Text>

              <HTML variant="sm-display" html={article.media.credits} />
            </Box>
          )}

          {article.media.releaseDate && (
            <Text variant="xs" mb={4} fontWeight="bold">
              {article.media.releaseDate}
            </Text>
          )}

          <Text variant="xs" display="flex" alignItems="center">
            <Box mr={1}>Share</Box>

            <ArticleShare description={article.title} pathname={article.href} />
          </Text>
        </Column>

        {article.moreRelatedArticles.length > 0 && (
          <>
            <Column span={12}>
              <Text variant="lg-display">
                More in{" "}
                {article.seriesArticle ? (
                  <RouterLink inline to={article.seriesArticle.href}>
                    {article.seriesArticle.title}
                  </RouterLink>
                ) : (
                  article.vertical
                )}
              </Text>
            </Column>

            {article.moreRelatedArticles.map(relatedArticle => {
              return (
                <Column span={12} key={relatedArticle.internalID}>
                  <ArticleSeriesItemFragmentContainer
                    article={relatedArticle}
                  />
                </Column>
              )
            })}
          </>
        )}

        {article.seriesArticle?.description && (
          <Column span={6} start={4}>
            <Text variant="lg-display">About the Series</Text>

            {article.seriesArticle?.sponsor && (
              <ArticleSponsorFragmentContainer
                mt={4}
                sponsor={article.seriesArticle?.sponsor}
              />
            )}

            <HTML
              mt={4}
              variant="md"
              html={article.seriesArticle.description}
            />
          </Column>
        )}
      </GridColumns>

      <Spacer y={6} />

      <FullBleed bg="black5" p={1}>
        <ArticleAd unit="Desktop_InContentLB2" size="970x250" />
      </FullBleed>
    </>
  )
}

export const ArticleVideoFragmentContainer = createFragmentContainer(
  ArticleVideo,
  {
    article: graphql`
      fragment ArticleVideo_article on Article {
        vertical
        title
        href
        description
        media {
          coverImage {
            url
          }
          credits
          description
          duration
          releaseDate(format: "MMM DD, YYYY h:mma")
          url
        }
        seriesArticle {
          title
          href
          description
          sponsor {
            ...ArticleSponsor_sponsor
          }
        }
        moreRelatedArticles: relatedArticles(size: 4) {
          ...ArticleSeriesItem_article
          internalID
        }
      }
    `,
  }
)

const Cover = styled(Clickable)`
  ${({ theme }) => {
    const rgb = theme.name === "dark" ? "255, 255, 255" : "0, 0, 0"
    return css`
      background-color: rgba(${rgb}, 0.33);
      background-image: linear-gradient(
        to bottom,
        rgba(${rgb}, 0),
        rgba(${rgb}, 0.25)
      );
      transition: background-color 200ms;
      &:hover {
        background-color: rgba(${rgb}, 0.4);
      }
    `
  }}
`

const Play = styled(Box)<{ variant: ResponsiveValue<"sm" | "lg"> }>`
  &:after {
    content: "";
    display: block;
    color: ${themeGet("colors.white100")};
    ${variant({
      variants: {
        sm: {
          borderTop: "15px solid transparent",
          borderBottom: "15px solid transparent",
          borderLeft: "30px solid",
        },
        lg: {
          borderTop: "30px solid transparent",
          borderBottom: "30px solid transparent",
          borderLeft: "60px solid",
        },
      },
    })}
  }
`

const Video = styled.video<BoxProps>`
  ${boxMixin}
`
