import type { RelayNetworkLayerResponse } from "react-relay-network-modern"
import type { SSRCache } from "react-relay-network-modern-ssr/lib/server"
import serialize from "serialize-javascript"

/**
 * Serializes the SSR Relay cache into a JavaScript literal that is safe to
 * inline inside a `<script>` tag. `serialize-javascript` escapes `<`, `>`,
 * `/` and the U+2028/U+2029 line terminators, so the output can be assigned
 * directly to `window.__RELAY_HYDRATION_DATA__` and consumed without any
 * further parsing on the client.
 */
export const serializeRelayHydrationData = (
  initialRelayData: SSRCache = [],
): string => {
  initialRelayData.forEach(entry => {
    entry.forEach((item: RelayNetworkLayerResponse) => {
      delete item._res // Remove unnecessary relay network data
    })
  })

  try {
    return serialize(initialRelayData, { isJSON: true })
  } catch (error) {
    console.error(
      "[system/router/serializeRelayHydrationData] Error serializing data:",
      error,
    )

    return serialize([], { isJSON: true })
  }
}
