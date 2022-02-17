//
// Combined config from desktop and mobile for the libraries moved up to ./lib
//
// TODO: We should probably drop these config files altogether and just rely
// on process.env and sharify.
//

// Warn if this file is included client-side
if (process.env.NODE_ENV !== "test") {
  if (typeof window !== "undefined" && window !== null) {
    alert(
      "WARNING: Do not require config, please require('sharify').data instead."
    )
  }
}

export const ACTIVE_BIDS_POLL_INTERVAL: any = 5000
export const ADMIN_URL: any = "https://admin.artsy.net"
export const ALLOWED_VANITY_ASSETS: any = "videos/*|vrview/*|hls-videos/*"
export const API_REQUEST_TIMEOUT: any = 5000
export const API_URL: any = "http://localhost:3000"
export const APP_TIMEOUT: any = null
export const APP_URL: any = "http://localhost:5000"
export const APPLE_CLIENT_ID: any = null
export const APPLE_KEY_ID: any = null
export const APPLE_PRIVATE_KEY: any = null
export const APPLE_TEAM_ID: any = null
export const APPLICATION_NAME: any = "force-staging"
export const APPLY_URL: any = "http://apply.artsy.net"
export const ARTSY_EDITORIAL_CHANNEL: any = "5759e3efb5989e6f98f77993"
export const AUCTION_ZENDESK_KEY: any = null
export const ALLOWED_REDIRECT_HOSTS: any = "localhost"
export const CDN_URL: any = "https://d1s2w0upia4e9w.cloudfront.net"
export const CLIENT_ID: any = null
export const CLIENT_SECRET: any = null
export const CMS_URL: any = "https://cms.artsy.net"
export const CONVECTION_APP_ID: any = null
export const CONVECTION_APP_URL: any = null
export const CONVECTION_GEMINI_APP: any = "convection-staging"
export const COOKIE_DOMAIN: any = null
export const DD_SERVICE_NAME: any = "force"
export const DD_TRACE_AGENT_HOSTNAME: any = "localhost"
export const DEFAULT_CACHE_TIME: any = 3600
export const DISABLE_IMAGE_PROXY: any = false
export const EDITORIAL_PATHS: any =
  "^/article|^/2016-year-in-art|^/venice-biennale|^/gender-equality|^/series|^/video|^/news"
export const EF_GUCCI: any = "5a009372c88a280f5e9efa7e"
export const EF_VENICE: any = "58f5eb75faef6a3a8e7fe1ad"
export const EF_VIDEO_GUIDE: any = "5901d64b4682400017f0e3cb"
export const ENABLE_FAIR_PAGE_EXHIBITORS_TAB: any = false
export const ENABLE_FAIR_ORGANIZER_REDIRECT: any = false
export const ENABLE_INSTANT_PAGE: any = true
export const ENABLE_MEMORY_PROFILING: any = false
export const ENABLE_NEW_AUCTIONS_FILTER: any = false
export const ENABLE_QUERY_BATCHING: any = false
export const ENABLE_SAVED_SEARCH: any = false
export const ENABLE_SERVER_SIDE_CACHE: any = false
export const ENABLE_WEB_CRAWLING: any = false
export const ENABLE_YOUR_ALERTS_PAGE: any = false
export const EOY_2016_ARTICLE: any = "58472d93b7b31d00116f5ab0"
export const EOY_2016: any = "5829db77b5989e6f98f779a5"
export const FACEBOOK_APP_NAMESPACE: any = "artsyinc"
export const FACEBOOK_DOMAIN_VERIFICATION: any =
  "yeg3dqrlq548zc77ggvfipouil1l1e"
export const FACEBOOK_ID: any = null
export const FACEBOOK_SECRET: any = null
export const FAIR_CHANNEL_ID: any = "5759e4f3b5989e6f98f77998"
export const GALAXY_PUBLISHABLE_TOKEN: any = null
export const GALAXY_TOKEN: any = null
export const GALAXY_URL: any = null
// Used to redirect to partners.artsy.net
export const GALLERY_INSIGHTS_CHANNEL: any = "5759e4a6b5989e6f98f77995"
export const GALLERY_PARTNER_UPDATES_CHANNEL: any = "5762d454b5989e6f98f7799a"
export const GEMINI_ACCOUNT_KEY: any = "force-staging"
export const GEMINI_APP: any = "http://localhost:3004"
export const GEMINI_CLOUDFRONT_URL: any = "https://d7hftxdivxxvm.cloudfront.net"
export const GENOME_URL: any = "https://helix.artsy.net"
export const GEODATA_URL: any =
  "http://artsy-geodata.s3-website-us-east-1.amazonaws.com"
