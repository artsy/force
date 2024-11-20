import {
  Flex,
  Join,
  Separator,
  Skeleton,
  SkeletonText,
  Spacer,
  Text,
} from "@artsy/palette"
import { createFragmentContainer, graphql } from "react-relay"
import { ArtworkSidebarArtistsFragmentContainer } from "./ArtworkSidebarArtists"
import { ArtworkSidebar_artwork$data } from "__generated__/ArtworkSidebar_artwork.graphql"
import { ArtworkSidebar_me$data } from "__generated__/ArtworkSidebar_me.graphql"
import { ArtworkSidebarShippingInformationFragmentContainer } from "./ArtworkSidebarShippingInformation"
import { SidebarExpandable } from "Components/Artwork/SidebarExpandable"

import { ArtworkSidebarArtworkTitleFragmentContainer } from "./ArtworkSidebarArtworkTitle"
import { ArtworkSidebarDetailsFragmentContainer } from "./ArtworkSidebarDetails"
import { ArtworkSidebarArtsyGuarantee } from "./ArtworkSidebarArtsyGuarantee"
import { ArtworkSidebarPartnerInfoFragmentContainer } from "./ArtworkSidebarPartnerInfo"
import { ArtworkSidebarCreateAlertFragmentContainer } from "./ArtworkSidebarCreateAlert"
import { useTimer } from "Utils/Hooks/useTimer"
import { useState } from "react"
import { lotIsClosed } from "Apps/Artwork/Utils/lotIsClosed"
import { useAuctionWebsocket } from "Utils/Hooks/useAuctionWebsocket"
import { ArtworkSidebarLinksFragmentContainer } from "./ArtworkSidebarLinks"
import { ArtworkSidebarCommercialButtons } from "./ArtworkSidebarCommercialButtons"
import { ArtworkSidebarEstimatedValueFragmentContainer } from "./ArtworkSidebarEstimatedValue"
import { ArtworkSidebarBiddingClosedMessageFragmentContainer } from "./ArtworkSidebarBiddingClosedMessage"
import { ArtworkSidebarAuctionTimerFragmentContainer } from "./ArtworkSidebarAuctionTimer"
import { ArtworkSidebarAuctionPollingRefetchContainer } from "./ArtworkSidebarAuctionInfoPolling"
import { ContextModule } from "@artsy/cohesion"
import { ArtworkSidebarPrivateArtwork } from "Apps/Artwork/Components/ArtworkSidebar/ArtworkSidebarPrivateArtwork"
import { PrivateArtworkAdditionalInfo } from "Apps/Artwork/Components/ArtworkSidebar/PrivateArtworkAdditionalInfo"
import { SystemQueryRenderer } from "System/Relay/SystemQueryRenderer"
import { useSystemContext } from "System/Hooks/useSystemContext"
import { ArtworkSidebarQuery } from "__generated__/ArtworkSidebarQuery.graphql"

export interface ArtworkSidebarProps {
  artwork: ArtworkSidebar_artwork$data
  me: ArtworkSidebar_me$data
}

