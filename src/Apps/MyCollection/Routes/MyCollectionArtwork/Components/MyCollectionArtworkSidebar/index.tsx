// export interface ArtworkSidebarProps {
//   artwork: ArtworkSidebar_artwork
//   me: ArtworkSidebar_me
// }

import { Box } from "@artsy/palette"
import { MyCollectionArtworkSidebarMetadata } from "./MyCollectionArtworkSidebarMetadata"

const MyCollectionArtworkSidebarContainer = Box

export const MyCollectionArtworkSidebar: React.FC<any> = ({ artwork, me }) => {
  // If we have info about the lot end time (cascading), use that.
  // const { sale, saleArtwork, is_sold, is_in_auction } = artwork
  // const endAt = saleArtwork?.endAt
  // const extendedBiddingEndAt = saleArtwork?.extendedBiddingEndAt
  // const biddingEndAt = extendedBiddingEndAt ?? endAt

  // const startAt = sale?.startAt

  // const shouldRenderArtworkBadges =
  //   shouldRenderVerifiedSeller(artwork) ||
  //   shouldRenderBuyerGuaranteeAndSecurePayment(artwork)

  // const [updatedBiddingEndAt, setUpdatedBiddingEndAt] = React.useState(
  //   biddingEndAt
  // )

  // useAuctionWebsocket({
  //   lotID: saleArtwork?.lotID!,
  //   onChange: ({ extended_bidding_end_at }) => {
  //     setUpdatedBiddingEndAt(extended_bidding_end_at)
  //   },
  // })

  // const { hasEnded } = useTimer(updatedBiddingEndAt!, startAt!)
  // const shouldHideDetailsCreateAlertCTA =
  //   artwork.artists?.length === 0 ||
  //   (is_in_auction && hasEnded) ||
  //   (is_in_auction && lotIsClosed(sale, saleArtwork)) ||
  //   is_sold

  return (
    <MyCollectionArtworkSidebarContainer
    // data-test={ContextModule.artworkSidebar}
    >
      {/* <ArtworkSidebarMetadataFragmentContainer artwork={artwork} /> */}
      <MyCollectionArtworkSidebarMetadata />
    </MyCollectionArtworkSidebarContainer>
  )
}

// export const ArtworkSidebarFragmentContainer = createFragmentContainer(
//   ArtworkSidebar,
//   {
//     artwork: graphql`
//       fragment ArtworkSidebar_artwork on Artwork {
//         is_in_auction: isInAuction
//         is_sold: isSold
//         is_biddable: isBiddable
//         is_acquireable: isAcquireable
//         is_offerable: isOfferable
//         hasCertificateOfAuthenticity
//         partner {
//           isVerifiedSeller
//         }
//         ...ArtworkSidebarArtists_artwork
//         ...ArtworkSidebarMetadata_artwork
//         ...ArtworkSidebarAuctionPartnerInfo_artwork
//         ...ArtworkSidebarAuctionInfoPolling_artwork
//         ...ArtworkSidebarAuctionTimer_artwork
//         ...ArtworkSidebarCommercial_artwork
//         ...ArtworkSidebarPartnerInfo_artwork
//         ...ArtworkSidebarExtraLinks_artwork
//         ...SecurePayment_artwork
//         ...VerifiedSeller_artwork
//         ...AuthenticityCertificate_artwork
//         ...BuyerGuarantee_artwork
//         ...CreateArtworkAlertSection_artwork
//         ...ArtworkSidebarBiddingClosedMessage_artwork
//         sale {
//           is_closed: isClosed
//           startAt
//           internalID
//           extendedBiddingIntervalMinutes
//         }
//         saleArtwork {
//           endAt
//           endedAt
//           extendedBiddingEndAt
//           lotID
//         }
//         artists {
//           internalID
//         }
//       }
//     `,
//     me: graphql`
//       fragment ArtworkSidebar_me on Me {
//         ...ArtworkSidebarAuctionInfoPolling_me
//       }
//     `,
//   }
// )
