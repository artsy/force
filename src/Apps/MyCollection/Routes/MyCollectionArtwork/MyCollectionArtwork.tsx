import {
  Button,
  Column,
  Flex,
  GridColumns,
  Join,
  Spacer,
  Text,
} from "@artsy/palette"
import { ArtistCurrentArticlesRailQueryRenderer } from "Apps/Artist/Routes/Overview/Components/ArtistCurrentArticlesRail"
import { ArtworkImageBrowserFragmentContainer } from "Apps/Artwork/Components/ArtworkImageBrowser"
import { useState } from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { RouterLink } from "System/Router/RouterLink"
import { useFeatureFlag } from "System/useFeatureFlag"
import { Media } from "Utils/Responsive"
import { MyCollectionArtwork_artwork } from "__generated__/MyCollectionArtwork_artwork.graphql"
import { MyCollectionArtworkArtistMarketFragmentContainer } from "./Components/MyCollectionArtworkArtistMarket"
import { MyCollectionArtworkAuctionResultsFragmentContainer } from "./Components/MyCollectionArtworkAuctionResults"
import { MyCollectionArtworkComparablesFragmentContainer } from "./Components/MyCollectionArtworkComparables"
import { MyCollectionArtworkDemandIndexFragmentContainer } from "./Components/MyCollectionArtworkDemandIndex"
import { MyCollectionArtworkMetaFragmentContainer } from "./Components/MyCollectionArtworkMeta"
import { MyCollectionArtworkSidebarFragmentContainer } from "./Components/MyCollectionArtworkSidebar"
import { MyCollectionArtworkSWAHowItWorksModal } from "./Components/MyCollectionArtworkSWAHowItWorksModal"
import { MyCollectionArtworkSWASectionMobileLayout } from "./Components/MyCollectionArtworkSWASection"
import { MyCollectionArtworkSWASectionSubmitted } from "./Components/MyCollectionArtworkSWASectionSubmitted"

interface MyCollectionArtworkProps {
  artwork: MyCollectionArtwork_artwork
}
const MyCollectionArtwork: React.FC<MyCollectionArtworkProps> = ({
  artwork,
}) => {
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

  const slug = artwork?.artist?.slug!

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

  const hasInsights = !!artwork.marketPriceInsights

  return (
    <>
      <MyCollectionArtworkMetaFragmentContainer artwork={artwork} />

      {showHowItWorksModal && (
        <MyCollectionArtworkSWAHowItWorksModal
          onClose={() => setShowHowItWorksModal(false)}
        />
      )}

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
          </Media>
          <MyCollectionArtworkSidebarFragmentContainer artwork={artwork} />
        </Column>
      </GridColumns>

      <Join separator={<Spacer mt={[4, 6]} />}>
        {hasInsights && (
          <>
            <Text variant={["lg-display", "xl"]}>Insights</Text>

            <Spacer m={[2, 4]} />
          </>
        )}

        {!!enableMyCollectionPhase4DemandIndex && hasInsights && (
          <MyCollectionArtworkDemandIndexFragmentContainer
            marketPriceInsights={artwork.marketPriceInsights}
          />
        )}

        {!!enableMyCollectionPhase4ArtistMarket && hasInsights && (
          <MyCollectionArtworkArtistMarketFragmentContainer
            marketPriceInsights={artwork.marketPriceInsights}
          />
        )}

        {!!enableMyCollectionPhase4Comparables && (
          <MyCollectionArtworkComparablesFragmentContainer artwork={artwork} />
        )}

        {!!enableMyCollectionPhase4AuctionResults && (
          <MyCollectionArtworkAuctionResultsFragmentContainer
            artist={artwork?.artist!}
          />
        )}

        {!!isMyCollectionPhase5Enabled && (
          <Media lessThan="sm">
            {!!isArtworkSubmittedToSell ? (
              <MyCollectionArtworkSWASectionSubmitted />
            ) : (
              <MyCollectionArtworkSWASectionMobileLayout
                onSubmit={() =>
                  setIsArtworkSubmittedToSell(!isArtworkSubmittedToSell)
                }
                learnMore={() => setShowHowItWorksModal(true)}
              />
            )}
          </Media>
        )}

        {!!enableMyCollectionPhase4ArticlesRail && (
          <>
            <Spacer m={4} />
            <ArtistCurrentArticlesRailQueryRenderer slug={slug} />
          </>
        )}
      </Join>
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
        ...ArtworkImageBrowser_artwork
        ...MyCollectionArtworkComparables_artwork
        internalID
        artist {
          slug
          ...MyCollectionArtworkAuctionResults_artist
        }
        marketPriceInsights {
          ...MyCollectionArtworkArtistMarket_marketPriceInsights
          ...MyCollectionArtworkDemandIndex_marketPriceInsights
        }
      }
    `,
  }
)
