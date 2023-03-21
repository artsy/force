//
// WARNING! READ BELOW.
//
// Before you add anything to this file think if it's sensitive. This data will
// be exposed on the client-side so it can not include things like sensitive
// API keys or other credentials that should only be used server-side.
//
// If it is sensitive configuration you should only add it to the config and
// require that file directly *only* server-side.
//
// See this doc for more details: https://github.com/artsy/force/blob/master/docs/env_configuration.md
//
import _ from "lodash"
import * as config from "./config"
// eslint-disable-next-line
import sharify from "sharify"

// @ts-ignore
sharify.data = _.extend(
  _.pick(
    config,
    "ACTIVE_BIDS_POLL_INTERVAL",
    "ADMIN_URL",
    "AP",
    "API_REQUEST_TIMEOUT",
    "API_URL",
    "APP_URL",
    "APPLICATION_NAME",
    "ARTIST_PAGE_CTA_ARTIST_ID",
    "ARTIST_PAGE_CTA_ENABLED",
    "ARTSY_EDITORIAL_CHANNEL",
    "ARTSY_MERCHANDISING_PARTNER_SLUGS",
    "AUCTION_ZENDESK_KEY",
    "AUTHENTICATION_REDIRECT_TO",
    "AUTHENTICATION_REFERER",
    "AUTO_GRAVITY_LOGIN",
    "CASCADING_AUCTION_HELP_ARTICLE_LINK",
    "CDN_URL",
    "CMS_URL",
    "CONVECTION_APP_ID",
    "CONVECTION_APP_URL",
    "CONVECTION_GEMINI_APP",
    "CURRENT_PATH",
    "CURRENT_USER",
    "DISABLE_IMAGE_PROXY",
    "EDITORIAL_PATHS",
    "ENABLE_I18N_DEBUG",
    "ENABLE_NEW_AUCTIONS_FILTER",
    "ENABLE_QUERY_BATCHING",
    "ENABLE_SAVED_SEARCH",
    "ENABLE_SERVER_SIDE_CACHE",
    "ENABLE_WEB_CRAWLING",
    "ERROR",
    "FACEBOOK_APP_NAMESPACE",
    "FACEBOOK_ID",
    "FEATURE_FLAGS",
    "GALLERY_PARTNER_UPDATES_CHANNEL",
    "GEMINI_ACCOUNT_KEY",
    "GEMINI_APP",
    "GEMINI_CLOUDFRONT_URL",
    "GENOME_URL",
    "GEODATA_URL",
    "GOOGLE_ADWORDS_ID",
    "GOOGLE_ANALYTICS_ID",
    "GRAVITY_WEBSOCKET_URL",
    "IMAGE_PROXY",
    "METAPHYSICS_ENDPOINT",
    "NETWORK_CACHE_SIZE",
    "NETWORK_CACHE_TTL",
    "NODE_ENV",
    "NOTIFICATION_COUNT",
    "ONETRUST_SCRIPT_ID",
    "POSITRON_URL",
    "PREDICTION_URL",
    "PUBLIC_GOOGLE_MAPS_API_KEY",
    "RECAPTCHA_KEY",
    "RESET_PASSWORD_TOKEN",
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
    "THIRD_PARTIES_DISABLED,",
    "TRACK_PAGELOAD_PATHS",
    "USER_PREFERENCES",
    "VOLLEY_ENDPOINT",
    "WEBFONT_URL",
    "ZENDESK_KEY"
  )
)
