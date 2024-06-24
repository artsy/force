import { Box, Join, Separator, Spacer } from "@artsy/palette"
import {
  MyCollectionArtworkRequestPriceEstimateSectionFragmentContainer,
  MyCollectionPriceEstimateSentSection,
} from "Apps/MyCollection/Routes/MyCollectionArtwork/Components/MyCollectionArtworkRequestPriceEstimateSection"
import { MyCollectionArtworkSWASection } from "Apps/MyCollection/Routes/MyCollectionArtwork/Components/MyCollectionArtworkSWASection"
import { MyCollectionArtworkSidebarFragmentContainer } from "Apps/MyCollection/Routes/MyCollectionArtwork/Components/MyCollectionArtworkSidebar"
import { ArtistCurrentArticlesRailQueryRenderer } from "Components/ArtistCurrentArticlesRail"
import { MyCollectionArtwork_artwork$data } from "__generated__/MyCollectionArtwork_artwork.graphql"
import { FC } from "react"

interface MyCollectionArtworkAboutTabProps {
  artwork: MyCollectionArtwork_artwork$data
  submittedConsignment: boolean
  onLearnMoreClick?: () => void
}

export const MyCollectionArtworkAboutTab: FC<MyCollectionArtworkAboutTabProps> = ({
  artwork,
  submittedConsignment,
  onLearnMoreClick,
}) => {
  const isP1Artist = artwork.artist?.targetSupply?.isP1
  const showSubmitForSaleCtaMobile = isP1Artist && !submittedConsignment

  return (
    <>
      <MyCollectionArtworkSidebarFragmentContainer artwork={artwork} />

      {!showSubmitForSaleCtaMobile && <Spacer x={6} y={6} />}

      <Join
        separator={
          <>
            <Spacer y={[4, 6]} />
          </>
        }
      >
        {artwork.hasPriceEstimateRequest && (
          <>
            {showSubmitForSaleCtaMobile && <Separator my={2} />}

            <MyCollectionPriceEstimateSentSection />
          </>
        )}

        {showSubmitForSaleCtaMobile && (
          <Box mt={2}>
            <MyCollectionArtworkSWASection
              artwork={artwork}
              learnMore={() => {
                onLearnMoreClick?.()
              }}
            />
          </Box>
        )}

        {!artwork.hasPriceEstimateRequest && (
          <>
            <MyCollectionArtworkRequestPriceEstimateSectionFragmentContainer
              artwork={artwork}
              ctaColor={
                showSubmitForSaleCtaMobile ? "secondaryNeutral" : "primaryBlack"
              }
            />
            <Separator my={2} />
          </>
        )}

        <ArtistCurrentArticlesRailQueryRenderer
          slug={artwork?.artist?.slug ?? ""}
          artworkId={artwork.internalID}
        />
      </Join>
    </>
  )
}
