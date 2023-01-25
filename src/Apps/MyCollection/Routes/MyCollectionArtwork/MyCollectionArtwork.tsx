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
import { useMyCollectionTracking } from "Apps/MyCollection/Routes/Hooks/useMyCollectionTracking"
import { useState } from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { RouterLink } from "System/Router/RouterLink"
import { useFeatureFlag } from "System/useFeatureFlag"
import { Media } from "Utils/Responsive"
import { MyCollectionArtwork_artwork$data } from "__generated__/MyCollectionArtwork_artwork.graphql"
import { MyCollectionArtworkBackButton } from "./Components/MyCollectionArtworkBackButton"
import { MyCollectionArtworkImageBrowserFragmentContainer } from "./Components/MyCollectionArtworkImageBrowser/MyCollectionArtworkImageBrowser"
import { MyCollectionArtworkInsightsFragmentContainer } from "./Components/MyCollectionArtworkInsights"
import { MyCollectionArtworkMetaFragmentContainer } from "./Components/MyCollectionArtworkMeta"
import { MyCollectionArtworkRequestPriceEstimateSectionFragmentContainer } from "./Components/MyCollectionArtworkRequestPriceEstimateSection"
import { MyCollectionArtworkSidebarFragmentContainer } from "./Components/MyCollectionArtworkSidebar"
import { MyCollectionArtworkSidebarTitleInfoFragmentContainer } from "./Components/MyCollectionArtworkSidebar/MyCollectionArtworkSidebarTitleInfo"
import { MyCollectionArtworkSWAHowItWorksModal } from "./Components/MyCollectionArtworkSWAHowItWorksModal"
import {
  MyCollectionArtworkSWASectionDesktopLayout,
  MyCollectionArtworkSWASectionMobileLayout,
} from "./Components/MyCollectionArtworkSWASection"
import { MyCollectionArtworkSWASectionSubmitted } from "./Components/MyCollectionArtworkSWASectionSubmitted"

interface MyCollectionArtworkProps {
  artwork: MyCollectionArtwork_artwork$data
}

const MyCollectionArtwork: React.FC<MyCollectionArtworkProps> = ({
  artwork,
}) => {
  const {
    editCollectedArtwork: trackEditCollectedArtwork,
  } = useMyCollectionTracking()
  const [showHowItWorksModal, setShowHowItWorksModal] = useState<boolean>(false)

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

  const isMyCollectionPhase6Enabled = useFeatureFlag(
    "my-collection-web-phase-6-request-price-estimate"
  )

  const isMyCollectionPhase8Enabled = useFeatureFlag(
    "my-collection-web-phase-8-submission-status"
  )

  const isCollectorProfileEnabled = useFeatureFlag("cx-collector-profile")

  const EditArtworkButton = () => (
    <Button
      // @ts-ignore
      as={RouterLink}
      variant="secondaryNeutral"
      size="small"
      to={
        isCollectorProfileEnabled
          ? `/collector-profile/my-collection/artworks/${artwork.internalID}/edit`
          : `/my-collection/artworks/${artwork.internalID}/edit`
      }
      onClick={() =>
        trackEditCollectedArtwork(artwork.internalID, artwork.slug)
      }
      alignSelf="flex-end"
    >
      <Media greaterThanOrEqual="sm">Edit Artwork Details</Media>
      <Media lessThan="sm">Edit</Media>
    </Button>
  )

  const slug = artwork?.artist?.slug!
  const id = artwork.internalID
  const displayText = artwork.consignmentSubmission?.displayText

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

  const isP1Artist = artwork.artist?.targetSupply?.isP1

  return (
    <>
      <MyCollectionArtworkMetaFragmentContainer artwork={artwork} />

      {showHowItWorksModal && (
        <MyCollectionArtworkSWAHowItWorksModal
          onClose={() => setShowHowItWorksModal(false)}
        />
      )}

      <Flex py={[2, 1]} justifyContent="space-between" alignItems="center">
        <MyCollectionArtworkBackButton />

        <EditArtworkButton />
      </Flex>

      <GridColumns gridRowGap={[2, null]}>
        <Column span={8}>
          <MyCollectionArtworkImageBrowserFragmentContainer artwork={artwork} />
        </Column>

        <Column span={4}>
          <Media greaterThanOrEqual="sm">
            <MyCollectionArtworkSidebarFragmentContainer artwork={artwork} />

            {isMyCollectionPhase6Enabled && !displayText && (
              <MyCollectionArtworkRequestPriceEstimateSectionFragmentContainer
                artwork={artwork}
              />
            )}

            {isP1Artist &&
              isMyCollectionPhase5Enabled &&
              (!!displayText ? (
                <>
                  <Separator my={2} />
                  <MyCollectionArtworkSWASectionSubmitted
                    displayText={displayText}
                  />
                  <Separator my={2} />
                </>
              ) : (
                <MyCollectionArtworkSWASectionDesktopLayout
                  route={
                    isCollectorProfileEnabled
                      ? `/collector-profile/my-collection/submission/contact-information/${id}`
                      : `/my-collection/submission/contact-information/${id}`
                  }
                  learnMore={() => setShowHowItWorksModal(true)}
                  slug={slug}
                  artworkId={artwork.internalID}
                />
              ))}
          </Media>

          <Media lessThan="sm">
            <MyCollectionArtworkSidebarTitleInfoFragmentContainer
              artwork={artwork}
            />
            {isMyCollectionPhase5Enabled &&
              isP1Artist &&
              !!displayText &&
              isMyCollectionPhase8Enabled && (
                <MyCollectionArtworkSWASectionSubmitted
                  displayText={displayText}
                />
              )}
            {hasInsights ? (
              <Tabs fill mt={2}>
                <Tab name="Insights">
                  <MyCollectionArtworkInsightsFragmentContainer
                    artwork={artwork}
                  />
                  {isMyCollectionPhase5Enabled && isP1Artist && (
                    <>
                      {!!displayText ? (
                        !isMyCollectionPhase8Enabled && (
                          <MyCollectionArtworkSWASectionSubmitted
                            displayText={displayText}
                          />
                        )
                      ) : (
                        <MyCollectionArtworkSWASectionMobileLayout
                          route={
                            isCollectorProfileEnabled
                              ? `/collector-profile/my-collection/submission/contact-information/${id}`
                              : `/my-collection/submission/contact-information/${id}`
                          }
                          learnMore={() => setShowHowItWorksModal(true)}
                          slug={slug}
                          artworkId={artwork.internalID}
                        />
                      )}
                    </>
                  )}
                </Tab>

                <Tab name="About">
                  <>
                    <MyCollectionArtworkSidebarFragmentContainer
                      artwork={artwork}
                    />

                    <Spacer x={6} y={6} />

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

                <Spacer x={6} y={6} />

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

            <Spacer x={[4, 6]} y={[4, 6]} />

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
        ...MyCollectionArtworkRequestPriceEstimateSection_artwork
        comparables: comparableAuctionResults {
          totalCount
        }
        hasMarketPriceInsights
        submissionId
        internalID
        slug
        consignmentSubmission {
          displayText
        }
        artist {
          slug
          targetSupply {
            isP1
          }
          auctionResults: auctionResultsConnection {
            totalCount
          }
          ...MyCollectionArtworkAuctionResults_artist
        }
      }
    `,
  }
)
