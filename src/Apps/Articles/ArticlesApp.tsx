import { FC } from "react"
import { Link } from "react-head"
import { Spacer, Text } from "@artsy/palette"
import { createFragmentContainer, graphql } from "react-relay"
import { MetaTags } from "Components/MetaTags"
import { ArticlesIndexArticlesPaginationContainer } from "./Components/ArticlesIndexArticles"
import { getENV } from "Utils/getENV"
import { ArticlesApp_viewer$data } from "__generated__/ArticlesApp_viewer.graphql"
import { useScrollToOpenAuthModal } from "Utils/Hooks/useScrollToOpenAuthModal"
import { ContextModule, Intent } from "@artsy/cohesion"

interface ArticlesAppProps {
  viewer: ArticlesApp_viewer$data
}

const ArticlesApp: FC<ArticlesAppProps> = ({ viewer }) => {
  useScrollToOpenAuthModal({
    key: "editorial-signup-dismissed",
    modalOptions: {
      intent: Intent.viewEditorial,
      contextModule: ContextModule.popUpModal,
      copy: "Sign up for the latest in art market news",
    },
  })

  return (
    <>
      <MetaTags
        title="Editorial | Artsy"
        description="Artsy's editorial content unpacks the art world through on-the-ground coverage, studio visits, market news, original films, and art-historical explainers."
        pathname="/articles"
      />

      <Link
        rel="alternate"
        type="application/rss+xml"
        href={`${getENV("APP_URL")}/rss/news`}
        title="Artsy News"
      />

      <Spacer y={[2, 4]} />

      <Text variant="xl">Editorial</Text>

      <Spacer y={6} />

      <ArticlesIndexArticlesPaginationContainer viewer={viewer} />
    </>
  )
}

export const ArticlesAppFragmentContainer = createFragmentContainer(
  ArticlesApp,
  {
    viewer: graphql`
      fragment ArticlesApp_viewer on Viewer {
        ...ArticlesIndexArticles_viewer
      }
    `,
  }
)
