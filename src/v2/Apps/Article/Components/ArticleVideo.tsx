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
  Separator,
  Text,
} from "@artsy/palette"
import { themeGet } from "@styled-system/theme-get"
import { FC } from "react"
import { createFragmentContainer, graphql } from "react-relay"
import styled from "styled-components"
import { ResponsiveValue, variant } from "styled-system"
import { AppContainer } from "v2/Apps/Components/AppContainer"
import { HorizontalPadding } from "v2/Apps/Components/HorizontalPadding"
import { ArticleAd } from "./ArticleAd"
import { ArticleShare } from "v2/Components/ArticleShare"
import { useNavBarHeight } from "v2/Components/NavBar/useNavBarHeight"
import { useMode } from "v2/Utils/Hooks/useMode"
import { ArticleVideo_article } from "v2/__generated__/ArticleVideo_article.graphql"
import { ArticleSponsorFragmentContainer } from "./ArticleSponsor"
import { RouterLink } from "v2/System/Router/RouterLink"
import { ArticleSeriesItemFragmentContainer } from "./ArticleSeriesItem"
import { useArticleTracking } from "../useArticleTracking"

interface ArticleVideoProps {
  article: ArticleVideo_article
}

const ArticleVideo: FC<ArticleVideoProps> = ({ article }) => {
  const { clickedPlayVideo } = useArticleTracking()

  const { desktop, mobile } = useNavBarHeight()

  const [mode, setMode] = useMode<"Pending" | "Playing">("Pending")

  const handleClick = () => {
    setMode("Playing")
  }

  if (!article.media?.url) return null

  return (
    <>
      <FullBleed
        position="relative"
        height={[`calc(100vh - ${mobile}px)`, `calc(100vh - ${desktop}px)`]}
        bg="black10"
      >
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
            py={[4, 6]}
            onClick={handleClick}
          >
            <AppContainer>
              <HorizontalPadding>
                <GridColumns>
                  <Column span={8} start={3} wrap>
                    <Flex alignItems="center">
                      <Play variant={["sm", "lg"]} mr={[2, 4]} />

                      <Box>
                        {(article.seriesArticle || article.media.duration) && (
                          <Text
                            variant="xs"
                            textTransform="uppercase"
                            display="flex"
                            color="white100"
                            mb={0.5}
                          >
                            {article.seriesArticle && (
                              <Box mr={2}>{article.seriesArticle.title}</Box>
                            )}

                            {article.media.duration && (
                              <Box>{article.media.duration}</Box>
                            )}
                          </Text>
                        )}

                        <Text variant={["xl", "xxl"]} color="white100">
                          {article.title}
                        </Text>
                      </Box>
                    </Flex>
                  </Column>

                  {article.description && (
                    <Column span={6} start={3}>
                      <HTML
                        variant={["sm", "lg"]}
                        color="white100"
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

      <GridColumns mt={4} gridRowGap={4}>
        <Column span={3} start={3} wrap={!article.media.description}>
          {article.media.credits && (
            <Box mb={4}>
              <Text variant="lg" mb={2}>
                Credits
              </Text>

              <HTML variant="sm" html={article.media.credits} />
            </Box>
          )}

          <Text variant="xs" textTransform="uppercase">
            <Box mb={0.5}>{article.media.releaseDate}</Box>

            <Box display="flex" alignItems="center">
              <Box mr={1}>Share</Box>

              <ArticleShare
                description={article.title}
                pathname={article.href}
              />
            </Box>
          </Text>
        </Column>

        {article.media.description && (
          <Column span={5} wrap>
            <Text variant="lg" mb={2}>
              About the Film
            </Text>

            <HTML variant="sm" html={article.media.description} />
          </Column>
        )}

        {article.moreRelatedArticles.length > 0 && (
          <>
            <Column span={8} start={3}>
              <Text variant="lg">
                More in{" "}
                {article.seriesArticle ? (
                  <RouterLink to={article.seriesArticle.href}>
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
          <>
            <Column
              span={3}
              start={3}
              display="flex"
              flexDirection="column"
              justifyContent="space-between"
            >
              <Text variant="lg">About the Series</Text>

              {article.seriesArticle?.sponsor && (
                <ArticleSponsorFragmentContainer
                  mt={4}
                  sponsor={article.seriesArticle?.sponsor}
                />
              )}
            </Column>

            <Column span={5}>
              <HTML variant="sm" html={article.seriesArticle.description} />
            </Column>
          </>
        )}

        <Column span={12}>
          <Separator mb={4} />

          <ArticleAd unit="Desktop_InContentLB2" size="970x250" />
        </Column>
      </GridColumns>
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
  background-color: rgba(0, 0, 0, 0.33);
  background-image: linear-gradient(
    to bottom,
    rgba(0, 0, 0, 0),
    rgba(0, 0, 0, 0.25)
  );
  transition: background-color 200ms;

  &:hover {
    background-color: rgba(0, 0, 0, 0.4);
  }
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
