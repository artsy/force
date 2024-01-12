export const PROGRESSIVE_ONBOARDING_ALERTS = {
  // Follows
  followArtist: "follow-artist",
  followFind: "follow-find",
  followHighlight: "follow-highlight",

  // Saves
  saveArtwork: "save-artwork",
  saveFind: "save-find",
  saveHighlight: "save-highlight",
  saveTitle: "save-title",

  // Alerts
  alertCreate: "alert-create",
  alertSelectFilter: "alert-select-filter",
  alertReady: "alert-ready",
  alertFind: "alert-find",
  alertHighlight: "alert-highlight",
}

export const PROGRESSIVE_ONBOARDING_FOLLOW_CHAIN = [
  PROGRESSIVE_ONBOARDING_ALERTS.followArtist,
  PROGRESSIVE_ONBOARDING_ALERTS.followFind,
  PROGRESSIVE_ONBOARDING_ALERTS.followHighlight,
] as const

export const PROGRESSIVE_ONBOARDING_ALERT_CHAIN = [
  PROGRESSIVE_ONBOARDING_ALERTS.alertCreate,
  PROGRESSIVE_ONBOARDING_ALERTS.alertSelectFilter,
  PROGRESSIVE_ONBOARDING_ALERTS.alertReady,
  PROGRESSIVE_ONBOARDING_ALERTS.alertFind,
  PROGRESSIVE_ONBOARDING_ALERTS.alertHighlight,
] as const

export const PROGRESSIVE_ONBOARDING_SAVE_CHAIN = [
  PROGRESSIVE_ONBOARDING_ALERTS.saveArtwork,
  PROGRESSIVE_ONBOARDING_ALERTS.saveFind,
  PROGRESSIVE_ONBOARDING_ALERTS.saveHighlight,
  PROGRESSIVE_ONBOARDING_ALERTS.saveTitle,
] as const

export const getProgressiveOnboardingAlertKeys = () => {
  return Object.entries(PROGRESSIVE_ONBOARDING_ALERTS).map(
    ([_key, value]) => value
  )
}
