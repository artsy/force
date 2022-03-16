import { FC } from "react"
import { Link } from "react-head"
import { Spacer, Text } from "@artsy/palette"
import { createFragmentContainer, graphql } from "react-relay"
import { MetaTags } from "v2/Components/MetaTags"
import { ArticlesIndexArticlesPaginationContainer } from "./Components/ArticlesIndexArticles"
import { getENV } from "v2/Utils/getENV"
import { ArticlesApp_viewer } from "v2/__generated__/ArticlesApp_viewer.graphql"
import { useScrollingAuthModal } from "./Utils/useScrollingAuthModal"

interface ArticlesAppProps {
  viewer: ArticlesApp_viewer
}

const ArticlesApp: FC<ArticlesAppProps> = ({ viewer }) => {
  useScrollingAuthModal()

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

      <Spacer mt={[2, 4]} />

      <Text variant="xl">Editorial</Text>

      <Spacer mt={6} />

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
