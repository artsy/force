import { Flex, Separator, Spacer } from "@artsy/palette"
import { createFragmentContainer, graphql } from "react-relay"
import { ArtworkSidebar2ArtistsFragmentContainer } from "./ArtworkSidebar2Artists"
import { ArtworkSidebar2_artwork } from "__generated__/ArtworkSidebar2_artwork.graphql"
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

export interface ArtworkSidebarProps {
  artwork: ArtworkSidebar2_artwork
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

export const ArtworkSidebar2: React.FC<ArtworkSidebarProps> = props => {
  const { artwork } = props
  const {
    isSold,
    isAcquireable,
    isInAuction,
    isOfferable,
    saleArtwork,
    sale,
  } = artwork
  const endAt = saleArtwork?.endAt
  const extendedBiddingEndAt = saleArtwork?.extendedBiddingEndAt
  const biddingEndAt = extendedBiddingEndAt ?? endAt

  const startAt = sale?.startAt

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

  return (
    <Flex flexDirection="column">
      <ArtworkSidebar2ArtistsFragmentContainer artwork={artwork} />
      <ArtworkSidebar2ArtworkTitleFragmentContainer artwork={artwork} />

      <Spacer mt={2} />
      <ArtworkSidebar2DetailsFragmentContainer artwork={artwork} />

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

      <Separator />
      <SidebarExpandable
        label={t`artworkPage.sidebar.artsyGuarantee.expandableLabel`}
      >
        <ArtworkSidebar2ArtsyGuarantee />
      </SidebarExpandable>
      <Separator />
      <Spacer mt={2} />

      <ArtworkSidebar2PartnerInfoFragmentContainer artwork={artwork} />

      <Spacer mt={2} />
      {(!shouldHideDetailsCreateAlertCTA ||
        checkIfArtworkIsOnLoanOrPermanentCollection(artwork.saleMessage)) && (
        <ArtworkSidebar2CreateArtworkAlertFragmentContainer artwork={artwork} />
      )}
      <Separator />
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
        ...ArtworkSidebar2ArtworkTitle_artwork
        ...ArtworkSidebar2Artists_artwork
        ...ArtworkSidebar2Details_artwork
        ...ArtworkSidebar2ShippingInformation_artwork
        ...ArtworkSidebar2PartnerInfo_artwork
        ...ArtworkSidebar2CreateArtworkAlert_artwork
        sale {
          startAt
        }
        saleArtwork {
          lotID
          extendedBiddingEndAt
          endAt
        }
        artists {
          internalID
        }
      }
    `,
  }
)
