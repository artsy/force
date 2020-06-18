import { routes_ConfirmBidQueryResponse } from "v2/__generated__/routes_ConfirmBidQuery.graphql"
import { routes_RegisterQueryResponse } from "v2/__generated__/routes_RegisterQuery.graphql"

export interface Redirect {
  path: string
  reason: string
}

export function registerRedirect({
  me,
  sale,
}: routes_RegisterQueryResponse): Redirect | null {
  if (me.hasQualifiedCreditCards) {
    return {
      path: registrationFlowPath(sale),
      reason: "user already has a qualified credit card",
    }
  } else if (!sale.isAuction) {
    return {
      path: `/sale/${sale.slug}`,
      reason: "sale must be an auction",
    }
  } else if (!isRegisterable(sale)) {
    return {
      path: auctionPath(sale),
      reason: "auction must be registerable",
    }
  } else if (userRegisteredToBid(sale)) {
    return {
      path: confirmRegistrationPath(sale),
      reason: "user is already registered to bid",
    }
  }

  return null
}

export function confirmBidRedirect(
  data: routes_ConfirmBidQueryResponse,
  location: Location
): Redirect | null {
  const { artwork, me } = data
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
