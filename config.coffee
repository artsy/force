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
  APP_URL: 'http://localhost:3004'
  MOBILE_URL: 'http://localhost:3003'
  CANONICAL_MOBILE_URL: 'http://m.artsy.net'
  CMS_URL: 'https://cms.artsy.net'
  ADMIN_URL: 'https://admin.artsy.net'
  ASSET_PATH: '/assets/'
  SESSION_SECRET: 'change-me'
  SESSION_COOKIE_MAX_AGE: 31536000000
  SESSION_COOKIE_KEY: 'force.sess'
  ARTSY_ID: null
  ARTSY_SECRET: null
  FACEBOOK_ID: 'facebook-id'
  FACEBOOK_SECRET: 'facebook-secret'
  TWITTER_KEY: 'twitter-key'
  TWITTER_SECRET: 'twitter-secret'
  EMBEDLY_KEY: null
  S3_KEY: null
  S3_SECRET: null
  NEW_RELIC_LICENSE_KEY: null
  MOBILE_MEDIA_QUERY: "only screen and (max-width: 640px)"
  FACEBOOK_APP_NAMESPACE: "artsyinc"
  DEFAULT_CACHE_TIME: 3600
  SECURE_IMAGES_URL: null
  IMAGES_URL_PREFIX: 'http://static%d.artsy.net'
  MIXPANEL_ID: null
  GOOGLE_ANALYTICS_ID: null
  COOKIE_DOMAIN: null
  REDIS_URL: null
  GOOGLE_MAPS_API_KEY: null
  REVEAL_ERRORS: 'production' != process.env['NODE_ENV']
  DELTA_HOST: 'delta.artsy.net'
  REFLECTION_URL: 'http://artsy-reflection.s3-website-us-east-1.amazonaws.com/__reflection/forceartsynet'
  USE_RESIZE_PROXY: true
  SITEMAP_BASE_URL: 'http://artsy-sitemaps.s3-website-us-east-1.amazonaws.com'
  ARTWORK_EMBED_URL: 'https://widgets.artsy.net/artwork/embed_link?url='
  ENABLE_AB_TEST: true
  KIOSK_MODE: false
  KIOSK_PAGE: false
  CLIENT_CACHE_ROUTES: null
  CLIENT_CACHE_TIME: 3600
  MAX_SOCKETS: -1
  SUGGESTIONS_AB_TEST: 'ab:home:suggestions'
  EMPTY_COLLECTION_SET_ID: null
  GEMINI_S3_ACCESS_KEY: null
  GEMINI_APP: 'http://localhost:3004'
  GEMINI_ACCOUNT_KEY: 'admin'
  BIDDER_H1_COPY: 'Please enter your credit card details'
  BIDDER_H2_COPY: 'NOTE: All bidders need to have a valid payment method on file. Winning bidders will have the opportunity to pay by credit card, check or wire transfer.'
  SENTRY_DSN: null
  IPHONE_APP_COPY: 'Download the iPhone app: https://itunes.apple.com/us/app/artsy-art-world-in-your-pocket/id703796080?ls=1&mt=8'
  TWILIO_NUMBER: null
  TWILIO_ACCOUNT_SID: null
  TWILIO_AUTH_TOKEN: null
  SENTRY_PUBLIC_DSN: null

# Override any values with env variables if they exist.
# You can set JSON-y values for env variables as well such as "true" or
# "['foo']" and config will attempt to JSON.parse them into non-string types.
for key, val of module.exports
  val = (process.env[key] or val)
  module.exports[key] = try JSON.parse(val) catch then val

# Warn if this file is included client-side
alert("WARNING: Do not require config.coffee, please require('sharify').data instead.") if window?
