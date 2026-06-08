import { hydrateCacheFromSSR } from "System/Relay/createRelaySSREnvironment"
import { QueryResponseCache } from "relay-runtime"

const retryMiddlewareMock = jest.fn(
  (_options: Record<string, unknown>) => next => req => next(req),
)

jest.mock("react-relay-network-modern/node8", () => {
  const actual = jest.requireActual("react-relay-network-modern/node8")

  return {
    ...actual,
    retryMiddleware: (options: Record<string, unknown>) =>
      retryMiddlewareMock(options),
  }
})

describe("#hydrateCacheFromSSR", () => {
  const relayResponseCache = new QueryResponseCache({
    size: 250,
    ttl: 1000,
  }) as any as { _responses: Map<any, any> }

  it("does not update cache if no ssr data", () => {
    window.__RELAY_HYDRATION_DATA__
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
    window.__RELAY_HYDRATION_DATA__ = JSON.stringify(request)
    hydrateCacheFromSSR(relayResponseCache)
    expect(relayResponseCache._responses.size).toBe(2)
    expect(relayResponseCache._responses.get(request[0][0]).payload.id).toBe(0)
    expect(relayResponseCache._responses.get(request[1][0]).payload.id).toBe(1)
  })
})

describe("#createRelaySSREnvironment", () => {
  beforeEach(() => {
    retryMiddlewareMock.mockClear()
    jest.resetModules()
  })

  it("configures retryMiddleware with the client retry policy", () => {
    const {
      createRelaySSREnvironment,
    } = require("System/Relay/createRelaySSREnvironment")

    createRelaySSREnvironment()

    expect(retryMiddlewareMock).toHaveBeenCalledTimes(1)

    const options = retryMiddlewareMock.mock.calls[0][0]

    expect(options).toMatchObject({
      fetchTimeout: 15000,
      retryDelays: [500, 1500],
      statusCodes: [502, 503, 504],
    })
    expect(typeof options.beforeRetry).toBe("function")
  })
})
