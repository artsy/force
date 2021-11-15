import {
  Link,
  Text,
  LinkProps,
  useThemeConfig,
  TextVariant,
} from "@artsy/palette"
import { Details_artwork } from "v2/__generated__/Details_artwork.graphql"
import * as React from "react"
import { createFragmentContainer, graphql } from "react-relay"

interface DetailsProps {
  artwork: Details_artwork
  includeLinks: boolean
  hideSaleInfo?: boolean
  hideArtistName?: boolean
  hidePartnerName?: boolean
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
}) => {
  const tokens = useThemeConfig({
    v2: {
      variant: "mediumText" as TextVariant,
    },
    v3: {
      variant: "md" as TextVariant,
    },
  })

  if (cultural_maker) {
    return (
      <Text variant={tokens.variant} overflowEllipsis>
        {cultural_maker}
      </Text>
    )
  }

  if (artists && artists.length) {
    return (
      <Text variant={tokens.variant} overflowEllipsis>
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

  return null
}

const TitleLine: React.FC<DetailsProps> = ({
  includeLinks,
  artwork: { title, date, href },
}) => {
  const tokens = useThemeConfig({
    v2: {
      variant: "text" as TextVariant,
    },
    v3: {
      variant: "md" as TextVariant,
    },
  })

  return (
    // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
    <ConditionalLink includeLinks={includeLinks} href={href}>
      <Text variant={tokens.variant} color="black60" overflowEllipsis>
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
  const tokens = useThemeConfig({
    v2: {
      variant: "text" as TextVariant,
    },
    v3: {
      variant: "xs" as TextVariant,
    },
  })

  if (collecting_institution) {
    return (
      <Text variant={tokens.variant} color="black60" overflowEllipsis>
        {collecting_institution}
      </Text>
    )
  }

  if (partner) {
    return (
      //  @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
      <ConditionalLink includeLinks={includeLinks} href={partner.href}>
        <Text variant={tokens.variant} color="black60" overflowEllipsis>
          {partner.name}
        </Text>
      </ConditionalLink>
    )
  }

  return null
}

const SaleInfoLine: React.FC<DetailsProps> = props => {
  const tokens = useThemeConfig({
    v2: {
      variant: "text" as TextVariant,
      color: "black60",
      fontWeight: "normal",
    },
    v3: {
      variant: "xs" as TextVariant,
      color: "black100",
      fontWeight: "bold",
    },
  })

  return (
    <Text
      variant={tokens.variant}
      color={tokens.color}
      fontWeight={tokens.fontWeight}
      overflowEllipsis
    >
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
    const highest_bid_display = sale_artwork?.highest_bid?.display
    const opening_bid_display = sale_artwork?.opening_bid?.display

    return <>{highest_bid_display || opening_bid_display || ""}</>
  }

  if (sale_message === "Contact For Price") {
    return <>Contact for Price</>
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

  // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
  const bidderPositionCounts = sale_artwork?.counts.bidder_positions ?? 0

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
  hideArtistName,
  hidePartnerName,
  hideSaleInfo,
  ...rest
}) => {
  return (
    <>
      {!hideArtistName && <ArtistLine {...rest} />}
      <TitleLine {...rest} />
      {!hidePartnerName && <PartnerLine {...rest} />}
      {!hideSaleInfo && <SaleInfoLine {...rest} />}
    </>
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
        is_auction: isAuction
        is_closed: isClosed
      }
      sale_artwork: saleArtwork {
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
    }
  `,
})
