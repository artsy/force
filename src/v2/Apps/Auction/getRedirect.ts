import { auctionRoutes_ConfirmBidQueryResponse } from "v2/__generated__/auctionRoutes_ConfirmBidQuery.graphql"
import { auctionRoutes_RegisterQueryResponse } from "v2/__generated__/auctionRoutes_RegisterQuery.graphql"

export interface Redirect {
  path: string
  reason: string
}

export function registerRedirect({
  me,
  sale,
}: auctionRoutes_RegisterQueryResponse): Redirect | null {
  // @ts-expect-error STRICT_NULL_CHECK
  if (me.hasQualifiedCreditCards) {
    return {
      // @ts-expect-error STRICT_NULL_CHECK
      path: registrationFlowPath(sale),
      reason: "user already has a qualified credit card",
    }
    // @ts-expect-error STRICT_NULL_CHECK
  } else if (!sale.isAuction) {
    return {
      // @ts-expect-error STRICT_NULL_CHECK
      path: `/sale/${sale.slug}`,
      reason: "sale must be an auction",
    }
    // @ts-expect-error STRICT_NULL_CHECK
  } else if (!isRegisterable(sale)) {
    return {
      // @ts-expect-error STRICT_NULL_CHECK
      path: auctionPath(sale),
      reason: "auction must be registerable",
    }
    // @ts-expect-error STRICT_NULL_CHECK
  } else if (userRegisteredToBid(sale)) {
    return {
      // @ts-expect-error STRICT_NULL_CHECK
      path: confirmRegistrationPath(sale),
      reason: "user is already registered to bid",
    }
  }

  return null
}

export function confirmBidRedirect(
  data: auctionRoutes_ConfirmBidQueryResponse,
  location: Location
): Redirect | null {
  const { artwork, me } = data
  // @ts-expect-error STRICT_NULL_CHECK
  const { saleArtwork } = artwork

  const { sale } = saleArtwork
  const { registrationStatus } = sale

  if (!me) {
    return {
      path: "/log_in?redirect_uri=" + encodeURIComponent(location.pathname),
      reason: "user is not signed in",
    }
  }

  if (!registrationStatus && sale.isRegistrationClosed) {
    return {
      // @ts-expect-error STRICT_NULL_CHECK
      path: artworkPath(sale, artwork),
      reason: "user is not registered, registration closed",
    }
  }
  if (registrationStatus && !registrationStatus.qualifiedForBidding) {
    return {
      path: confirmRegistrationPath(sale),
      reason: "user is not qualified for bidding",
    }
  }
  if (sale.isClosed) {
    return {
      // @ts-expect-error STRICT_NULL_CHECK
      path: artworkPath(sale, artwork),
      reason: "sale is closed",
    }
  }
  return null
}

const auctionPath = (sale: { slug: string }): string => `/auction/${sale.slug}`
const registrationFlowPath = (sale: { slug: string }): string =>
  auctionPath(sale) + "/registration-flow"

// TODO: Duplicate of `saleConfirmRegistrationPath` in `src/v2/Apps/Auction/Components/Form/helpers.tsx`
const confirmRegistrationPath = (sale: { slug: string }): string =>
  auctionPath(sale) + "/confirm-registration"

const artworkPath = (
  sale: { slug: string },
  artwork: { slug: string }
): string => auctionPath(sale) + `/artwork/${artwork.slug}`

function isRegisterable(sale: {
  isPreview: boolean
  isOpen: boolean
  isRegistrationClosed: boolean
}): boolean {
  return (sale.isPreview || sale.isOpen) && !sale.isRegistrationClosed
}

function userRegisteredToBid(sale: {
  registrationStatus: { qualifiedForBidding: boolean }
}): boolean {
  return !!sale.registrationStatus
}
