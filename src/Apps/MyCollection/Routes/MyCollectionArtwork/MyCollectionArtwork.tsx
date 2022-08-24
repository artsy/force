import { Button, Column, Flex, GridColumns, Tab, Tabs } from "@artsy/palette"
import { ArtworkImageBrowserFragmentContainer } from "Apps/Artwork/Components/ArtworkImageBrowser"
import { createFragmentContainer, graphql } from "react-relay"
import { RouterLink } from "System/Router/RouterLink"
import { useFeatureFlag } from "System/useFeatureFlag"
import { Media } from "Utils/Responsive"
import { MyCollectionArtwork_artwork } from "__generated__/MyCollectionArtwork_artwork.graphql"
import { MyCollectionArtworkInsightsFragmentContainer } from "./Components/MyCollectionArtworkInsights"
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

  const hasInsights =
    !!artwork.comparables?.totalCount ||
    !!artwork.artist?.auctionResults?.totalCount ||
    !!artwork.priceInsights?.artistId

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

            <MyCollectionArtworkSidebarFragmentContainer artwork={artwork} />
          </Media>

          <Media lessThan="sm">
            {hasInsights ? (
              <Tabs justifyContent="space-evenly">
                <Tab name="Insights">
                  <MyCollectionArtworkInsightsFragmentContainer
                    artwork={artwork}
                  />
                </Tab>

                <Tab name="About">
                  <MyCollectionArtworkSidebarFragmentContainer
                    artwork={artwork}
                  />
                </Tab>
              </Tabs>
            ) : (
              <MyCollectionArtworkSidebarFragmentContainer artwork={artwork} />
            )}
          </Media>
        </Column>
      </GridColumns>

      <Media greaterThanOrEqual="sm">
        {hasInsights && (
          <MyCollectionArtworkInsightsFragmentContainer artwork={artwork} />
        )}
      </Media>
    </>
  )
}

export const MyCollectionArtworkFragmentContainer = createFragmentContainer(
  MyCollectionArtwork,
  {
    artwork: graphql`
      fragment MyCollectionArtwork_artwork on Artwork {
        internalID
        ...ArtworkImageBrowser_artwork
        ...MyCollectionArtworkMeta_artwork
        ...MyCollectionArtworkInsights_artwork
        ...MyCollectionArtworkSidebar_artwork
        comparables: comparableAuctionResults {
          totalCount
        }
        artist {
          auctionResults: auctionResultsConnection {
            totalCount
          }
        }
        priceInsights: marketPriceInsights {
          artistId
        }
      }
    `,
  }
)
