/**
 * For now ads, served by Hashtag Labs are only to viewable in the following instances:
 *  1) When the environment is NOT Production (HASHTAG_LAB_ADS_ENABLED set to false)
 *  2) When a user is an Admin
 *  3) When a user has been added to the allowlist set via HASHTAG_LAB_ADS_ALLOWLIST
 */

export const areThirdPartyAdsEnabled = resp => {
  const isSharifyGuarded = resp && resp.sd
  const isUserGuarded = isSharifyGuarded && resp.sd.CURRENT_USER
  const areThirdPartyAdsEnabled =
    isSharifyGuarded && resp.sd.HASHTAG_LAB_ADS_ENABLED
      ? resp.sd.HASHTAG_LAB_ADS_ENABLED
      : false
  const allowList =
    isSharifyGuarded && resp.sd.HASHTAG_LAB_ADS_ALLOWLIST
      ? resp.sd.HASHTAG_LAB_ADS_ALLOWLIST
      : ""

  const allowedUsers = allowList.split(",").filter(Boolean)
  const currentUser =
    isSharifyGuarded && isUserGuarded && resp.sd.CURRENT_USER.email
      ? resp.sd.CURRENT_USER.email
      : null
  const isAllowedUser = allowedUsers.includes(currentUser)
  const isAdminUser =
    (isSharifyGuarded &&
      isUserGuarded &&
      resp.sd.CURRENT_USER.type &&
      resp.sd.CURRENT_USER.type === "Admin") ||
    false

  if (!areThirdPartyAdsEnabled) {
    return false
  }
  if (isAllowedUser || isAdminUser) {
    return true
  }
  return false
}
