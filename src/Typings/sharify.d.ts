declare module "sharify" {
  function sharify(): void
  export = sharify

  namespace sharify {
    /**
     * Do **not** use this on the server-side to store/access data that’s related
     * to a single request. Instead use `Response.locals.sharify.data`, which is
     * data associated to individual requests.
     *
     * @see {ResponseLocals}
     */
    export const data: GlobalData

    /**
     * These properties are set by Force and configured through environment variables.
     *
     * TODO: Go through and cleanup all unused properties.
     * TODO: Grab types from setup_sharify
     */
    export interface GlobalData {
      ADMIN_URL: string
      ALLOWED_REDIRECT_HOSTS: string
      API_REQUEST_TIMEOUT?: number
      API_URL: string
      APP_PREFERENCES: AppPreferences
      APP_URL: string
      APPLICATION_NAME: string
      ARTIST_COLLECTIONS_RAIL?: string // TODO: remove after CollectionsRail a/b test
      ARTIST_PAGE_CTA_ARTIST_ID: string
      ARTIST_PAGE_CTA_ENABLED: string
      ARTSY_EDITORIAL_CHANNEL: string
      ARTSY_MERCHANDISING_PARTNER_SLUGS: string
      ARTSY_XAPP_TOKEN: string
      ARTWORK?: any // mobile artist app data
      AUCTION?: any
      AUTHENTICATION_REDIRECT_TO?: string
      AUTHENTICATION_REFERER?: string
      CASCADING_AUCTION_HELP_ARTICLE_LINK: string
      CDN_URL: string
      CHANNEL?: { slug?: string } // Articles
      CMS_URL: string
      CSRF_TOKEN: string
      CURRENT_PATH: string
      CURRENT_USER: User
      EIGEN: boolean
      ENABLE_CONVERSATIONS_MESSAGES_AUTO_REFRESH: boolean
      ENABLE_I18N_DEBUG: boolean
      ENABLE_NEW_AUCTIONS_FILTER: boolean
      ENABLE_QUERY_BATCHING: boolean
      ENABLE_SAVED_SEARCH: boolean
      ENABLE_SERVER_SIDE_CACHE: string
      ENABLE_WEB_CRAWLING: string
      FACEBOOK_APP_NAMESPACE: string
      FACEBOOK_ID: string
      FAIR_ORGANIZER?: any
      FAIR?: any // mobile fair app data
      FEATURE_FLAGS: any
      GEMINI_CLOUDFRONT_URL: string
      GENOME_URL: string
      GOOGLE_ADWORDS_ID: string
      GRAVITY_WEBSOCKET_URL: string
      IP_ADDRESS: string
      IS_GOOGLEBOT: boolean
      IS_MOBILE: boolean
      JSON_PAGE_DATA: any
      METAPHYSICS_ENDPOINT: string
      NETWORK_CACHE_SIZE: string
      NETWORK_CACHE_TTL: string
      NODE_ENV: string
      NOTIFICATION_COUNT: string
      PAGE_TYPE?: string
      PARTNER_NEW_LAYOUT?: boolean
      PARTNER_PROFILE?: any // mobile partner app data
      PATHS?: any // JSONPage
      POSITRON_URL: string
      PREDICTION_URL: string
      PROFILE?: any // mobile partner app data
      PUBLIC_GOOGLE_MAPS_API_KEY: string
      RECAPTCHA_KEY: string
      REQUEST_ID?: string
      RESET_PASSWORD_REDIRECT_TO: string
      RESET_PASSWORD_TOKEN: string
      SALESFORCE_CHAT_ENABLED: boolean
      SALESFORCE_CHAT_INSTANCE_URL: string
      SALESFORCE_CHAT_HELP_URL: string
      SALESFORCE_CHAT_ORG_ID: string
      SALESFORCE_CHAT_EMBEDDED_SERVICE_COLLECTOR_NAME: string
      SALESFORCE_CHAT_EMBEDDED_SERVICE_AUCTION_NAME: string
      SALESFORCE_CHAT_DEPLOYMENT_ID: string
      SALESFORCE_CHAT_LIVE_AGENT_URL: string
      SALESFORCE_CHAT_COLLECTOR_BUTTON_ID: string
      SALESFORCE_CHAT_AUCTION_BUTTON_ID: string
      SALESFORCE_CHAT_COLLECTOR_ESW_LIVE_AGENT_DEV_NAME: string
      SALESFORCE_CHAT_AUCTION_ESW_LIVE_AGENT_DEV_NAME: string
      SALESFORCE_CHAT_LIVE_AGENT_CONTENT_URL: string
      SECTION?: { slug?: string } // FIXME: used only for /venice-biennale-2015
      SEGMENT_WRITE_KEY: string
      SENTRY_PUBLIC_DSN: string
      SESSION_ID?: string
      SET_PASSWORD: string
      SHOW_ANALYTICS_CALLS: boolean
      SMARTY_EMBEDDED_KEY_JSON: { key: string }
      SIFT_BEACON_KEY: string
      STRIPE_PUBLISHABLE_KEY: string
      SUBMISSION_ARTIST_NAME: string
      SUBMISSION_ID: string
      SUBMISSION: string
      TARGET_CAMPAIGN_URL: string
      THIRD_PARTIES_DISABLED: boolean
      TRACK_PAGELOAD_PATHS: string
      USER_AGENT: string
      USER_PREFERENCES: any
      VOLLEY_ENDPOINT: string
      WEBFONT_URL: string
      XAPP_TOKEN: string

      // FORCE Tokens
      AP: {
        applePath?: string
        facebookPath?: string
        googlePath?: string
        signupPagePath?: string
        loginPagePath?: string
        logoutPath?: string
      }

      unleash: any

      // Injected by route when rendering a custom error page
      statusCode?: number
    }

    export interface ResponseLocalData extends GlobalData {
      RELAY_DATA?: any
      SUBMIT_URL?: string
      APP_TOKEN?: string
      SESSION_ID?: string
    }

    export interface ResponseLocal {
      /**
       * Request specific data. Use this to store data that’s to be used by other
       * parts of the stack during the processing of the remainder of the request
       * and to store data that’s to be made available to the client.
       */
      data: ResponseLocalData
      script: () => string
    }
  }
}
