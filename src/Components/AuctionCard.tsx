import { Image, ResponsiveBox, Spacer, Text } from "@artsy/palette"
import { AuctionCard_sale$data } from "__generated__/AuctionCard_sale.graphql"
import { DateTime } from "luxon"
import * as React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { RouterLink } from "System/Components/RouterLink"

export const relativeTime = (timeIn, now) => {
  const time = DateTime.fromISO(timeIn)
  const abs = Math.abs
  if (abs(time.diff(now).as("days")) >= 1) {
    return `${Math.floor(time.diff(now).as("days"))}d`
  } else if (abs(time.diff(now).as("hours")) >= 1) {
    return `${Math.floor(time.diff(now).as("hours"))}h`
  } else if (abs(time.diff(now).as("minutes")) >= 1) {
    return `${Math.floor(time.diff(now).as("minutes"))}m`
  }
  return `${Math.floor(time.diff(now).as("seconds") % 60)}s`
}

// now defaults to DateTime.local() but can be overriden for unit testing
export const upcomingLabel = (
  sale: AuctionCard_sale$data,
  now = DateTime.local()
) => {
  const {
    startAt,
    endAt,
    liveStartAt,
    isClosed,
    isLiveOpen,
    isPreview,
    registrationStatus,
    isRegistrationClosed,
  } = sale

  const isRegistered = !!registrationStatus
  const isLAI = !!liveStartAt
  if (isPreview) {
    return `Opens in ${relativeTime(startAt, now)}`
  } else if (isClosed) {
    return "Auction closed"
  } else if (isLAI) {
    if (isLiveOpen) {
      return "In progress"
    } else if (isRegistered || isRegistrationClosed) {
      return `Live in ${relativeTime(liveStartAt, now)}`
    } else {
      const dateTime = DateTime.fromISO(liveStartAt ?? "").setZone(
        "America/New_York"
      )
      return `Register by ${dateTime.monthShort} ${dateTime.day}`
    }
  } else {
    return `Ends in ${relativeTime(endAt, now)}`
  }
}

export interface AuctionCardProps {
  sale: AuctionCard_sale$data
}

export const AuctionCard: React.FC<AuctionCardProps> = ({ sale }) => {
  if (!sale) return null

  const statusLabel = upcomingLabel(sale)
  const image = sale.coverImage?.cropped

  return (
    <RouterLink
      to={sale.href ?? ""}
      style={{ display: "block", textDecoration: "none" }}
    >
      <ResponsiveBox
        aspectWidth={4}
        aspectHeight={3}
        maxWidth="100%"
        bg="black10"
      >
        {image && (
          <Image
            src={image.src}
            srcSet={image.srcSet}
            width="100%"
            height="100%"
            alt=""
            lazyLoad
          />
        )}
      </ResponsiveBox>

      <Spacer y={2} />

      {!sale.isGalleryAuction && !sale.isBenefit && (
        <>
          <Text variant="xs" overflowEllipsis>
            {sale.name}
          </Text>

          <Spacer y={1} />
        </>
      )}

      {sale.partner?.name && (
        <>
          <Text variant="lg-display" overflowEllipsis>
            {sale.partner?.name}
          </Text>
        </>
      )}

      <Text variant="lg-display" color="black60" overflowEllipsis>
        {statusLabel}
      </Text>
    </RouterLink>
  )
}

export const AuctionCardFragmentContainer = createFragmentContainer(
  AuctionCard,
  {
    sale: graphql`
      fragment AuctionCard_sale on Sale {
        coverImage {
          cropped(width: 445, height: 334) {
            src
            srcSet
          }
        }
        isBenefit
        isGalleryAuction
        endAt
        href
        slug
        isLiveOpen
        isPreview
        liveStartAt
        registrationStatus {
          internalID
        }
        isRegistrationClosed
        name
        startAt
        isClosed
        partner {
          name
        }
      }
    `,
  }
)
