import { Box, Column, Flex, GridColumns, Spacer } from "@artsy/palette"
import { createFragmentContainer, graphql } from "react-relay"
import { MyCollectionArtworkSidebarFragmentContainer } from "./Components/MyCollectionArtworkSidebar"
import { MyCollectionArtwork_artwork } from "__generated__/MyCollectionArtwork_artwork.graphql"
import { MyCollectionArtworkMetaFragmentContainer } from "./Components/MyCollectionArtworkMeta"
import { ArtistCurrentArticlesRailQueryRenderer } from "Apps/Artist/Routes/Overview/Components/ArtistCurrentArticlesRail"
import { useFeatureFlag } from "System/useFeatureFlag"
import { MyColectionArtworkAuctionResultsRefetchContainer } from "./Components/MyCollectionArtworkAuctionResults"

interface MyCollectionArtworkProps {
  artwork: MyCollectionArtwork_artwork
}
const MyCollectionArtwork: React.FC<MyCollectionArtworkProps> = ({
  artwork,
}) => {
  const enableMyCollectionPhase4ArticlesRail = useFeatureFlag(
    "my-collection-web-phase-4-articles-rail"
  )
  const enableMyCollectionPhase4AuctionResults = useFeatureFlag(
    "my-collection-web-phase-4-auction-results"
  )

  const slug = artwork?.artist?.slug!

  return (
    <>
      <Flex py={6}>
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
      {!!enableMyCollectionPhase4AuctionResults && (
        <MyColectionArtworkAuctionResultsRefetchContainer
          artist={artwork?.artist!}
        />
      )}
      <Spacer pb={6} />
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
        artist {
          slug
          ...MyCollectionArtworkAuctionResults_artist
        }
      }
    `,
  }
)
