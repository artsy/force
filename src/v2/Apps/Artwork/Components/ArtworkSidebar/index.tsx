import { Box, Spacer, Text, Join } from "@artsy/palette"
import * as React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { ArtworkSidebarArtistsFragmentContainer } from "./ArtworkSidebarArtists"
import { ArtworkSidebarAuctionPartnerInfoFragmentContainer } from "./ArtworkSidebarAuctionPartnerInfo"
import { ArtworkSidebarCommercialFragmentContainer } from "./ArtworkSidebarCommercial"
import { ArtworkSidebarMetadataFragmentContainer } from "./ArtworkSidebarMetadata"
import { ArtworkSidebarPartnerInfoFragmentContainer } from "./ArtworkSidebarPartnerInfo"
import { ContextModule } from "@artsy/cohesion"
import { ArtworkSidebar_artwork } from "v2/__generated__/ArtworkSidebar_artwork.graphql"
import { ArtworkSidebar_me } from "v2/__generated__/ArtworkSidebar_me.graphql"
import { AuthenticityCertificateFragmentContainer } from "../TrustSignals/AuthenticityCertificate"
import { SecurePaymentFragmentContainer } from "../TrustSignals/SecurePayment"
import { VerifiedSellerFragmentContainer } from "../TrustSignals/VerifiedSeller"
import { BuyerGuaranteeFragmentContainer } from "../TrustSignals/BuyerGuarantee"
import { ArtworkSidebarExtraLinksFragmentContainer } from "./ArtworkSidebarExtraLinks"
import { ArtworkSidebarAuctionPollingRefetchContainer } from "./ArtworkSidebarAuctionInfoPolling"
import { useFeatureFlag } from "v2/System/useFeatureFlag"
import { CreateArtworkAlertSectionFragmentContainer } from "./CreateArtworkAlertSection"
import { ArtworkSidebarAuctionTimerFragmentContainer } from "./ArtworkSidebarAuctionTimer"
import { BiddingClosedMessage } from "./ArtworkSidebarCurrentBidInfo"
import { useTimer } from "v2/Utils/Hooks/useTimer"
import { ArtworkSidebarCreateAlertButtonFragmentContainer } from "./ArtworkSidebarCreateAlertButton"

export interface ArtworkSidebarProps {
  artwork: ArtworkSidebar_artwork
  me: ArtworkSidebar_me
}

const ArtworkSidebarContainer = Box

export const ArtworkSidebar: React.FC<ArtworkSidebarProps> = ({
  artwork,
  me,
}) => {
  const isCreateAlertButtonForArtworkEnabled = useFeatureFlag(
    "artwork-page-create-alert"
  )

  // If we have info about the lot end time (cascading), use that.
  const { sale, saleArtwork } = artwork
  const endAt = saleArtwork?.endAt
  const startAt = sale?.startAt
  const { hasEnded } = useTimer(endAt!, startAt!)

  const shouldShowCreateAlertSection =
    isCreateAlertButtonForArtworkEnabled && !artwork.is_sold && !hasEnded

  return (
    <ArtworkSidebarContainer data-test={ContextModule.artworkSidebar}>
      <ArtworkSidebarArtistsFragmentContainer artwork={artwork} />
      <Spacer mt={4} />
      <ArtworkSidebarMetadataFragmentContainer artwork={artwork} />

      {artwork.is_in_auction ? (
        <>
          <Spacer mt={2} />
          <Join separator={<Spacer mt={2} />}>
            <ArtworkSidebarAuctionPartnerInfoFragmentContainer
              artwork={artwork}
            />
            {hasEnded ? (
              <BiddingClosedMessage>
                {!!isCreateAlertButtonForArtworkEnabled && (
                  <>
                    <Text variant="sm" color="black60" pt={0.5}>
                      Be notified when a similar piece is available
                    </Text>
                    <Spacer my={2} />
                    <ArtworkSidebarCreateAlertButtonFragmentContainer
                      artwork={artwork}
                    />
                  </>
                )}
              </BiddingClosedMessage>
            ) : (
              <ArtworkSidebarAuctionPollingRefetchContainer
                artwork={artwork}
                me={me}
              />
            )}
          </Join>

          {!hasEnded && (
            <ArtworkSidebarAuctionTimerFragmentContainer artwork={artwork} />
          )}
        </>
      ) : (
        <>
          <Spacer mt={2} />
          <ArtworkSidebarCommercialFragmentContainer artwork={artwork} />
          <ArtworkSidebarPartnerInfoFragmentContainer artwork={artwork} />
        </>
      )}
      <Join separator={<Spacer mt={2} />}>
        <AuthenticityCertificateFragmentContainer artwork={artwork} />
        <SecurePaymentFragmentContainer artwork={artwork} />
        <VerifiedSellerFragmentContainer artwork={artwork} />
        <BuyerGuaranteeFragmentContainer artwork={artwork} />
      </Join>
      {!!shouldShowCreateAlertSection && (
        <CreateArtworkAlertSectionFragmentContainer artwork={artwork} />
      )}
      <ArtworkSidebarExtraLinksFragmentContainer artwork={artwork} />
    </ArtworkSidebarContainer>
  )
}

export const ArtworkSidebarFragmentContainer = createFragmentContainer(
  ArtworkSidebar,
  {
    artwork: graphql`
      fragment ArtworkSidebar_artwork on Artwork {
        is_in_auction: isInAuction
        is_sold: isSold
        ...ArtworkSidebarArtists_artwork
        ...ArtworkSidebarMetadata_artwork
        ...ArtworkSidebarAuctionPartnerInfo_artwork
        ...ArtworkSidebarAuctionInfoPolling_artwork
        ...ArtworkSidebarAuctionTimer_artwork
        ...ArtworkSidebarCommercial_artwork
        ...ArtworkSidebarPartnerInfo_artwork
        ...ArtworkSidebarExtraLinks_artwork
        ...SecurePayment_artwork
        ...VerifiedSeller_artwork
        ...AuthenticityCertificate_artwork
        ...BuyerGuarantee_artwork
        ...CreateArtworkAlertSection_artwork
        ...ArtworkSidebarCreateAlertButton_artwork
        sale {
          is_closed: isClosed
          startAt
        }
        saleArtwork {
          endAt
        }
      }
    `,
    me: graphql`
      fragment ArtworkSidebar_me on Me {
        ...ArtworkSidebarAuctionInfoPolling_me
      }
    `,
  }
)
