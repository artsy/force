import { Spacer, Text } from "@artsy/palette"
import { ArticleAdProvider } from "Apps/Article/Components/ArticleAd/ArticleAd"
import { MetaTags } from "Components/MetaTags"
import { useScrollToOpenEditorialAuthModal } from "Utils/Hooks/useScrollToOpenEditorialAuthModal"
import { getENV } from "Utils/getENV"
import type { NewsApp_viewer$data } from "__generated__/NewsApp_viewer.graphql"
import type { FC } from "react"
import { Link } from "react-head"
import { createFragmentContainer, graphql } from "react-relay"
import { NewsIndexArticlesPaginationContainer } from "./Components/NewsIndexArticles"

interface NewsAppProps {
  viewer: NewsApp_viewer$data
}

const NewsApp: FC<React.PropsWithChildren<NewsAppProps>> = ({ viewer }) => {
  useScrollToOpenEditorialAuthModal()

  return (
    <ArticleAdProvider>
      <MetaTags
        title="News | Artsy"
        description="Never miss the biggest art world stories. Artsy Editorial delivers art world news and updates, each and every day."
      />

      <Link
        rel="alternate"
        type="application/rss+xml"
        href={`${getENV("APP_URL")}/rss/news`}
        title="Artsy News"
      />

      <Spacer y={[2, 4]} />

      <Text variant="xl">News</Text>

      <Spacer y={6} />

      <NewsIndexArticlesPaginationContainer viewer={viewer} />
    </ArticleAdProvider>
  )
}

export const NewsAppFragmentContainer = createFragmentContainer(NewsApp, {
  viewer: graphql`
    fragment NewsApp_viewer on Viewer {
      ...NewsIndexArticles_viewer
    }
  `,
})
