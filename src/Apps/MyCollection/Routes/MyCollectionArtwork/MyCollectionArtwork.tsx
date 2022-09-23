import {
  Button,
  Column,
  Flex,
  GridColumns,
  Separator,
  Spacer,
  Tab,
  Tabs,
} from "@artsy/palette"
import { ArtistCurrentArticlesRailQueryRenderer } from "Apps/Artist/Routes/Overview/Components/ArtistCurrentArticlesRail"
import { useState } from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { RouterLink } from "System/Router/RouterLink"
import { useFeatureFlag } from "System/useFeatureFlag"
import { Media } from "Utils/Responsive"
import { MyCollectionArtwork_artwork } from "__generated__/MyCollectionArtwork_artwork.graphql"
import { useMyCollectionTracking } from "../Hooks/useMyCollectionTracking"
import { MyCollectionArtworkImageBrowserFragmentContainer } from "./Components/MyCollectionArtworkImageBrowser/MyCollectionArtworkImageBrowser"
import { MyCollectionArtworkInsightsFragmentContainer } from "./Components/MyCollectionArtworkInsights"
import { MyCollectionArtworkMetaFragmentContainer } from "./Components/MyCollectionArtworkMeta"
import { MyCollectionArtworkSidebarFragmentContainer } from "./Components/MyCollectionArtworkSidebar"
import { MyCollectionArtworkSidebarTitleInfoFragmentContainer } from "./Components/MyCollectionArtworkSidebar/MyCollectionArtworkSidebarTitleInfo"
import { MyCollectionArtworkSWAHowItWorksModal } from "./Components/MyCollectionArtworkSWAHowItWorksModal"
import {
  MyCollectionArtworkSWASectionDesktopLayout,
  MyCollectionArtworkSWASectionMobileLayout,
} from "./Components/MyCollectionArtworkSWASection"
import { MyCollectionArtworkSWASectionSubmitted } from "./Components/MyCollectionArtworkSWASectionSubmitted"

interface MyCollectionArtworkProps {
  artwork: MyCollectionArtwork_artwork
}

