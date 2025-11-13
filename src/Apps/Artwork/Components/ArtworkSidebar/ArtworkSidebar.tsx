import { ArtworkSidebarAuctionPollingRefetchContainer } from "Apps/Artwork/Components/ArtworkSidebar/ArtworkSidebarAuctionInfoPolling"
import { ArtworkSidebarAuctionTimerFragmentContainer } from "Apps/Artwork/Components/ArtworkSidebar/ArtworkSidebarAuctionTimer"
import { ArtworkSidebarBiddingClosedMessageFragmentContainer } from "Apps/Artwork/Components/ArtworkSidebar/ArtworkSidebarBiddingClosedMessage"
import { ArtworkSidebarCommercialButtons } from "Apps/Artwork/Components/ArtworkSidebar/ArtworkSidebarCommercialButtons"
import { ArtworkSidebarCreateAlertFragmentContainer } from "Apps/Artwork/Components/ArtworkSidebar/ArtworkSidebarCreateAlert"
import { ArtworkSidebarDetailsFragmentContainer } from "Apps/Artwork/Components/ArtworkSidebar/ArtworkSidebarDetails"
import { ArtworkSidebarEstimatedValueFragmentContainer } from "Apps/Artwork/Components/ArtworkSidebar/ArtworkSidebarEstimatedValue"
import { ArtworkSidebarLinksFragmentContainer } from "Apps/Artwork/Components/ArtworkSidebar/ArtworkSidebarLinks"
import { ArtworkSidebarPartnerInfoFragmentContainer } from "Apps/Artwork/Components/ArtworkSidebar/ArtworkSidebarPartnerInfo"
import { ArtworkSidebarPrivateArtwork } from "Apps/Artwork/Components/ArtworkSidebar/ArtworkSidebarPrivateArtwork"
import { PrivateArtworkAdditionalInfo } from "Apps/Artwork/Components/ArtworkSidebar/PrivateArtworkAdditionalInfo"
import { lotIsClosed } from "Apps/Artwork/Utils/lotIsClosed"
import { ArtsyShippingEstimate } from "Components/ArtsyShippingEstimate"
import { SidebarExpandable } from "Components/Artwork/SidebarExpandable"
import { useSystemContext } from "System/Hooks/useSystemContext"
import { SystemQueryRenderer } from "System/Relay/SystemQueryRenderer"
import { useAuctionWebsocket } from "Utils/Hooks/useAuctionWebsocket"
import { useTimer } from "Utils/Hooks/useTimer"
import { ContextModule } from "@artsy/cohesion"
import {
  Flex,
  Join,
  Separator,
  Skeleton,
  SkeletonText,
  Spacer,
  Text,
} from "@artsy/palette"
import type { ArtworkSidebar_artwork$data } from "__generated__/ArtworkSidebar_artwork.graphql"
import type { ArtworkSidebar_me$data } from "__generated__/ArtworkSidebar_me.graphql"
import type { ArtworkSidebarQuery } from "__generated__/ArtworkSidebarQuery.graphql"
import { useState } from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { ArtworkSidebarArtistsFragmentContainer } from "./ArtworkSidebarArtists"
import { ArtworkSidebarArtsyGuarantee } from "./ArtworkSidebarArtsyGuarantee"
import { ArtworkSidebarArtworkTitleFragmentContainer } from "./ArtworkSidebarArtworkTitle"
import { ArtworkSidebarShippingInformationFragmentContainer } from "./ArtworkSidebarShippingInformation"

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

export const ArtworkSidebar: React.FC<
  React.PropsWithChildren<ArtworkSidebarProps>
> = ({ artwork, me }) => {
  const {
    artsyShippingDomestic,
    artsyShippingInternational,
    editionSets,
    internationalShippingFee,
    isAcquireable,
    isEdition,
    isEligibleForArtsyGuarantee,
    isEligibleToCreateAlert,
    isInAuction,
    isOfferable,
    isSold,
    saleArtwork,
    sale,
    shippingWeight,
    shippingWeightMetric,
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

  // TODO: Arta Estimate widget experiment!
  // This code determins if Arta widget code should be loaded
  // Either remove or properly implement when experiment is complete
  const allArtsyShipping =
    !!artsyShippingDomestic && !!artsyShippingInternational
  const artsyImpliedShipping =
    !!artsyShippingDomestic &&
    !artsyShippingInternational &&
    !internationalShippingFee
  const isOneEdition = isEdition && editionSets && editionSets.length === 1
  let isWeightArtaEstimatable = true
  // TODO: for now ignoring weight for works with one edition set.
  // Need to either support in MP or roll data to the artwork level.
  // TODO: have standard shippingWeightKg in MP?
  if (!isEdition && shippingWeight && shippingWeightMetric) {
    isWeightArtaEstimatable =
      shippingWeightMetric === "kg"
        ? shippingWeight <= 68
        : shippingWeight <= 150
  }
  const displayArtaEstimate =
    (allArtsyShipping || artsyImpliedShipping) &&
    (!isEdition || isOneEdition) &&
    isWeightArtaEstimatable

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
        <Text variant="sm" color="mono100" mb={0.5}>
          Lot {lotLabel}
        </Text>
      )}

      <h1>
        <ArtworkSidebarArtistsFragmentContainer artwork={artwork} />

        <ArtworkSidebarArtworkTitleFragmentContainer artwork={artwork} />
      </h1>

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
          <SidebarExpandable
            labelTrackingText="Shipping and taxes"
            label={
              <Flex flexDirection="column" justifyContent="flex-start">
                <Text>Shipping and taxes</Text>
                {displayArtaEstimate && (
                  <ArtsyShippingEstimate artwork={artwork} />
                )}
              </Flex>
            }
          >
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
        ...ArtsyShippingEstimate_artwork
        artists(shallow: true) {
          internalID
        }
        artsyShippingDomestic
        artsyShippingInternational
        editionSets {
          internalID
        }
        internationalShippingFee {
          major
        }
        isAcquireable
        isBiddable
        isEdition
        isEligibleForArtsyGuarantee
        isEligibleToCreateAlert
        isInAuction
        isOfferable
        isSold
        isUnlisted
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
        saleMessage
        shippingWeight
        shippingWeightMetric
        slug
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

export const ArtworkSidebarQueryRenderer: React.FC<
  ArtworkSidebarQueryRendererProps
> = ({ artworkID, ...rest }) => {
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
