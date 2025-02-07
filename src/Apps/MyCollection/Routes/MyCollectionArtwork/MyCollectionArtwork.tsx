import { Box, Column, GridColumns, Spacer, Tab, Tabs } from "@artsy/palette"
import { MyCollectionArtworkAboutTab } from "Apps/MyCollection/Routes/MyCollectionArtwork/Components/MyCollectionArtworkAboutTab"
import { MyCollectionArtworkDetails } from "Apps/MyCollection/Routes/MyCollectionArtwork/Components/MyCollectionArtworkDetails"
import { MyCollectionArtworkHeader } from "Apps/MyCollection/Routes/MyCollectionArtwork/Components/MyCollectionArtworkHeader"
import { MyCollectionArtworkSWAHelpSection } from "Apps/MyCollection/Routes/MyCollectionArtwork/Components/MyCollectionArtworkSWAHelpSection"
import { MyCollectionArtworkSWASubmissionStatus } from "Apps/MyCollection/Routes/MyCollectionArtwork/Components/MyCollectionArtworkSWASubmissionStatus"
import { MyCollectionArtworkTitle } from "Apps/MyCollection/Routes/MyCollectionArtwork/Components/MyCollectionArtworkTitle"
import { ArtistCurrentArticlesRailQueryRenderer } from "Components/ArtistCurrentArticlesRail"
import { useFeatureFlag } from "System/Hooks/useFeatureFlag"
import { Media } from "Utils/Responsive"
import type { MyCollectionArtwork_artwork$data } from "__generated__/MyCollectionArtwork_artwork.graphql"
import { createFragmentContainer, graphql } from "react-relay"
import { MyCollectionArtworkImageBrowser } from "./Components/MyCollectionArtworkImageBrowser/MyCollectionArtworkImageBrowser"
import { MyCollectionArtworkInsights } from "./Components/MyCollectionArtworkInsights"
import { MyCollectionArtworkMeta } from "./Components/MyCollectionArtworkMeta"
import { MyCollectionArtworkSWASectionSubmitted } from "./Components/MyCollectionArtworkSWASectionSubmitted"

interface MyCollectionArtworkProps {
  artwork: MyCollectionArtwork_artwork$data
}

const MyCollectionArtwork: React.FC<
  React.PropsWithChildren<MyCollectionArtworkProps>
> = ({ artwork }) => {
  const enablePostApprovalSubmissionFlow = useFeatureFlag(
    "onyx_post_approval_submission_flow",
  )

  const showComparables = !!artwork.comparables?.totalCount
  const showAuctionResults = !!artwork.artist?.auctionResults?.totalCount
  const showDemandIndex = !!artwork.hasMarketPriceInsights
  const showArtistMarket = !!artwork.hasMarketPriceInsights

  const hasInsights =
    showComparables || showAuctionResults || showDemandIndex || showArtistMarket

  const isTargetSupply = artwork.artist?.targetSupply?.priority === "TRUE"

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

            {artwork.consignmentSubmission ? (
              <>
                {enablePostApprovalSubmissionFlow ? (
                  <MyCollectionArtworkSWASubmissionStatus artwork={artwork} />
                ) : (
                  <MyCollectionArtworkSWASectionSubmitted artwork={artwork} />
                )}
              </>
            ) : null}

            {(!!artwork.consignmentSubmission || isTargetSupply) && (
              <MyCollectionArtworkSWAHelpSection />
            )}
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

        {isTargetSupply &&
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
        ...MyCollectionArtworkSWASectionSubmitted_submissionState
        ...MyCollectionArtworkSWASubmissionStatus_artwork
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
          internalID
        }
        submissionId
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
