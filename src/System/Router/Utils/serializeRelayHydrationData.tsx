import type { RelayNetworkLayerResponse } from "react-relay-network-modern"
import type { SSRCache } from "react-relay-network-modern-ssr/lib/server"
import serialize from "serialize-javascript"

export const serializeRelayHydrationData = (
  initialRelayData: SSRCache = [],
): string => {
  initialRelayData.forEach(entry => {
    entry.forEach((item: RelayNetworkLayerResponse) => {
      delete item._res // Remove unnecessary relay network data
    })
  })

  try {
    // Double pass to ensure that the data is serialized correctly
    // TODO: Fix this
    return serialize(serialize(initialRelayData, { isJSON: true }), {
      isJSON: true,
    })
  } catch (error) {
    console.error(
      "[system/router/serializeRelayHydrationData] Error serializing data:",
      error,
    )

    return serialize("[]", { isJSON: true })
  }
}
