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
  PROXY_API_URL: null
  API_URL: 'http://localhost:3000'
  POSITRON_URL: 'http://localhost:3005'
  FUSION_URL: null
  APP_URL: 'http://localhost:3004'
  MOBILE_URL: 'http://localhost:3003'
  CANONICAL_MOBILE_URL: 'https://m.artsy.net'
  CMS_URL: 'https://cms.artsy.net'
  ADMIN_URL: 'https://admin.artsy.net'
  GENOME_URL: 'https://helix.artsy.net'
  SESSION_SECRET: 'change-me'
  SESSION_COOKIE_MAX_AGE: 31536000000
  SESSION_COOKIE_KEY: 'force.sess'
  ARTSY_ID: null
  ARTSY_SECRET: null
  FACEBOOK_ID: 'facebook-id'
  FACEBOOK_SECRET: 'facebook-secret'
  TWITTER_KEY: 'twitter-key'
  TWITTER_SECRET: 'twitter-secret'
  EMBEDLY_KEY: 'a1f82558d8134f6cbebceb9e67d04980'
  S3_KEY: null
  S3_SECRET: null
  ENABLE_NEWRELIC: true
  NEW_RELIC_LICENSE_KEY: null
  MOBILE_MEDIA_QUERY: "only screen and (max-width: 640px)"
  FACEBOOK_APP_NAMESPACE: "artsyinc"
  DEFAULT_CACHE_TIME: 3600
  SECURE_IMAGES_URL: null
  IMAGES_URL_PREFIX: 'http://static%d.artsy.net'
  GOOGLE_ANALYTICS_ID: null
  COOKIE_DOMAIN: null
  OPENREDIS_URL: null
  GOOGLE_MAPS_API_KEY: null
  REVEAL_ERRORS: 'production' != process.env['NODE_ENV']
  DELTA_HOST: 'delta.artsy.net'
  REFLECTION_URL: 'http://artsy-reflection.s3-website-us-east-1.amazonaws.com/__reflection/forceartsynet'
  DISABLE_IMAGE_PROXY: false
  SITEMAP_BASE_URL: 'http://artsy-sitemaps.s3-website-us-east-1.amazonaws.com'
  ENABLE_AB_TEST: true
  KIOSK_MODE: false
  KIOSK_PAGE: false
  MAX_SOCKETS: -1
  EMPTY_COLLECTION_SET_ID: null
  GEMINI_S3_ACCESS_KEY: null
  GEMINI_APP: 'http://localhost:3004'
  GEMINI_ACCOUNT_KEY: 'admin'
  GEMINI_CLOUDFRONT_URL: 'https://d7hftxdivxxvm.cloudfront.net'
  DISABLE_GEMINI_PROXY: false
  BIDDER_H1_COPY: 'Please enter your credit card details'
  BIDDER_H2_COPY: 'NOTE: All bidders need to have a valid payment method on file. Winning bidders will have the opportunity to pay by credit card, check or wire transfer.'
  SENTRY_DSN: null
  IPHONE_APP_COPY: 'Download the iPhone app: https://itunes.apple.com/us/app/artsy-art-world-in-your-pocket/id703796080?ls=1&mt=8'
  TWILIO_NUMBER: null
  TWILIO_ACCOUNT_SID: null
  TWILIO_AUTH_TOKEN: null
  SENTRY_PUBLIC_DSN: null
  GOOGLE_SEARCH_KEY: null
  GOOGLE_SEARCH_CX: null
  SEGMENT_WRITE_KEY: null
  SHOW_AUCTIONS_IN_HEADER: true
  API_REQUEST_TIMEOUT: 5000
  POST_TO_ARTICLE_SLUGS: []
  CHECK_FOR_AUCTION_REMINDER: false
  RESTART_INTERVAL: 1000 * 60 * 60
  EDITORIAL_ADMINS: 'craig,halley,marina,casey,molly'
  STRIPE_PUBLISHABLE_KEY: null
  MAILCHIMP_KEY: null
  GALLERY_INSIGHTS_SLUG: 'gallery-insights'
  GALLERY_INSIGHTS_LIST: null
  GALAXY_URL: null
  GALAXY_PUBLISHABLE_TOKEN: null
  GALAXY_TOKEN: null
  MAILCHIMP_WELCOME_LIST_ID: '8e345ac211'
  MAILCHIMP_AUCTION_LIST_ID: 'b7b9959ee0'

# Override any values with env variables if they exist.
# You can set JSON-y values for env variables as well such as "true" or
# "['foo']" and config will attempt to JSON.parse them into non-string types.
for key, val of module.exports
  val = (process.env[key] or val)
  module.exports[key] = try JSON.parse(val) catch then val

# Warn if this file is included client-side
alert("WARNING: Do not require config.coffee, please require('sharify').data instead.") if window?
