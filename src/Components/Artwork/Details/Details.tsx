import { AuthContextModule } from "@artsy/cohesion"
import { Box, Flex, Join, SkeletonText, Spacer, Text } from "@artsy/palette"
import { themeGet } from "@styled-system/theme-get"
import { SaveArtworkToListsButtonQueryRenderer } from "Components/Artwork/SaveButton/SaveArtworkToListsButton"
import { useArtworkGridContext } from "Components/ArtworkGrid/ArtworkGridContext"
import { isFunction } from "lodash"
import * as React from "react"
import { graphql, useFragment } from "react-relay"
import styled from "styled-components"
import { RouterLink, RouterLinkProps } from "System/Components/RouterLink"
import { useTimer } from "Utils/Hooks/useTimer"
import {
  Details_artwork$data,
  Details_artwork$key,
} from "__generated__/Details_artwork.graphql"
import { HoverDetailsFragmentContainer } from "Components/Artwork/HoverDetails"
import { SaveButtonQueryRenderer } from "Components/Artwork/SaveButton/SaveButton"
import { useFeatureFlag } from "System/Hooks/useFeatureFlag"
import { ConsignmentSubmissionStatusFragmentContainer } from "Components/Artwork/ConsignmentSubmissionStatus"
import HighDemandIcon from "@artsy/icons/HighDemandIcon"
import { getSaleOrLotTimerInfo } from "Utils/getSaleOrLotTimerInfo"
import { useAuctionWebsocket } from "Utils/Hooks/useAuctionWebsocket"
import { useState } from "react"
import { BidTimerLine } from "./BidTimerLine"
import { PrimaryLabelLine } from "Components/Artwork/Details/PrimaryLabelLine"