const checkIfArtworkIsOnLoanOrPermanentCollection = (
  saleMessage: string | null | undefined
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

export const ArtworkSidebar: React.FC<ArtworkSidebarProps> = ({
  artwork,
  me,
}) => {
  const {
    isSold,
    isAcquireable,
    isInAuction,
    isEligibleForArtsyGuarantee,
    isEligibleToCreateAlert,
    isOfferable,
    saleArtwork,
    sale,
  } = artwork
  const startAt = sale?.startAt
  const endAt = saleArtwork?.endAt
  const lotLabel = saleArtwork?.lotLabel
  const extendedBiddingEndAt = saleArtwork?.extendedBiddingEndAt
  const biddingEndAt = extendedBiddingEndAt ?? endAt
  const isUnlisted = artwork?.isUnlisted

  const [updatedBiddingEndAt, setUpdatedBiddingEndAt] = useState(biddingEndAt)

  useAuctionWebsocket({
    lotID: saleArtwork?.lotID as string,
    onChange: ({ extended_bidding_end_at }) => {
      setUpdatedBiddingEndAt(extended_bidding_end_at)
    },
  })

  const artworkEcommerceAvailable = !!(isAcquireable || isOfferable)

  const timerEndAt = sale?.isAuction ? updatedBiddingEndAt : sale?.endAt

  const { hasEnded } = useTimer(timerEndAt as string, startAt as string)

  const shouldHideDetailsCreateAlertCTA =
    isUnlisted ||
    !isEligibleToCreateAlert ||
    (isInAuction && hasEnded) ||
    (isInAuction && lotIsClosed(sale, saleArtwork)) ||
    isSold

  const shoudlDisplayLotLabel = !!isInAuction && !!lotLabel

  const showTimedSaleTimer = sale && !sale.isAuction && !hasEnded

  return (
    <Flex flexDirection="column" data-test={ContextModule.artworkSidebar}>
      {shoudlDisplayLotLabel && (
        <Text variant="sm" color="black100" mb={0.5}>
          Lot {lotLabel}
        </Text>
      )}
      <ArtworkSidebarArtistsFragmentContainer artwork={artwork} />

      <ArtworkSidebarArtworkTitleFragmentContainer artwork={artwork} />

      <Spacer y={2} />

      <ArtworkSidebarDetailsFragmentContainer artwork={artwork} />

      {!isUnlisted && (
        <>
          {isInAuction ? (
            <>
              <Separator />

              <Spacer y={2} />

              <ArtworkSidebarEstimatedValueFragmentContainer
                artwork={artwork}
              />

              <Join separator={<Spacer y={2} />}>
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
                <ArtworkSidebarAuctionTimerFragmentContainer
                  artwork={artwork}
                />
              )}

              <Spacer y={2} />
            </>
          ) : (
            <ArtworkSidebarCommercialButtons artwork={artwork} me={me} />
          )}
        </>
      )}

      {isUnlisted && (
        <>
          <PrivateArtworkAdditionalInfo artwork={artwork} />

          <Spacer y={4} />

          <ArtworkSidebarCommercialButtons
            artwork={artwork}
            me={me}
            showPrice={true}
            showButtonActions={false}
          />

          <Spacer y={2} />

          <ArtworkSidebarShippingInformationFragmentContainer
            artwork={artwork}
          />

          <Separator borderWidth={1} my={4} />

          <ArtworkSidebarPrivateArtwork artwork={artwork} />
          <Spacer y={2} />

          <ArtworkSidebarCommercialButtons
            artwork={artwork}
            me={me}
            showPrice={false}
            showButtonActions={true}
          />

          <ArtworkSidebarArtsyGuarantee artwork={artwork} />

          <Spacer y={2} />
        </>
      )}

      {showTimedSaleTimer && (
        <>
          <ArtworkSidebarAuctionTimerFragmentContainer artwork={artwork} />
          <Spacer y={2} />
        </>
      )}

      {!isUnlisted && !isSold && artworkEcommerceAvailable && (
        <>
          <SidebarExpandable label="Shipping and taxes">
            <ArtworkSidebarShippingInformationFragmentContainer
              artwork={artwork}
            />
          </SidebarExpandable>

          <Spacer y={1} />
        </>
      )}

      {!isUnlisted && !!isEligibleForArtsyGuarantee && (
        <>
          <SidebarExpandable label="Be covered by the Artsy Guarantee when you check out with Artsy">
            <ArtworkSidebarArtsyGuarantee artwork={artwork} />
          </SidebarExpandable>

          <Spacer y={1} />
        </>
      )}

      <Separator />

      <Spacer y={2} />

      <ArtworkSidebarPartnerInfoFragmentContainer artwork={artwork} />

      <Spacer y={2} />

      {(!shouldHideDetailsCreateAlertCTA ||
        checkIfArtworkIsOnLoanOrPermanentCollection(artwork.saleMessage)) && (
        <ArtworkSidebarCreateAlertFragmentContainer artwork={artwork} />
      )}

      <Separator />

      <ArtworkSidebarLinksFragmentContainer artwork={artwork} />
    </Flex>
  )
}

