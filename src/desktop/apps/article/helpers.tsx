/**
 * For now ads, served by Hashtag Labs are only to viewable in the following instances:
 *  1) When the environment is NOT Production (HASHTAG_LAB_ADS_ENABLED set to false)
 *  2) When a user is an Admin
 *  3) When a user has been added to the allowlist set via HASHTAG_LAB_ADS_ALLOWLIST
 */

export const areThirdPartyAdsEnabled = (sd: any): boolean => {
  const isSharifyGuarded = sd || false
  const isUserGuarded = isSharifyGuarded && sd.CURRENT_USER
  const areThirdPartyAdsEnabled =
    isSharifyGuarded && sd.HASHTAG_LAB_ADS_ENABLED
      ? sd.HASHTAG_LAB_ADS_ENABLED
      : false
  const allowList =
    isSharifyGuarded && sd.HASHTAG_LAB_ADS_ALLOWLIST
      ? sd.HASHTAG_LAB_ADS_ALLOWLIST
      : ""

  const allowedUsers = allowList.split(",").filter(Boolean)
  const currentUser =
    isSharifyGuarded && isUserGuarded && sd.CURRENT_USER.email
      ? sd.CURRENT_USER.email
      : null
  const isAllowedUser = allowedUsers.includes(currentUser)
  const isAdminUser =
    (isSharifyGuarded &&
      isUserGuarded &&
      sd.CURRENT_USER.type &&
      sd.CURRENT_USER.type === "Admin") ||
    false

  if (!areThirdPartyAdsEnabled) {
    return false
  }
  if (isAllowedUser || isAdminUser) {
    return true
  }
  return false
}

// Helper method to determine how frequently ads should be rendered in Article components
export const shouldAdRender = (
  index: number,
  startIndex: number,
  frequency: number
): boolean => {
  let position = index - startIndex
  return Math.abs(position) % frequency === 0
}
