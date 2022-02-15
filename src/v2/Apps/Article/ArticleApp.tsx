import { FullBleed, Join, Separator, Spacer } from "@artsy/palette"
import { FC } from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { MetaTags } from "v2/Components/MetaTags"
import { ArticleApp_article } from "v2/__generated__/ArticleApp_article.graphql"
import { ArticleBodyFragmentContainer } from "./Components/ArticleBody"
import { ArticleChannelRelatedArticlesQueryRenderer } from "./Components/ArticleChannelRelatedArticles"
import { ArticleSeriesFragmentContainer } from "./Components/ArticleSeries"
import { ArticleVerticalRelatedArticlesQueryRenderer } from "./Components/ArticleVerticalRelatedArticles"
import { ArticleVideoFragmentContainer } from "./Components/ArticleVideo"

interface ArticleAppProps {
  article: ArticleApp_article
}

const ArticleApp: FC<ArticleAppProps> = ({ article }) => {
  return (
    <>
      <MetaTags
        title={`${article.title} | Artsy`}
        // TODO: Add description, remaining tags
      />

      {!article.hero &&
        article.layout !== "SERIES" &&
        article.layout !== "VIDEO" && <Spacer mt={4} />}

      <Join separator={<Spacer mt={4} />}>
        {(() => {
          switch (article.layout) {
            case "SERIES":
              return <ArticleSeriesFragmentContainer article={article} />

            case "VIDEO":
              return <ArticleVideoFragmentContainer article={article} />

            case "NEWS": // TODO
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
                  <ArticleBodyFragmentContainer article={article} />

                  <FullBleed>
                    <Separator />
                  </FullBleed>

                  <ArticleVerticalRelatedArticlesQueryRenderer
                    id={article.internalID}
                  />
                </>
              )
          }
        })()}
      </Join>
    </>
  )
}

export const ArticleAppFragmentContainer = createFragmentContainer(ArticleApp, {
  article: graphql`
    fragment ArticleApp_article on Article {
      internalID
      title
      hero {
        __typename
      }
      layout
      channelID
      ...ArticleBody_article
      ...ArticleSeries_article
      ...ArticleVideo_article
    }
  `,
})
