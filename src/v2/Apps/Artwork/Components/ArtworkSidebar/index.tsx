import { Box, Spacer, Join } from "@artsy/palette"
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

export interface ArtworkSidebarProps {
  artwork: ArtworkSidebar_artwork
  me: ArtworkSidebar_me
}

const ArtworkSidebarContainer = Box

export const ArtworkSidebar: React.FC<ArtworkSidebarProps> = ({
  artwork,
  me,
}) => {
  const shouldShowCreateAlertSection = useFeatureFlag(
    "artwork-page-create-alert"
  )

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
            <ArtworkSidebarAuctionPollingRefetchContainer
              artwork={artwork}
              me={me}
            />
          </Join>
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
        ...ArtworkSidebarArtists_artwork
        ...ArtworkSidebarMetadata_artwork
        ...ArtworkSidebarAuctionPartnerInfo_artwork
        ...ArtworkSidebarAuctionInfoPolling_artwork
        ...ArtworkSidebarCommercial_artwork
        ...ArtworkSidebarPartnerInfo_artwork
        ...ArtworkSidebarExtraLinks_artwork
        ...SecurePayment_artwork
        ...VerifiedSeller_artwork
        ...AuthenticityCertificate_artwork
        ...BuyerGuarantee_artwork
        ...CreateArtworkAlertSection_artwork
      }
    `,
    me: graphql`
      fragment ArtworkSidebar_me on Me {
        ...ArtworkSidebarAuctionInfoPolling_me
      }
    `,
  }
)
