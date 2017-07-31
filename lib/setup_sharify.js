//
// WARNING! READ BELOW.
//
// Before you add anything to this file think if it's sensitive. This data will
// be exposed on the client-side so it can not include things like sensitive
// API keys or other credentials that should only be used server-side.
//
// If it is sensitive configuration you should only add it to config.coffee and
// require that file directly *only* server-side.
//
import _ from 'underscore'
import config from '../config'
import sharify from 'sharify'

sharify.data = _.extend(_.pick(config,
  'ACTIVE_BIDS_POLL_INTERVAL',
  'ADMIN_URL',
  'API_REQUEST_TIMEOUT',
  'API_URL',
  'APPLICATION_NAME',
  'APPLY_URL',
  'APP_URL',
  'ARTSY_EDITORIAL_CHANNEL',
  'AUTO_GRAVITY_LOGIN',
  'BIDDER_H1_COPY',
  'BIDDER_H2_COPY',
  'CALENDAR_URL',
  'CDN_URL',
  'CMS_URL',
  'CONSIGNMENTS_APP_URL',
  'CONVECTION_APP_URL',
  'CONVECTION_APP_ID',
  'CONVECTION_GEMINI_APP',
  'CRITEO_ARTWORKS_ACCOUNT_NUMBER',
  'CRITEO_AUCTIONS_ACCOUNT_NUMBER',
  'DISABLE_IMAGE_PROXY',
  'EDITORIAL_ADMINS',
  'EDITORIAL_CTA_BANNER_IMG',
  'EMAIL_SIGNUP_IMAGES_ID',
  'EMBEDLY_KEY',
  'EOY_2016_ARTICLE',
  'EOY_2016',
  'EF_VENICE',
  'EF_VIDEO_GUIDE',
  'FACEBOOK_APP_NAMESPACE',
  'FACEBOOK_ID',
  'GALAXY_PUBLISHABLE_TOKEN',
  'GALAXY_URL',
  'GALLERY_INSIGHTS_CHANNEL',
  'GALLERY_INSIGHTS_SECTION_ID',
  'GALLERY_INSIGHTS_SLUG',
  'GALLERY_PARTNER_UPDATES_CHANNEL',
  'GEMINI_ACCOUNT_KEY',
  'GEMINI_APP',
  'GEMINI_CLOUDFRONT_URL',
  'GEMINI_S3_ACCESS_KEY',
  'GENOME_URL',
  'GEODATA_URL',
  'GOOGLE_ANALYTICS_ID',
  'GOOGLE_MAPS_API_KEY',
  'IMAGE_PROXY',
  'MARKETING_SIGNUP_MODALS',
  'MAX_POLLS_FOR_MAX_BIDS',
  'METAPHYSICS_ENDPOINT',
  'MOBILE_MARKETING_SIGNUP_MODALS',
  'MOBILE_MEDIA_QUERY',
  'MOBILE_URL',
  'NODE_ENV',
  'PARSELY_KEY',
  'PC_ARTSY_CHANNEL',
  'PC_AUCTION_CHANNEL',
  'POSITRON_URL',
  'PREDICTION_URL',
  'S3_BUCKET',
  'SAILTHRU_MASTER_LIST',
  'SECURE_IMAGES_URL',
  'SEGMENT_AMP_WRITE_KEY',
  'SEGMENT_WRITE_KEY',
  'SEGMENT_WRITE_KEY_MICROGRAVITY',
  'SENTRY_PUBLIC_DSN',
  'SITEMAP_BASE_URL',
  'STRIPE_PUBLISHABLE_KEY',
  'TARGET_CAMPAIGN_URL',
  'TEAM_BLOGS',
  'VENICE_2015_SECTION',
  'WEBFONT_URL'
), {
  JS_EXT: ['production', 'staging'].includes(config.NODE_ENV)
    ? '.min.js.cgz' : '.js',
  CSS_EXT: ['production', 'staging'].includes(config.NODE_ENV)
    ? '.min.css.cgz' : '.css'
})
