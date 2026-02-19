jest.mock("Server/isServer", () => ({
  isServer: true,
}))

import {
  __serverDrivenNavigationCacheMiddlewareTestUtils,
  serverDrivenNavigationCacheMiddleware,
} from "System/Relay/middleware/serverDrivenNavigationCacheMiddleware"

const createBuildAppRoutesRequest = ({
  cacheControl,
  requestedVersionState = "LIVE",
}: {
  cacheControl?: string
  requestedVersionState?: "LIVE" | "DRAFT"
} = {}) => {
  return {
    fetchOpts: {
      headers: cacheControl ? { "Cache-Control": cacheControl } : {},
    },
    operation: {
      name: "buildAppRoutesQuery",
      text: "query buildAppRoutesQuery($requestedVersionState: NavigationVersionState!) @cacheable { whatsNewNavigation: navigationVersion(groupID: \"whats-new\", state: $requestedVersionState) { id } }",
    },
    variables: {
      requestedVersionState,
    },
  }
}

describe("serverDrivenNavigationCacheMiddleware", () => {
  const next = jest.fn()

  beforeEach(() => {
    __serverDrivenNavigationCacheMiddlewareTestUtils.clear()
    jest.clearAllMocks()
  })

  it("caches buildAppRoutesQuery responses for LIVE navigation requests", async () => {
    next.mockResolvedValue({
      json: { data: { whatsNewNavigation: { id: "nav-1" } } },
      status: 200,
      statusText: "OK",
    })

    const middleware = serverDrivenNavigationCacheMiddleware()(next)

    const firstResponse = await middleware(createBuildAppRoutesRequest())
    firstResponse.json.data.whatsNewNavigation.id = "mutated"
    const secondResponse = await middleware(createBuildAppRoutesRequest())

    expect(next).toHaveBeenCalledTimes(1)
    expect(secondResponse).toEqual({
      json: { data: { whatsNewNavigation: { id: "nav-1" } } },
      status: 200,
      statusText: "OK",
    })
  })

  it("does not cache DRAFT navigation responses", async () => {
    next.mockResolvedValue({
      json: { data: { whatsNewNavigation: { id: "nav-draft" } } },
      status: 200,
      statusText: "OK",
    })

    const middleware = serverDrivenNavigationCacheMiddleware()(next)

    await middleware(
      createBuildAppRoutesRequest({ requestedVersionState: "DRAFT" }),
    )
    await middleware(
      createBuildAppRoutesRequest({ requestedVersionState: "DRAFT" }),
    )

    expect(next).toHaveBeenCalledTimes(2)
  })

  it("bypasses cache when request is marked no-cache", async () => {
    next.mockResolvedValue({
      json: { data: { whatsNewNavigation: { id: "nav-1" } } },
      status: 200,
      statusText: "OK",
    })

    const middleware = serverDrivenNavigationCacheMiddleware()(next)

    await middleware(createBuildAppRoutesRequest({ cacheControl: "no-cache" }))
    await middleware(createBuildAppRoutesRequest({ cacheControl: "no-cache" }))

    expect(next).toHaveBeenCalledTimes(2)
  })

  it("expires cache entries based on TTL", async () => {
    let now = 1000

    next.mockResolvedValue({
      json: { data: { whatsNewNavigation: { id: "nav-1" } } },
      status: 200,
      statusText: "OK",
    })

    const middleware = serverDrivenNavigationCacheMiddleware({
      now: () => now,
      ttl: 100,
    })(next)

    await middleware(createBuildAppRoutesRequest())
    now = 1050
    await middleware(createBuildAppRoutesRequest())
    now = 1200
    await middleware(createBuildAppRoutesRequest())

    expect(next).toHaveBeenCalledTimes(2)
  })

  it("deduplicates in-flight requests for the same cache key", async () => {
    let resolveResponse

    const deferredResponse = new Promise(resolve => {
      resolveResponse = resolve
    })

    next.mockImplementation(() => deferredResponse)

    const middleware = serverDrivenNavigationCacheMiddleware()(next)

    const firstPromise = middleware(createBuildAppRoutesRequest())
    const secondPromise = middleware(createBuildAppRoutesRequest())

    expect(next).toHaveBeenCalledTimes(1)

    resolveResponse({
      json: { data: { whatsNewNavigation: { id: "nav-1" } } },
      status: 200,
      statusText: "OK",
    })

    const [firstResponse, secondResponse] = await Promise.all([
      firstPromise,
      secondPromise,
    ])

    expect(firstResponse).toEqual({
      json: { data: { whatsNewNavigation: { id: "nav-1" } } },
      status: 200,
      statusText: "OK",
    })
    expect(secondResponse).toEqual({
      json: { data: { whatsNewNavigation: { id: "nav-1" } } },
      status: 200,
      statusText: "OK",
    })
  })
})
