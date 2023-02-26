/**
 * Process a list of bidder permissions based on a user-bidder-sale combination.
 * @param sale
 * @param user
 * @param registration
 */
export const bidderQualifications = (
  sale: { requireIdentityVerification: boolean },
  user?: {
    isIdentityVerified: boolean
    pendingIdentityVerification?: { internalID: string }
  },
  registration?: { qualifiedForBidding: boolean }
) => {
  const registrationAttempted = Boolean(registration)
  const qualifiedForBidding =
    // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
    registrationAttempted && registration.qualifiedForBidding

  const userLacksIdentityVerification =
    sale.requireIdentityVerification && !user?.isIdentityVerified
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
