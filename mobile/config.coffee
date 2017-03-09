#
# Using ["The Twelve-Factor App"](http://12factor.net/) as a reference
# all environment configuration will live in environment variables.
# This file simply lays out all of those environment variables with
# sensible defaults for development.
#

module.exports =
  NODE_ENV: 'development'
  CLIENT_ID: 'e750db60ac506978fc70'
  CLIENT_SECRET: '3a33d2085cbd1176153f99781bbce7c6'
  API_URL: 'http://localhost:3000'
  ARTSY_URL: 'https://www.artsy.net'
  APP_URL: 'http://localhost:3003'
  CALENDAR_URL: 'http://localhost:3003' # For redirecting to .ics files
  POSITRON_URL: 'http://writer.artsy.net'
  EUROPA_URL: 'http://europa-production.herokuapp.com'
  PORT: 3003
  S3_KEY: null
  S3_SECRET: null
  APPLICATION_NAME: 'microgravity-staging'
  SESSION_SECRET: 'artsyoss'
  SESSION_COOKIE_MAX_AGE: 31536000000
  COOKIE_DOMAIN: null
  SESSION_COOKIE_KEY: 'microgravity-sess'
  MIXPANEL_ID: null
  GOOGLE_ANALYTICS_ID: 'UA-12450662-6'
  GOOGLE_MAPS_API_KEY: null
  DEFAULT_CACHE_TIME: 3600
  FACEBOOK_APP_ID: null
  FACEBOOK_APP_SECRET: null
  TWITTER_CONSUMER_KEY: null
  TWITTER_CONSUMER_SECRET: null
  OPENREDIS_URL: null
  MAX_SOCKETS: -1
  SECURE_IMAGES_URL: 'https://d1ycxz9plii3tb.cloudfront.net'
  EMBEDLY_KEY: null
  EDITORIAL_ADMINS: 'craig,halley,marina,casey,molly,cab,charles'
  GALLERY_INSIGHTS_LIST: '95ac2900c4'
  STRIPE_PUBLISHABLE_KEY: null
  MAILCHIMP_KEY: null
  MAILCHIMP_AUCTION_LIST_ID: 'b7b9959ee0'
  SEGMENT_WRITE_KEY: null
  API_REQUEST_TIMEOUT: 5000
  PREDICTION_URL: 'https://live.artsy.net'
  METAPHYSICS_ENDPOINT: 'https://metaphysics-production.artsy.net'
  DISABLE_IMAGE_PROXY: false
  IMAGE_PROXY: 'GEMINI'
  GEMINI_CLOUDFRONT_URL: 'https://d7hftxdivxxvm.cloudfront.net'
  EMAIL_SIGNUP_IMAGES_ID: '572a7996b5989e6f98f77992'
  SAILTHRU_KEY: ''
  SAILTHRU_SECRET: ''
  SAILTHRU_MASTER_LIST: 'Master List'
  MAX_POLLS_FOR_MAX_BIDS: 20
  ARTSY_EDITORIAL_CHANNEL: '5759e3efb5989e6f98f77993'
  CRITEO_AUCTIONS_ACCOUNT_NUMBER: 28539
  CRITEO_ARTWORKS_ACCOUNT_NUMBER: 35250
  MARKETING_SIGNUP_MODALS: '[{"slug":"ca1","copy":"An art collection for every budget","image":"http://files.artsy.net/images/small-modal-interior-a.jpg","photoCredit":"Photo by Emily Johnson"},{"slug":"ca2","copy":"Buy art from the best galleries and auction houses","image":"http://files.artsy.net/images/small-modal-interior-a.jpg","photoCredit":"Photo by Emily Johnson"},{"slug":"ca3","copy":"An art collection for every budget","image":"http://files.artsy.net/images/small-modal-interior-b.jpg","photoCredit":"Photo by Emily Johnson"},{"slug":"ca4","copy":"Buy art from the best galleries and auction houses","image":"http://files.artsy.net/images/small-modal-interior-b.jpg","photoCredit":"Photo by Emily Johnson"}]'
  FAIR_CHANNEL_ID: '5759e4f3b5989e6f98f77998'
  S3_BUCKET: null

# Override any values with env variables if they exist.
# You can set JSON-y values for env variables as well such as "true" or
# "['foo']" and config will attempt to JSON.parse them into non-string types.
for key, val of module.exports
  val = (process.env[key] or val)
  module.exports[key] = try JSON.parse(val) catch then val

# Warn if this file is included client-side
alert("WARNING: Do not require config.coffee, please require('sharify').data instead.") if window?
