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
     */
    export interface GlobalData {
      readonly ADMIN_URL: string
      readonly ALLOWED_REDIRECT_HOSTS: string
      readonly APP_URL: string
      readonly ARTIST_COLLECTIONS_RAIL?: string // TODO: remove after CollectionsRail a/b test
      readonly ARTIST_GRID_MANUAL_CURATION_TRIAL: string // TODO: remove once "artist_grid_manual_curation_trial" A/B test is over
      readonly CDN_URL: string
      readonly CMS_URL: string
      CURRENT_PATH: string
      CURRENT_USER: User
      EIGEN: boolean
      readonly ENABLE_FAIR_PAGE_EXHIBITORS_TAB: boolean
      readonly ENABLE_SAVED_SEARCH: boolean
      readonly ENABLE_NEW_AUCTIONS_FILTER: boolean
      readonly ENABLE_NEW_PRICE_FILTER: boolean
      readonly ENABLE_QUERY_BATCHING: boolean
      readonly ENABLE_SERVER_SIDE_CACHE: string
      readonly ENABLE_YOUR_ALERTS_PAGE: boolean
      readonly FACEBOOK_APP_NAMESPACE: string
      readonly FACEBOOK_ID: string
      readonly FEATURE_FLAGS: any
      readonly GEMINI_CLOUDFRONT_URL: string
      readonly GENOME_URL: string
      readonly GOOGLE_ADWORDS_ID: string
      IS_GOOGLEBOT: boolean
      IS_MOBILE: boolean
      IP_ADDRESS: string
      readonly METAPHYSICS_ENDPOINT: string
      readonly NETWORK_CACHE_SIZE: string
      readonly NETWORK_CACHE_TTL: string
      readonly NODE_ENV: string
      readonly NOTIFICATION_COUNT: string
      readonly ONETRUST_SCRIPT_ID: string
      readonly PREDICTION_URL: string
      readonly RECAPTCHA_KEY: string
      readonly SEGMENT_WRITE_KEY: string
      readonly SENTRY_PUBLIC_DSN: string
      readonly SHOW_ANALYTICS_CALLS: boolean
      readonly SIFT_BEACON_KEY: string
      readonly STRIPE_PUBLISHABLE_KEY: string
      readonly THIRD_PARTIES_DISABLED: boolean
      readonly VOLLEY_ENDPOINT: string
      readonly WEBFONT_URL: string
      readonly XAPP_TOKEN: string
      readonly GOOGLE_MAPS_API_KEY: string
      readonly ZENDESK_KEY: string
      readonly AUCTION_ZENDESK_KEY: string

      // FORCE Tokens
      AP: {
        applePath?: string
        facebookPath?: string
        googlePath?: string
        signupPagePath?: string
        loginPagePath?: string
        logoutPath?: string
      }
      API_REQUEST_TIMEOUT?: number
      API_URL: string
      APPLICATION_NAME: string
      ARTIST_PAGE_CTA_ARTIST_ID: string
      ARTIST_PAGE_CTA_ENABLED: string
      ARTSY_EDITORIAL_CHANNEL: string
      ARTSY_XAPP_TOKEN: string
      ARTWORK?: any // mobile artist app data
      AUCTION?: any
      AUTHENTICATION_REDIRECT_TO?: string
      AUTHENTICATION_REFERER?: string
      CSRF_TOKEN: string
      CHANNEL?: { slug?: string } // Articles
      FAIR?: any // mobile fair app data
      FAIR_ORGANIZER?: any
      GALLERY_INSIGHTS_CHANNEL: string
      JSON_PAGE_DATA: any
      MARKETING_SIGNUP_MODALS: any
      MARKETING_SIGNUP_MODALS: any[]
      PAGE_TYPE?: string
      PARTNER_NEW_LAYOUT?: boolean
      PARTNER_PROFILE?: any // mobile partner app data
      PATHS?: any // JSONPage
      PC_ARTSY_CHANNEL: string
      PC_AUCTION_CHANNEL: string
      POSITRON_URL: string
      PROFILE?: any // mobile partner app data
      REQUEST_ID?: string
      RESET_PASSWORD_REDIRECT_TO: string
      SECTION?: { slug?: string } // FIXME: used only for /venice-biennale-2015
      SESSION_ID?: string
      SET_PASSWORD: string
      SHOW_ANALYTICS_CALLS: boolean
      SUBMISSION: string
      SUBMISSION_ID: string
      SUBMISSION_ARTIST_NAME: string
      TARGET_CAMPAIGN_URL: string
      TRACK_PAGELOAD_PATHS: string
      // FIXME: reaction migration
      stitch: any
      unleash: any
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
