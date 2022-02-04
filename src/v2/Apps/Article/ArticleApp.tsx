import { FullBleed, Join, Separator, Spacer } from "@artsy/palette"
import { FC } from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { MetaTags } from "v2/Components/MetaTags"
import { ArticleApp_article } from "v2/__generated__/ArticleApp_article.graphql"
import { ArticleBodyFragmentContainer } from "./Components/ArticleBody"
import { ArticleVerticalRelatedArticlesQueryRenderer } from "./Components/ArticleVerticalRelatedArticles"

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

      {!article.hero && <Spacer mt={4} />}

      <Join separator={<Spacer mt={4} />}>
        <ArticleBodyFragmentContainer article={article} />

        <FullBleed>
          <Separator />
        </FullBleed>

        <ArticleVerticalRelatedArticlesQueryRenderer id={article.internalID} />
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
      ...ArticleBody_article
    }
  `,
})
