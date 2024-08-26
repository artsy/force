import { AuthContextModule } from "@artsy/cohesion"
import { Box, Flex, Join, SkeletonText, Spacer, Text } from "@artsy/palette"
import { themeGet } from "@styled-system/theme-get"
import { SaveArtworkToListsButtonFragmentContainer } from "Components/Artwork/SaveButton/SaveArtworkToListsButton"
import { useArtworkGridContext } from "Components/ArtworkGrid/ArtworkGridContext"
import { isFunction } from "lodash"
import * as React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import styled from "styled-components"
import { RouterLink, RouterLinkProps } from "System/Components/RouterLink"
import { useTimer } from "Utils/Hooks/useTimer"
import { Details_artwork$data } from "__generated__/Details_artwork.graphql"
import { HoverDetailsFragmentContainer } from "./HoverDetails"
import { SaveButtonFragmentContainer } from "./SaveButton"
import { useFeatureFlag } from "System/Hooks/useFeatureFlag"
import { ConsignmentSubmissionStatusFragmentContainer } from "Components/Artwork/ConsignmentSubmissionStatus"
import HighDemandIcon from "@artsy/icons/HighDemandIcon"
import { getSignalLabel } from "Utils/getSignalLabel"
import { DateTime } from "luxon"
import { getSaleOrLotTimerInfo } from "Utils/getSaleOrLotTimerInfo"
import { useAuctionWebsocket } from "Utils/Hooks/useAuctionWebsocket"
import { useState } from "react"

interface DetailsProps {
  artwork: Details_artwork$data
  contextModule?: AuthContextModule
  includeLinks: boolean
  hideSaleInfo?: boolean
  hideArtistName?: boolean
  hidePartnerName?: boolean
  isHovered?: boolean
  showHighDemandIcon?: boolean
  showHoverDetails?: boolean
  showSaveButton?: boolean
  showSubmissionStatus?: boolean
  renderSaveButton?: (artworkId: string) => React.ReactNode
}

interface SaleInfoLineProps extends DetailsProps {
  showActivePartnerOfferLine: boolean
}

interface SaleMessageProps extends DetailsProps {
  showActivePartnerOfferLine: boolean
}

const StyledConditionalLink = styled(RouterLink)`
  color: ${themeGet("colors.black100")};
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
`

const ConditionalLink: React.FC<
  Pick<DetailsProps, "includeLinks"> &
    RouterLinkProps &
    React.AnchorHTMLAttributes<HTMLAnchorElement>
> = ({ includeLinks, children, ...rest }) => {
  const LinkComponent = includeLinks ? StyledConditionalLink : "span"
  return <LinkComponent {...rest}>{children}</LinkComponent>
}

const ArtistLine: React.FC<DetailsProps> = ({
  artwork: { cultural_maker, artists },
  includeLinks,
  showSaveButton,
}) => {
  if (cultural_maker) {
    return (
      <Text variant="xs" overflowEllipsis>
        {cultural_maker}
      </Text>
    )
  }

  if (!artists?.length) {
    if (showSaveButton) {
      return (
        <Text variant="xs" overflowEllipsis>
          Artist Unavailable
        </Text>
      )
    }

    return null
  }

  return (
    <Text variant="xs" overflowEllipsis>
      {artists.map((artist, i) => {
        if (!artist || !artist.href || !artist.name) return null

        return (
          <ConditionalLink includeLinks={includeLinks} to={artist.href} key={i}>
            {artist.name}
            {i !== artists.length - 1 && ", "}
          </ConditionalLink>
        )
      })}
    </Text>
  )
}

const TitleLine: React.FC<DetailsProps> = ({
  includeLinks,
  artwork: { title, date, href },
}) => {
  return (
    <ConditionalLink includeLinks={includeLinks} to={href}>
      <Text variant="xs" color="black60" overflowEllipsis>
        <i>{title}</i>
        {date && `, ${date}`}
      </Text>
    </ConditionalLink>
  )
}

