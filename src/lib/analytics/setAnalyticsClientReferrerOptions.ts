/**
 * Grabs referrer from v2 trackingMiddleware.
 * In single-page-app context, value needs to refresh on route changes
 * See: https://github.com/artsy/force/blob/master/src/v2/Artsy/Analytics/trackingMiddleware.ts
 * @param options page/referrer properties object, NOT event data
 */
export const setAnalyticsClientReferrerOptions = (options: object = {}) => {
  // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
  const referrer = window.analytics.__artsyClientSideRoutingReferrer
  let trackingOptions = options

  if (referrer) {
    trackingOptions = {
      page: {
        referrer,
      },
    }
  }
  return trackingOptions
}
