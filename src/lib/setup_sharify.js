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
// See this doc for more details: https://github.com/artsy/force/blob/master/docs/adding_an_env_var.md
//
import _ from "underscore"
import config from "../config"
import sharify from "sharify"

sharify.data = _.extend(
  _.pick(
    config,
    "ACTIVE_BIDS_POLL_INTERVAL",
    "ADMIN_URL",
    "API_REQUEST_TIMEOUT",
    "API_URL",
    "APPLICATION_NAME",
    "APPLY_URL",
    "APP_URL",
    "ARTSY_EDITORIAL_CHANNEL",
    "ARTIST_COLLECTIONS_RAIL_IDS",
    "AUTO_GRAVITY_LOGIN",
    "BIDDER_INFO_COPY_P1",
    "BIDDER_INFO_COPY_P2",
    "CALENDAR_URL",
    "CDN_URL",
    "CMS_URL",
    "COLLECT_PAGE_TITLES_URL",
    "CONSIGNMENTS_APP_URL",
    "CONVECTION_APP_URL",
    "CONVECTION_APP_ID",
    "CONVECTION_GEMINI_APP",
    "DEPLOY_ENV",
    "DISABLE_IMAGE_PROXY",
    "EDITORIAL_PATHS",
    "EMAIL_SIGNUP_IMAGES_ID",
    "EMBEDLY_KEY",
    "ENABLE_INSTANT_PAGE",
    "ENABLE_WEB_CRAWLING",
    "EOY_2016_ARTICLE",
    "EOY_2016",
    "EF_GUCCI",
    "EF_VENICE",
    "EF_VIDEO_GUIDE",
    "FACEBOOK_APP_NAMESPACE",
    "FACEBOOK_ID",
    "FORCE_CLOUDFRONT_URL",
    "GALAXY_PUBLISHABLE_TOKEN",
    "GALAXY_URL",
    "GALLERY_INSIGHTS_CHANNEL",
    "GALLERY_PARTNER_UPDATES_CHANNEL",
    "GEMINI_ACCOUNT_KEY",
    "GEMINI_APP",
    "GEMINI_CLOUDFRONT_URL",
    "GENOME_URL",
    "GEODATA_URL",
    "GOOGLE_ANALYTICS_ID",
    "GOOGLE_MAPS_API_KEY",
    "GOOGLE_ADWORDS_ID",
    "IMAGE_LAZY_LOADING",
    "IMAGE_PROXY",
    "INTERCOM_SELLER_APP_ID",
    "INTERCOM_SELLER_ENABLED",
    "INTERCOM_BUYER_APP_ID",
    "INTERCOM_BUYER_ENABLED",
    "MARKETING_SIGNUP_MODALS",
    "MAX_POLLS_FOR_MAX_BIDS",
    "METAPHYSICS_ENDPOINT",
    "MOBILE_MARKETING_SIGNUP_MODALS",
    "MOBILE_MEDIA_QUERY",
    "NODE_ENV",
    "NOTIFICATION_COUNT",
    "PARSELY_KEY",
    "PC_ARTSY_CHANNEL",
    "PC_AUCTION_CHANNEL",
    "POSITRON_URL",
    "PREDICTION_URL",
    "RECAPTCHA_KEY",
    "S3_BUCKET",
    "SAILTHRU_MASTER_LIST",
    "SECURE_IMAGES_URL",
    "SEGMENT_AMP_WRITE_KEY",
    "SEGMENT_WRITE_KEY",
    "SENTRY_PUBLIC_DSN",
    "SITEMAP_BASE_URL",
    "SHOW_ANALYTICS_CALLS",
    "STRIPE_PUBLISHABLE_KEY",
    "TARGET_CAMPAIGN_URL",
    "TEAM_BLOGS",
    "TRACK_PAGELOAD_PATHS",
    "WEBFONT_URL",
    "VOLLEY_ENDPOINT"
  ),
  {
    JS_EXT: ["production", "staging"].includes(config.NODE_ENV)
      ? ".min.js.cgz"
      : ".js",
    CSS_EXT: ["production", "staging"].includes(config.NODE_ENV)
      ? ".min.css.cgz"
      : ".css",
  }
)
