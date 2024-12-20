import type { AuthContextModule } from "@artsy/cohesion"
import HighDemandIcon from "@artsy/icons/HighDemandIcon"
import { Box, Flex, Join, SkeletonText, Spacer, Text } from "@artsy/palette"
import { themeGet } from "@styled-system/theme-get"
import { ConsignmentSubmissionStatusFragmentContainer } from "Components/Artwork/ConsignmentSubmissionStatus"
import { PrimaryLabelLine } from "Components/Artwork/Details/PrimaryLabelLine"
import { HoverDetailsFragmentContainer } from "Components/Artwork/HoverDetails"
import { SaveArtworkToListsButtonQueryRenderer } from "Components/Artwork/SaveButton/SaveArtworkToListsButton"
import { SaveButtonQueryRenderer } from "Components/Artwork/SaveButton/SaveButton"
import { useArtworkGridContext } from "Components/ArtworkGrid/ArtworkGridContext"
import { RouterLink, type RouterLinkProps } from "System/Components/RouterLink"
import { useTimer } from "Utils/Hooks/useTimer"
import type { Details_artwork$data } from "__generated__/Details_artwork.graphql"
import { isFunction } from "lodash"
import type * as React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import styled from "styled-components"
import { BidTimerLine } from "./BidTimerLine"

export interface DetailsProps {
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
  showActivePartnerOffer: boolean
}

interface SaleMessageProps extends DetailsProps {
  showActivePartnerOffer: boolean
}

const StyledConditionalLink = styled(RouterLink)`
  color: ${themeGet("colors.black100")};
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
`

const ConditionalLink: React.FC<
  React.PropsWithChildren<{ includeLinks: boolean } & RouterLinkProps>
> = ({ includeLinks, children, ...rest }) => {
  const LinkComponent = (
    includeLinks ? StyledConditionalLink : "span"
  ) as React.FC<React.PropsWithChildren<RouterLinkProps>>
  return <LinkComponent {...rest}>{children}</LinkComponent>
}

const ArtistLine: React.FC<React.PropsWithChildren<DetailsProps>> = ({
  artwork: { cultural_maker, artists },
  includeLinks,
  showSaveButton,
}) => {
  if (cultural_maker) {
    return (
      <Text variant="sm-display" lineHeight="22px" overflowEllipsis>
        {cultural_maker}
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

const TitleLine: React.FC<React.PropsWithChildren<DetailsProps>> = ({
  includeLinks,
  artwork: { title, date, href },
}) => {
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

const PartnerLine: React.FC<React.PropsWithChildren<DetailsProps>> = ({
  includeLinks,
  artwork: { collecting_institution, partner },
}) => {
  if (collecting_institution) {
    return (
      <Text
        variant="sm-display"
        lineHeight="22px"
        color="black60"
        overflowEllipsis
      >
        {collecting_institution}
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

const SaleInfoLine: React.FC<
  React.PropsWithChildren<SaleInfoLineProps>
> = props => {
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

export const EmptyLine: React.FC<React.PropsWithChildren<unknown>> = () => {
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

const SaleMessage: React.FC<
  React.PropsWithChildren<SaleMessageProps>
> = props => {
  const {
    artwork: { sale, sale_message, sale_artwork, collectorSignals },
    showActivePartnerOffer,
  } = props

  if (sale?.is_auction && !sale?.is_closed) {
    const highestBid_display = sale_artwork?.highest_bid?.display
    const openingBid_display = sale_artwork?.opening_bid?.display

    return <>{highestBid_display || openingBid_display || ""}</>
  }

  if (showActivePartnerOffer) {
    return <>{collectorSignals?.partnerOffer?.priceWithDiscount?.display}</>
  }

  // NBSP is used to prevent un-aligned carousels
  return <>{sale_message ?? NBSP}</>
}

const BidInfo: React.FC<React.PropsWithChildren<DetailsProps>> = ({
  artwork: { collectorSignals, sale, sale_artwork },
}) => {
  const inRunningAuction = sale?.is_auction && !sale?.is_closed

  if (!inRunningAuction) {
    return null
  }

  const bidCount = collectorSignals?.auction?.bidCount ?? 0

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
  React.PropsWithChildren<DetailsProps>
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

export const Details: React.FC<React.PropsWithChildren<DetailsProps>> = ({
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
  const { isAuctionArtwork, hideLotLabel, saveOnlyToDefaultList } =
    useArtworkGridContext()

  const isP1Artist = rest?.artwork.artist?.targetSupply?.isP1
  const isHighDemand =
    Number((rest?.artwork.marketPriceInsights?.demandRank || 0) * 10) >= 9
  const isConsignmentSubmission =
    !!rest?.artwork.consignmentSubmission?.internalID

  const showHighDemandInfo =
    !!isP1Artist &&
    isHighDemand &&
    showHighDemandIcon &&
    !isConsignmentSubmission

  const partnerOffer = rest?.artwork?.collectorSignals?.partnerOffer
  const isAuction = rest?.artwork?.sale?.is_auction ?? false

  const showActivePartnerOffer: boolean =
    !isAuction && !!partnerOffer && contextModule !== "activity"

  const showPrimaryLabelLine: boolean =
    !!rest?.artwork?.collectorSignals?.primaryLabel && !isAuction

  const padForPrimaryLabelLine: boolean =
    contextModule !== "activity" && !showPrimaryLabelLine

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
        <SaveArtworkToListsButtonQueryRenderer
          contextModule={contextModule}
          id={rest.artwork.internalID}
        />
      )
    }

    return (
      <SaveButtonQueryRenderer
        contextModule={contextModule}
        id={rest.artwork.internalID}
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
                LOT {rest.artwork?.sale_artwork?.lotLabel}
              </Text>
            )}
          </Join>
        </Flex>
      )}

      <Flex justifyContent="space-between" alignItems="flex-start">
        <Flex
          flexDirection="column"
          maxWidth={showPrimaryLabelLine ? "95%" : "75%"}
          overflow="hidden"
        >
          {showPrimaryLabelLine && <PrimaryLabelLine artwork={rest.artwork} />}
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
          showActivePartnerOffer={showActivePartnerOffer}
          {...rest}
        />
      )}

      <BidTimerLine artwork={rest.artwork} />

      {padForPrimaryLabelLine && <EmptyLine />}
    </Box>
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
        primaryLabel
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
      ...PrimaryLabelLine_artwork
      ...BidTimerLine_artwork
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

export const DetailsPlaceholder: React.FC<
  React.PropsWithChildren<DetailsPlaceholderProps>
> = ({ hideArtistName, hidePartnerName, hideSaleInfo }) => {
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
