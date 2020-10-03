interface IdentityVerificationRequireable {
  requireIdentityVerification: boolean
}

interface IdentityVerifiable {
  identityVerified: boolean
  pendingIdentityVerification?: { internalID: string }
}

interface Bidder {
  qualifiedForBidding: boolean
}

interface BidderQualifications {
  /** Presence of bidder */
  registrationAttempted: boolean
  /** Bidder is qualified */
  qualifiedForBidding: boolean
  /** Sale requires identity verification but the user does not have it */
  userLacksIdentityVerification: boolean
  /** User's pending identity verification, if present */
  pendingIdentityVerification: {
    internalID: string
  } | null
  /** Whether user should be prompted to verify ID, that is:
   * - they are not qualified
   * - they are lacking idv for a sale that requires it
   * - they have an available pendingIdentityVerification
   */
  shouldPromptIdVerification: boolean
}

/**
 * Process a list of bidder permissions based on a user-bidder-sale combination.
 * @param sale with requireIdentityVerification boolean
 * @param user with identityVerified and pendingIdentityVerification properties
 * @param bidder their bidder for this sale, if applicable
 * @return BidderQualifications
 */
export const bidderQualifications = (
  sale: IdentityVerificationRequireable,
  user?: IdentityVerifiable,
  bidder?: Bidder | null
): BidderQualifications => {
  const registrationAttempted = Boolean(bidder)
  const qualifiedForBidding =
    registrationAttempted && bidder.qualifiedForBidding

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
