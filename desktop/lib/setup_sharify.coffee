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

sharify.data = _.extend _.pick(config,
  'APP_URL'
  'POSITRON_URL'
  'API_URL'
  'NODE_ENV'
  'MOBILE_MEDIA_QUERY'
  'MOBILE_URL'
  'FACEBOOK_APP_NAMESPACE'
  'FACEBOOK_ID'
  'SECURE_IMAGES_URL',
  'AUTO_GRAVITY_LOGIN'
  'GOOGLE_MAPS_API_KEY'
  'ADMIN_URL'
  'GENOME_URL'
  'CMS_URL'
  'GEMINI_S3_ACCESS_KEY'
  'GEMINI_APP'
  'GEMINI_ACCOUNT_KEY'
  'GEMINI_CLOUDFRONT_URL'
  'BIDDER_H1_COPY'
  'BIDDER_H2_COPY'
  'SENTRY_PUBLIC_DSN'
  'APPLICATION_NAME'
  'EMBEDLY_KEY'
  'DISABLE_IMAGE_PROXY'
  'IMAGE_PROXY'
  'CDN_URL'
  'EDITORIAL_ADMINS'
  'STRIPE_PUBLISHABLE_KEY'
  'SEGMENT_WRITE_KEY'
  'GALLERY_INSIGHTS_SLUG'
  'FUSION_URL'
  'GALAXY_URL'
  'GALAXY_PUBLISHABLE_TOKEN'
  'METAPHYSICS_ENDPOINT'
  'GALLERY_INSIGHTS_SECTION_ID'
  'ARTSY_EDITORIAL_CHANNEL'
  'CONSIGNMENTS_APP_URL'
  'SAILTHRU_MASTER_LIST'
  'ACTIVE_BIDS_POLL_INTERVAL'
  'PREDICTION_URL'
  'SEGMENT_WRITE_KEY_MICROGRAVITY'
  'GEODATA_URL'
  'EMAIL_SIGNUP_IMAGES_ID'
  'CRITEO_AUCTIONS_ACCOUNT_NUMBER'
  'CRITEO_ARTWORKS_ACCOUNT_NUMBER'
  'MAX_POLLS_FOR_MAX_BIDS'
  'APPLY_URL'
  'PC_ARTSY_CHANNEL'
  'PC_AUCTION_CHANNEL'
  'GALLERY_INSIGHTS_CHANNEL'
  'EDITORIAL_CTA_BANNER_IMG'
  'ARTSY_PARTNER_UPDATES_CHANNEL'
  'TEAM_BLOGS'
  'MARKETING_SIGNUP_MODALS'
  'EOY_2016'
  'EOY_2016_ARTICLE'
  'RAYGUN_KEY'
  'API_REQUEST_TIMEOUT'
  'PARSELY_KEY'
), {
  JS_EXT: if config.NODE_ENV in ["production", "staging"] then \
    ".min.js.cgz" else ".js"
  CSS_EXT: if config.NODE_ENV in ["production", "staging"] then \
    ".min.css.cgz" else ".css"
}