export interface DetailsProps {
  artwork: Details_artwork$key
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

interface SaleInfoLineProps extends Omit<DetailsProps, "artwork"> {
  showActivePartnerOffer: boolean
  artwork: Details_artwork$data
}

interface SaleMessageProps extends Omit<DetailsProps, "artwork"> {
  showActivePartnerOffer: boolean
  artwork: Details_artwork$data
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

interface ArtistLineProps {
  includeLinks: boolean
  showSaveButton: boolean
  artwork: Details_artwork$data
}
const ArtistLine: React.FC<ArtistLineProps> = ({
  artwork: { culturalMaker, artists },
  includeLinks,
  showSaveButton,
}) => {
  if (culturalMaker) {
    return (
      <Text variant="sm-display" lineHeight="22px" overflowEllipsis>
        {culturalMaker}
      </Text>
    )
  }

  if (!artists?.length) {
    if (showSaveButton) {
      return (
        <Text variant="sm-display" lineHeight="22px" overflowEllipsis>
          Artist Unavailable
        </Text>
      )
    }

    return null
  }

  return (
    <Text variant="sm-display" lineHeight="22px" overflowEllipsis>
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

const TitleLine: React.FC<
  Omit<DetailsProps, "artwork"> & { artwork: Details_artwork$data }
> = ({ includeLinks, artwork: { title, date, href } }) => {
  return (
    <ConditionalLink includeLinks={includeLinks} to={href}>
      <Text
        variant="sm-display"
        lineHeight="22px"
        color="black60"
        overflowEllipsis
      >
        <i>{title}</i>
        {date && `, ${date}`}
      </Text>
    </ConditionalLink>
  )
}

const PartnerLine: React.FC<
  Omit<DetailsProps, "artwork"> & { artwork: Details_artwork$data }
> = ({ includeLinks, artwork: { collectingInstitution, partner } }) => {
  if (collectingInstitution) {
    return (
      <Text
        variant="sm-display"
        lineHeight="22px"
        color="black60"
        overflowEllipsis
      >
        {collectingInstitution}
      </Text>
    )
  }

  if (partner) {
    return (
      <ConditionalLink includeLinks={includeLinks} to={partner?.href}>
        <Text
          variant="sm-display"
          lineHeight="22px"
          color="black60"
          overflowEllipsis
        >
          {partner.name}
        </Text>
      </ConditionalLink>
    )
  }

  return null
}

const SaleInfoLine: React.FC<SaleInfoLineProps> = props => {
  const { showActivePartnerOffer } = props
  const { lotClosesAt } = props.artwork.collectorSignals?.auction ?? {}
  const { liveBiddingStarted } = props.artwork.collectorSignals?.auction ?? {}

  if (lotClosesAt && new Date(lotClosesAt) <= new Date()) {
    return (
      <Text
        variant="sm-display"
        lineHeight="22px"
        color="black100"
        fontWeight="bold"
      >
        Bidding closed
      </Text>
    )
  }

  if (liveBiddingStarted) {
    return (
      <Text variant="sm-display" lineHeight="22px" color="blue100">
        Bidding live now
      </Text>
    )
  }

  return (
    <Flex flexDirection="row" alignItems="center">
      <Text
        variant="sm-display"
        lineHeight="22px"
        color="black100"
        fontWeight="bold"
        overflowEllipsis
      >
        <SaleMessage {...props} /> <BidInfo {...props} />
      </Text>
      {showActivePartnerOffer && <ActivePartnerOfferTimer {...props} />}
    </Flex>
  )
}

export const EmptyLine: React.FC = () => {
  return (
    <Text variant="xs" lineHeight="22px">
      &nbsp;
    </Text>
  )
}

const HighDemandInfo = () => {
  return (
    <Flex flexDirection="row" alignItems="center">
      <HighDemandIcon fill="blue100" />
      <Text variant="sm-display" lineHeight="22px" color="blue100" ml={0.3}>
        &nbsp;High Demand
      </Text>
    </Flex>
  )
}

const NBSP = " "

const SaleMessage: React.FC<SaleMessageProps> = props => {
  const {
    artwork: { sale, saleMessage, saleArtwork, collectorSignals },
    showActivePartnerOffer,
  } = props

  if (sale?.isAuction && !sale?.isClosed) {
    const highestBid_display = saleArtwork?.highestBid?.display
    const openingBid_display = saleArtwork?.openingBid?.display

    return <>{highestBid_display || openingBid_display || ""}</>
  }

  if (showActivePartnerOffer) {
    return <>{collectorSignals?.partnerOffer?.priceWithDiscount?.display}</>
  }

  // NBSP is used to prevent un-aligned carousels
  return <>{saleMessage ?? NBSP}</>
}

const BidInfo: React.FC<
  Omit<DetailsProps, "artwork"> & { artwork: Details_artwork$data }
> = ({ artwork: { collectorSignals, sale, saleArtwork } }) => {
  const signalsAuctionEnabled = useFeatureFlag(
    "emerald_signals-auction-improvements"
  )

  const inRunningAuction = sale?.isAuction && !sale?.isClosed

  if (!inRunningAuction) {
    return null
  }

  const bidCount = signalsAuctionEnabled
    ? collectorSignals?.auction?.bidCount ?? 0
    : saleArtwork?.counts?.bidderPositions ?? 0

  if (bidCount === 0) {
    return null
  }

  return (
    <>
      ({bidCount} bid{bidCount === 1 ? "" : "s"})
    </>
  )
}

const ActivePartnerOfferTimer: React.FC<
  Omit<DetailsProps, "artwork"> & { artwork: Details_artwork$data }
> = ({ artwork: { collectorSignals } }) => {
  const SEPARATOR = <>&nbsp;</>
  const { endAt } = collectorSignals?.partnerOffer ?? {}
  const { time } = useTimer(endAt ?? "")
  const { days, hours } = time

  return (
    <Text
      variant="sm-display"
      lineHeight="22px"
      color="blue100"
      px={0.5}
      alignSelf="flex-start"
    >
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
  showSaveButton = false,
  showSubmissionStatus,
  renderSaveButton,
  artwork: artworkFragment,
  ...rest
}) => {
  const {
    isAuctionArtwork,
    hideLotLabel,
    saveOnlyToDefaultList,
    collectorSignalsConfig,
  } = useArtworkGridContext()
  const artworkData = useFragment(ARTWORK_FRAGMENT, artworkFragment)

  const increasedInterestCuratorsPickEnabled = useFeatureFlag(
    "emerald_signals-increased-interest-curators-pick"
  )

  if (!increasedInterestCuratorsPickEnabled) {
    collectorSignalsConfig.disableCuratorsPick = true
    collectorSignalsConfig.disableTrendingNow = true
  }

  const isP1Artist = artworkData.artist?.targetSupply?.isP1
  const isHighDemand =
    Number((artworkData.marketPriceInsights?.demandRank || 0) * 10) >= 9
  const isConsignmentSubmission = !!artworkData.consignmentSubmission
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

  const partnerOffer = artworkData.collectorSignals?.partnerOffer
  const isAuction = artworkData.sale?.isAuction ?? false

  // TODO: skip primaryLable in query if it is in auction
  const primaryLabel =
    (!isAuction && artworkData.collectorSignals?.primaryLabel) || null

  const showActivePartnerOffer: boolean =
    !!signalsPartnerOffersEnabled &&
    !isAuction &&
    !!partnerOffer &&
    contextModule !== "activity"

  const padForPrimaryLabelLine: boolean =
    contextModule !== "activity" && !primaryLabel

  // FIXME: Extract into a real component
  const renderSaveButtonComponent = () => {
    if (!contextModule) return null

    if (!showSaveButton) {
      return null
    }

    if (isFunction(renderSaveButton)) {
      return renderSaveButton(artworkData.internalID)
    }

    if (!saveOnlyToDefaultList) {
      return (
        <SaveArtworkToListsButtonQueryRenderer
          contextModule={contextModule}
          id={artworkData.internalID}
        />
      )
    }

    return (
      <SaveButtonQueryRenderer
        contextModule={contextModule}
        id={artworkData.internalID}
      />
    )
  }

  return (
    <Box>
      {isAuctionArtwork && (
        <Flex flexDirection="row">
          <Join separator={<Spacer x={1} />}>
            {!hideLotLabel && (
              <Text variant="sm-display" lineHeight="22px" flexShrink={0}>
                LOT {artworkData?.saleArtwork?.lotLabel}
              </Text>
            )}

            {artworkData.sale?.cascadingEndTimeIntervalMinutes &&
              artworkData.saleArtwork &&
              !signalsAuctionEnabled && (
                <>
                  <LotCloseInfo
                    saleArtwork={artworkData.saleArtwork}
                    sale={artworkData.sale}
                  />
                </>
              )}
          </Join>
        </Flex>
      )}

      <Flex justifyContent="space-between" alignItems="flex-start">
        <Flex
          flexDirection="column"
          maxWidth={primaryLabel ? "95%" : "75%"}
          overflow="hidden"
        >
          {primaryLabel && <PrimaryLabelLine primaryLabel={primaryLabel} />}
          {!hideArtistName && (
            <ArtistLine
              artwork={artworkData}
              showSaveButton={showSaveButton}
              {...rest}
            />
          )}
        </Flex>
        {renderSaveButtonComponent()}
      </Flex>

      <Box position="relative">
        <TitleLine artwork={artworkData} {...rest} />

        {showHighDemandInfo && <HighDemandInfo />}

        {!hidePartnerName && !isAuctionArtwork && (
          <PartnerLine artwork={artworkData} {...rest} />
        )}

        {isHovered && showHoverDetails && (
          <HoverDetailsFragmentContainer artwork={artworkData} />
        )}
      </Box>

      {showSubmissionStatus && (
        <ConsignmentSubmissionStatusFragmentContainer artwork={artworkData} />
      )}

      {!hideSaleInfo && (
        <SaleInfoLine
          artwork={artworkData}
          showActivePartnerOffer={showActivePartnerOffer}
          {...rest}
        />
      )}

      <BidTimerLine artwork={artworkData} />

      {padForPrimaryLabelLine && <EmptyLine />}
    </Box>
  )
}

// TODO: Delete LotCloseInfo when signalsAuctionEnabled is removed
interface LotCloseInfoProps {
  saleArtwork: NonNullable<Details_artwork$data["saleArtwork"]>
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
    <Text
      variant="sm-display"
      lineHeight="22px"
      color={labelColor}
      overflowEllipsis
    >
      {lotCloseCopy}
    </Text>
  )
}

const ARTWORK_FRAGMENT = graphql`
  fragment Details_artwork on Artwork
    @argumentDefinitions(
      includeConsignmentSubmission: { type: "Boolean", defaultValue: false }

      ignorePrimaryLabelSignals: {
        type: "[LabelSignalEnum]"
        defaultValue: null
      }
    ) {
    internalID
    href
    title
    date
    collectorSignals {
      primaryLabel(ignore: $ignorePrimaryLabelSignals)
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
    saleMessage
    culturalMaker
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
    collectingInstitution
    partner(shallow: true) {
      name
      href
    }
    sale {
      endAt
      cascadingEndTimeIntervalMinutes
      extendedBiddingIntervalMinutes
      startAt
      isAuction
      isClosed
    }
    saleArtwork {
      lotID
      lotLabel
      endAt
      extendedBiddingEndAt
      formattedEndDateTime
      counts {
        bidderPositions
      }
      highestBid {
        display
      }
      openingBid {
        display
      }
    }
    consignmentSubmission @include(if: $includeConsignmentSubmission) {
      internalID
    }
    ...BidTimerLine_artwork
    ...HoverDetails_artwork
    ...ConsignmentSubmissionStatus_artwork
      @include(if: $includeConsignmentSubmission)
  }
`

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
        <SkeletonText variant="sm-display" lineHeight="22px">
          Artist Name
        </SkeletonText>
      )}

      <SkeletonText variant="sm-display" lineHeight="22px">
        Artwork Title
      </SkeletonText>

      {!hidePartnerName && (
        <SkeletonText variant="sm-display" lineHeight="22px">
          Partner
        </SkeletonText>
      )}

      {!hideSaleInfo && (
        <SkeletonText variant="sm-display" lineHeight="22px">
          Price
        </SkeletonText>
      )}
    </>
  )
}
