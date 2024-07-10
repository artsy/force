import { AuthContextModule } from "@artsy/cohesion"
import { Box, Flex, Join, SkeletonText, Spacer, Text } from "@artsy/palette"
import { themeGet } from "@styled-system/theme-get"
import { HighDemandIcon } from "Apps/MyCollection/Routes/MyCollectionArtwork/Components/MyCollectionArtworkDemandIndex/HighDemandIcon"
import { SaveArtworkToListsButtonFragmentContainer } from "Components/Artwork/SaveButton/SaveArtworkToListsButton"
import { useArtworkGridContext } from "Components/ArtworkGrid/ArtworkGridContext"
import { useAuctionWebsocket } from "Utils/Hooks/useAuctionWebsocket"
import { isFunction } from "lodash"
import * as React from "react"
import { useState } from "react"
import { createFragmentContainer, graphql } from "react-relay"
import styled from "styled-components"
import { RouterLink, RouterLinkProps } from "System/Components/RouterLink"
import { getSaleOrLotTimerInfo } from "Utils/getSaleOrLotTimerInfo"
import { useTimer } from "Utils/Hooks/useTimer"
import { Details_artwork$data } from "__generated__/Details_artwork.graphql"
import { HoverDetailsFragmentContainer } from "./HoverDetails"
import { SaveButtonFragmentContainer } from "./SaveButton"

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
  renderSaveButton?: (artworkId: string) => React.ReactNode
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
      <ConditionalLink includeLinks={includeLinks} to={partner?.href}>
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

const HighDemandInfo = () => {
  return (
    <Flex flexDirection="row" alignItems="center">
      <HighDemandIcon width={16} height={16} />
      <Text variant="xs" color="blue100" ml={0.3}>
        &nbsp;High Demand
      </Text>
    </Flex>
  )
}

const NBSP = " "

const SaleMessage: React.FC<DetailsProps> = ({
  artwork: { sale, sale_message, sale_artwork },
}) => {
  if (sale?.is_auction && !sale?.is_closed) {
    const highestBid_display = sale_artwork?.highest_bid?.display
    const openingBid_display = sale_artwork?.opening_bid?.display

    return <>{highestBid_display || openingBid_display || ""}</>
  }

  // NBSP is used to prevent un-aligned carousels
  return <>{sale_message ?? NBSP}</>
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
  showHighDemandIcon = false,
  showHoverDetails = true,
  showSaveButton,
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

  const showHighDemandInfo = !!isP1Artist && isHighDemand && showHighDemandIcon

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
        {renderSaveButtonComponent()}
      </Flex>

      <Box position="relative">
        <TitleLine {...rest} />
        {showHighDemandInfo && <HighDemandInfo />}
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
    fragment Details_artwork on Artwork {
      internalID
      href
      title
      date
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
      ...SaveButton_artwork
      ...SaveArtworkToListsButton_artwork
      ...HoverDetails_artwork
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
