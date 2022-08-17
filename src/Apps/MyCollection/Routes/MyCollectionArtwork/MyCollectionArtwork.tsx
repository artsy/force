import { Button, Column, Flex, GridColumns } from "@artsy/palette"
import { ArtistCurrentArticlesRailQueryRenderer } from "Apps/Artist/Routes/Overview/Components/ArtistCurrentArticlesRail"
import { ArtworkImageBrowserFragmentContainer } from "Apps/Artwork/Components/ArtworkImageBrowser"
import { createFragmentContainer, graphql } from "react-relay"
import { RouterLink } from "System/Router/RouterLink"
import { useFeatureFlag } from "System/useFeatureFlag"
import { Media } from "Utils/Responsive"
import { MyCollectionArtwork_artwork } from "__generated__/MyCollectionArtwork_artwork.graphql"
import { MyCollectionArtworkMetaFragmentContainer } from "./Components/MyCollectionArtworkMeta"
import { MyCollectionArtworkSidebarFragmentContainer } from "./Components/MyCollectionArtworkSidebar"

interface MyCollectionArtworkProps {
  artwork: MyCollectionArtwork_artwork
}
const MyCollectionArtwork: React.FC<MyCollectionArtworkProps> = ({
  artwork,
}) => {
  const isMyCollectionPhase3Enabled = useFeatureFlag(
    "my-collection-web-phase-3"
  )
  const enableMyCollectionPhase4ArticlesRail = useFeatureFlag(
    "my-collection-web-phase-4-articles-rail"
  )
  const slug = artwork?.artist?.slug!

  const EditArtworkButton = () => (
    <Flex justifyContent="flex-end" pb={2}>
      <Button
        // @ts-ignore
        as={RouterLink}
        variant="secondaryNeutral"
        size="small"
        to={`/my-collection/artworks/${artwork.internalID}/edit`}
        alignSelf="flex-end"
      >
        Edit Artwork Details
      </Button>
    </Flex>
  )

  return (
    <>
      <MyCollectionArtworkMetaFragmentContainer artwork={artwork} />

      <GridColumns gridRowGap={[4, null]} py={[2, 6]}>
        <Column span={8}>
          <Media lessThan="sm">
            {!!isMyCollectionPhase3Enabled && <EditArtworkButton />}
          </Media>
          <ArtworkImageBrowserFragmentContainer
            artwork={artwork}
            isMyCollectionArtwork
          />
        </Column>

        <Column span={4}>
          <Media greaterThanOrEqual="sm">
            {!!isMyCollectionPhase3Enabled && <EditArtworkButton />}
          </Media>
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
        ...ArtworkImageBrowser_artwork
        internalID
        artist {
          slug
        }
      }
    `,
  }
)
