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

sharify.data = _.extend _.pick(config, 'APP_URL', 'POSITRON_URL',
  'API_URL', 'NODE_ENV', 'MOBILE_MEDIA_QUERY', 'CANONICAL_MOBILE_URL',
  'MOBILE_URL', 'FACEBOOK_APP_NAMESPACE', 'FACEBOOK_ID', 'SECURE_IMAGES_URL',
  'IMAGES_URL_PREFIX', 'GOOGLE_ANALYTICS_ID', 'SNOWPLOW_COLLECTOR_HOST',
  'AUTO_GRAVITY_LOGIN', 'GOOGLE_MAPS_API_KEY', 'ADMIN_URL', 'GENOME_URL',
  'CMS_URL', 'DELTA_HOST', 'ENABLE_AB_TEST', 'EMPTY_COLLECTION_SET_ID',
  'GEMINI_S3_ACCESS_KEY', 'GEMINI_APP', 'GEMINI_ACCOUNT_KEY',
  'GEMINI_CLOUDFRONT_URL', 'DISABLE_GEMINI_PROXY', 'BIDDER_H1_COPY',
  'BIDDER_H2_COPY', 'SENTRY_PUBLIC_DSN', 'GOOGLE_SEARCH_CX', 'APPLICATION_NAME',
  'EMBEDLY_KEY', 'DISABLE_IMAGE_PROXY', 'SHOW_AUCTIONS_IN_HEADER', 'CDN_URL',
  'CHECK_FOR_AUCTION_REMINDER', 'EDITORIAL_ADMINS', 'STRIPE_PUBLISHABLE_KEY',
  'SEGMENT_WRITE_KEY', 'GALLERY_INSIGHTS_SLUG', 'GALLERY_INSIGHTS_LIST',
  'FUSION_URL', 'GALAXY_URL', 'GALAXY_PUBLISHABLE_TOKEN',
  'MAILCHIMP_WELCOME_LIST_ID', 'MAILCHIMP_AUCTION_LIST_ID'
), {
  JS_EXT: if config.NODE_ENV in ["production", "staging"] then \
    ".min.js.cgz" else ".js"
  CSS_EXT: if config.NODE_ENV in ["production", "staging"] then \
    ".min.css.cgz" else ".css"
}
