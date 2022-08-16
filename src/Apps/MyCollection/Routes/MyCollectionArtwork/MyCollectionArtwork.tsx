import { Box, Column, Flex, GridColumns } from "@artsy/palette"
import { createFragmentContainer, graphql } from "react-relay"
import { MyCollectionArtworkSidebarFragmentContainer } from "./Components/MyCollectionArtworkSidebar"
import { MyCollectionArtwork_artwork } from "__generated__/MyCollectionArtwork_artwork.graphql"
import { MyCollectionArtworkMetaFragmentContainer } from "./Components/MyCollectionArtworkMeta"
import { ArtistCurrentArticlesRailQueryRenderer } from "Apps/Artist/Routes/Overview/Components/ArtistCurrentArticlesRail"

interface MyCollectionArtworkProps {
  artwork: MyCollectionArtwork_artwork
}
const MyCollectionArtwork: React.FC<MyCollectionArtworkProps> = ({
  artwork,
}) => {
  const slug = artwork?.artist?.slug!

  return (
    <>
      <Flex pt={6}>
        <MyCollectionArtworkMetaFragmentContainer artwork={artwork} />
        <GridColumns>
          <Column span={8}>
            <Box width={[335, 780]} height={[320, 870]} bg="black5" />
          </Column>

          <Column span={4} pt={[0, 2]}>
            <MyCollectionArtworkSidebarFragmentContainer artwork={artwork} />
          </Column>
        </GridColumns>
      </Flex>
      <Flex pt={6}>
        <ArtistCurrentArticlesRailQueryRenderer slug={slug} />
      </Flex>
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
        artist {
          slug
        }
      }
    `,
  }
)
