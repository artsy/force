import type Braze from "@braze/web-sdk"
import React from "react"

declare global {
  interface Document {
    readonly fullscreenElement: Element | null
    readonly mozFullScreenElement: Element | null
    readonly mozFullScreenEnabled: boolean
    readonly msFullscreenElement: Element | null
    readonly msFullscreenEnabled: boolean
    readonly webkitFullscreenEnabled: boolean
    readonly webkitFullscreenElement: Element | null
    mozCancelFullScreen: () => void
    msExitFullscreen: () => void
    webkitExitFullscreen: () => void
  }

  interface Window {
    /** Copied from document.referrer early in the initial page load, for correct referer attribution */
    __artsyInitialReferrer: string | undefined

    __webpack_public_path__: string
    __getPublicPath: () => string
    __BOOTSTRAP__?: any
    __googleMapsCallback?: () => void
    __RELAY_HYDRATION_DATA__: string
    _sift: any
    analytics: any
    braze?: typeof Braze
    desktopPageTimeTrackers: [{ path: string; reset: (path) => void }]
    embeddedservice_bootstrap?: any
    grecaptcha: any
    ReactNativeWebView?: { postMessage: (message: string) => void }
    webkit?: {
      messageHandlers: {
        ReactNativeWebView?: {
          postMessage: (message: string) => void
        }
      }
    }
    sd: any
    // Zendesk properties
    zEmbed: { show: () => void; hide: () => void }
    zESettings: object

    analytics?: {
      __artsyClientSideRoutingReferrer?: string
      identify: (userId: string, traits: object, object) => void
      initialized: boolean
      load: (writeKey: string, options: any) => void
      on: (
        action: string,
        cb: (nameOrData: any, data?: object, context?: object) => void,
      ) => void
      page: (data: object, context: object) => void
      ready: (cb: () => void) => void
      reset: () => void
      track: (
        action: string,
        properties: object,
        getTrackingOptions?: object,
      ) => void
    }
    artsy: {
      enableLoggerInProd: () => void
      isLoggerEnabled?: boolean
    }
  }
}

declare module "react" {
  interface ImgHTMLAttributes<T> extends HTMLAttributes<T> {
    fetchPriority?: "high" | "low" | "auto"
  }
}
