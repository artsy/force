import get from 'lodash.get'

export function getBidderStatus(me, auction) {
  const hasBidder = get(me, 'bidders.0')

  if (hasBidder) {
    const isQualified = get(me, 'bidders.0.qualified_for_bidding')

    if (isQualified) {
      return 'qualified-to-bid'
    } else {
      return 'registration-pending'
    }
  } else if (auction.is_registration_closed) {
    return 'registration-closed'
  } else if (auction.require_bidder_approval) {
    return 'approval-required'
  } else if (me) {
    return 'logged-in'
  } else {
    return 'logged-out'
  }
}