const PartnerLine: React.FC<DetailsProps> = ({
  includeLinks,
  artwork: { collecting_institution, partner },
}) => {
  if (collecting_institution) {
    return (
      <Text variant="xs" color="black60" overflowEllipsis>
        {collecting_institution}
      </Text>
    )
  }

  if (partner) {
    return (
      <ConditionalLink includeLinks={includeLinks} to={partner?.href}>
        <Text variant="xs" color="black60" overflowEllipsis>
          {partner.name}
        </Text>
      </ConditionalLink>
    )
  }

  return null
}

const SaleInfoLine: React.FC<SaleInfoLineProps> = props => {
  const { showActivePartnerOfferLine } = props
  const { lotClosesAt } = props.artwork.collectorSignals?.auction ?? {}
  const { liveBiddingStarted } = props.artwork.collectorSignals?.auction ?? {}

  if (lotClosesAt && new Date(lotClosesAt) <= new Date()) {
    return (
      <Text variant="xs" color="black100" fontWeight="bold">
        Bidding closed
      </Text>
    )
  }

  if (liveBiddingStarted) {
    return (
      <Text variant="xs" color="blue100">
        Bidding live now
      </Text>
    )
  }

  return (
    <Flex flexDirection="row" alignItems="center">
      <Text variant="xs" color="black100" fontWeight="bold" overflowEllipsis>
        <SaleMessage {...props} /> <BidInfo {...props} />
      </Text>
      {showActivePartnerOfferLine && <ActivePartnerOfferTimer {...props} />}
    </Flex>
  )
}

const CollectorSignalLine: React.FC<DetailsProps> = ({
  artwork: { collectorSignals },
}) => {
  if (!collectorSignals) {
    return null
  }

  return (
    <Text
      variant="xs"
      color="blue100"
      backgroundColor="blue10"
      px={0.5}
      alignSelf="flex-start"
      borderRadius={3}
    >
      {getSignalLabel(collectorSignals)}
    </Text>
  )
}

const BidTimerLine: React.FC<DetailsProps> = ({
  artwork: { collectorSignals },
}) => {
  const { lotClosesAt, registrationEndsAt, onlineBiddingExtended } =
    collectorSignals?.auction ?? {}
  const { time } = useTimer(lotClosesAt ?? "")
  const { days, hours, minutes } = time
  const { isAuctionArtwork } = useArtworkGridContext()
  const biddingEnded = lotClosesAt && new Date(lotClosesAt) <= new Date()
  const registrationEnded =
    registrationEndsAt && new Date(registrationEndsAt) <= new Date()

  const numDays = Number(days)
  const numHours = Number(hours)
  const numMinutes = Number(minutes)

  if (registrationEndsAt && !registrationEnded && !isAuctionArtwork) {
    const date = DateTime.fromISO(registrationEndsAt)
    const formattedRegistrationEndsAt = date.toFormat("MMM d")

    return (
      <Text variant="xs" color="black100" alignSelf="flex-start">
        Register by {formattedRegistrationEndsAt}
      </Text>
    )
  }

  if (!lotClosesAt || numDays > 5 || biddingEnded) {
    return <EmptyLine />
  }

  const renderLotCloseTime = [
    numDays > 0 && `${numDays}d`,
    numHours > 0 && `${numHours}h`,
    numDays === 0 && numHours === 0 && `${numMinutes}m`,
  ]
    .filter(Boolean)
    .join(" ")

  const textColor = numHours < 1 && numDays === 0 ? "red100" : "blue100"

  if (onlineBiddingExtended) {
    return (
      <Text variant="xs" color="red100" alignSelf="flex-start">
        Extended, {renderLotCloseTime} left to bid
      </Text>
    )
  }

  return (
    <Text variant="xs" color={textColor} alignSelf="flex-start">
      {renderLotCloseTime} left to bid
    </Text>
  )
}

const EmptyLine: React.FC = () => {
  return <Text variant="xs">&nbsp;</Text>
}

