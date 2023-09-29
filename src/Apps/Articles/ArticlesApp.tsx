import { FC } from "react"
import { Link } from "react-head"
import { Column, GridColumns, Spacer, Text } from "@artsy/palette"
import { createFragmentContainer, graphql } from "react-relay"
import { MetaTags } from "Components/MetaTags"
import { ArticlesIndexArticlesPaginationContainer } from "./Components/ArticlesIndexArticles"
import { getENV } from "Utils/getENV"
import { ArticlesApp_viewer$data } from "__generated__/ArticlesApp_viewer.graphql"
import { useScrollToOpenEditorialAuthModal } from "Utils/Hooks/useScrollToOpenEditorialAuthModal"
import { ArticlesIndexNewsFragmentContainer } from "Apps/Articles/Components/ArticlesIndexNews"

interface ArticlesAppProps {
  viewer: ArticlesApp_viewer$data
}

const ArticlesApp: FC<ArticlesAppProps> = ({ viewer }) => {
  useScrollToOpenEditorialAuthModal()

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

      <GridColumns gridRowGap={4}>
        <Column span={[12, 4, 6]}>
          <Text as="h1" variant="xl">
            Editorial
          </Text>
        </Column>

        <Column span={[12, 8, 6]}>
          <ArticlesIndexNewsFragmentContainer viewer={viewer} />
        </Column>
      </GridColumns>

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
        ...ArticlesIndexNews_viewer
        ...ArticlesIndexArticles_viewer
      }
    `,
  }
)
