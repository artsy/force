import { Flex, Join, Separator, Spacer, Text } from "@artsy/palette"
import { createFragmentContainer, graphql } from "react-relay"
import { ArtworkSidebar2ArtistsFragmentContainer } from "./ArtworkSidebar2Artists"
import { ArtworkSidebar2_artwork$data } from "__generated__/ArtworkSidebar2_artwork.graphql"
import { ArtworkSidebar2_me$data } from "__generated__/ArtworkSidebar2_me.graphql"
import { ArtworkSidebar2ShippingInformationFragmentContainer } from "./ArtworkSidebar2ShippingInformation"
import { SidebarExpandable } from "Components/Artwork/SidebarExpandable"
import { useTranslation } from "react-i18next"
import { ArtworkSidebar2ArtworkTitleFragmentContainer } from "./ArtworkSidebar2ArtworkTitle"
import { ArtworkSidebar2DetailsFragmentContainer } from "./ArtworkSidebar2Details"
import { ArtworkSidebar2ArtsyGuarantee } from "./ArtworkSidebar2ArtsyGuarantee"
import { ArtworkSidebar2PartnerInfoFragmentContainer } from "./ArtworkSidebar2PartnerInfo"
import { ArtworkSidebar2CreateArtworkAlertFragmentContainer } from "./ArtworkSidebar2CreateArtworkAlert"
import { useTimer } from "Utils/Hooks/useTimer"
import { useState } from "react"
import { lotIsClosed } from "Apps/Artwork/Utils/lotIsClosed"
import { useAuctionWebsocket } from "Components/useAuctionWebsocket"
import { ArtworkSidebar2LinksFragmentContainer } from "./ArtworkSidebar2Links"
import { ArtworkSidebar2CommercialButtonsFragmentContainer } from "./ArtworkSidebar2CommercialButtons"
import { ArtworkSidebar2EstimatedValueFragmentContainer } from "./ArtworkSidebar2EstimatedValue"
import { ArtworkSidebar2BiddingClosedMessageFragmentContainer } from "./ArtworkSidebar2BiddingClosedMessage"
import { ArtworkSidebar2AuctionTimerFragmentContainer } from "./ArtworkSidebar2AuctionTimer"
import { ArtworkSidebarAuctionPollingRefetchContainer } from "Apps/Artwork/Components/ArtworkSidebar/ArtworkSidebarAuctionInfoPolling"

export interface ArtworkSidebarProps {
  artwork: ArtworkSidebar2_artwork$data
  me: ArtworkSidebar2_me$data
}

const checkIfArtworkIsOnLoanOrPermanentCollection = (
  saleMessage: string | null
) => {
  switch (saleMessage) {
    case "On loan":
      return true
    case "Permanent collection":
      return true
    default:
      return false
  }
}

