#
# Using ["The Twelve-Factor App"](http://12factor.net/) as a reference all
# environment configuration will live in environment variables. This file
# simply lays out all of those environment variables with sensible defaults
# for development.
#

module.exports =
  ACTIVE_BIDS_POLL_INTERVAL: 5000
  ADMIN_URL: 'https://admin.artsy.net'
  API_REQUEST_TIMEOUT: 5000
  API_URL: 'http://localhost:3000'
  APPLICATION_NAME: 'force-staging'
  APPLY_URL: 'http://apply.artsy.net'
  APP_URL: 'http://localhost:3004'
  ARTIST_COLLECTIONS_RAIL_IDS: null
  ARTSY_EDITORIAL_CHANNEL: '5759e3efb5989e6f98f77993'
  ARTSY_ID: null
  ARTSY_SECRET: null
  BIDDER_INFO_COPY_P1: 'Please enter your credit card information below. The name on your Artsy account must match the name on the card, and a valid credit card is required in order to bid.'
  BIDDER_INFO_COPY_P2: 'Registration is free. Artsy will never charge this card without your permission, and you are not required to use this card to pay if you win.'
  CDN_URL: 'https://d1s2w0upia4e9w.cloudfront.net'
  CMS_URL: 'https://cms.artsy.net'
  COLLECT_PAGE_TITLES_URL: 'https://s3.amazonaws.com/artsy-data/collect/collect.json'
  CONSIGNMENTS_APP_URL: null
  CONVECTION_APP_URL: null
  CONVECTION_APP_ID: null
  CONVECTION_GEMINI_APP: 'convection-staging'
  COOKIE_DOMAIN: null
  DD_TRACE_AGENT_HOSTNAME: 'localhost'
  DD_SERVICE_NAME: 'force'
  DEPLOY_ENV: null
  DEFAULT_CACHE_TIME: 3600
  DISABLE_IMAGE_PROXY: false
  ENABLE_INSTANT_PAGE: true,
  ENABLE_MEMORY_PROFILING: false
  ENABLE_WEB_CRAWLING: false
  EMAIL_SIGNUP_IMAGES_ID: null
  EMBEDLY_KEY: 'a1f82558d8134f6cbebceb9e67d04980'
  EOY_2016_ARTICLE: '58472d93b7b31d00116f5ab0'
  EOY_2016: '5829db77b5989e6f98f779a5'
  EF_VENICE: '58f5eb75faef6a3a8e7fe1ad'
  EF_GUCCI: '5a009372c88a280f5e9efa7e'
  EF_VIDEO_GUIDE: '5901d64b4682400017f0e3cb'
  FACEBOOK_APP_NAMESPACE: "artsyinc"
  FACEBOOK_DOMAIN_VERIFICATION: 'yeg3dqrlq548zc77ggvfipouil1l1e'
  FACEBOOK_ID: null
  FACEBOOK_SECRET: null
  FORCE_CLOUDFRONT_URL: 'https://d3vpvtm3t56z1n.cloudfront.net'
  GALAXY_PUBLISHABLE_TOKEN: null
  GALAXY_TOKEN: null
  GALAXY_URL: null
  GALLERY_INSIGHTS_CHANNEL: '5759e4a6b5989e6f98f77995' # Used to redirect to partners.artsy.net
  GALLERY_PARTNER_UPDATES_CHANNEL: '5762d454b5989e6f98f7799a'
  GEMINI_ACCOUNT_KEY: 'force-staging'
  GEMINI_APP: 'http://localhost:3004'
  GEMINI_CLOUDFRONT_URL: 'https://d7hftxdivxxvm.cloudfront.net'
  GENOME_URL: 'https://helix.artsy.net'
  GEODATA_URL: 'http://artsy-geodata.s3-website-us-east-1.amazonaws.com'
  GEOIP_ENDPOINT: 'https://artsy-geoip.herokuapp.com/'
  GOOGLE_ADWORDS_ID: null
  GOOGLE_MAPS_API_KEY: null
  INTERCOM_SELLER_APP_ID: null
  INTERCOM_SELLER_ENABLED: false
  INTERCOM_BUYER_APP_ID: null
  INTERCOM_BUYER_APP_SECRET: null
  INTERCOM_BUYER_ENABLED: false
  IMAGE_LAZY_LOADING: true
  IMAGE_PROXY: 'GEMINI'
  IPHONE_APP_COPY: 'Download the iPhone app: https://itunes.apple.com/us/app/artsy-art-world-in-your-pocket/id703796080?ls=1&mt=8'
  IP_DENYLIST: ''
  LINKEDIN_KEY: null
  LINKEDIN_SECRET: null
  MARKETING_SIGNUP_MODALS: '[{"slug":"ca1","copy":"An art collection for every budget","image":"http://files.artsy.net/images/modal-collect-art.jpg"},{"slug":"ca2","copy":"Buy art from the best galleries and auction houses","image":"http://files.artsy.net/images/modal-collect-art.jpg"},{"slug":"ca3","copy":"Discover and Buy Works from Seattle Art Fair 2017","image":"http://files.artsy.net/images/seattle-art-fair-modal.jpg","photoCredit":"Sarah Cain, waves, 2016; Courtesy of the artist and Galerie Lelong & Co., New York"}]'
  MAX_POLLS_FOR_MAX_BIDS: 20
  MAX_SOCKETS: -1
  METAPHYSICS_ENDPOINT: null
  MOBILE_MEDIA_QUERY: "only screen and (max-width: 640px)"
  MOBILE_URL: 'https://m.artsy.net'
  NODE_ENV: 'development'
  OPENREDIS_URL: null
  PARSELY_KEY: 'artsy.net'
  EDITORIAL_PATHS: '^\/article|^\/2016-year-in-art|^\/venice-biennale|^\/gender-equality|^\/series|^\/video|^\/news'
  PARSELY_SECRET: null
  PC_ARTSY_CHANNEL: '5759e508b5989e6f98f77999'
  PC_AUCTION_CHANNEL: '5759e4d7b5989e6f98f77997'
  PORT: 3004
  POSITRON_URL: 'http://localhost:3005'
  PREDICTION_URL: 'https://live.artsy.net'
  REFLECTION_URL: 'http://artsy-reflection.s3-website-us-east-1.amazonaws.com/__reflection/forceartsynet'
  RECAPTCHA_KEY: null,
  BURST_REQUEST_LIMIT: 15,            # Number of requests allowed per BURST_REQUEST_EXPIRE
  BURST_REQUEST_EXPIRE: 1,            # The period in seconds to measure burst requests
  BURST_REQUEST_BLOCK_FOR: 180,       # The number of seconds to block bursts after their limit is reached
  REQUEST_EXPIRE: 60                  # The period in seconds to measure rate limits
  REQUEST_LIMIT: 300                  # The maximum number of requests allowed by 1 IP in REQUEST_EXPOR
  REQUEST_PER_INSTANCE_FALLBACK: 60   # If Redis fails, fall back to this amount of requests per force instance for rate limiting
  REQUEST_PER_INSTANCE_LIMIT: 301     # The process level rate limit. If a single instance of force hits this, it falls back to a performant in memory rate limiting strategy
  REQUEST_PER_INSTANCE_EXPIRE: 300    # The amount of time the requesting ip has to wait before the in-memory rate limit is disabled
  ENABLE_RATE_LIMITING: false         # Enable/disable the entire rate limiting middleware
  S3_KEY: null
  S3_SECRET: null
  S3_BUCKET: null
  SAILTHRU_AUCTION_NOTIFICATION_LIST: 'Auction Notifications'
  SAILTHRU_KEY: null
  SAILTHRU_MASTER_LIST: 'Master List'
  SAILTHRU_SECRET: null
  SECURE_IMAGES_URL: null
  SEGMENT_AMP_WRITE_KEY: null
  SEGMENT_WRITE_KEY: null
  SEGMENT_WRITE_KEY_MICROGRAVITY: null
  SEGMENT_WRITE_KEY_SERVER: null
  SENTRY_PUBLIC_DSN: null
  SENTRY_PRIVATE_DSN: null
  SESSION_COOKIE_KEY: 'force.sess'
  SESSION_COOKIE_MAX_AGE: 31536000000
  SESSION_SECRET: 'change-me'
  SITEMAP_BASE_URL: 'http://artsy-sitemaps.s3-website-us-east-1.amazonaws.com'
  SHOW_ANALYTICS_CALLS: false
  STRIPE_PUBLISHABLE_KEY: null
  TEAM_BLOGS: '^\/life-at-artsy$|^\/artsy-education$|^\/buying-with-artsy$'
  TARGET_CAMPAIGN_URL: '/seattle-art-fair-2017'
  TRACK_PAGELOAD_PATHS: null
  TWILIO_ACCOUNT_SID: null
  TWILIO_AUTH_TOKEN: null
  TWILIO_NUMBER: null
  VANITY_BUCKET: null
  VOLLEY_ENDPOINT: null
  WEBFONT_URL: 'http://webfonts.artsy.net'
  ALLOWED_VANITY_ASSETS: ''
  VERBOSE_LOGGING: false

# Override any values with env variables if they exist.
# You can set JSON-y values for env variables as well such as "true" or
# "['foo']" and config will attempt to JSON.parse them into non-string types.
for key, val of module.exports
  val = (process.env[key] or val)
  module.exports[key] = try JSON.parse(val) catch then val

# Warn if this file is included client-side
if process.env.NODE_ENV isnt "test"
  alert("WARNING: Do not require config.coffee, please require('sharify').data instead.") if window?
