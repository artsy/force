//
// Combined config from desktop and mobile for the libraries moved up to ./lib
//
// TODO: We should probably drop these config files altogether and just rely
// on process.env and sharify.
//

// We need to bootstrap sharify in the build file where absolute paths aren't supported
// eslint-disable-next-line no-relative-import-paths/no-relative-import-paths
import { tryParse } from "../Utils/tryParse"

// Warn if this file is included client-side
if (process.env.NODE_ENV !== "test") {
  if (typeof window !== "undefined" && window !== null) {
    alert(
      "WARNING: Do not require config, please require('sharify').data instead.",
    )
  }
}

export const PORT: any = 4000

export const ACTIVE_BIDS_POLL_INTERVAL: any = 5000
export const ADMIN_URL: any = "https://tools.artsy.net"
export const ALLOWED_VANITY_ASSETS: any = "videos/*|vrview/*|hls-videos/*"
export const API_REQUEST_TIMEOUT: any = 5000
export const API_URL: any = "http://localhost:3000"
export const APP_TIMEOUT: any = null
export const APP_URL: any = `http://localhost:${process.env.PORT}`
export const APPLE_CLIENT_ID: any = null
export const APPLE_KEY_ID: any = null
export const APPLE_PRIVATE_KEY: any = null
export const APPLE_TEAM_ID: any = null
export const APPLICATION_NAME: any = "force-staging"
export const ARTA_API_KEY: string | null = null
export const ARTSY_EDITORIAL_CHANNEL: any = "5759e3efb5989e6f98f77993"
export const ARTSY_MERCHANDISING_PARTNER_SLUGS: any = null
export const ALLOWED_REDIRECT_HOSTS: any = "localhost"
export const CASCADING_AUCTION_HELP_ARTICLE_LINK: any = null
export const CDN_URL: any = ""
export const CLIENT_ID: any = null
export const CLIENT_SECRET: any = null
export const CMS_URL: any = "https://cms.artsy.net"
export const COOKIE_DOMAIN: any = null
export const DD_SERVICE_NAME: any = "force"
export const DD_TRACE_AGENT_HOSTNAME: any = "localhost"
export const DEFAULT_CACHE_TIME: any = 3600
export const DISABLE_IMAGE_PROXY: any = false
export const EDITORIAL_PATHS: any =
  "^/article|^/2016-year-in-art|^/venice-biennale|^/gender-equality|^/series|^/video|^/news"
export const ENABLE_CONVERSATIONS_MESSAGES_AUTO_REFRESH: any = true
export const ENABLE_NEW_AUCTIONS_FILTER: any = false
export const ENABLE_PREFETCH: any = true
export const ENABLE_QUERY_BATCHING: any = false
export const ENABLE_SERVER_DRIVEN_NAVIGATION: any = false
export const ENABLE_SSR_STREAMING: any = false
export const ENABLE_WEB_CRAWLING: any = false
export const ENABLE_WEB_VITALS_LOGGING: any = false
export const GRAPHQL_CACHE_TTL: any = 1000000000
export const GRAPHQL_CACHE_SIZE: any = 1000000000
export const FACEBOOK_APP_NAMESPACE: any = "artsyinc"
export const FACEBOOK_ID: any = null
export const FACEBOOK_SECRET: any = null
export const FAIR_CHANNEL_ID: any = "5759e4f3b5989e6f98f77998"
export const GALLERY_PARTNER_UPDATES_CHANNEL: any = "5762d454b5989e6f98f7799a" // pragma: allowlist secret
export const GEMINI_ACCOUNT_KEY: any = "force-staging"
export const GEMINI_APP: any = "http://localhost:3004"
export const GEMINI_CLOUDFRONT_URL: any = "https://d7hftxdivxxvm.cloudfront.net"
export const GEODATA_URL: any =
  "http://artsy-geodata.s3-website-us-east-1.amazonaws.com"
export const GOOGLE_ADWORDS_ID: any = null
export const GOOGLE_ANALYTICS_ID: any = "UA-12450662-6"
export const GOOGLE_CLIENT_ID: any = null
export const GOOGLE_SECRET: any = null
export const GRAVITY_WEBSOCKET_URL: any = "wss://stagingapi.artsy.net/cable"
export const IMAGE_PROXY: any = "GEMINI"
export const IP_DENYLIST: any = ""
export const METAPHYSICS_ENDPOINT: any =
  "https://metaphysics-production.artsy.net"
export const NODE_ENV: any = "development"
export const POSITRON_URL: any = "http://writer.artsy.net"
export const PREDICTION_URL: any = "https://live.artsy.net"
export const PUBLIC_GOOGLE_MAPS_API_KEY: any = null
export const RECAPTCHA_KEY: any = null
export const S3_BUCKET: any = null
export const S3_KEY: any = null
export const S3_SECRET: any = null
export const SALESFORCE_MESSAGE_ENABLED: any = false
export const SALESFORCE_MESSAGE_ORG_ID: any = null
export const SALESFORCE_MESSAGE_SCRT2_URL: any = null
export const SALESFORCE_MESSAGE_SERVICE_NAME: any = null
export const SALESFORCE_MESSAGE_INSTANCE_URL: any = null
export const SECURE_IMAGES_URL: any = "https://d1ycxz9plii3tb.cloudfront.net"
export const SEGMENT_AMP_WRITE_KEY: any = null
export const SEGMENT_WRITE_KEY_SERVER: any = null
export const SEGMENT_WRITE_KEY: any = null
export const SENTRY_PRIVATE_DSN: any = null
export const SENTRY_PUBLIC_DSN: any = null
export const SENTRY_TRACING_ENABLED: any = false
export const SESSION_COOKIE_KEY: any = "force.sess"
export const SESSION_COOKIE_MAX_AGE: any = 31536000000
export const SESSION_LOCAL_INSECURE: boolean = false
export const SESSION_SECRET: any = "change-me"
export const SHOW_ANALYTICS_CALLS: any = false
export const SIFT_BEACON_KEY: any = null
export const SITEMAP_BASE_URL: any =
  "http://artsy-sitemaps.s3-website-us-east-1.amazonaws.com"
export const SMARTY_EMBEDDED_KEY_JSON: any = {}
export const STRIPE_PUBLISHABLE_KEY: any = null
export const TARGET_CAMPAIGN_URL: any = "/seattle-art-fair-2017"
export const THIRD_PARTIES_DISABLED: any = false
export const TOOLS_URL: any = "https://tools.artsy.net"
export const TRACK_PAGELOAD_PATHS: any = null
export const UNLEASH_API_URL: any = null
export const UNLEASH_APP_NAME: any = null
export const UNLEASH_FRONTEND_KEY: any = null
export const UNLEASH_ENVIRONMENT: any = "development"
export const UNLEASH_SERVER_KEY: any = null
export const VANITY_BUCKET: any = "artsy-vanity-files-production"
export const VERBOSE_LOGGING: any = false
export const VOLLEY_ENDPOINT: any = null
export const WEBFONT_URL: any = "http://webfonts.artsy.net"

// Override any values with env variables if they exist.
// You can set JSON-y values for env variables as well such as "true" or
// "['foo']" and config will attempt to JSON.parse them into non-string types.

for (const key in module.exports) {
  const val = process.env[key] || module.exports[key]
  module.exports = {
    ...module.exports,
    [key]: tryParse(val),
  }
}
