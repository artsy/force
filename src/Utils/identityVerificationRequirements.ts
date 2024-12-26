import type { ArtworkSidebarBidAction_artwork$data } from "__generated__/ArtworkSidebarBidAction_artwork.graphql"
import type { ArtworkSidebarBidAction_me$data } from "__generated__/ArtworkSidebarBidAction_me.graphql"

/**
 * Process a list of bidder permissions based on a user-bidder-sale combination.
 * @param sale
 * @param user
 * @param registration
 */
export const bidderQualifications = (
  sale: ArtworkSidebarBidAction_artwork$data["sale"],
  user?: ArtworkSidebarBidAction_me$data,
  registration?: { qualifiedForBidding: boolean },
) => {
  const registrationAttempted = Boolean(registration)
  const qualifiedForBidding =
    // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
    registrationAttempted && registration.qualifiedForBidding

  const userLacksIdentityVerification =
    sale?.requireIdentityVerification && !user?.isIdentityVerified
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
