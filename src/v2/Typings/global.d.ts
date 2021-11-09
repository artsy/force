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
    __RELAY_BOOTSTRAP__: string
    grecaptcha: any
    // FIXME: Add real type
    analytics: any
    desktopPageTimeTrackers: [
      {
        path: string
        reset: (path) => void
      }
    ]
    OnetrustActiveGroups: string
    OptanonWrapper: () => void
    // Zendesk integration for artwork app
    zEmbed: {
      show: () => void
      hide: () => void
    }
  }
}

// This is needed to conform to the module format, which requires to export something.
export {}
