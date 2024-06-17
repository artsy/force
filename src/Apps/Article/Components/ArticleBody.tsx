import {
  Box,
  Column,
  GridColumns,
  HTML,
  Join,
  Spacer,
  Text,
  Image,
  FullBleed,
  Flex,
  ColumnSpan,
  ColumnStart,
} from "@artsy/palette"
import { DateTime } from "luxon"
import { FC, Fragment } from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { ArticleBody_article$data } from "__generated__/ArticleBody_article.graphql"
import { ArticleShare } from "Components/ArticleShare"
import { RouterLink } from "System/Components/RouterLink"
import { ArticleHeroFragmentContainer } from "./ArticleHero"
import { ArticleBylineFragmentContainer } from "./ArticleByline"
import { ArticleContextProvider } from "./ArticleContext"
import { ArticleAd } from "./ArticleAd/ArticleAd"
import { ArticleSectionFragmentContainer } from "./ArticleSection"
import { ArticleSectionAdFragmentContainer } from "./ArticleSectionAd"
import { OPTIMAL_READING_WIDTH } from "./Sections/ArticleSectionText"
import { Analytics } from "System/Contexts/AnalyticsContext"
import { ArticleNewsSourceFragmentContainer } from "./ArticleNewsSource"
import { TopContextBar } from "Components/TopContextBar"
import { Sticky } from "Components/Sticky"

interface ArticleBodyProps {
  article: ArticleBody_article$data
}

const ArticleBody: FC<ArticleBodyProps> = ({ article }) => {
  const centered = article.layout === "FEATURE" || article.layout === "NEWS"

  return (
    <Analytics contextPageOwnerId={article.internalID}>
      <ArticleContextProvider articleId={article.internalID}>
        {article.layout === "STANDARD" && (
          <FullBleed bg="black5" p={1}>
            <ArticleAd unit="Desktop_TopLeaderboard" size="970x250" />
          </FullBleed>
        )}

        {article.seriesArticle && (
          <TopContextBar displayBackArrow href={article.seriesArticle.href}>
            {article.seriesArticle.thumbnailTitle}
          </TopContextBar>
        )}

        <ArticleHeroFragmentContainer article={article} />

        <Spacer y={4} />

        <GridColumns gridRowGap={4}>
          <Column {...(centered ? CENTERED_LAYOUT_COLUMNS : { span: 7 })}>
            {/* If there's no hero display a normal headline */}
            {!article.hero && (
              <>
                <Text variant="sm" fontWeight="bold">
                  {article.vertical}
                </Text>

                <RouterLink
                  to={article.href}
                  display="block"
                  textDecoration="none"
                >
                  <Text as="h1" variant={["lg-display", "xl", "xxl"]}>
                    {article.title}
                  </Text>

                  <Text variant={["md", "lg-display"]} color="black60">
                    {article.byline}
                  </Text>
                </RouterLink>

                <Spacer y={2} />
              </>
            )}

            <Flex justifyContent="space-between">
              <Text
                variant="xs"
                fontWeight="bold"
                display="flex"
                alignItems="center"
                lineHeight={1}
              >
                {!!article.publishedAt &&
                  DateTime.fromISO(article.publishedAt).toFormat(
                    "MMM d, yyyy h:mma"
                  )}

                <ArticleNewsSourceFragmentContainer article={article} />
              </Text>

              <ArticleShare
                description={article.title}
                pathname={article.href}
              />
            </Flex>

            <Spacer y={6} />

            {/* Begin article contents */}

            {article.leadParagraph && (
              <HTML
                variant="md"
                html={article.leadParagraph}
                maxWidth={OPTIMAL_READING_WIDTH}
                mb={4}
              />
            )}

            <Join separator={<Spacer y={4} />}>
              {article.sections.map((section, i) => {
                const isFirst = article.layout === "FEATURE" && i === 0
                const isLast = i === article.sections.length - 1

                return (
                  <Fragment key={i}>
                    <ArticleSectionFragmentContainer
                      isFirst={isFirst}
                      isLast={isLast}
                      section={section}
                    />

                    <ArticleSectionAdFragmentContainer
                      article={article}
                      i={i}
                    />
                  </Fragment>
                )
              })}

              <ArticleBylineFragmentContainer article={article} />
            </Join>

            {article.postscript && (
              <HTML
                variant="md"
                maxWidth={OPTIMAL_READING_WIDTH}
                mt={4}
                fontStyle="italic"
                color="black60"
                html={article.postscript}
              />
            )}
          </Column>

          {article.layout === "STANDARD" && (
            <Column span={4} start={9}>
              <Box
                id={`Sticky__ArticleSidebar--${article.internalID}`}
                height="100%"
              >
                {/* Negative margin outside of sticky + corresponding positive padding inside of sticky to adjust whitespace around text */}
                <Spacer y={-2} />

                <Sticky
                  bottomBoundary={`#Sticky__ArticleSidebar--${article.internalID}`}
                >
                  {article.relatedArticles.length > 0 && (
                    <>
                      <Text variant="lg-display" pt={2}>
                        Related Stories
                      </Text>

                      <Spacer y={2} />

                      <Join separator={<Spacer y={1} />}>
                        {article.relatedArticles.map(relatedArticle => {
                          const img = relatedArticle.thumbnailImage?.cropped

                          return (
                            <RouterLink
                              key={relatedArticle.internalID}
                              display="flex"
                              to={relatedArticle.href}
                              textDecoration="none"
                              aria-label={`${relatedArticle.title} by ${relatedArticle.byline}`}
                            >
                              <Box mr={2} flexShrink={0}>
                                {img ? (
                                  <Image
                                    width={100}
                                    height={100}
                                    src={img.src}
                                    srcSet={img.srcSet}
                                    alt=""
                                    lazyLoad
                                  />
                                ) : (
                                  <Box bg="black10" width={100} height={100} />
                                )}
                              </Box>

                              <Box>
                                <Text variant="sm-display" lineClamp={2}>
                                  {relatedArticle.title}
                                </Text>

                                <Text
                                  variant="xs"
                                  color="black60"
                                  lineClamp={1}
                                >
                                  {relatedArticle.byline}
                                </Text>
                              </Box>
                            </RouterLink>
                          )
                        })}
                      </Join>
                    </>
                  )}

                  <Spacer y={2} />

                  <ArticleAd
                    bg="black5"
                    p={1}
                    unit="Desktop_RightRail1"
                    size="300x250"
                  />
                </Sticky>
              </Box>
            </Column>
          )}
        </GridColumns>
      </ArticleContextProvider>
    </Analytics>
  )
}

export const CENTERED_LAYOUT_COLUMNS: {
  span: ColumnSpan[]
  start: ColumnStart[]
} = {
  span: [12, 8, 6],
  start: [1, 3, 4],
}

export const ArticleBodyFragmentContainer = createFragmentContainer(
  ArticleBody,
  {
    article: graphql`
      fragment ArticleBody_article on Article {
        ...ArticleHero_article
        ...ArticleByline_article
        ...ArticleSectionAd_article
        ...ArticleNewsSource_article
        hero {
          __typename
        }
        seriesArticle {
          thumbnailTitle
          href
        }
        vertical
        byline
        internalID
        slug
        layout
        leadParagraph
        title
        href
        publishedAt
        sections {
          ...ArticleSection_section
        }
        postscript
        relatedArticles {
          internalID
          title
          href
          byline
          thumbnailImage {
            cropped(width: 100, height: 100) {
              src
              srcSet
            }
          }
        }
      }
    `,
  }
)