const HighDemandInfo = () => {
  return (
    <Flex flexDirection="row" alignItems="center">
      <HighDemandIcon fill="blue100" />
      <Text variant="xs" color="blue100" ml={0.3}>
        &nbsp;High Demand
      </Text>
    </Flex>
  )
}

const NBSP = " "

const SaleMessage: React.FC<SaleMessageProps> = props => {
  const {
    artwork: { sale, sale_message, sale_artwork, collectorSignals },
    showActivePartnerOfferLine,
  } = props

  if (sale?.is_auction && !sale?.is_closed) {
    const highestBid_display = sale_artwork?.highest_bid?.display
    const openingBid_display = sale_artwork?.opening_bid?.display

    return <>{highestBid_display || openingBid_display || ""}</>
  }

  if (showActivePartnerOfferLine) {
    return <>{collectorSignals?.partnerOffer?.priceWithDiscount?.display}</>
  }

  // NBSP is used to prevent un-aligned carousels
  return <>{sale_message ?? NBSP}</>
}

const BidInfo: React.FC<DetailsProps> = ({
  artwork: { collectorSignals, sale, sale_artwork },
}) => {
  const signalsAuctionEnabled = useFeatureFlag(
    "emerald_signals-auction-improvements"
  )

  const inRunningAuction = sale?.is_auction && !sale?.is_closed

  if (!inRunningAuction) {
    return null
  }

  const bidderPositionCounts = sale_artwork?.counts?.bidder_positions ?? 0
  const bidCount = collectorSignals?.auction?.bidCount ?? 0

  if (bidCount === 0 && bidderPositionCounts === 0) {
    return null
  }

  return (
    <>
      {signalsAuctionEnabled ? (
        <>
          ({bidCount} bid{bidCount === 1 ? "" : "s"})
        </>
      ) : (
        <>
          ({bidderPositionCounts} bid{bidderPositionCounts === 1 ? "" : "s"})
        </>
      )}
    </>
  )
}

const ActivePartnerOfferTimer: React.FC<DetailsProps> = ({
  artwork: { collectorSignals },
}) => {
  const SEPARATOR = <>&nbsp;</>
  const { endAt } = collectorSignals?.partnerOffer ?? {}
  const { time } = useTimer(endAt ?? "")
  const { days, hours } = time

  return (
    <Text variant="xs" color="blue100" px={0.5} alignSelf="flex-start">
      Exp.{SEPARATOR}
      {Number(days)}d{SEPARATOR}
      {Number(hours)}h{SEPARATOR}
    </Text>
  )
}

