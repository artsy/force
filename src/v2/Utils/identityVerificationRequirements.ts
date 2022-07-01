interface IdentityVerificationRequireable {
  requireIdentityVerification: boolean
}

interface IdentityVerifiable {
  identityVerified: boolean
}

interface Bidder {
  qualified_for_bidding: boolean
}

/**
 * Determine if the current user needs to perform identity verification
 * for the sale.
 *
 * Note: If the user is already registered to bid, then the sale doesn't
 * requireIdentityVerification OR the user was manually approved by an
 * admin. In either case, they don't need identity verification at this
 * time.
 */
export const bidderNeedsIdentityVerification = ({
  sale,
  user,
  bidder,
}: {
  sale: IdentityVerificationRequireable
  user?: IdentityVerifiable
  bidder?: Bidder
}) => {
  return (
    !bidder?.qualified_for_bidding &&
    sale.requireIdentityVerification &&
    !user?.identityVerified
  )
}

/**
 * Process a list of bidder permissions based on a user-bidder-sale combination.
 * @param sale
 * @param user
 * @param registration
 */
export const bidderQualifications = (
  saleRequireIdentityVerification: boolean,
  userIdentityVerified: boolean,
  pendingIdentityVerification: boolean,
  qualifiedForBidding: boolean
) => {
  const userLacksIdentityVerification =
    saleRequireIdentityVerification && !userIdentityVerified

  const shouldPromptIdVerification =
    !qualifiedForBidding &&
    userLacksIdentityVerification &&
    pendingIdentityVerification

  return {
    qualifiedForBidding,
    userLacksIdentityVerification,
    shouldPromptIdVerification,
  }
}
