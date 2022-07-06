import { FC } from "react"
import { Link } from "react-head"
import { Spacer, Text } from "@artsy/palette"
import { createFragmentContainer, graphql } from "react-relay"
import { MetaTags } from "v2/Components/MetaTags"
import { getENV } from "v2/Utils/getENV"
import { NewsApp_viewer } from "v2/__generated__/NewsApp_viewer.graphql"
import { NewsIndexArticlesPaginationContainer } from "./Components/NewsIndexArticles"
import { ArticleAdProvider } from "../Article/Components/ArticleAd"
import { useScrollToOpenAuthModal } from "v2/Utils/Hooks/useScrollToOpenAuthModal"
import { ContextModule, Intent } from "@artsy/cohesion"
import { useRouter } from "v2/System/Router/useRouter"

interface NewsAppProps {
  viewer: NewsApp_viewer
}

const NewsApp: FC<NewsAppProps> = ({ viewer }) => {
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
      afterSignUpAction: {
        action: "editorialSignup",
      },
    },
  })

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

      <Spacer mt={[2, 4]} />

      <Text variant="xl">News</Text>

      <Spacer mt={6} />

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
