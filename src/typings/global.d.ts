interface Window {
  analytics?: {
    on: (action: string, cb: (nameOrData: any, data?: any) => void) => void
    page: (object, object) => void
    ready: (cb: () => void) => void
    reset: () => void
    identify: (userId: string, traits: object, object) => void
    track: (
      action: string,
      properties: object,
      getTrackingOptions?: object
    ) => void
    __artsyClientSideRoutingReferrer?: string
  }
  __BOOTSTRAP__?: any
  PARSELY?: any
  Sailthru?: any
}
