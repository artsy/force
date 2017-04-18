#
# Using ["The Twelve-Factor App"](http://12factor.net/) as a reference
# all environment configuration will live in environment variables.
# This file simply lays out all of those environment variables with
# sensible defaults for development.
#

module.exports =
  API_REQUEST_TIMEOUT: 5000
  API_URL: 'http://localhost:3000'
  APPLICATION_NAME: 'microgravity-staging'
  APP_URL: 'http://localhost:3003'
  ARTSY_EDITORIAL_CHANNEL: '5759e3efb5989e6f98f77993'
  ARTSY_URL: 'https://www.artsy.net'
  CALENDAR_URL: 'http://localhost:3003' # For redirecting to .ics files
  CLIENT_ID: 'e750db60ac506978fc70'
  CLIENT_SECRET: '3a33d2085cbd1176153f99781bbce7c6'
  COOKIE_DOMAIN: null
  CRITEO_ARTWORKS_ACCOUNT_NUMBER: 35250
  CRITEO_AUCTIONS_ACCOUNT_NUMBER: 28539
  DEFAULT_CACHE_TIME: 3600
  DISABLE_IMAGE_PROXY: false
  EDITORIAL_ADMINS: 'craig,halley,marina,casey,molly,cab,charles'
  EMAIL_SIGNUP_IMAGES_ID: '572a7996b5989e6f98f77992'
  EMBEDLY_KEY: null
  EUROPA_URL: 'http://europa-production.herokuapp.com'
  FACEBOOK_ID: null
  FACEBOOK_SECRET: null
  FAIR_CHANNEL_ID: '5759e4f3b5989e6f98f77998'
  GALLERY_INSIGHTS_LIST: '95ac2900c4'
  GEMINI_CLOUDFRONT_URL: 'https://d7hftxdivxxvm.cloudfront.net'
  GOOGLE_ANALYTICS_ID: 'UA-12450662-6'
  GOOGLE_MAPS_API_KEY: null
  IMAGE_PROXY: 'GEMINI'
  MAILCHIMP_AUCTION_LIST_ID: 'b7b9959ee0'
  MAILCHIMP_KEY: null
  MARKETING_SIGNUP_MODALS: '[{"slug":"ca1","copy":"An art collection for every budget","image":"http://files.artsy.net/images/small-modal-interior-a.jpg","photoCredit":"Photo by Emily Johnson"},{"slug":"ca2","copy":"Buy art from the best galleries and auction houses","image":"http://files.artsy.net/images/small-modal-interior-a.jpg","photoCredit":"Photo by Emily Johnson"},{"slug":"ca3","copy":"An art collection for every budget","image":"http://files.artsy.net/images/small-modal-interior-b.jpg","photoCredit":"Photo by Emily Johnson"},{"slug":"ca4","copy":"Buy art from the best galleries and auction houses","image":"http://files.artsy.net/images/small-modal-interior-b.jpg","photoCredit":"Photo by Emily Johnson"}]'
  MAX_POLLS_FOR_MAX_BIDS: 20
  MAX_SOCKETS: -1
  METAPHYSICS_ENDPOINT: 'https://metaphysics-production.artsy.net'
  MIXPANEL_ID: null
  NODE_ENV: 'development'
  OPENREDIS_URL: null
  PORT: 3003
  POSITRON_URL: 'http://writer.artsy.net'
  PREDICTION_URL: 'https://live.artsy.net'
  S3_BUCKET: null
  S3_KEY: null
  S3_SECRET: null
  SAILTHRU_KEY: ''
  SAILTHRU_MASTER_LIST: 'Master List'
  SAILTHRU_SECRET: ''
  SECURE_IMAGES_URL: 'https://d1ycxz9plii3tb.cloudfront.net'
  SEGMENT_WRITE_KEY: null
  SENTRY_PRIVATE_DSN: null,
  SENTRY_PUBLIC_DSN: null,
  SESSION_COOKIE_KEY: 'microgravity-sess'
  SESSION_COOKIE_MAX_AGE: 31536000000
  SESSION_SECRET: 'artsyoss'
  STRIPE_PUBLISHABLE_KEY: null
  TWITTER_CONSUMER_KEY: null
  TWITTER_CONSUMER_SECRET: null

# Override any values with env variables if they exist.
# You can set JSON-y values for env variables as well such as "true" or
# "['foo']" and config will attempt to JSON.parse them into non-string types.
for key, val of module.exports
  val = (process.env[key] or val)
  module.exports[key] = try JSON.parse(val) catch then val

# Warn if this file is included client-side
alert("WARNING: Do not require config.coffee, please require('sharify').data instead.") if window?
