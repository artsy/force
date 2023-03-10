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

  const isMyCollectionPhase6Enabled = useFeatureFlag(
    "my-collection-web-phase-6-request-price-estimate"
  )

  const isMyCollectionPhase8Enabled = useFeatureFlag(
    "my-collection-web-phase-8-submission-status"
  )

  const EditArtworkButton = () => (
    <Button
      // @ts-ignore
      as={RouterLink}
      variant="secondaryNeutral"
      size="small"
      to={`/collector-profile/my-collection/artworks/${artwork.internalID}/edit`}
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

  const showComparables = !!artwork.comparables?.totalCount

  const showAuctionResults = !!artwork.artist?.auctionResults?.totalCount
  const showDemandIndex = !!artwork.hasMarketPriceInsights

  const showArtistMarket = !!artwork.hasMarketPriceInsights

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
                  route={`/collector-profile/my-collection/submission/contact-information/${id}`}
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
            {isP1Artist && !!displayText && isMyCollectionPhase8Enabled && (
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
                  {isP1Artist && (
                    <>
                      {!!displayText ? (
                        !isMyCollectionPhase8Enabled && (
                          <MyCollectionArtworkSWASectionSubmitted
                            displayText={displayText}
                          />
                        )
                      ) : (
                        <MyCollectionArtworkSWASectionMobileLayout
                          route={`/collector-profile/my-collection/submission/contact-information/${id}`}
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

                    <ArtistCurrentArticlesRailQueryRenderer
                      slug={slug}
                      artworkId={artwork.internalID}
                    />
                  </>
                </Tab>
              </Tabs>
            ) : (
              <>
                <MyCollectionArtworkSidebarFragmentContainer
                  artwork={artwork}
                />

                <Spacer x={6} y={6} />

                <ArtistCurrentArticlesRailQueryRenderer
                  slug={slug}
                  artworkId={artwork.internalID}
                />
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

            <ArtistCurrentArticlesRailQueryRenderer
              slug={slug}
              artworkId={artwork.internalID}
            />
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
