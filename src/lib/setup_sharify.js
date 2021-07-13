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
    "APP_URL",
    "APPLICATION_NAME",
    "ARTIST_COLLECTIONS_RAIL_IDS",
    "ARTSY_EDITORIAL_CHANNEL",
    "AUCTION_ZENDESK_KEY",
    "AUTO_GRAVITY_LOGIN",
    "BIDDER_INFO_COPY_P1",
    "BIDDER_INFO_COPY_P2",
    "CALENDAR_URL",
    "CDN_URL",
    "CMS_URL",
    "COLLECT_PAGE_TITLES_URL",
    "CONSIGNMENTS_APP_URL",
    "CONVECTION_APP_ID",
    "CONVECTION_APP_URL",
    "CONVECTION_GEMINI_APP",
    "DEPLOY_ENV",
    "DISABLE_IMAGE_PROXY",
    "EDITORIAL_PATHS",
    "EF_GUCCI",
    "EF_VENICE",
    "EF_VIDEO_GUIDE",
    "EMAIL_SIGNUP_IMAGES_ID",
    "EMBEDLY_KEY",
    "ENABLE_INSTANT_PAGE",
    "ENABLE_NEW_AUCTIONS_FILTER",
    "ENABLE_REQUEST_CONDITION_REPORT",
    "ENABLE_SERVER_SIDE_CACHE",
    "ENABLE_QUERY_BATCHING",
    "ENABLE_WEB_CRAWLING",
    "EOY_2016_ARTICLE",
    "EOY_2016",
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
    "GOOGLE_ADWORDS_ID",
    "GOOGLE_ANALYTICS_ID",
    "GOOGLE_MAPS_API_KEY",
    "IMAGE_PROXY",
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
    "SECURE_IMAGES_URL",
    "SEGMENT_AMP_WRITE_KEY",
    "SEGMENT_WRITE_KEY",
    "SENTRY_PUBLIC_DSN",
    "SHOW_ANALYTICS_CALLS",
    "SIFT_BEACON_KEY",
    "SITEMAP_BASE_URL",
    "STRIPE_PUBLISHABLE_KEY",
    "TARGET_CAMPAIGN_URL",
    "TEAM_BLOGS",
    "THIRD_PARTIES_DISABLED",
    "TRACK_PAGELOAD_PATHS",
    "VOLLEY_ENDPOINT",
    "WEBFONT_URL",
    "ZENDESK_KEY"
  ),
  {
    CSS_EXT: ["production", "staging"].includes(config.NODE_ENV)
      ? ".min.css.cgz"
      : ".css",
    JS_EXT: ["production", "staging"].includes(config.NODE_ENV)
      ? ".min.js.cgz"
      : ".js",
  }
)
