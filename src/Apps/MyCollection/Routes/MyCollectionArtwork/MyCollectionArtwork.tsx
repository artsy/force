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
import { useMyCollectionTracking } from "Apps/MyCollection/Routes/Hooks/useMyCollectionTracking"
import { MyCollectionArtworkAboutTab } from "Apps/MyCollection/Routes/MyCollectionArtwork/MyCollectionArtworkAboutTab"
import { ArtistCurrentArticlesRailQueryRenderer } from "Components/ArtistCurrentArticlesRail"
import { RouterLink } from "System/Components/RouterLink"
import { Media } from "Utils/Responsive"
import { MyCollectionArtwork_artwork$data } from "__generated__/MyCollectionArtwork_artwork.graphql"
import { useState } from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { MyCollectionArtworkBackButton } from "./Components/MyCollectionArtworkBackButton"
import { MyCollectionArtworkImageBrowserFragmentContainer } from "./Components/MyCollectionArtworkImageBrowser/MyCollectionArtworkImageBrowser"
import { MyCollectionArtworkInsightsFragmentContainer } from "./Components/MyCollectionArtworkInsights"
import { MyCollectionArtworkMetaFragmentContainer } from "./Components/MyCollectionArtworkMeta"
import {
  MyCollectionArtworkRequestPriceEstimateSectionFragmentContainer,
  MyCollectionPriceEstimateSentSection,
} from "./Components/MyCollectionArtworkRequestPriceEstimateSection"
import { MyCollectionArtworkSWAHowItWorksModal } from "./Components/MyCollectionArtworkSWAHowItWorksModal"
import { MyCollectionArtworkSWASection } from "./Components/MyCollectionArtworkSWASection"
import { MyCollectionArtworkSWASectionSubmitted } from "./Components/MyCollectionArtworkSWASectionSubmitted"
import { MyCollectionArtworkSidebarFragmentContainer } from "./Components/MyCollectionArtworkSidebar"
import { MyCollectionArtworkSidebarTitleInfoFragmentContainer } from "./Components/MyCollectionArtworkSidebar/MyCollectionArtworkSidebarTitleInfo"

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

  const slug = artwork?.artist?.slug ?? ""
  const displayText = artwork.consignmentSubmission?.displayText

  const displaySubmissionStateSection =
    artwork.consignmentSubmission?.state &&
    artwork.consignmentSubmission?.state != "DRAFT"

  const submittedConsignment = !!displayText

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
      </Flex>

      <GridColumns gridRowGap={[2, null]} mb={[0, 4]}>
        <Column span={8}>
          <MyCollectionArtworkImageBrowserFragmentContainer artwork={artwork} />
        </Column>

        <Column span={4}>
          <Media greaterThanOrEqual="sm">
            <MyCollectionArtworkSidebarFragmentContainer artwork={artwork} />

            {artwork.hasPriceEstimateRequest && (
              <>
                <Separator mt={2} />
                <MyCollectionPriceEstimateSentSection />
              </>
            )}

            {isP1Artist &&
              (displaySubmissionStateSection ? (
                <>
                  <Separator my={2} />
                  <MyCollectionArtworkSWASectionSubmitted artwork={artwork} />
                </>
              ) : (
                <MyCollectionArtworkSWASection
                  artwork={artwork}
                  learnMore={() => setShowHowItWorksModal(true)}
                  ctaColor={
                    artwork.hasPriceEstimateRequest
                      ? "secondaryNeutral"
                      : "primaryBlack"
                  }
                />
              ))}

            {!artwork.hasPriceEstimateRequest && !displayText && (
              <>
                <Spacer y={2} />
                <MyCollectionArtworkRequestPriceEstimateSectionFragmentContainer
                  artwork={artwork}
                  ctaColor={isP1Artist ? "secondaryNeutral" : "primaryBlack"}
                />
                <Separator my={2} />
              </>
            )}
          </Media>

          <Media lessThan="sm">
            <MyCollectionArtworkSidebarTitleInfoFragmentContainer
              artwork={artwork}
            />
            {isP1Artist && displaySubmissionStateSection && (
              <MyCollectionArtworkSWASectionSubmitted artwork={artwork} />
            )}
            {hasInsights ? (
              <Tabs fill mt={2}>
                <Tab name="Insights">
                  <MyCollectionArtworkInsightsFragmentContainer
                    artwork={artwork}
                    isP1Artist={isP1Artist}
                    displayText={displayText}
                    onLearnMoreClick={() => setShowHowItWorksModal(true)}
                  />
                </Tab>

                <Tab name="About">
                  <MyCollectionArtworkAboutTab
                    artwork={artwork}
                    submittedConsignment={submittedConsignment}
                    onLearnMoreClick={() => setShowHowItWorksModal(true)}
                  />
                </Tab>
              </Tabs>
            ) : (
              <MyCollectionArtworkAboutTab
                artwork={artwork}
                submittedConsignment={submittedConsignment}
                onLearnMoreClick={() => setShowHowItWorksModal(true)}
              />
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
        ...MyCollectionArtworkSWASectionSubmitted_submissionState
        ...MyCollectionArtworkSWASection_artwork
        comparables: comparableAuctionResults {
          totalCount
        }
        hasPriceEstimateRequest
        hasMarketPriceInsights
        submissionId
        internalID
        slug
        consignmentSubmission {
          state
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