export const Details: React.FC<DetailsProps> = ({
  contextModule,
  hideArtistName,
  hidePartnerName,
  hideSaleInfo,
  isHovered,
  showHighDemandIcon = false,
  showHoverDetails = true,
  showSaveButton,
  showSubmissionStatus,
  renderSaveButton,
  ...rest
}) => {
  const {
    isAuctionArtwork,
    hideLotLabel,
    saveOnlyToDefaultList,
  } = useArtworkGridContext()

  const isP1Artist = rest?.artwork.artist?.targetSupply?.isP1
  const isHighDemand =
    Number((rest?.artwork.marketPriceInsights?.demandRank || 0) * 10) >= 9
  const isConsignmentSubmission = !!rest?.artwork.consignmentSubmission
    ?.internalID

  const showHighDemandInfo =
    !!isP1Artist &&
    isHighDemand &&
    showHighDemandIcon &&
    !isConsignmentSubmission

  const signalsPartnerOffersEnabled = useFeatureFlag(
    "emerald_signals-partner-offers"
  )

  const signalsAuctionEnabled = useFeatureFlag(
    "emerald_signals-auction-improvements"
  )

  const partnerOffer = rest?.artwork?.collectorSignals?.partnerOffer
  const isAuction = rest?.artwork?.sale?.is_auction ?? false

  const showActivePartnerOfferLine: boolean =
    !!signalsPartnerOffersEnabled &&
    !isAuction &&
    !!partnerOffer &&
    contextModule !== "activity"

  const padForActivePartnerOfferLine: boolean =
    !showActivePartnerOfferLine && contextModule !== "activity"

  // FIXME: Extract into a real component
  const renderSaveButtonComponent = () => {
    if (!contextModule) return null

    if (!showSaveButton) {
      return null
    }

    if (isFunction(renderSaveButton)) {
      return renderSaveButton(rest.artwork.internalID)
    }

    if (!saveOnlyToDefaultList) {
      return (
        <SaveArtworkToListsButtonFragmentContainer
          contextModule={contextModule}
          artwork={rest.artwork}
        />
      )
    }

    return (
      <SaveButtonFragmentContainer
        contextModule={contextModule}
        artwork={rest.artwork}
      />
    )
  }

  return (
    <Box>
      {isAuctionArtwork && (
        <Flex flexDirection="row">
          <Join separator={<Spacer x={1} />}>
            {!hideLotLabel && (
              <Text variant="xs" flexShrink={0}>
                LOT {rest.artwork?.sale_artwork?.lotLabel}
              </Text>
            )}

            {rest?.artwork?.sale?.cascadingEndTimeIntervalMinutes &&
              rest?.artwork?.sale_artwork &&
              !signalsAuctionEnabled && (
                <>
                  <LotCloseInfo
                    saleArtwork={rest.artwork.sale_artwork}
                    sale={rest.artwork.sale}
                  />
                </>
              )}
          </Join>
        </Flex>
      )}

      <Flex justifyContent="space-between">
        <Flex flexDirection="column" maxWidth="85%" alignItems="flex-start">
          {showActivePartnerOfferLine && <CollectorSignalLine {...rest} />}
          {!hideArtistName && (
            <ArtistLine showSaveButton={showSaveButton} {...rest} />
          )}
        </Flex>
        {renderSaveButtonComponent()}
      </Flex>

      <Box position="relative">
        <TitleLine {...rest} />

        {showHighDemandInfo && <HighDemandInfo />}

        {!hidePartnerName && !isAuctionArtwork && <PartnerLine {...rest} />}

        {isHovered && showHoverDetails && (
          <HoverDetailsFragmentContainer artwork={rest.artwork} />
        )}
      </Box>

      {showSubmissionStatus && (
        <ConsignmentSubmissionStatusFragmentContainer artwork={rest.artwork} />
      )}

      {!hideSaleInfo && (
        <SaleInfoLine
          showActivePartnerOfferLine={showActivePartnerOfferLine}
          {...rest}
        />
      )}

      <BidTimerLine {...rest} />

      {padForActivePartnerOfferLine && <EmptyLine />}
    </Box>
  )
}

// TODO: Delete LotCloseInfo when signalsAuctionEnabled is removed
interface LotCloseInfoProps {
  saleArtwork: NonNullable<Details_artwork$data["sale_artwork"]>
  sale: NonNullable<Details_artwork$data["sale"]>
}