export const ArtworkSidebar2: React.FC<ArtworkSidebarProps> = ({
  artwork,
  me,
}) => {
  const {
    isSold,
    isAcquireable,
    isInAuction,
    isOfferableFromInquiry,
    isOfferable,
    saleArtwork,
    sale,
  } = artwork
  const startAt = sale?.startAt
  const endAt = saleArtwork?.endAt
  const extendedBiddingEndAt = saleArtwork?.extendedBiddingEndAt
  const biddingEndAt = extendedBiddingEndAt ?? endAt

  const [updatedBiddingEndAt, setUpdatedBiddingEndAt] = useState(biddingEndAt)

  const { t } = useTranslation()

  useAuctionWebsocket({
    lotID: saleArtwork?.lotID!,
    onChange: ({ extended_bidding_end_at }) => {
      setUpdatedBiddingEndAt(extended_bidding_end_at)
    },
  })

  const artworkEcommerceAvailable = !!(isAcquireable || isOfferable)

  const { hasEnded } = useTimer(updatedBiddingEndAt!, startAt!)
  const shouldHideDetailsCreateAlertCTA =
    artwork.artists?.length === 0 ||
    (isInAuction && hasEnded) ||
    (isInAuction && lotIsClosed(sale, saleArtwork)) ||
    isSold

  const lotLabel = artwork.isBiddable ? artwork.saleArtwork?.lotLabel : null

  const shouldDisplayArtsyGuarantee =
    !checkIfArtworkIsOnLoanOrPermanentCollection(artwork.saleMessage) &&
    !isSold &&
    !isInAuction &&
    isOfferableFromInquiry

  return (
    <Flex flexDirection="column">
      {lotLabel && (
        <Text variant="sm" color="black100" mb={0.5}>
          Lot {lotLabel}
        </Text>
      )}
      <ArtworkSidebar2ArtistsFragmentContainer artwork={artwork} />

      <ArtworkSidebar2ArtworkTitleFragmentContainer artwork={artwork} />

      <Spacer mt={2} />

      <ArtworkSidebar2DetailsFragmentContainer artwork={artwork} />
      {isInAuction ? (
        <>
          <Separator />
          <Spacer mt={2} />
          <ArtworkSidebar2EstimatedValueFragmentContainer artwork={artwork} />
          <Join separator={<Spacer mt={2} />}>
            {hasEnded ? (
              <ArtworkSidebar2BiddingClosedMessageFragmentContainer
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
            <ArtworkSidebar2AuctionTimerFragmentContainer artwork={artwork} />
          )}
          <Spacer mt={2} />
        </>
      ) : (
        <ArtworkSidebar2CommercialButtonsFragmentContainer artwork={artwork} />
      )}

      {!isSold && artworkEcommerceAvailable && (
        <>
          <Separator />
          <SidebarExpandable
            label={t`artworkPage.sidebar.shippingAndTaxes.expandableLabel`}
          >
            <ArtworkSidebar2ShippingInformationFragmentContainer
              artwork={artwork}
            />
          </SidebarExpandable>
        </>
      )}

      {shouldDisplayArtsyGuarantee && (
        <>
          <Separator />
          <SidebarExpandable
            label={t`artworkPage.sidebar.artsyGuarantee.expandableLabel`}
          >
            <ArtworkSidebar2ArtsyGuarantee />
          </SidebarExpandable>
        </>
      )}
      <Separator />
      <Spacer mt={2} />

      <ArtworkSidebar2PartnerInfoFragmentContainer artwork={artwork} />

      <Spacer mt={2} />
      {(!shouldHideDetailsCreateAlertCTA ||
        checkIfArtworkIsOnLoanOrPermanentCollection(artwork.saleMessage)) && (
        <ArtworkSidebar2CreateArtworkAlertFragmentContainer artwork={artwork} />
      )}
      <Separator />

      <ArtworkSidebar2LinksFragmentContainer artwork={artwork} />
    </Flex>
  )
}

export const ArtworkSidebar2FragmentContainer = createFragmentContainer(
  ArtworkSidebar2,
  {
    artwork: graphql`
      fragment ArtworkSidebar2_artwork on Artwork {
        slug
        isSold
        isAcquireable
        isOfferable
        isInAuction
        saleMessage
        isBiddable
        isOfferableFromInquiry
        ...ArtworkSidebar2ArtworkTitle_artwork
        ...ArtworkSidebar2Artists_artwork
        ...ArtworkSidebar2Details_artwork
        ...ArtworkSidebar2CommercialButtons_artwork
        ...ArtworkSidebar2ShippingInformation_artwork
        ...ArtworkSidebar2PartnerInfo_artwork
        ...ArtworkSidebar2CreateArtworkAlert_artwork
        ...ArtworkSidebar2Links_artwork
        ...ArtworkSidebar2EstimatedValue_artwork
        ...ArtworkSidebar2BiddingClosedMessage_artwork
        ...ArtworkSidebar2AuctionTimer_artwork
        ...ArtworkSidebarAuctionInfoPolling_artwork
        sale {
          startAt
        }
        saleArtwork {
          lotID
          lotLabel
          extendedBiddingEndAt
          endAt
        }
        artists {
          internalID
        }
      }
    `,
    me: graphql`
      fragment ArtworkSidebar2_me on Me {
        ...ArtworkSidebarAuctionInfoPolling_me
      }
    `,
  }
)
