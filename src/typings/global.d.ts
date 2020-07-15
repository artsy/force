interface Window {
  analytics?: {
    on: (eventName: string, callback?: () => void) => void
    page: (object, object) => void
    identify: (userId: string, email: string, object) => void
    track: (
      action: string,
      properties: object,
      getTrackingOptions?: object
    ) => void
    __artsyClientSideRoutingReferrer?: string
  }
  __BOOTSTRAP__?: any
}
