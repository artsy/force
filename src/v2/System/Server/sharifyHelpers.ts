import { pick } from "lodash"

// The exhaustive list of sharify values used by V2
const V2_SHARIFY_ALLOWLIST = [
  "ADMIN_URL",
  "AP",
  "API_REQUEST_TIMEOUT",
  "API_URL",
  "APP_URL",
  "APPLICATION_NAME",
  "ARTIST_PAGE_CTA_ARTIST_ID",
  "ARTIST_PAGE_CTA_ENABLED",
  "ARTSY_EDITORIAL_CHANNEL",
  "AUCTION_ZENDESK_KEY",
  "AUTHENTICATION_REDIRECT_TO",
  "AUTHENTICATION_REFERER",
  "CDN_URL",
  "CMS_URL",
  "CURRENT_PATH",
  "CURRENT_USER",
  "ENABLE_AUCTION_V2",
  "ENABLE_FAIR_PAGE_EXHIBITORS_TAB",
  "ENABLE_NEW_AUCTIONS_FILTER",
  "ENABLE_SAVED_SEARCH",
  "ENABLE_YOUR_ALERTS_PAGE",
  "ERROR",
  "FACEBOOK_APP_NAMESPACE",
  "GEMINI_CLOUDFRONT_URL",
  "GENOME_URL",
  "GOOGLE_ADWORDS_ID",
  "GOOGLE_MAPS_API_KEY",
  "MARKETING_SIGNUP_MODALS",
  "METAPHYSICS_ENDPOINT",
  "NODE_ENV",
  "ONETRUST_SCRIPT_ID",
  "PREDICTION_URL",
  "RECAPTCHA_KEY",
  "RESET_PASSWORD_TOKEN",
  "SEGMENT_WRITE_KEY",
  "SENTRY_PUBLIC_DSN",
  "SHOW_ANALYTICS_CALLS",
  "SIFT_BEACON_KEY",
  "STRIPE_PUBLISHABLE_KEY",
  "TARGET_CAMPAIGN_URL",
  "THIRD_PARTIES_DISABLED,",
  "TRACK_PAGELOAD_PATHS",
  "VOLLEY_ENDPOINT",
  "WEBFONT_URL",
  "ZENDESK_KEY",
] as const

export type SharifyKey = typeof V2_SHARIFY_ALLOWLIST[number]

// Required so that we can control limit the data being injected in to the page.
function generateCustomSharifyScript(sharifyData) {
  return (
    '<script type="text/javascript">' +
    "window.__sharifyData = " +
    //There are tricky rules about safely embedding JSON within HTML
    //see http://stackoverflow.com/a/4180424/266795
    JSON.stringify(sharifyData)
      .replace(/</g, "\\u003c")
      .replace(/-->/g, "--\\>")
      .replace(/\u2028/g, "\\u2028")
      .replace(/\u2029/g, "\\u2029") +
    ";</script>"
  )
}

export function getV2SharifyScript(sharifyData) {
  const script = generateCustomSharifyScript(
    pick(sharifyData, [...V2_SHARIFY_ALLOWLIST])
  )
  return script
}
