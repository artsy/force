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
  ARTSY_EDITORIAL_CHANNEL: '5759e3efb5989e6f98f77993'
  ARTSY_ID: null
  ARTSY_SECRET: null
  BIDDER_H1_COPY: 'Please enter your credit card details'
  BIDDER_H2_COPY: 'NOTE: All bidders need to have a valid payment method on file. Winning bidders will have the opportunity to pay by credit card, check or wire transfer.'
  CDN_URL: 'https://d1s2w0upia4e9w.cloudfront.net'
  CMS_URL: 'https://cms.artsy.net'
  COLLECT_PAGE_TITLES_URL: 'https://s3.amazonaws.com/artsy-data/collect/collect.json'
  CONSIGNMENTS_APP_URL: null
  CONVECTION_APP_URL: null
  CONVECTION_APP_ID: null
  CONVECTION_GEMINI_APP: 'convection-staging'
  COOKIE_DOMAIN: null
  CRITEO_ARTWORKS_ACCOUNT_NUMBER: '35250'
  CRITEO_AUCTIONS_ACCOUNT_NUMBER: '28539'
  DEFAULT_CACHE_TIME: 3600
  DISABLE_IMAGE_PROXY: false
  EDITORIAL_ADMINS: ''
  EDITORIAL_CTA_BANNER_IMG: 'http://files.artsy.net/images/iphone_email.png'
  EMAIL_SIGNUP_IMAGES_ID: null
  EMBEDLY_KEY: 'a1f82558d8134f6cbebceb9e67d04980'
  EOY_2016_ARTICLE: null
  EOY_2016: '5829db77b5989e6f98f779a5'
  EF_VENICE: '58f5eb75faef6a3a8e7fe1ad'
  EF_GUCCI: '5a009372c88a280f5e9efa7e'
  EF_VIDEO_GUIDE: '5901d64b4682400017f0e3cb'
  FACEBOOK_APP_NAMESPACE: "artsyinc"
  FACEBOOK_DOMAIN_VERIFICATION: 'yeg3dqrlq548zc77ggvfipouil1l1e'
  FACEBOOK_ID: null
  FACEBOOK_SECRET: null
  GALAXY_PUBLISHABLE_TOKEN: null
  GALAXY_TOKEN: null
  GALAXY_URL: null
  GALLERY_INSIGHTS_CHANNEL: '5759e4a6b5989e6f98f77995'
  GALLERY_INSIGHTS_SECTION_ID: '55550be07b8a750300db8430'
  GALLERY_INSIGHTS_SLUG: 'gallery-insights'
  GALLERY_PARTNER_UPDATES_CHANNEL: '5762d454b5989e6f98f7799a'
  GEMINI_ACCOUNT_KEY: 'force-staging'
  GEMINI_APP: 'http://localhost:3004'
  GEMINI_CLOUDFRONT_URL: 'https://d7hftxdivxxvm.cloudfront.net'
  GEMINI_S3_ACCESS_KEY: null
  GENOME_URL: 'https://helix.artsy.net'
  GEODATA_URL: 'http://artsy-geodata.s3-website-us-east-1.amazonaws.com'
  GEOIP_ENDPOINT: 'https://artsy-geoip.herokuapp.com/'
  GOOGLE_MAPS_API_KEY: null
  IMAGE_PROXY: 'GEMINI'
  IPHONE_APP_COPY: 'Download the iPhone app: https://itunes.apple.com/us/app/artsy-art-world-in-your-pocket/id703796080?ls=1&mt=8'
  IP_BLACKLIST: ''
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
  PARSELY_SECRET: null
  PC_ARTSY_CHANNEL: '5759e508b5989e6f98f77999'
  PC_AUCTION_CHANNEL: '5759e4d7b5989e6f98f77997'
  PORT: 3004
  POSITRON_URL: 'http://localhost:3005'
  PREDICTION_URL: 'https://live.artsy.net'
  REFLECTION_URL: 'http://artsy-reflection.s3-website-us-east-1.amazonaws.com/__reflection/forceartsynet'
  REQUEST_EXPIRE_MS: 60000 # 1 minute
  REQUEST_LIMIT: 120
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
  SENTRY_PRIVATE_DSN: null,
  SENTRY_PUBLIC_DSN: null,
  SESSION_COOKIE_KEY: 'force.sess'
  SESSION_COOKIE_MAX_AGE: 31536000000
  SESSION_SECRET: 'change-me'
  SITEMAP_BASE_URL: 'http://artsy-sitemaps.s3-website-us-east-1.amazonaws.com'
  STRIPE_PUBLISHABLE_KEY: null
  TEAM_BLOGS: '^\/life-at-artsy$|^\/artsy-education$|^\/gallery-insights$|^\/buying-with-artsy$'
  TARGET_CAMPAIGN_URL: '/seattle-art-fair-2017'
  TWILIO_ACCOUNT_SID: null
  TWILIO_AUTH_TOKEN: null
  TWILIO_NUMBER: null
  TWITTER_KEY: null
  TWITTER_SECRET: null
  VANITY_BUCKET: null
  WEBFONT_URL: 'http://webfonts.artsy.net'
  WHITELISTED_VANITY_ASSETS: ''

# Override any values with env variables if they exist.
# You can set JSON-y values for env variables as well such as "true" or
# "['foo']" and config will attempt to JSON.parse them into non-string types.
for key, val of module.exports
  val = (process.env[key] or val)
  module.exports[key] = try JSON.parse(val) catch then val

# Warn if this file is included client-side
alert("WARNING: Do not require config.coffee, please require('sharify').data instead.") if window?
