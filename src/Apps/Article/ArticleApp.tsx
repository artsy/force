import { FullBleed, Join, Separator, Spacer } from "@artsy/palette"
import { FC } from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { ArticleApp_article$data } from "__generated__/ArticleApp_article.graphql"
import { ArticleBodyFragmentContainer } from "./Components/ArticleBody"
import { ArticleChannelRelatedArticlesQueryRenderer } from "./Components/ArticleChannelRelatedArticles"
import { ArticleInfiniteScrollQueryRenderer } from "./Components/ArticleInfiniteScroll"
import { ArticleSeriesFragmentContainer } from "./Components/ArticleSeries"
import { ArticleVerticalRelatedArticlesQueryRenderer } from "./Components/ArticleVerticalRelatedArticles"
import { ArticleVideoFragmentContainer } from "./Components/ArticleVideo"
import { ArticleAdProvider } from "./Components/ArticleAd/ArticleAd"
import { ArticleVisibilityMetadataFragmentContainer } from "./Components/ArticleVisibilityMetadata"
import { ArticleMetaTagsFragmentContainer } from "./Components/ArticleMetaTags"
import { useScrollToOpenEditorialAuthModal } from "Utils/Hooks/useScrollToOpenEditorialAuthModal"

interface ArticleAppProps {
  article: ArticleApp_article$data
}

const ArticleApp: FC<ArticleAppProps> = ({ article }) => {
  useScrollToOpenEditorialAuthModal()

  return (
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
                  <ArticleVisibilityMetadataFragmentContainer article={article}>
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
      internalID
      layout
      channelID
    }
  `,
})
