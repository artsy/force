export const PROGRESSIVE_ONBOARDING = {
  // Follow Partners
  followPartner: "follow-partner",

  // Follow Artists
  followArtist: "follow-artist",
  followFind: "follow-find",
  followHighlight: "follow-highlight",

  // Save Artworks
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

export const PROGRESSIVE_ONBOARDING_FOLLOW_ARTIST_CHAIN = [
  PROGRESSIVE_ONBOARDING.followArtist,
  PROGRESSIVE_ONBOARDING.followFind,
  PROGRESSIVE_ONBOARDING.followHighlight,
] as const

export const PROGRESSIVE_ONBOARDING_ALERT_CHAIN = [
  PROGRESSIVE_ONBOARDING.alertCreate,
  PROGRESSIVE_ONBOARDING.alertSelectFilter,
  PROGRESSIVE_ONBOARDING.alertReady,
  PROGRESSIVE_ONBOARDING.alertFind,
  PROGRESSIVE_ONBOARDING.alertHighlight,
] as const

export const PROGRESSIVE_ONBOARDING_SAVE_CHAIN = [
  PROGRESSIVE_ONBOARDING.saveArtwork,
  PROGRESSIVE_ONBOARDING.saveFind,
  PROGRESSIVE_ONBOARDING.saveHighlight,
  PROGRESSIVE_ONBOARDING.saveTitle,
] as const

export const PROGRESSIVE_ONBOARDING_KEYS = Object.values(PROGRESSIVE_ONBOARDING)
