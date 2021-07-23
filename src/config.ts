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
export const APP_URL: any = "http://localhost:3003"
export const APPLE_CLIENT_ID: any = null
export const APPLE_KEY_ID: any = null
export const APPLE_PRIVATE_KEY: any = null
export const APPLE_TEAM_ID: any = null
export const APPLICATION_NAME: any = "force-staging"
export const APPLY_URL: any = "http://apply.artsy.net"
export const ARTIST_COLLECTIONS_RAIL_IDS: any = null
export const ARTSY_EDITORIAL_CHANNEL: any = "5759e3efb5989e6f98f77993"
export const AUCTION_ZENDESK_KEY: any = null
export const BIDDER_INFO_COPY_P1: any =
  "Please enter your credit card information below. The name on your Artsy account must match the name on the card, and a valid credit card is required in order to bid."
export const BIDDER_INFO_COPY_P2: any =
  "Registration is free. Artsy will never charge this card without your permission, and you are not required to use this card to pay if you win."
// The number of seconds to block bursts after their limit is reached
export const BURST_REQUEST_BLOCK_FOR: any = 180
// The period in seconds to measure burst requests
export const BURST_REQUEST_EXPIRE: any = 1
// Number of requests allowed per BURST_REQUEST_EXPIRE
export const BURST_REQUEST_LIMIT: any = 15
export const CALENDAR_URL: any = "http://localhost:3003"
export const CDN_URL: any = "https://d1s2w0upia4e9w.cloudfront.net"
export const CLIENT_ID: any = null
export const CLIENT_SECRET: any = null
export const CMS_URL: any = "https://cms.artsy.net"
export const COLLECT_PAGE_TITLES_URL: any =
  "https://s3.amazonaws.com/artsy-data/collect/collect.json"
export const CONVECTION_APP_ID: any = null
export const CONVECTION_APP_URL: any = null
export const CONVECTION_GEMINI_APP: any = "convection-staging"
export const COOKIE_DOMAIN: any = null
export const DD_SERVICE_NAME: any = "force"
export const DD_TRACE_AGENT_HOSTNAME: any = "localhost"
export const DEFAULT_CACHE_TIME: any = 3600
export const DEPLOY_ENV: any = null
export const DISABLE_IMAGE_PROXY: any = false
export const EDITORIAL_PATHS: any =
  "^/article|^/2016-year-in-art|^/venice-biennale|^/gender-equality|^/series|^/video|^/news"
export const EF_GUCCI: any = "5a009372c88a280f5e9efa7e"
export const EF_VENICE: any = "58f5eb75faef6a3a8e7fe1ad"
export const EF_VIDEO_GUIDE: any = "5901d64b4682400017f0e3cb"
export const EMAIL_SIGNUP_IMAGES_ID: any = "572a7996b5989e6f98f77992"
export const EMBEDLY_KEY: any = "a1f82558d8134f6cbebceb9e67d04980"
export const ENABLE_INSTANT_PAGE: any = true
export const ENABLE_MEMORY_PROFILING: any = false
export const ENABLE_NEW_AUCTIONS_FILTER: any = false
export const ENABLE_QUERY_BATCHING: any = false
// Enable/disable the entire rate limiting middleware
export const ENABLE_RATE_LIMITING: any = false
export const ENABLE_REQUEST_CONDITION_REPORT: any = false
export const ENABLE_SERVER_SIDE_CACHE: any = false
export const ENABLE_WEB_CRAWLING: any = false
export const EOY_2016_ARTICLE: any = "58472d93b7b31d00116f5ab0"
export const EOY_2016: any = "5829db77b5989e6f98f779a5"
export const FACEBOOK_APP_NAMESPACE: any = "artsyinc"
export const FACEBOOK_DOMAIN_VERIFICATION: any =
  "yeg3dqrlq548zc77ggvfipouil1l1e"
export const FACEBOOK_ID: any = null
export const FACEBOOK_SECRET: any = null
export const FAIR_CHANNEL_ID: any = "5759e4f3b5989e6f98f77998"
export const FORCE_CLOUDFRONT_URL: any = "https://d3vpvtm3t56z1n.cloudfront.net"
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
export const GOOGLE_MAPS_API_KEY: any = null
export const IMAGE_PROXY: any = "GEMINI"
export const IP_DENYLIST: any = ""
export const LINKEDIN_KEY: any = null
export const LINKEDIN_SECRET: any = null
export const MAILCHIMP_AUCTION_LIST_ID: any = "b7b9959ee0"
export const MAX_POLLS_FOR_MAX_BIDS: any = 20
export const MAX_SOCKETS: any = -1
export const METAPHYSICS_ENDPOINT: any =
  "https://metaphysics-production.artsy.net"
export const MOBILE_MARKETING_SIGNUP_MODALS: any =
  '[{"slug":"ca1","copy":"An art collection for every budget","image":"http://files.artsy.net/images/modal-collect-art.jpg"},{"slug":"ca2","copy":"Buy art from the best galleries and auction houses","image":"http://files.artsy.net/images/modal-collect-art.jpg"},{"slug":"ca3","copy":"Discover and Buy Works from Seattle Art Fair 2017","image":"http://files.artsy.net/images/seattle-art-fair-modal.jpg","photoCredit":"Sarah Cain, waves, 2016; Courtesy of the artist and Galerie Lelong & Co., New York"}]'
export const MOBILE_MEDIA_QUERY: any = "only screen and (max-width: 640px)"
export const NETWORK_CACHE_SIZE: any = 2000
export const NETWORK_CACHE_TTL: any = 3600000
export const NODE_ENV: any = "development"
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
export const PORT: any = 3003
export const POSITRON_URL: any = "http://writer.artsy.net"
export const PREDICTION_URL: any = "https://live.artsy.net"
export const RECAPTCHA_KEY: any = null
// The period in seconds to measure rate limits
export const REQUEST_EXPIRE: any = 60
// The maximum number of requests allowed by 1 IP in REQUEST_EXPOR
export const REQUEST_LIMIT: any = 300
// The amount of time the requesting ip has to wait before the in-memory rate limit is disabled
export const REQUEST_PER_INSTANCE_EXPIRE: any = 300
// If Redis fails, fall back to this amount of requests per force instance for rate limiting
export const REQUEST_PER_INSTANCE_FALLBACK: any = 60
// The process level rate limit. If a single instance of force hits this, it falls back to a performant in memory rate limiting strategy,
export const REQUEST_PER_INSTANCE_LIMIT: any = 301
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
export const VANITY_BUCKET: any = null
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
