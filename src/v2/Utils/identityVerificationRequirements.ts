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
  sale: { requireIdentityVerification: boolean },
  user?: {
    identityVerified: boolean
    pendingIdentityVerification?: { internalID: string }
  },
  registration?: { qualifiedForBidding: boolean }
) => {
  const registrationAttempted = Boolean(registration)
  const qualifiedForBidding =
    // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
    registrationAttempted && registration.qualifiedForBidding

  const userLacksIdentityVerification =
    sale.requireIdentityVerification && !user?.identityVerified
  const pendingIdentityVerification = user?.pendingIdentityVerification

  const shouldPromptIdVerification =
    !qualifiedForBidding &&
    userLacksIdentityVerification &&
    Boolean(pendingIdentityVerification)

  return {
    registrationAttempted,
    qualifiedForBidding,
    userLacksIdentityVerification,
    pendingIdentityVerification,
    shouldPromptIdVerification,
  }
}