export const ArtworkSidebarFragmentContainer = createFragmentContainer(
  ArtworkSidebar,
  {
    artwork: graphql`
      fragment ArtworkSidebar_artwork on Artwork {
        ...ArtworkSidebarArtworkTitle_artwork
        ...ArtworkSidebarArtists_artwork
        ...ArtworkSidebarDetails_artwork
        ...ArtworkSidebarCommercialButtons_artwork
        ...ArtworkSidebarShippingInformation_artwork
        ...ArtworkSidebarPartnerInfo_artwork
        ...ArtworkSidebarCreateAlert_artwork
        ...ArtworkSidebarLinks_artwork
        ...ArtworkSidebarEstimatedValue_artwork
        ...ArtworkSidebarBiddingClosedMessage_artwork
        ...ArtworkSidebarAuctionTimer_artwork
        ...ArtworkSidebarAuctionInfoPolling_artwork
        ...ArtworkSidebarPrivateArtwork_artwork
        ...ArtworkSidebarArtsyGuarantee_artwork
        ...PrivateArtworkAdditionalInfo_artwork

        slug
        isSold
        isAcquireable
        isOfferable
        isInAuction
        saleMessage
        isBiddable
        isEligibleForArtsyGuarantee
        isEligibleToCreateAlert
        partner {
          internalID
        }
        sale {
          endAt
          startAt
          isClosed
          isAuction
        }
        saleArtwork {
          lotID
          lotLabel
          extendedBiddingEndAt
          endAt
          endedAt
        }
        artists(shallow: true) {
          internalID
        }
        isUnlisted
      }
    `,
    me: graphql`
      fragment ArtworkSidebar_me on Me
        @argumentDefinitions(artworkID: { type: "String!" }) {
        ...ArtworkSidebarAuctionInfoPolling_me
        ...ArtworkSidebarCommercialButtons_me @arguments(artworkID: $artworkID)
      }
    `,
  }
)

interface ArtworkSidebarQueryRendererProps {
  artworkID: string
}

const PLACEHOLDER = (
  <Skeleton>
    <SkeletonText variant="md">Some Longish Artist Name</SkeletonText>
    <SkeletonText variant="md">Artwork Title, 2024</SkeletonText>
    <Spacer y={2} />
    <SkeletonText variant="sm">Oil on Canvas</SkeletonText>
    <SkeletonText variant="sm">16 × 12 in | 40.6 × 30.5 cm</SkeletonText>
  </Skeleton>
)

export const ArtworkSidebarQueryRenderer: React.FC<ArtworkSidebarQueryRendererProps> = ({
  artworkID,
  ...rest
}) => {
  const { relayEnvironment } = useSystemContext()

  return (
    <SystemQueryRenderer<ArtworkSidebarQuery>
      environment={relayEnvironment}
      placeholder={PLACEHOLDER}
      query={graphql`
        query ArtworkSidebarQuery($artworkID: String!) {
          artwork(id: $artworkID) {
            ...ArtworkSidebar_artwork
          }
          me {
            ...ArtworkSidebar_me @arguments(artworkID: $artworkID)
          }
        }
      `}
      variables={{ artworkID }}
      render={({ error, props }) => {
        if (error) return null

        if (!props?.artwork) {
          return PLACEHOLDER
        }

        return (
          <ArtworkSidebarFragmentContainer
            artwork={props.artwork}
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            me={props.me!}
            {...rest}
          />
        )
      }}
    />
  )
}
