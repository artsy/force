import { FullBleed, Join, Separator, Spacer } from "@artsy/palette"
import { FC } from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { AdProvider } from "v2/Components/Ad"
import { MetaTags } from "v2/Components/MetaTags"
import { ArticleApp_article } from "v2/__generated__/ArticleApp_article.graphql"
import { ArticleBodyFragmentContainer } from "./Components/ArticleBody"
import { ArticleChannelRelatedArticlesQueryRenderer } from "./Components/ArticleChannelRelatedArticles"
import { ArticleInfiniteScrollQueryRenderer } from "./Components/ArticleInfiniteScroll"
import { ArticleSeriesFragmentContainer } from "./Components/ArticleSeries"
import { ArticleVerticalRelatedArticlesQueryRenderer } from "./Components/ArticleVerticalRelatedArticles"
import { ArticleVideoFragmentContainer } from "./Components/ArticleVideo"
import { ArticleVisibilityMetadataFragmentContainer } from "./Components/ArticleVisibilityMetadata"

interface ArticleAppProps {
  article: ArticleApp_article
}

const ArticleApp: FC<ArticleAppProps> = ({ article }) => {
  return (
    <AdProvider>
      <MetaTags
        title={`${article.title} | Artsy`}
        // TODO: Add description, remaining tags
      />

      <Join separator={<Spacer mt={4} />}>
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
    </AdProvider>
  )
}

export const ArticleAppFragmentContainer = createFragmentContainer(ArticleApp, {
  article: graphql`
    fragment ArticleApp_article on Article {
      ...ArticleBody_article
      ...ArticleSeries_article
      ...ArticleVideo_article
      ...ArticleVisibilityMetadata_article
      internalID
      title
      layout
      channelID
    }
  `,
})
