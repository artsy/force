import { FC } from "react"
import { Link } from "react-head"
import { Spacer, Text } from "@artsy/palette"
import { createFragmentContainer, graphql } from "react-relay"
import { MetaTags } from "v2/Components/MetaTags"
import { getENV } from "v2/Utils/getENV"
import { NewsApp_viewer } from "v2/__generated__/NewsApp_viewer.graphql"
import { useScrollingAuthModal } from "./Utils/useScrollingAuthModal"
import { NewsIndexArticlesPaginationContainer } from "./Components/NewsIndexArticles"

interface NewsAppProps {
  viewer: NewsApp_viewer
}

const NewsApp: FC<NewsAppProps> = ({ viewer }) => {
  useScrollingAuthModal()

  return (
    <>
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

      <Spacer mt={[2, 4]} />

      <Text variant="xl">News</Text>

      <Spacer mt={6} />

      <NewsIndexArticlesPaginationContainer viewer={viewer} />
    </>
  )
}

export const NewsAppFragmentContainer = createFragmentContainer(NewsApp, {
  viewer: graphql`
    fragment NewsApp_viewer on Viewer {
      ...NewsIndexArticles_viewer
    }
  `,
})
