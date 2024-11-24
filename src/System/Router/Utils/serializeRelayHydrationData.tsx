import { RelayNetworkLayerResponse } from "react-relay-network-modern"
import { SSRCache } from "react-relay-network-modern-ssr/lib/server"
import serialize from "serialize-javascript"

export const serializeRelayHydrationData = (initialRelayData: SSRCache) => {
  initialRelayData.forEach(entry => {
    entry.forEach((item: RelayNetworkLayerResponse) => {
      // Clean relay data of problematic data structures
      delete item._res
    })
  })

  let hydrationData

  try {
    hydrationData = serialize(initialRelayData, {
      isJSON: true,
    })
  } catch (error) {
    hydrationData = "{}"

    console.error(
      "[system/router/serializeRelayHydrationData] Error serializing data:",
      error
    )
  }

  return serialize(hydrationData || {}, {
    isJSON: true,
  })
}
