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
import { useArtworkGridContext } from "../ArtworkGrid/ArtworkGridContext"

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
  artwork: { culturalMaker, artists },
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

  if (culturalMaker) {
    return (
      <Text variant={tokens.variant} overflowEllipsis>
        {culturalMaker}
      </Text>
    )
  }

  if (!artists?.length) {
    return null
  }

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
    <ConditionalLink includeLinks={includeLinks} href={href!}>
      <Text variant={tokens.variant} color="black60" overflowEllipsis>
        <i>{title}</i>
        {date && `, ${date}`}
      </Text>
    </ConditionalLink>
  )
}

const PartnerLine: React.FC<DetailsProps> = ({
  includeLinks,
  artwork: { collectingInstitution, partner },
}) => {
  const tokens = useThemeConfig({
    v2: {
      variant: "text" as TextVariant,
    },
    v3: {
      variant: "xs" as TextVariant,
    },
  })

  if (collectingInstitution) {
    return (
      <Text variant={tokens.variant} color="black60" overflowEllipsis>
        {collectingInstitution}
      </Text>
    )
  }

  if (partner) {
    return (
      <ConditionalLink includeLinks={includeLinks} href={partner?.href!}>
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
  artwork: { sale, saleMessage, saleArtwork },
}) => {
  if (sale?.isAuction && sale?.isClosed) {
    return <>Bidding closed</>
  }

  if (sale?.isAuction) {
    const highestBid_display = saleArtwork?.highestBid?.display
    const openingBid_display = saleArtwork?.openingBid?.display

    return <>{highestBid_display || openingBid_display || ""}</>
  }

  if (saleMessage === "Contact For Price") {
    return <>Price on Request</>
  }

  return <>{saleMessage}</>
}

const BidInfo: React.FC<DetailsProps> = ({
  artwork: { sale, saleArtwork },
}) => {
  const inRunningAuction = sale?.isAuction && !sale?.isClosed

  if (!inRunningAuction) {
    return null
  }

  const bidderPositionCounts = saleArtwork?.counts?.bidderPositions ?? 0

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
  const { artworkGridContext } = useArtworkGridContext()

  return (
    <>
      {artworkGridContext?.isAuctionArtwork && (
        <Text variant="xs">Lot {rest.artwork?.saleArtwork?.lotLabel}</Text>
      )}
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
      saleMessage
      culturalMaker
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
        isAuction
        isClosed
      }
      saleArtwork {
        lotLabel
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
    }
  `,
})
