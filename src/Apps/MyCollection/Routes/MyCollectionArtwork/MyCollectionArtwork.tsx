import {
  Box,
  Button,
  Column,
  Flex,
  GridColumns,
  Spacer,
  Tab,
  Tabs,
} from "@artsy/palette"
import { useMyCollectionTracking } from "Apps/MyCollection/Routes/Hooks/useMyCollectionTracking"
import { MyCollectionArtworkAboutTab } from "Apps/MyCollection/Routes/MyCollectionArtwork/Components/MyCollectionArtworkAboutTab"
import { MyCollectionArtworkDetails } from "Apps/MyCollection/Routes/MyCollectionArtwork/Components/MyCollectionArtworkDetails"
import { MyCollectionArtworkSWAHelpSection } from "Apps/MyCollection/Routes/MyCollectionArtwork/Components/MyCollectionArtworkSWAHelpSection"
import { MyCollectionArtworkSWASubmissionStatus } from "Apps/MyCollection/Routes/MyCollectionArtwork/Components/MyCollectionArtworkSWASubmissionStatus"
import { MyCollectionArtworkTitle } from "Apps/MyCollection/Routes/MyCollectionArtwork/Components/MyCollectionArtworkTitle"
import { ArtistCurrentArticlesRailQueryRenderer } from "Components/ArtistCurrentArticlesRail"
import { RouterLink } from "System/Components/RouterLink"
import { useFeatureFlag } from "System/Hooks/useFeatureFlag"
import { Media } from "Utils/Responsive"
import { MyCollectionArtwork_artwork$data } from "__generated__/MyCollectionArtwork_artwork.graphql"
import { createFragmentContainer, graphql } from "react-relay"
import { MyCollectionArtworkBackButton } from "./Components/MyCollectionArtworkBackButton"
import { MyCollectionArtworkImageBrowserFragmentContainer } from "./Components/MyCollectionArtworkImageBrowser/MyCollectionArtworkImageBrowser"
import { MyCollectionArtworkInsightsFragmentContainer } from "./Components/MyCollectionArtworkInsights"
import { MyCollectionArtworkMetaFragmentContainer } from "./Components/MyCollectionArtworkMeta"
import {
  MyCollectionArtworkRequestPriceEstimateSectionFragmentContainer,
  MyCollectionPriceEstimateSentSection,
} from "./Components/MyCollectionArtworkRequestPriceEstimateSection"
import { MyCollectionArtworkSWASection } from "./Components/MyCollectionArtworkSWASection"
import { MyCollectionArtworkSWASectionSubmitted } from "./Components/MyCollectionArtworkSWASectionSubmitted"

interface MyCollectionArtworkProps {
  artwork: MyCollectionArtwork_artwork$data
}

const MyCollectionArtwork: React.FC<MyCollectionArtworkProps> = ({
  artwork,
}) => {
  const enablePostApprovalSubmissionFlow = useFeatureFlag(
    "onyx_post_approval_submission_flow"
  )
  const {
    editCollectedArtwork: trackEditCollectedArtwork,
  } = useMyCollectionTracking()

  const submissionStateLabel = artwork.consignmentSubmission?.stateLabel
  const showComparables = !!artwork.comparables?.totalCount
  const showAuctionResults = !!artwork.artist?.auctionResults?.totalCount
  const showDemandIndex = !!artwork.hasMarketPriceInsights
  const showArtistMarket = !!artwork.hasMarketPriceInsights

  const hasInsights =
    showComparables || showAuctionResults || showDemandIndex || showArtistMarket

  const isP1Artist = artwork.artist?.targetSupply?.priority === "TRUE"

  return (
    <>
      <MyCollectionArtworkMetaFragmentContainer artwork={artwork} />

      <Flex pt={[2, 1]} justifyContent="space-between" alignItems="center">
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

      <GridColumns gap={[2, null]} mb={[0, 4]}>
        <Column span={8}>
          <MyCollectionArtworkImageBrowserFragmentContainer artwork={artwork} />
        </Column>

        <Column span={4}>
          <Media greaterThanOrEqual="sm">
            <Box mt={2}>
              <MyCollectionArtworkTitle artwork={artwork} />

              <MyCollectionArtworkDetails artwork={artwork} />

              {artwork.hasPriceEstimateRequest && (
                <MyCollectionPriceEstimateSentSection />
              )}

              {artwork.consignmentSubmission ? (
                <>
                  {enablePostApprovalSubmissionFlow ? (
                    <MyCollectionArtworkSWASubmissionStatus artwork={artwork} />
                  ) : (
                    <MyCollectionArtworkSWASectionSubmitted artwork={artwork} />
                  )}
                </>
              ) : (
                <MyCollectionArtworkSWASection artwork={artwork} />
              )}

              {!artwork.hasPriceEstimateRequest &&
                !artwork.consignmentSubmission && (
                  <MyCollectionArtworkRequestPriceEstimateSectionFragmentContainer
                    artwork={artwork}
                    ctaColor={isP1Artist ? "secondaryNeutral" : "primaryBlack"}
                  />
                )}

              {(!!artwork.consignmentSubmission || isP1Artist) && (
                <MyCollectionArtworkSWAHelpSection />
              )}
            </Box>
          </Media>

          <Media lessThan="sm">
            <MyCollectionArtworkTitle artwork={artwork} />

            {isP1Artist &&
              artwork.consignmentSubmission?.state !== "REJECTED" && (
                <Box mb={4}>
                  {enablePostApprovalSubmissionFlow ? (
                    <MyCollectionArtworkSWASubmissionStatus artwork={artwork} />
                  ) : (
                    <MyCollectionArtworkSWASectionSubmitted artwork={artwork} />
                  )}
                </Box>
              )}

            {hasInsights ? (
              <Tabs fill mt={2}>
                <Tab name="Insights">
                  <MyCollectionArtworkInsightsFragmentContainer
                    artwork={artwork}
                    isP1Artist={isP1Artist}
                    displayText={submissionStateLabel}
                  />
                </Tab>

                <Tab name="About">
                  <MyCollectionArtworkAboutTab artwork={artwork} />
                </Tab>
              </Tabs>
            ) : (
              <MyCollectionArtworkAboutTab artwork={artwork} />
            )}
          </Media>
        </Column>
      </GridColumns>

      <Media greaterThanOrEqual="sm">
        {hasInsights && (
          <>
            <MyCollectionArtworkInsightsFragmentContainer artwork={artwork} />

            <Spacer x={6} y={6} />

            <ArtistCurrentArticlesRailQueryRenderer
              slug={artwork?.artist?.slug ?? ""}
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
        ...MyCollectionArtworkTitle_artwork
        ...MyCollectionArtworkDetails_artwork
        ...MyCollectionArtworkMeta_artwork
        ...MyCollectionArtworkInsights_artwork
        ...MyCollectionArtworkImageBrowser_artwork
        ...MyCollectionArtworkComparables_artwork
        ...MyCollectionArtworkTitle_artwork
        ...MyCollectionArtworkRequestPriceEstimateSection_artwork
        ...MyCollectionArtworkSWASectionSubmitted_submissionState
        ...MyCollectionArtworkSWASubmissionStatus_artwork
        ...MyCollectionArtworkSWASection_artwork
        ...MyCollectionArtworkAboutTab_artwork
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
          stateLabel
          internalID
        }
        artist {
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
  }
)
