/**
 * Interested in knowing the height of the nav bar? Avoid importing these
 * constants and use the `useNavBarHeight` hook, if possible.
 */

// Desktop
export const DESKTOP_NAV_BAR_TOP_TIER_HEIGHT = 60
export const DESKTOP_NAV_BAR_BOTTOM_TIER_HEIGHT = 44
export const DESKTOP_NAV_BAR_HEIGHT =
  DESKTOP_NAV_BAR_TOP_TIER_HEIGHT + DESKTOP_NAV_BAR_BOTTOM_TIER_HEIGHT

// Mobile
export const MOBILE_APP_DOWNLOAD_BANNER_HEIGHT = 40
export const MOBILE_NAV_HEIGHT =
  MOBILE_APP_DOWNLOAD_BANNER_HEIGHT + DESKTOP_NAV_BAR_TOP_TIER_HEIGHT
