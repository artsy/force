import { Box, Join, Separator, Spacer } from "@artsy/palette"
import { MyCollectionArtworkAboutTab_artwork$key } from "__generated__/MyCollectionArtworkAboutTab_artwork.graphql"
import { MyCollectionArtworkDetails } from "Apps/MyCollection/Routes/MyCollectionArtwork/Components/MyCollectionArtworkDetails"
import { MyCollectionArtworkRequestPriceEstimate } from "Apps/MyCollection/Routes/MyCollectionArtwork/Components/MyCollectionArtworkRequestPriceEstimate"
import { MyCollectionArtworkSubmitForSale } from "Apps/MyCollection/Routes/MyCollectionArtwork/Components/MyCollectionArtworkSubmitForSale"
import { MyCollectionPriceEstimateStatus } from "Apps/MyCollection/Routes/MyCollectionArtwork/Components/MyCollectionPriceEstimateStatus"
import { ArtistCurrentArticlesRailQueryRenderer } from "Components/ArtistCurrentArticlesRail"
import { FC } from "react"
import { graphql, useFragment } from "react-relay"

interface MyCollectionArtworkAboutTabProps {
  artwork: MyCollectionArtworkAboutTab_artwork$key
}

export const MyCollectionArtworkAboutTab: FC<MyCollectionArtworkAboutTabProps> = props => {
  const artwork = useFragment(FRAGMENT, props.artwork)

  const submission = artwork.consignmentSubmission
  const isP1Artist = artwork.artist?.targetSupply?.priority === "TRUE"
  const showSubmitForSaleButton = isP1Artist && !submission

  return (
    <Box pt={[1, 0]}>
      <MyCollectionArtworkDetails artwork={artwork} />

      {!showSubmitForSaleButton && <Spacer x={6} y={6} />}

      <Join separator={<Spacer y={[4, 6]} />}>
        {artwork.hasPriceEstimateRequest && (
          <>
            {showSubmitForSaleButton && <Separator my={2} />}

            <MyCollectionPriceEstimateStatus />
          </>
        )}

        {showSubmitForSaleButton && (
          <Box mt={2}>
            <MyCollectionArtworkSubmitForSale artwork={artwork} />
          </Box>
        )}

        {!artwork.hasPriceEstimateRequest && (
          <>
            <MyCollectionArtworkRequestPriceEstimate
              artwork={artwork}
              ctaColor={
                showSubmitForSaleButton ? "secondaryNeutral" : "primaryBlack"
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
    </Box>
  )
}

const FRAGMENT = graphql`
  fragment MyCollectionArtworkAboutTab_artwork on Artwork {
    ...MyCollectionArtworkDetails_artwork
    ...MyCollectionArtworkRequestPriceEstimate_artwork
    ...MyCollectionArtworkSubmitForSale_artwork

    artist {
      slug
      targetSupply {
        priority
      }
    }
    consignmentSubmission {
      internalID
    }
    hasPriceEstimateRequest
    internalID
  }
`
