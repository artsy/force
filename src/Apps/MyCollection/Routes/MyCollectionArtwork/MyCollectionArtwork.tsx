import { Column, GridColumns, Spacer, Tab, Tabs } from "@artsy/palette"
import { MyCollectionArtworkAboutTab } from "Apps/MyCollection/Routes/MyCollectionArtwork/Components/MyCollectionArtworkAboutTab"
import { MyCollectionArtworkDetails } from "Apps/MyCollection/Routes/MyCollectionArtwork/Components/MyCollectionArtworkDetails"
import { MyCollectionArtworkHeader } from "Apps/MyCollection/Routes/MyCollectionArtwork/Components/MyCollectionArtworkHeader"
import { MyCollectionArtworkTitle } from "Apps/MyCollection/Routes/MyCollectionArtwork/Components/MyCollectionArtworkTitle"
import { ArtistCurrentArticlesRailQueryRenderer } from "Components/ArtistCurrentArticlesRail"
import { Media } from "Utils/Responsive"
import type { MyCollectionArtwork_artwork$data } from "__generated__/MyCollectionArtwork_artwork.graphql"
import { createFragmentContainer, graphql } from "react-relay"
import { MyCollectionArtworkImageBrowser } from "./Components/MyCollectionArtworkImageBrowser/MyCollectionArtworkImageBrowser"
import { MyCollectionArtworkInsights } from "./Components/MyCollectionArtworkInsights"
import { MyCollectionArtworkMeta } from "./Components/MyCollectionArtworkMeta"

interface MyCollectionArtworkProps {
  artwork: MyCollectionArtwork_artwork$data
}

const MyCollectionArtwork: React.FC<
  React.PropsWithChildren<MyCollectionArtworkProps>
> = ({ artwork }) => {
  const showComparables = !!artwork.comparables?.totalCount
  const showAuctionResults = !!artwork.artist?.auctionResults?.totalCount
  const showDemandIndex = !!artwork.hasMarketPriceInsights
  const showArtistMarket = !!artwork.hasMarketPriceInsights

  const hasInsights =
    showComparables || showAuctionResults || showDemandIndex || showArtistMarket

  return (
    <>
      <MyCollectionArtworkMeta artwork={artwork} />

      <MyCollectionArtworkHeader artwork={artwork} />

      <Media greaterThanOrEqual="sm">
        <GridColumns gap={2} mb={4}>
          <Column span={8}>
            <MyCollectionArtworkImageBrowser artwork={artwork} />
          </Column>

          <Column span={4} mt={2}>
            <MyCollectionArtworkTitle artwork={artwork} />

            <MyCollectionArtworkDetails artwork={artwork} />
          </Column>

          <Column span={12}>
            {hasInsights && (
              <>
                <MyCollectionArtworkInsights artwork={artwork} />

                <Spacer x={6} y={6} />

                <ArtistCurrentArticlesRailQueryRenderer
                  slug={artwork?.artist?.slug ?? ""}
                  artworkId={artwork.internalID}
                />
              </>
            )}
          </Column>
        </GridColumns>
      </Media>

      <Media lessThan="sm">
        <MyCollectionArtworkImageBrowser artwork={artwork} />

        <MyCollectionArtworkTitle artwork={artwork} />

        {hasInsights ? (
          <Tabs fill mt={2}>
            <Tab name="Insights">
              <MyCollectionArtworkInsights artwork={artwork} />
            </Tab>

            <Tab name="About">
              <MyCollectionArtworkAboutTab artwork={artwork} />
            </Tab>
          </Tabs>
        ) : (
          <MyCollectionArtworkAboutTab artwork={artwork} />
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
        ...MyCollectionArtworkHeader_artwork
        ...MyCollectionArtworkTitle_artwork
        ...MyCollectionArtworkDetails_artwork
        ...MyCollectionArtworkMeta_artwork
        ...MyCollectionArtworkInsights_artwork
        ...MyCollectionArtworkImageBrowser_artwork
        ...MyCollectionArtworkComparables_artwork
        ...MyCollectionArtworkTitle_artwork
        ...MyCollectionArtworkAboutTab_artwork
        comparables: comparableAuctionResults {
          totalCount
        }
        hasMarketPriceInsights
        internalID
        slug
        artist(shallow: true) {
          slug
          targetSupply {
            priority
          }
          auctionResults: auctionResultsConnection {
            totalCount
          }
          ...MyCollectionArtworkAuctionResults_artist
        }
      }
    `,
  },
)
