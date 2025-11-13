import { ArticleStructuredData } from "Apps/Article/Components/ArticleStructuredData"
import { useScrollToOpenEditorialAuthModal } from "Utils/Hooks/useScrollToOpenEditorialAuthModal"
import { FullBleed, Join, Separator, Spacer } from "@artsy/palette"
import type { ArticleApp_article$data } from "__generated__/ArticleApp_article.graphql"
import type { FC } from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { ArticleAdProvider } from "./Components/ArticleAd/ArticleAd"
import { ArticleBodyFragmentContainer } from "./Components/ArticleBody"
import { ArticleChannelRelatedArticlesQueryRenderer } from "./Components/ArticleChannelRelatedArticles"
import { ArticleInfiniteScrollQueryRenderer } from "./Components/ArticleInfiniteScroll"
import { ArticleMetaTagsFragmentContainer } from "./Components/ArticleMetaTags"
import { ArticleSeriesFragmentContainer } from "./Components/ArticleSeries"
import { ArticleVerticalRelatedArticlesQueryRenderer } from "./Components/ArticleVerticalRelatedArticles"
import { ArticleVideoFragmentContainer } from "./Components/ArticleVideo"
import { ArticleVisibilityMetadataFragmentContainer } from "./Components/ArticleVisibilityMetadata"

interface ArticleAppProps {
  article: ArticleApp_article$data
}

const ArticleApp: FC<React.PropsWithChildren<ArticleAppProps>> = ({
  article,
}) => {
  useScrollToOpenEditorialAuthModal()

  return (
    <>
      <ArticleAdProvider>
        <ArticleMetaTagsFragmentContainer article={article} />

        <Join separator={<Spacer y={4} />}>
          {(() => {
            switch (article.layout) {
              case "SERIES":
                return <ArticleSeriesFragmentContainer article={article} />

              case "VIDEO":
                return <ArticleVideoFragmentContainer article={article} />

              case "NEWS":
                return <ArticleBodyFragmentContainer article={article} />

              case "CLASSIC":
                return (
                  <>
                    <ArticleBodyFragmentContainer article={article} />

                    <FullBleed>
                      <Separator />
                    </FullBleed>

                    <ArticleChannelRelatedArticlesQueryRenderer
                      id={article.internalID}
                    />
                  </>
                )

              case "FEATURE":
              case "STANDARD":
                return (
                  <>
                    <ArticleVisibilityMetadataFragmentContainer
                      article={article}
                    >
                      <ArticleBodyFragmentContainer article={article} />
                    </ArticleVisibilityMetadataFragmentContainer>

                    <FullBleed>
                      <Separator />
                    </FullBleed>

                    <ArticleVerticalRelatedArticlesQueryRenderer
                      id={article.internalID}
                    />

                    {article.channelID && (
                      <ArticleInfiniteScrollQueryRenderer
                        articleID={article.internalID}
                        channelID={article.channelID}
                      />
                    )}
                  </>
                )
            }
          })()}
        </Join>
      </ArticleAdProvider>

      <ArticleStructuredData article={article} />
    </>
  )
}

export const ArticleAppFragmentContainer = createFragmentContainer(ArticleApp, {
  article: graphql`
    fragment ArticleApp_article on Article {
      ...ArticleBody_article
      ...ArticleSeries_article
      ...ArticleVideo_article
      ...ArticleVisibilityMetadata_article
      ...ArticleMetaTags_article
      ...ArticleStructuredData_article
      internalID
      layout
      channelID
    }
  `,
})
