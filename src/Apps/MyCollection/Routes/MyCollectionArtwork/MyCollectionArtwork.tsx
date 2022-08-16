import { Column, GridColumns } from "@artsy/palette"
import { ArtistCurrentArticlesRailQueryRenderer } from "Apps/Artist/Routes/Overview/Components/ArtistCurrentArticlesRail"
import { createFragmentContainer, graphql } from "react-relay"
import { useFeatureFlag } from "System/useFeatureFlag"
import { MyCollectionArtwork_artwork } from "__generated__/MyCollectionArtwork_artwork.graphql"
import { MyCollectionArtworkImageBrowserFragmentContainer } from "./Components/MyCollectionArtworkImageBrowser/MyCollectionArtworkImageBrowser"
import { MyCollectionArtworkMetaFragmentContainer } from "./Components/MyCollectionArtworkMeta"
import { MyCollectionArtworkSidebarFragmentContainer } from "./Components/MyCollectionArtworkSidebar"

interface MyCollectionArtworkProps {
  artwork: MyCollectionArtwork_artwork
}
const MyCollectionArtwork: React.FC<MyCollectionArtworkProps> = ({
  artwork,
}) => {
  const enableMyCollectionPhase4ArticlesRail = useFeatureFlag(
    "my-collection-web-phase-4-articles-rail"
  )
  const slug = artwork?.artist?.slug!

  return (
    <>
      <MyCollectionArtworkMetaFragmentContainer artwork={artwork} />

      <GridColumns gridRowGap={[4, null]} py={[2, 6]}>
        <Column span={8}>
          <MyCollectionArtworkImageBrowserFragmentContainer artwork={artwork} />
        </Column>

        <Column span={4} pt={[0, 1]}>
          <MyCollectionArtworkSidebarFragmentContainer artwork={artwork} />
        </Column>
      </GridColumns>

      {!!enableMyCollectionPhase4ArticlesRail && (
        <ArtistCurrentArticlesRailQueryRenderer slug={slug} />
      )}
    </>
  )
}

export const MyCollectionArtworkFragmentContainer = createFragmentContainer(
  MyCollectionArtwork,
  {
    artwork: graphql`
      fragment MyCollectionArtwork_artwork on Artwork {
        ...MyCollectionArtworkSidebar_artwork
        ...MyCollectionArtworkMeta_artwork
        ...MyCollectionArtworkImageBrowser_artwork
        artist {
          slug
        }
      }
    `,
  }
)
