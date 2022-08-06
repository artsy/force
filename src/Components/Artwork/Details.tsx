import { Link, Text, LinkProps, Flex, Spacer, Box, Join } from "@artsy/palette"
import { Details_artwork } from "__generated__/Details_artwork.graphql"
import * as React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { useArtworkGridContext } from "../ArtworkGrid/ArtworkGridContext"
import { useTimer } from "Utils/Hooks/useTimer"
import { HoverDetailsFragmentContainer } from "./HoverDetails"

import { AuthContextModule } from "@artsy/cohesion"
import { NewSaveButtonFragmentContainer } from "./SaveButton"
import { getSaleOrLotTimerInfo } from "Utils/getSaleOrLotTimerInfo"
import { useState } from "react"
import { useAuctionWebsocket } from "Components/useAuctionWebsocket"

interface DetailsProps {
  artwork: Details_artwork
  contextModule?: AuthContextModule
  includeLinks: boolean
  hideSaleInfo?: boolean
  hideArtistName?: boolean
  hidePartnerName?: boolean
  isHovered?: boolean
  showHoverDetails?: boolean
  showSaveButton?: boolean
}

const ConditionalLink: React.FC<
  Pick<DetailsProps, "includeLinks"> &
    LinkProps &
    React.AnchorHTMLAttributes<HTMLAnchorElement>
> = ({ includeLinks, children, ...rest }) => {
  return includeLinks ? <Link {...rest}>{children}</Link> : <>{children}</>
}

const ArtistLine: React.FC<DetailsProps> = ({
  artwork: { cultural_maker, artists },
  includeLinks,
  showSaveButton,
}) => {
  if (cultural_maker) {
    return (
      <Text variant="sm-display" overflowEllipsis>
        {cultural_maker}
      </Text>
    )
  }

  if (!artists?.length) {
    if (showSaveButton) {
      return (
        <Text variant="sm-display" overflowEllipsis>
          Artist Unavailable
        </Text>
      )
    }

    return null
  }

  return (
    <Text variant="sm-display" overflowEllipsis>
      {artists.map((artist, i) => {
        if (!artist || !artist.href || !artist.name) return null

        return (
          <ConditionalLink
            includeLinks={includeLinks}
            href={artist.href}
            key={i}
          >
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
    <ConditionalLink includeLinks={includeLinks} href={href!}>
      <Text variant="sm-display" color="black60" overflowEllipsis>
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
      <ConditionalLink includeLinks={includeLinks} href={partner?.href!}>
        <Text variant="xs" color="black60" overflowEllipsis>
          {partner.name}
        </Text>
      </ConditionalLink>
    )
  }

  return null
}

const SaleInfoLine: React.FC<DetailsProps> = props => {
  return (
    <Text variant="xs" color="black100" fontWeight="bold" overflowEllipsis>
      <SaleMessage {...props} /> <BidInfo {...props} />
    </Text>
  )
}

const SaleMessage: React.FC<DetailsProps> = ({
  artwork: { sale, sale_message, sale_artwork },
}) => {
  if (sale?.is_auction && sale?.is_closed) {
    return <>Bidding closed</>
  }

  if (sale?.is_auction) {
    const highestBid_display = sale_artwork?.highest_bid?.display
    const openingBid_display = sale_artwork?.opening_bid?.display

    return <>{highestBid_display || openingBid_display || ""}</>
  }

  if (sale_message === "Contact For Price") {
    return <>Price on request</>
  }

  return <>{sale_message}</>
}

const BidInfo: React.FC<DetailsProps> = ({
  artwork: { sale, sale_artwork },
}) => {
  const inRunningAuction = sale?.is_auction && !sale?.is_closed

  if (!inRunningAuction) {
    return null
  }

  const bidderPositionCounts = sale_artwork?.counts?.bidder_positions ?? 0

  if (bidderPositionCounts === 0) {
    return null
  }

  return (
    <>
      ({bidderPositionCounts} bid{bidderPositionCounts === 1 ? "" : "s"})
    </>
  )
}

export const Details: React.FC<DetailsProps> = ({
  contextModule,
  hideArtistName,
  hidePartnerName,
  hideSaleInfo,
  isHovered,
  showHoverDetails = true,
  showSaveButton,
  ...rest
}) => {
  const { isAuctionArtwork, hideLotLabel } = useArtworkGridContext()

  return (
    <Box>
      {isAuctionArtwork && (
        <Flex flexDirection="row">
          <Join separator={<Spacer mx={0.5} />}>
            {!hideLotLabel && (
              <Text variant="xs">
                Lot {rest.artwork?.sale_artwork?.lotLabel}
              </Text>
            )}

            {rest?.artwork?.sale?.cascadingEndTimeIntervalMinutes &&
              rest?.artwork?.sale_artwork && (
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
      <Flex flexDirection="row" justifyContent="space-between">
        {!hideArtistName && (
          <ArtistLine showSaveButton={showSaveButton} {...rest} />
        )}
        {showSaveButton && (
          <NewSaveButtonFragmentContainer
            contextModule={contextModule!}
            artwork={rest.artwork}
          />
        )}
      </Flex>
      <Box position="relative">
        <TitleLine {...rest} />
        {!hidePartnerName && <PartnerLine {...rest} />}
        {isHovered && showHoverDetails && (
          <HoverDetailsFragmentContainer artwork={rest.artwork} />
        )}
      </Box>
      {!hideSaleInfo && <SaleInfoLine {...rest} />}
    </Box>
  )
}

interface LotCloseInfoProps {
  saleArtwork: NonNullable<Details_artwork["sale_artwork"]>
  sale: NonNullable<Details_artwork["sale"]>
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
    lotID: lotID!,
    onChange: ({ extended_bidding_end_at }) => {
      setUpdatedBiddingEndAt(extended_bidding_end_at)
      setIsExtended(true)
    },
  })

  const { hasEnded: lotHasClosed, time } = useTimer(
    updatedBiddingEndAt!,
    sale.startAt!
  )

  const { hasEnded: lotsAreClosing, hasStarted: saleHasStarted } = useTimer(
    sale.endAt!,
    sale.startAt!
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
    <Text variant="xs" color={labelColor}>
      {lotCloseCopy}
    </Text>
  )
}

export const DetailsFragmentContainer = createFragmentContainer(Details, {
  artwork: graphql`
    fragment Details_artwork on Artwork {
      href
      title
      date
      sale_message: saleMessage
      cultural_maker: culturalMaker
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
      ...NewSaveButton_artwork
      ...HoverDetails_artwork
    }
  `,
})
