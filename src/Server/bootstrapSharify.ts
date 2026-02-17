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
// eslint-disable-next-line
import sharify from "sharify"
import * as config from "./config"

export const bootstrapSharify = () => {
  const publicClientEnvVars = _.extend(
    _.pick(
      config,
      "ACTIVE_BIDS_POLL_INTERVAL",
      "ADMIN_URL",
      "AP",
      "API_REQUEST_TIMEOUT",
      "API_URL",
      "APP_URL",
      "APPLICATION_NAME",
      "ARTA_API_KEY",
      "ARTIST_PAGE_CTA_ARTIST_ID",
      "ARTIST_PAGE_CTA_ENABLED",
      "ARTSY_EDITORIAL_CHANNEL",
      "ARTSY_MERCHANDISING_PARTNER_SLUGS",
      "AUTHENTICATION_REDIRECT_TO",
      "AUTHENTICATION_REFERER",
      "AUTO_GRAVITY_LOGIN",
      "CASCADING_AUCTION_HELP_ARTICLE_LINK",
      "CDN_URL",
      "CMS_URL",
      "CURRENT_PATH",
      "CURRENT_USER",
      "DISABLE_IMAGE_PROXY",
      "EDITORIAL_PATHS",
      "ENABLE_CONVERSATIONS_MESSAGES_AUTO_REFRESH",
      "ENABLE_NEW_AUCTIONS_FILTER",
      "ENABLE_PREFETCH",
      "ENABLE_QUERY_BATCHING",
      "ENABLE_SERVER_DRIVEN_NAVIGATION",
      "ENABLE_SSR_STREAMING",
      "ENABLE_WEB_CRAWLING",
      "ENABLE_WEB_VITALS_LOGGING",
      "ERROR",
      "FACEBOOK_APP_NAMESPACE",
      "FACEBOOK_ID",
      "GALLERY_PARTNER_UPDATES_CHANNEL",
      "GEMINI_ACCOUNT_KEY",
      "GEMINI_APP",
      "GEMINI_CLOUDFRONT_URL",
      "GENOME_URL",
      "GEODATA_URL",
      "GOOGLE_ADWORDS_ID",
      "GOOGLE_ANALYTICS_ID",
      "GRAPHQL_CACHE_SIZE",
      "GRAPHQL_CACHE_TTL",
      "GRAVITY_WEBSOCKET_URL",
      "IMAGE_PROXY",
      "METAPHYSICS_ENDPOINT",
      "NODE_ENV",
      "NOTIFICATION_COUNT",
      "POSITRON_URL",
      "PREDICTION_URL",
      "PUBLIC_GOOGLE_MAPS_API_KEY",
      "RECAPTCHA_KEY",
      "RESET_PASSWORD_TOKEN",
      "S3_BUCKET",
      "SALESFORCE_MESSAGE_ENABLED",
      "SALESFORCE_MESSAGE_INSTANCE_URL",
      "SALESFORCE_MESSAGE_ORG_ID",
      "SALESFORCE_MESSAGE_SCRT2_URL",
      "SALESFORCE_MESSAGE_SERVICE_NAME",
      "SECURE_IMAGES_URL",
      "SEGMENT_AMP_WRITE_KEY",
      "SEGMENT_WRITE_KEY",
      "SENTRY_PUBLIC_DSN",
      "SHOW_ANALYTICS_CALLS",
      "SIFT_BEACON_KEY",
      "SITEMAP_BASE_URL",
      "SMARTY_EMBEDDED_KEY_JSON",
      "STRIPE_PUBLISHABLE_KEY",
      "TARGET_CAMPAIGN_URL",
      "TEAM_BLOGS",
      "THIRD_PARTIES_DISABLED,",
      "TOOLS_URL",
      "TRACK_PAGELOAD_PATHS",
      "UNLEASH_API_URL",
      "UNLEASH_APP_NAME",
      "UNLEASH_ENVIRONMENT",
      "UNLEASH_FRONTEND_KEY",
      "USER_PREFERENCES",
      "VOLLEY_ENDPOINT",
      "WEBFONT_URL",
      "X_THEME_HEADER",
    ),
  )

  // @ts-expect-error - sharify.data is "read only"
  sharify.data = publicClientEnvVars

  return publicClientEnvVars
}
