import { QueryResponseCache } from "relay-runtime"
import { hydrateCacheFromSSR } from "../createRelaySSREnvironment"

describe("#hydrateCacheFromSSR", () => {
  const relayResponseCache = (new QueryResponseCache({
    size: 250,
    ttl: 1000,
  }) as any) as { _responses: Map<any, any> }

  it("does not update cache if no ssr data", () => {
    window.__RELAY_BOOTSTRAP__
    hydrateCacheFromSSR(relayResponseCache)
    expect(relayResponseCache._responses.size).toBe(0)
  })

  it("iterates over requests and populates cache", () => {
    const request = [
      [
        '{"queryID":"routes_OrderQuery1","variables":{"orderID":"ffc6a0b6-8a65-43d3-b599-89c756f54af5"}}',
        { id: 0 },
      ],
      [
        '{"queryID":"routes_OrderQuery2","variables":{"orderID":"ffc6a0b6-8a65-43d3-b599-89c756f54af5"}}',
        { id: 1 },
      ],
    ]
    window.__RELAY_BOOTSTRAP__ = JSON.stringify(request)
    hydrateCacheFromSSR(relayResponseCache)
    expect(relayResponseCache._responses.size).toBe(2)
    expect(relayResponseCache._responses.get(request[0][0]).payload.id).toBe(0)
    expect(relayResponseCache._responses.get(request[1][0]).payload.id).toBe(1)
  })
})