export const GEOIP_ENDPOINT: any = "https://freegeoip.app/json/"
export const GOOGLE_ADWORDS_ID: any = null
export const GOOGLE_ANALYTICS_ID: any = "UA-12450662-6"
export const GOOGLE_CLIENT_ID: any = null
export const GOOGLE_SECRET: any = null
export const GOOGLE_MAPS_API_KEY: any = null
export const IMAGE_PROXY: any = "GEMINI"
export const IP_DENYLIST: any = ""
export const LINKEDIN_KEY: any = null
export const LINKEDIN_SECRET: any = null
export const METAPHYSICS_ENDPOINT: any =
  "https://metaphysics-production.artsy.net"
export const NODE_ENV: any = "development"
export const ONETRUST_SCRIPT_ID: any = null
export const OPENREDIS_URL: any = null
export const PAGE_CACHE_ENABLED: any = false
export const PAGE_CACHE_EXPIRY_SECONDS: any = 600
export const PAGE_CACHE_NAMESPACE: any = "page-cache"
export const PAGE_CACHE_RETRIEVAL_TIMEOUT_MS: any = 400
export const PAGE_CACHE_TYPES: any = "artist"
export const PAGE_CACHE_VERSION: any = "1"
export const PARSELY_KEY: any = "artsy.net"
export const PARSELY_SECRET: any = null
export const PC_ARTSY_CHANNEL: any = "5759e508b5989e6f98f77999"
export const PC_AUCTION_CHANNEL: any = "5759e4d7b5989e6f98f77997"
export const PORT: any = 5000
export const POSITRON_URL: any = "http://writer.artsy.net"
export const PREDICTION_URL: any = "https://live.artsy.net"
export const RECAPTCHA_KEY: any = null
export const S3_BUCKET: any = null
export const S3_KEY: any = null
export const S3_SECRET: any = null
export const SECURE_IMAGES_URL: any = "https://d1ycxz9plii3tb.cloudfront.net"
export const SEGMENT_AMP_WRITE_KEY: any = null
export const SEGMENT_WRITE_KEY_SERVER: any = null
export const SEGMENT_WRITE_KEY: any = null
export const SENTRY_PRIVATE_DSN: any = null
export const SENTRY_PUBLIC_DSN: any = null
export const SESSION_COOKIE_KEY: any = "force.sess"
export const SESSION_COOKIE_MAX_AGE: any = 31536000000
export const SESSION_LOCAL_INSECURE: boolean = false
export const SESSION_SECRET: any = "change-me"
export const SHOW_ANALYTICS_CALLS: any = false
export const SIFT_BEACON_KEY: any = null
export const SITEMAP_BASE_URL: any =
  "http://artsy-sitemaps.s3-website-us-east-1.amazonaws.com"
export const STRIPE_PUBLISHABLE_KEY: any = null
export const TARGET_CAMPAIGN_URL: any = "/seattle-art-fair-2017"
export const TEAM_BLOGS: any =
  "^/life-at-artsy$|^/artsy-education$|^/buying-with-artsy$"
export const THIRD_PARTIES_DISABLED: any = false
export const TRACK_PAGELOAD_PATHS: any = null
export const VANITY_BUCKET: any = "artsy-vanity-files-production"
export const VERBOSE_LOGGING: any = false
export const VOLLEY_ENDPOINT: any = null
export const WEBFONT_URL: any = "http://webfonts.artsy.net"
export const ZENDESK_KEY: any = null

// Override any values with env variables if they exist.
// You can set JSON-y values for env variables as well such as "true" or
// "['foo']" and config will attempt to JSON.parse them into non-string types.

for (let key in module.exports) {
  const val = process.env[key] || module.exports[key]
  module.exports[key] = tryParse(val)
}

function tryParse(val) {
  try {
    return JSON.parse(val)
  } catch (error) {
    return val
  }
}
