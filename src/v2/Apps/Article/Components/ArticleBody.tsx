import {
  Box,
  Column,
  GridColumns,
  HTML,
  Join,
  Spacer,
  Text,
  Image,
} from "@artsy/palette"
import { FC } from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { ArticleBody_article$data } from "v2/__generated__/ArticleBody_article.graphql"
import { ArticleShare } from "v2/Components/ArticleShare"
import { ArticleSectionImageCollectionFragmentContainer } from "./Sections/ArticleSectionImageCollection"
import { ArticleSectionTextFragmentContainer } from "./Sections/ArticleSectionText"
import { ArticleSectionImageSetFragmentContainer } from "./Sections/ArticleSectionImageSet"
import { RouterLink } from "v2/System/Router/RouterLink"
import { ArticleHeaderFragmentContainer } from "./ArticleHeader"
import { ArticleSectionVideoFragmentContainer } from "./Sections/ArticleSectionVideo"
import { ArticleSectionSocialEmbedFragmentContainer } from "./Sections/ArticleSectionSocialEmbed"
import { ArticleSectionEmbedFragmentContainer } from "./Sections/ArticleSectionEmbed"
import { ArticleBylineFragmentContainer } from "./ArticleByline"

interface ArticleBodyProps {
  article: ArticleBody_article$data
}

const ArticleBody: FC<ArticleBodyProps> = ({ article }) => {
  return (
    <>
      <ArticleHeaderFragmentContainer article={article} />

      <Spacer mt={4} />

      <GridColumns gridRowGap={4}>
        <Column
          span={[12, 8, 8, 6]}
          // Centers layout for features
          {...(article.layout === "FEATURE" ? { start: [1, 3, 3, 4] } : {})}
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
                  >
                    {article.newsSource.title}
                  </a>
                ) : (
                  article.newsSource.title
                )}
              </>
            )}

            <Spacer ml={2} />

            <ArticleShare description={article.title} pathname={article.href} />
          </Text>

          <Spacer mt={4} />

          <Join separator={<Spacer mt={4} />}>
            {article.sections.map((section, i) => {
              const isFirst = i === 0
              const isLast = i === article.sections.length - 1

              switch (section.__typename) {
                case "ArticleSectionText": {
                  return (
                    <ArticleSectionTextFragmentContainer
                      key={i}
                      section={section}
                      isFirst={article.layout === "FEATURE" && isFirst}
                      isLast={isLast}
                    />
                  )
                }

                case "ArticleSectionImageCollection": {
                  return (
                    <ArticleSectionImageCollectionFragmentContainer
                      key={i}
                      section={section}
                    />
                  )
                }

                case "ArticleSectionImageSet": {
                  return (
                    <ArticleSectionImageSetFragmentContainer
                      key={i}
                      section={section}
                    />
                  )
                }

                case "ArticleSectionVideo": {
                  return (
                    <ArticleSectionVideoFragmentContainer
                      key={i}
                      section={section}
                    />
                  )
                }

                case "ArticleSectionSocialEmbed": {
                  return (
                    <ArticleSectionSocialEmbedFragmentContainer
                      key={i}
                      section={section}
                    />
                  )
                }

                case "ArticleSectionEmbed": {
                  return (
                    <ArticleSectionEmbedFragmentContainer
                      key={i}
                      section={section}
                    />
                  )
                }

                default: {
                  return (
                    <Text key={i} variant="sm">
                      {section.__typename}
                    </Text>
                  )
                }
              }
            })}

            <ArticleBylineFragmentContainer article={article} />
          </Join>

          {article.postscript && (
            <HTML
              variant="sm"
              mt={4}
              fontStyle="italic"
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

            {/* TODO: Ad placement */}
          </Column>
        )}
      </GridColumns>
    </>
  )
}

export const ArticleBodyFragmentContainer = createFragmentContainer(
  ArticleBody,
  {
    article: graphql`
      fragment ArticleBody_article on Article {
        ...ArticleHeader_article
        ...ArticleByline_article
        layout
        title
        newsSource {
          title
          url
        }
        href
        publishedAt(format: "MMM D, YYYY h:mma")
        sections {
          __typename
          ...ArticleSectionText_section
          ...ArticleSectionImageCollection_section
          ...ArticleSectionImageSet_section
          ...ArticleSectionVideo_section
          ...ArticleSectionSocialEmbed_section
          ...ArticleSectionEmbed_section
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
