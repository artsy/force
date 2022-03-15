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
} from "@artsy/palette"
import { FC, Fragment } from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { ArticleBody_article } from "v2/__generated__/ArticleBody_article.graphql"
import { ArticleShare } from "v2/Components/ArticleShare"
import { RouterLink } from "v2/System/Router/RouterLink"
import { ArticleHeaderFragmentContainer } from "./ArticleHeader"
import { ArticleBylineFragmentContainer } from "./ArticleByline"
import { ArticleContextProvider } from "./ArticleContext"
import { ArticleAd } from "./ArticleAd"
import { ArticleSectionFragmentContainer } from "./ArticleSection"
import { ArticleSectionAdFragmentContainer } from "./ArticleSectionAd"
import { OPTIMAL_READING_WIDTH } from "./Sections/ArticleSectionText"
import { useArticleTracking } from "../useArticleTracking"
import { AnalyticsContext } from "v2/System"
import { OwnerType } from "@artsy/cohesion"

interface ArticleBodyProps {
  article: ArticleBody_article
}

const ArticleBody: FC<ArticleBodyProps> = ({ article }) => {
  const { clickedExternalNewsSource } = useArticleTracking()

  return (
    <ArticleContextProvider articleId={article.internalID}>
      <AnalyticsContext.Provider
        value={{
          contextPageOwnerId: article.internalID,
          contextPageOwnerSlug: article.slug!,
          contextPageOwnerType: OwnerType.article,
        }}
      >
        {article.layout === "STANDARD" && (
          <FullBleed bg="black5" p={1}>
            <ArticleAd unit="Desktop_TopLeaderboard" size="970x250" />
          </FullBleed>
        )}

        <ArticleHeaderFragmentContainer article={article} />

        <Spacer mt={4} />

        <GridColumns gridRowGap={4}>
          <Column
            span={[12, 8, 8, 6]}
            // Centers layout for features & news
            {...(article.layout === "FEATURE" || article.layout === "NEWS"
              ? { start: [1, 3, 3, 4] }
              : {})}
          >
            <Text
              variant="xs"
              textTransform="uppercase"
              display="flex"
              alignItems="center"
              lineHeight={1}
            >
              {article.publishedAt}
              {article.newsSource && (
                <>
                  , via&nbsp;
                  {article.newsSource.url ? (
                    <a
                      href={article.newsSource.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => {
                        if (!article.newsSource?.url) return
                        clickedExternalNewsSource(article.newsSource.url)
                      }}
                    >
                      {article.newsSource.title}
                    </a>
                  ) : (
                    article.newsSource.title
                  )}
                </>
              )}

              <Spacer ml={2} />

              <ArticleShare
                description={article.title}
                pathname={article.href}
              />
            </Text>

            <Spacer mt={4} />

            {article.leadParagraph && (
              <HTML
                variant="sm"
                html={article.leadParagraph}
                maxWidth={OPTIMAL_READING_WIDTH}
                mx="auto"
                mb={4}
              />
            )}

            <Join separator={<Spacer mt={4} />}>
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
                variant="sm"
                maxWidth={OPTIMAL_READING_WIDTH}
                mx="auto"
                mt={4}
                fontStyle="italic"
                color="black60"
                html={article.postscript}
              />
            )}
          </Column>

          {article.layout === "STANDARD" && (
            <Column span={4}>
              {article.relatedArticles.length > 0 && (
                <>
                  <Text variant="xs" textTransform="uppercase" mb={4}>
                    Related Stories
                  </Text>

                  <Join separator={<Spacer mt={1} />}>
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
                          <Box mr={1} flexShrink={0}>
                            {img ? (
                              <Image
                                width={80}
                                height={60}
                                src={img.src}
                                srcSet={img.srcSet}
                                alt=""
                                lazyLoad
                              />
                            ) : (
                              <Box bg="black10" width={80} height={60} />
                            )}
                          </Box>

                          <Box>
                            <Text variant="md" lineClamp={2}>
                              {relatedArticle.title}
                            </Text>

                            <Text variant="md" color="black60" lineClamp={1}>
                              {relatedArticle.byline}
                            </Text>
                          </Box>
                        </RouterLink>
                      )
                    })}
                  </Join>
                </>
              )}

              <Spacer mt={4} />

              <ArticleAd
                bg="black5"
                p={1}
                unit="Desktop_RightRail1"
                size="300x250"
              />
            </Column>
          )}
        </GridColumns>
      </AnalyticsContext.Provider>
    </ArticleContextProvider>
  )
}

export const ArticleBodyFragmentContainer = createFragmentContainer(
  ArticleBody,
  {
    article: graphql`
      fragment ArticleBody_article on Article {
        ...ArticleHeader_article
        ...ArticleByline_article
        ...ArticleSectionAd_article
        internalID
        slug
        layout
        leadParagraph
        title
        newsSource {
          title
          url
        }
        href
        publishedAt(format: "MMM D, YYYY h:mma")
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
            cropped(width: 80, height: 60) {
              src
              srcSet
            }
          }
        }
      }
    `,
  }
)
