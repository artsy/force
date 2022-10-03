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
import { ArticleAdProvider } from "./Components/ArticleAd"
import { ArticleVisibilityMetadataFragmentContainer } from "./Components/ArticleVisibilityMetadata"
import { ArticleMetaTagsFragmentContainer } from "./Components/ArticleMetaTags"
import { useScrollToOpenAuthModal } from "Utils/Hooks/useScrollToOpenAuthModal"
import { ContextModule, Intent } from "@artsy/cohesion"
import { useRouter } from "System/Router/useRouter"

interface ArticleAppProps {
  article: ArticleApp_article$data
}

const ArticleApp: FC<ArticleAppProps> = ({ article }) => {
  const {
    match: { location },
  } = useRouter()

  useScrollToOpenAuthModal({
    key: "editorial-signup-dismissed",
    modalOptions: {
      intent: Intent.viewEditorial,
      contextModule: ContextModule.popUpModal,
      copy: "Sign up for the latest in art market news",
      destination: location.pathname,
      // TODO: Onboarding is triggered based on contents of redirectTo
      // prop. Move this to `afterSignupAction.action`
      redirectTo: location.pathname,
      afterSignUpAction: { action: "editorialSignup" },
    },
  })

  return (
    <ArticleAdProvider>
      {/* @ts-ignore RELAY UPGRADE 13 */}
      <ArticleMetaTagsFragmentContainer article={article} />

      <Join separator={<Spacer mt={4} />}>
        {(() => {
          switch (article.layout) {
            case "SERIES":
              // @ts-ignore RELAY UPGRADE 13
              return <ArticleSeriesFragmentContainer article={article} />

            case "VIDEO":
              // @ts-ignore RELAY UPGRADE 13
              return <ArticleVideoFragmentContainer article={article} />

            case "NEWS":
              // @ts-ignore RELAY UPGRADE 13
              return <ArticleBodyFragmentContainer article={article} />

            case "CLASSIC":
              return (
                <>
                  {/* @ts-ignore RELAY UPGRADE 13 */}
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
                  {/* @ts-ignore RELAY UPGRADE 13 */}
                  <ArticleVisibilityMetadataFragmentContainer article={article}>
                    {/* @ts-ignore RELAY UPGRADE 13 */}
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
