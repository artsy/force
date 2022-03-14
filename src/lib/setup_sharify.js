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
// See this doc for more details: https://github.com/artsy/force/blob/master/docs/env_configuration.md
//
import _ from "lodash"
import * as config from "../config"
// eslint-disable-next-line
import sharify from "sharify"

/**
 * Attention! When adding new values be sure to update the allowlist in
 * v2/System/Server/sharifyHelpers
 *
 * TODO: Reset sharify when navigating between v2 apps and legacy so we don't
 * need to add ENV var keys to multiple places and instead can refer to canonical
 * files for each version of force.
 */

sharify.data = _.extend(
  _.pick(
    config,
    "ACTIVE_BIDS_POLL_INTERVAL",
    "ADMIN_URL",
    "API_REQUEST_TIMEOUT",
    "API_URL",
    "APP_URL",
    "APPLICATION_NAME",
    "ARTSY_EDITORIAL_CHANNEL",
    "ARTIST_GRID_MANUAL_CURATION_TRIAL", // TODO: remove once "artist_grid_manual_curation_trial" A/B test is over
    "AUCTION_ZENDESK_KEY",
    "AUTO_GRAVITY_LOGIN",
    "CDN_URL",
    "CMS_URL",
    "CONVECTION_APP_ID",
    "CONVECTION_APP_URL",
    "CONVECTION_GEMINI_APP",
    "DISABLE_IMAGE_PROXY",
    "EDITORIAL_PATHS",
    "EF_GUCCI",
    "EF_VENICE",
    "EF_VIDEO_GUIDE",
    "ENABLE_AUCTION_V2",
    "ENABLE_FAIR_PAGE_EXHIBITORS_TAB",
    "ENABLE_INSTANT_PAGE",
    "ENABLE_NEW_AUCTIONS_FILTER",
    "ENABLE_NEW_PRICE_FILTER",
    "ENABLE_QUERY_BATCHING",
    "ENABLE_SAVED_SEARCH",
    "ENABLE_SERVER_SIDE_CACHE",
    "ENABLE_WEB_CRAWLING",
    "ENABLE_YOUR_ALERTS_PAGE",
    "EOY_2016_ARTICLE",
    "EOY_2016",
    "FACEBOOK_APP_NAMESPACE",
    "FACEBOOK_ID",
    "FEATURE_FLAGS",
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
    "METAPHYSICS_ENDPOINT",
    "NETWORK_CACHE_SIZE",
    "NETWORK_CACHE_TTL",
    "NODE_ENV",
    "NOTIFICATION_COUNT",
    "ONETRUST_SCRIPT_ID",
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
  )
)