const MyCollectionArtwork: React.FC<MyCollectionArtworkProps> = ({
  artwork,
}) => {
  const {
    editCollectedArtwork: trackEditCollectedArtwork,
  } = useMyCollectionTracking()

  // TODO: use real value
  const [isArtworkSubmittedToSell, setIsArtworkSubmittedToSell] = useState<
    boolean
  >(false)
  const [showHowItWorksModal, setShowHowItWorksModal] = useState<boolean>(false)

  const isMyCollectionPhase3Enabled = useFeatureFlag(
    "my-collection-web-phase-3"
  )

  const enableMyCollectionPhase4ArticlesRail = useFeatureFlag(
    "my-collection-web-phase-4-articles-rail"
  )
  const enableMyCollectionPhase4ArtistMarket = useFeatureFlag(
    "my-collection-web-phase-4-artist-market"
  )
  const enableMyCollectionPhase4Comparables = useFeatureFlag(
    "my-collection-web-phase-4-comparables"
  )
  const enableMyCollectionPhase4DemandIndex = useFeatureFlag(
    "my-collection-web-phase-4-demand-index"
  )
  const enableMyCollectionPhase4AuctionResults = useFeatureFlag(
    "my-collection-web-phase-4-auction-results"
  )

  const isMyCollectionPhase5Enabled = useFeatureFlag(
    "my-collection-web-phase-5"
  )

  const EditArtworkButton = () => (
    <Flex justifyContent="flex-end" pb={[1, 2]}>
      <Button
        // @ts-ignore
        as={RouterLink}
        variant="secondaryNeutral"
        size="small"
        to={`/my-collection/artworks/${artwork.internalID}/edit`}
        onClick={() =>
          trackEditCollectedArtwork(artwork.internalID, artwork.slug)
        }
        alignSelf="flex-end"
      >
        Edit Artwork Details
      </Button>
    </Flex>
  )

  const slug = artwork?.artist?.slug!

  const showComparables =
    !!artwork.comparables?.totalCount && enableMyCollectionPhase4Comparables

  const showAuctionResults =
    !!artwork.artist?.auctionResults?.totalCount &&
    enableMyCollectionPhase4AuctionResults

  const showDemandIndex =
    !!artwork.hasMarketPriceInsights && enableMyCollectionPhase4DemandIndex

  const showArtistMarket =
    !!artwork.hasMarketPriceInsights && enableMyCollectionPhase4ArtistMarket

  const hasInsights =
    showComparables || showAuctionResults || showDemandIndex || showArtistMarket

  return (
    <>
      <MyCollectionArtworkMetaFragmentContainer artwork={artwork} />

      {showHowItWorksModal && (
        <MyCollectionArtworkSWAHowItWorksModal
          onClose={() => setShowHowItWorksModal(false)}
        />
      )}

      <GridColumns gridRowGap={[2, null]} py={[2, 6]}>
        <Column span={8}>
          <Media lessThan="sm">
            {!!isMyCollectionPhase3Enabled && <EditArtworkButton />}
          </Media>
          <MyCollectionArtworkImageBrowserFragmentContainer artwork={artwork} />
        </Column>

        <Column span={4}>
          <Media greaterThanOrEqual="sm">
            {!!isMyCollectionPhase3Enabled && <EditArtworkButton />}

            <MyCollectionArtworkSidebarFragmentContainer artwork={artwork} />
            {isMyCollectionPhase5Enabled && (
              <Media greaterThanOrEqual="sm">
                {!!isArtworkSubmittedToSell ? (
                  <>
                    <Separator my={2} />
                    <MyCollectionArtworkSWASectionSubmitted />
                    <Separator my={2} />
                  </>
                ) : (
                  <MyCollectionArtworkSWASectionDesktopLayout
                    onSubmit={() => {
                      setIsArtworkSubmittedToSell(!isArtworkSubmittedToSell)
                    }}
                    learnMore={() => setShowHowItWorksModal(true)}
                  />
                )}
              </Media>
            )}
          </Media>

          <Media lessThan="sm">
            <MyCollectionArtworkSidebarTitleInfoFragmentContainer
              artwork={artwork}
            />
            {hasInsights ? (
              <Tabs fill mt={2}>
                <Tab name="Insights">
                  <MyCollectionArtworkInsightsFragmentContainer
                    artwork={artwork}
                  />
                  {!!isMyCollectionPhase5Enabled && (
                    <Media lessThan="sm">
                      {!!isArtworkSubmittedToSell ? (
                        <MyCollectionArtworkSWASectionSubmitted />
                      ) : (
                        <MyCollectionArtworkSWASectionMobileLayout
                          onSubmit={() =>
                            setIsArtworkSubmittedToSell(
                              !isArtworkSubmittedToSell
                            )
                          }
                          learnMore={() => setShowHowItWorksModal(true)}
                        />
                      )}
                    </Media>
                  )}
                </Tab>

                <Tab name="About">
                  <>
                    <MyCollectionArtworkSidebarFragmentContainer
                      artwork={artwork}
                    />

                    <Spacer m={6} />

                    {!!enableMyCollectionPhase4ArticlesRail && (
                      <ArtistCurrentArticlesRailQueryRenderer
                        slug={slug}
                        artworkId={artwork.internalID}
                      />
                    )}
                  </>
                </Tab>
              </Tabs>
            ) : (
              <>
                <MyCollectionArtworkSidebarFragmentContainer
                  artwork={artwork}
                />

                <Spacer m={6} />

                {!!enableMyCollectionPhase4ArticlesRail && (
                  <ArtistCurrentArticlesRailQueryRenderer
                    slug={slug}
                    artworkId={artwork.internalID}
                  />
                )}
              </>
            )}
          </Media>
        </Column>
      </GridColumns>

      <Media greaterThanOrEqual="sm">
        {hasInsights && (
          <>
            <MyCollectionArtworkInsightsFragmentContainer artwork={artwork} />

            <Spacer m={[4, 6]} />

            {!!enableMyCollectionPhase4ArticlesRail && (
              <ArtistCurrentArticlesRailQueryRenderer
                slug={slug}
                artworkId={artwork.internalID}
              />
            )}
          </>
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
        ...MyCollectionArtworkSidebar_artwork
        ...MyCollectionArtworkMeta_artwork
        ...MyCollectionArtworkInsights_artwork
        ...MyCollectionArtworkImageBrowser_artwork
        ...MyCollectionArtworkComparables_artwork
        ...MyCollectionArtworkSidebarTitleInfo_artwork
        comparables: comparableAuctionResults {
          totalCount
        }
        hasMarketPriceInsights
        internalID
        slug
        artist {
          slug
          auctionResults: auctionResultsConnection {
            totalCount
          }
          ...MyCollectionArtworkAuctionResults_artist
        }
      }
    `,
  }
)
