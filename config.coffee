#
# Using ["The Twelve-Factor App"](http://12factor.net/) as a reference all
# environment configuration will live in environment variables. This file
# simply lays out all of those environment variables with sensible defaults
# for development.
#

module.exports =
  APPLICATION_NAME: 'force-staging'
  NODE_ENV: 'development'
  PORT: 3004
  API_URL: 'http://localhost:3000'
  POSITRON_URL: 'http://localhost:3005'
  FUSION_URL: null
  REQUEST_LIMIT: 120
  REQUEST_EXPIRE_MS: 60000 # 1 minute
  APP_URL: 'http://localhost:3004'
  MOBILE_URL: 'https://m.artsy.net'
  CMS_URL: 'https://cms.artsy.net'
  ADMIN_URL: 'https://admin.artsy.net'
  GENOME_URL: 'https://helix.artsy.net'
  SESSION_SECRET: 'change-me'
  SESSION_COOKIE_MAX_AGE: 31536000000
  SESSION_COOKIE_KEY: 'force.sess'
  ARTSY_ID: null
  ARTSY_SECRET: null
  FACEBOOK_ID: null
  FACEBOOK_SECRET: null
  LINKEDIN_KEY: null
  LINKEDIN_SECRET: null
  TWITTER_KEY: null
  TWITTER_SECRET: null
  EMBEDLY_KEY: 'a1f82558d8134f6cbebceb9e67d04980'
  S3_KEY: null
  S3_SECRET: null
  MOBILE_MEDIA_QUERY: "only screen and (max-width: 640px)"
  FACEBOOK_APP_NAMESPACE: "artsyinc"
  DEFAULT_CACHE_TIME: 3600
  SECURE_IMAGES_URL: null
  COOKIE_DOMAIN: null
  OPENREDIS_URL: null
  GOOGLE_MAPS_API_KEY: null
  REFLECTION_URL: 'http://artsy-reflection.s3-website-us-east-1.amazonaws.com/__reflection/forceartsynet'
  DISABLE_IMAGE_PROXY: false
  IMAGE_PROXY: 'GEMINI'
  MAX_SOCKETS: -1
  GEMINI_S3_ACCESS_KEY: null
  GEMINI_APP: 'http://localhost:3004'
  GEMINI_ACCOUNT_KEY: 'force-staging'
  GEMINI_CLOUDFRONT_URL: 'https://d7hftxdivxxvm.cloudfront.net'
  BIDDER_H1_COPY: 'Please enter your credit card details'
  BIDDER_H2_COPY: 'NOTE: All bidders need to have a valid payment method on file. Winning bidders will have the opportunity to pay by credit card, check or wire transfer.'
  IPHONE_APP_COPY: 'Download the iPhone app: https://itunes.apple.com/us/app/artsy-art-world-in-your-pocket/id703796080?ls=1&mt=8'
  TWILIO_NUMBER: null
  TWILIO_ACCOUNT_SID: null
  TWILIO_AUTH_TOKEN: null
  SENTRY_PUBLIC_DSN: null
  SEGMENT_WRITE_KEY: null
  API_REQUEST_TIMEOUT: 5000
  EDITORIAL_ADMINS: 'craig,halley,marina,casey,molly,kana'
  STRIPE_PUBLISHABLE_KEY: null
  GALLERY_INSIGHTS_SECTION_ID: '55550be07b8a750300db8430'
  GALLERY_INSIGHTS_SLUG: 'gallery-insights'
  GALAXY_URL: null
  GALAXY_PUBLISHABLE_TOKEN: null
  GALAXY_TOKEN: null
  METAPHYSICS_ENDPOINT: null
  ARTSY_EDITORIAL_CHANNEL: '5759e3efb5989e6f98f77993'
  SAILTHRU_KEY: null
  SAILTHRU_SECRET: null
  SAILTHRU_MASTER_LIST: 'Master List'
  SAILTHRU_AUCTION_NOTIFICATION_LIST: 'Auction Notifications'
  CONSIGNMENTS_APP_URL: null
  GEOIP_ENDPOINT: 'https://artsy-geoip.herokuapp.com/'
  ACTIVE_BIDS_POLL_INTERVAL: 5000
  MAX_POLLS_FOR_MAX_BIDS: 20
  PARSELY_KEY: null
  PARSELY_SECRET: null
  PREDICTION_URL: 'https://live.artsy.net'
  SEGMENT_WRITE_KEY_MICROGRAVITY: null
  GEODATA_URL: 'http://artsy-geodata.s3-website-us-east-1.amazonaws.com'
  EMAIL_SIGNUP_IMAGES_ID: null
  IP_BLACKLIST: ''
  CRITEO_AUCTIONS_ACCOUNT_NUMBER: '28539'
  CRITEO_ARTWORKS_ACCOUNT_NUMBER: '35250'
  APPLY_URL: 'http://apply.artsy.net'
  PC_ARTSY_CHANNEL: '5759e508b5989e6f98f77999'
  PC_AUCTION_CHANNEL: '5759e4d7b5989e6f98f77997'
  LOGGER_FORMAT: 'combined'
  GALLERY_INSIGHTS_CHANNEL: '5759e4a6b5989e6f98f77995'
  EOY_2016: '5829db77b5989e6f98f779a5'
  EDITORIAL_CTA_BANNER_IMG: 'http://files.artsy.net/images/iphone_email.png'
  ARTSY_PARTNER_UPDATES_CHANNEL: '5762d454b5989e6f98f7799a'
  TEAM_BLOGS: '^\/life-at-artsy$|^\/artsy-education$|^\/gallery-insights$|^\/artsy-partner-updates$'
  MARKETING_SIGNUP_MODALS: '[{"slug":"ca1","copy":"An art collection for every budget","image":"http://files.artsy.net/images/modal-interior-a-credited.jpg","photoCredit":"Photo by Emily Johnson"},{"slug":"ca2","copy":"Buy art from the best galleries and auction houses","image":"http://files.artsy.net/images/modal-interior-a-credited.jpg","photoCredit":"Photo by Emily Johnson"},{"slug":"ca3","copy":"An art collection for every budget","image":"http://files.artsy.net/images/modal-interior-b-credited.jpg","photoCredit":"Photo by Emily Johnson"},{"slug":"ca4","copy":"Buy art from the best galleries and auction houses","image":"http://files.artsy.net/images/modal-interior-b-credited.jpg","photoCredit":"Photo by Emily Johnson"}]'
  EOY_2016_ARTICLE: null
  EOY_2016_TEASER: 'https://artsy-vanity-files-production.s3.amazonaws.com/documents/year-in-art-teaser.html'
  RAYGUN_KEY: null
  FORCE_MERGE_URL: 'https://merged.artsy.net'
  FORCE_MERGE_WEIGHT: 0

# Override any values with env variables if they exist.
# You can set JSON-y values for env variables as well such as "true" or
# "['foo']" and config will attempt to JSON.parse them into non-string types.
for key, val of module.exports
  val = (process.env[key] or val)
  module.exports[key] = try JSON.parse(val) catch then val

# Warn if this file is included client-side
alert("WARNING: Do not require config.coffee, please require('sharify').data instead.") if window?
