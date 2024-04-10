import Braze from "@braze/web-sdk"

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
    analytics?: {
      __artsyClientSideRoutingReferrer?: string
      identify: (userId: string, traits: object, object) => void
      initialized: boolean
      load: (writeKey: string, options: any) => void
      on: (
        action: string,
        cb: (nameOrData: any, data?: object, context?: object) => void
      ) => void
      page: (data: object, context: object) => void
      ready: (cb: () => void) => void
      reset: () => void
      track: (
        action: string,
        properties: object,
        getTrackingOptions?: object
      ) => void
    }
    __BOOTSTRAP__?: any
    __googleMapsCallback?: () => void
    __RELAY_BOOTSTRAP__: string
    _sift: any
    analytics: any
    braze?: typeof Braze
    desktopPageTimeTrackers: [{ path: string; reset: (path) => void }]
    embedded_svc?: any
    grecaptcha: any
    ReactNativeWebView?: { postMessage: (message: string) => void }
    sd: any
    // Zendesk properties
    zEmbed: { show: () => void; hide: () => void }
    zESettings: object
  }
}

// This is needed to conform to the module format, which requires to export something.
export {}
