import { Box, Spacer, Join, Separator } from "@artsy/palette"
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
import { CreateArtworkAlertSectionFragmentContainer } from "./CreateArtworkAlertSection"
import { ArtworkSidebarAuctionTimerFragmentContainer } from "./ArtworkSidebarAuctionTimer"
import { useTimer } from "v2/Utils/Hooks/useTimer"
import { ArtworkSidebarBiddingClosedMessageFragmentContainer } from "./ArtworkSidebarBiddingClosedMessage"
import { lotIsClosed } from "v2/Apps/Artwork/Utils/lotIsClosed"
import {
  shouldRenderAuthenticityCertificate,
  shouldRenderBuyerGuaranteeAndSecurePayment,
  shouldRenderVerifiedSeller,
} from "../../Utils/badges"
import { useAuctionWebsocket } from "v2/Components/useAuctionWebsocket"

export interface ArtworkSidebarProps {
  artwork: ArtworkSidebar_artwork
  me: ArtworkSidebar_me
}

const ArtworkSidebarContainer = Box

export const ArtworkSidebar: React.FC<ArtworkSidebarProps> = ({
  artwork,
  me,
}) => {
  // If we have info about the lot end time (cascading), use that.
  const { sale, saleArtwork, is_sold, is_in_auction } = artwork
  const endAt = saleArtwork?.endAt
  const extendedBiddingEndAt = saleArtwork?.extendedBiddingEndAt
  const biddingEndAt = extendedBiddingEndAt ?? endAt

  const startAt = sale?.startAt

  const shouldRenderArtworkBadges =
    shouldRenderAuthenticityCertificate(artwork) ||
    shouldRenderVerifiedSeller(artwork) ||
    shouldRenderBuyerGuaranteeAndSecurePayment(artwork)

  const [updatedBiddingEndAt, setUpdatedBiddingEndAt] = React.useState(
    biddingEndAt
  )

  useAuctionWebsocket({
    lotID: saleArtwork?.lotID!,
    onChange: ({ extended_bidding_end_at }) => {
      setUpdatedBiddingEndAt(extended_bidding_end_at)
    },
  })

  const { hasEnded } = useTimer(updatedBiddingEndAt!, startAt!)
  const shouldHideDetailsCreateAlertCTA =
    (is_in_auction && hasEnded) ||
    (is_in_auction && lotIsClosed(sale, saleArtwork)) ||
    is_sold

  return (
    <ArtworkSidebarContainer data-test={ContextModule.artworkSidebar}>
      <ArtworkSidebarArtistsFragmentContainer artwork={artwork} />
      <Spacer mt={4} />
      <ArtworkSidebarMetadataFragmentContainer artwork={artwork} />

      {is_in_auction ? (
        <>
          <Spacer mt={2} />
          <Join separator={<Spacer mt={2} />}>
            <ArtworkSidebarAuctionPartnerInfoFragmentContainer
              artwork={artwork}
            />
            {hasEnded ? (
              <ArtworkSidebarBiddingClosedMessageFragmentContainer
                artwork={artwork}
              />
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

      {shouldRenderArtworkBadges && (
        <Join separator={<Spacer mt={2} />}>
          <Separator mt={2} />
          <AuthenticityCertificateFragmentContainer artwork={artwork} />
          <SecurePaymentFragmentContainer artwork={artwork} />
          <VerifiedSellerFragmentContainer artwork={artwork} />
          <BuyerGuaranteeFragmentContainer artwork={artwork} />
        </Join>
      )}

      {!shouldHideDetailsCreateAlertCTA && (
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
        is_biddable: isBiddable
        is_acquireable: isAcquireable
        is_offerable: isOfferable
        hasCertificateOfAuthenticity
        partner {
          isVerifiedSeller
        }
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
        ...ArtworkSidebarBiddingClosedMessage_artwork
        sale {
          is_closed: isClosed
          startAt
          internalID
          extendedBiddingIntervalMinutes
        }
        saleArtwork {
          endAt
          endedAt
          extendedBiddingEndAt
          lotID
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