export const LotCloseInfo: React.FC<LotCloseInfoProps> = ({
  saleArtwork,
  sale,
}) => {
  const { endAt, extendedBiddingEndAt, lotID } = saleArtwork
  const biddingEndAt = extendedBiddingEndAt ?? endAt

  const [updatedBiddingEndAt, setUpdatedBiddingEndAt] = useState(biddingEndAt)
  const [isExtended, setIsExtended] = useState(!!extendedBiddingEndAt)

  useAuctionWebsocket({
    lotID: lotID ?? "",
    onChange: ({ extended_bidding_end_at }) => {
      setUpdatedBiddingEndAt(extended_bidding_end_at)
      setIsExtended(true)
    },
  })

  const { hasEnded: lotHasClosed, time } = useTimer(
    updatedBiddingEndAt ?? "",
    sale.startAt ?? ""
  )

  const { hasEnded: lotsAreClosing, hasStarted: saleHasStarted } = useTimer(
    sale.endAt ?? "",
    sale.startAt ?? ""
  )

  if (!saleHasStarted) {
    return null
  }

  const timerCopy = getSaleOrLotTimerInfo(time, {
    hasStarted: saleHasStarted,
    extendedBiddingEndAt: isExtended
      ? updatedBiddingEndAt
      : extendedBiddingEndAt,
    urgencyIntervalMinutes: sale.cascadingEndTimeIntervalMinutes,
  })

  let lotCloseCopy
  let labelColor = "black60"

  // FIXME: Yikes...
  // Lot has already closed
  if (lotHasClosed) {
    lotCloseCopy = "Closed"
  } else if (saleHasStarted) {
    // Sale has started and lots are <24 hours from closing or are actively closing
    if (parseInt(time.days) < 1 || lotsAreClosing) {
      lotCloseCopy = isExtended
        ? // show Extended: timer if bidding has been extended
          timerCopy.copy
        : `Closes ${timerCopy.copy}`
      if (timerCopy.color === "red100") {
        labelColor = "red100"
      } else {
        labelColor = "black100"
      }
    }
    // Sale has started but lots have not started closing
    else {
      lotCloseCopy = saleArtwork.formattedEndDateTime
    }
  }

  return (
    <Text variant="xs" color={labelColor} overflowEllipsis>
      {lotCloseCopy}
    </Text>
  )
}

export const DetailsFragmentContainer = createFragmentContainer(Details, {
  artwork: graphql`
    fragment Details_artwork on Artwork
      @argumentDefinitions(
        includeConsignmentSubmission: { type: "Boolean", defaultValue: false }
      ) {
      internalID
      href
      title
      date
      collectorSignals {
        auction {
          bidCount
          lotClosesAt
          liveBiddingStarted
          registrationEndsAt
          onlineBiddingExtended
        }
        partnerOffer {
          endAt
          priceWithDiscount {
            display
          }
        }
      }
      sale_message: saleMessage
      cultural_maker: culturalMaker
      artist(shallow: true) {
        targetSupply {
          isP1
        }
      }
      marketPriceInsights {
        demandRank
      }
      artists(shallow: true) {
        id
        href
        name
      }
      collecting_institution: collectingInstitution
      partner(shallow: true) {
        name
        href
      }
      sale {
        endAt
        cascadingEndTimeIntervalMinutes
        extendedBiddingIntervalMinutes
        startAt
        is_auction: isAuction
        is_closed: isClosed
      }
      sale_artwork: saleArtwork {
        lotID
        lotLabel
        endAt
        extendedBiddingEndAt
        formattedEndDateTime
        counts {
          bidder_positions: bidderPositions
        }
        highest_bid: highestBid {
          display
        }
        opening_bid: openingBid {
          display
        }
      }
      consignmentSubmission @include(if: $includeConsignmentSubmission) {
        internalID
      }
      ...SaveButton_artwork
      ...SaveArtworkToListsButton_artwork
      ...HoverDetails_artwork
      ...ConsignmentSubmissionStatus_artwork
        @include(if: $includeConsignmentSubmission)
    }
  `,
})

type DetailsPlaceholderProps = Pick<
  DetailsProps,
  "hidePartnerName" | "hideArtistName" | "hideSaleInfo"
>

export const DetailsPlaceholder: React.FC<DetailsPlaceholderProps> = ({
  hideArtistName,
  hidePartnerName,
  hideSaleInfo,
}) => {
  return (
    <>
      {!hideArtistName && (
        <SkeletonText variant="sm-display">Artist Name</SkeletonText>
      )}

      <SkeletonText variant="sm-display">Artwork Title</SkeletonText>

      {!hidePartnerName && <SkeletonText variant="xs">Partner</SkeletonText>}

      {!hideSaleInfo && <SkeletonText variant="xs">Price</SkeletonText>}
    </>
  )
}
