#
# WARNING! READ BELOW.
#
# Before you add anything to this file think if it's sensitive. This data will
# be exposed on the client-side so it can not include things like sensitive
# API keys or other credentials that should only be used server-side.
#
# If it is sensitive configuration you should only add it to config.coffee and
# require that file directly *only* server-side.
#
_ = require 'underscore'
config = require '../config'
sharify = require 'sharify'

sharify.data = _.pick config,
  'NODE_ENV'
  'MIXPANEL_ID'
  'ARTSY_URL'
  'APP_URL'
  'API_URL'
  'APPLICATION_NAME'
  'GOOGLE_ANALYTICS_ID'
  'GOOGLE_MAPS_API_KEY'
  'SECURE_IMAGES_URL'
  'POSITRON_URL'
  'EMBEDLY_KEY'
  'EUROPA_URL'
  'EDITORIAL_ADMINS'
  'GALLERY_INSIGHTS_LIST'
  'SEGMENT_WRITE_KEY'
  'STRIPE_PUBLISHABLE_KEY'
  'ARTSY_EDITORIAL_CHANNEL'
  'ARTSY_URL'
  'CALENDAR_URL'
  'METAPHYSICS_ENDPOINT'
  'DISABLE_IMAGE_PROXY'
  'IMAGE_PROXY'
  'GEMINI_CLOUDFRONT_URL'
  'EMAIL_SIGNUP_IMAGES_ID'
  'PREDICTION_URL'
  'MAX_POLLS_FOR_MAX_BIDS'
  'CRITEO_AUCTIONS_ACCOUNT_NUMBER'
  'CRITEO_ARTWORKS_ACCOUNT_NUMBER'
  'MARKETING_SIGNUP_MODALS'
  'FAIR_CHANNEL_ID'
  'API_REQUEST_TIMEOUT'
