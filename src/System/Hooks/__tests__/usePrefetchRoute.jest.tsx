import { renderHook } from "@testing-library/react-hooks"
import { usePrefetchRoute } from "System/Hooks/usePrefetchRoute"
import { useRouter } from "System/Hooks/useRouter"
import { useSystemContext } from "System/Hooks/useSystemContext"
import { findRoutesByPath } from "System/Router/Utils/routeUtils"
import { take } from "es-toolkit"
import { fetchQuery } from "react-relay"

jest.mock("react-relay", () => ({
  fetchQuery: jest.fn(),
}))
jest.mock("System/Hooks/useRouter", () => ({
  useRouter: jest.fn(),
}))
jest.mock("System/Hooks/useSystemContext", () => ({
  useSystemContext: jest.fn(),
}))
jest.mock("System/Router/Utils/routeUtils", () => ({
  findRoutesByPath: jest.fn(),
}))
jest.mock("es-toolkit", () => ({
  ...jest.requireActual("es-toolkit"),
  take: jest.fn(),
}))
jest.mock("Utils/device", () => ({
  isDevelopment: true,
}))
jest.mock("Utils/getENV", () => ({
  getENV: jest.fn().mockReturnValue(true),
}))

describe("usePrefetchRoute", () => {
  const mockEnvironment = {}
  const mockMatch = { elements: true }
  const mockUseSystemContext = useSystemContext as jest.Mock
  const mockUseRouter = useRouter as jest.Mock
  const mockFindRoutesByPath = findRoutesByPath as jest.Mock
  const mockTake = take as jest.Mock
  const mockFetchQuery = fetchQuery as jest.Mock

  beforeEach(() => {
    jest.clearAllMocks()
    mockUseSystemContext.mockReturnValue({ relayEnvironment: mockEnvironment })
    mockUseRouter.mockReturnValue({ match: mockMatch })
  })

  it("should return null if prefetchDisabled is true", () => {
    mockUseRouter.mockReturnValueOnce({ match: { elements: null } })
    const { result } = renderHook(() =>
      usePrefetchRoute({ initialPath: "/test-path" }),
    )
    expect(result.current.prefetch()).toBeNull()
  })

  it("should return null if no path is provided", () => {
    const { result } = renderHook(() => usePrefetchRoute())
    expect(result.current.prefetch()).toBeNull()
  })

  it("should return an array of subscriptions", () => {
    const mockRoute = {
      match: { params: { id: "bar" } },
      route: {
        path: "/foo/:id",
        query: "TestQuery",
        prepareVariables: jest.fn().mockReturnValue({ id: "bar" }),
      },
    }
    const mockSubscription = { unsubscribe: jest.fn() }

    mockFindRoutesByPath.mockReturnValue([mockRoute])
    mockTake.mockReturnValue([mockRoute])
    mockFetchQuery.mockReturnValue({
      subscribe: jest.fn(() => mockSubscription),
    })

    const { result } = renderHook(() =>
      usePrefetchRoute({ initialPath: "/foo/bar" }),
    )

    const subscriptions = result.current.prefetch()
    expect(subscriptions).toHaveLength(1)
    expect(subscriptions?.[0]).toEqual(mockSubscription)
    expect(mockFetchQuery).toHaveBeenCalledWith(
      mockEnvironment,
      "TestQuery",
      { id: "bar", isPrefetched: true },
      expect.anything(),
    )
  })

  it("should prefetch if path is passed into prefetch(path)", () => {
    const mockRoute = {
      match: { params: { id: "bar" } },
      route: {
        path: "/foo/:id",
        query: "TestQuery",
        prepareVariables: jest.fn().mockReturnValue({ id: "bar" }),
      },
    }
    const mockSubscription = { unsubscribe: jest.fn() }

    mockFindRoutesByPath.mockReturnValue([mockRoute])
    mockTake.mockReturnValue([mockRoute])
    mockFetchQuery.mockReturnValue({
      subscribe: jest.fn(() => mockSubscription),
    })

    const { result } = renderHook(() => usePrefetchRoute())

    const subscriptions = result.current.prefetch("/foo/bar")
    expect(subscriptions).toHaveLength(1)
    expect(subscriptions?.[0]).toEqual(mockSubscription)
    expect(mockFetchQuery).toHaveBeenCalledWith(
      mockEnvironment,
      "TestQuery",
      { id: "bar", isPrefetched: true },
      expect.anything(),
    )
  })

  it("should handle errors during prefetch", () => {
    const mockRoute = {
      match: { params: { id: "bar" } },
      route: {
        path: "/foo/:id",
        query: "TestQuery",
        prepareVariables: jest.fn().mockReturnValue({ id: "bar" }),
      },
    }
    const mockError = new Error("Prefetch error")

    mockFindRoutesByPath.mockReturnValue([mockRoute])
    mockTake.mockReturnValue([mockRoute])
    mockFetchQuery.mockReturnValue({
      subscribe: jest.fn(({ error }) => error(mockError)),
    })

    console.error = jest.fn()

    const { result } = renderHook(() =>
      usePrefetchRoute({ initialPath: "/foo/bar" }),
    )
    result.current.prefetch()

    expect(console.error).toHaveBeenCalledWith(
      "[usePrefetchRoute] Error prefetching:",
      "/foo/bar",
    )
  })

  it("should log start and complete events", () => {
    const mockRoute = {
      match: { params: { id: "bar" } },
      route: {
        path: "/foo/:id",
        query: "TestQuery",
        prepareVariables: jest.fn().mockReturnValue({ id: "bar" }),
      },
    }
    const mockSubscription = { unsubscribe: jest.fn() }

    mockFindRoutesByPath.mockReturnValue([mockRoute])
    mockTake.mockReturnValue([mockRoute])
    mockFetchQuery.mockReturnValue({
      subscribe: jest.fn(({ start, complete }) => {
        start()
        complete()
        return mockSubscription
      }),
    })

    console.log = jest.fn()

    const { result } = renderHook(() =>
      usePrefetchRoute({ initialPath: "/foo/bar" }),
    )
    result.current.prefetch()

    expect(console.log).toHaveBeenCalledWith(
      "[usePrefetchRoute] Starting prefetch:",
      "/foo/bar",
    )
    expect(console.log).toHaveBeenCalledWith(
      "[usePrefetchRoute] Completed:",
      "/foo/bar",
    )
  })

  it("should call onComplete callback when prefetch is complete", () => {
    const mockRoute = {
      match: { params: { id: "bar" } },
      route: {
        path: "/foo/:id",
        query: "TestQuery",
      },
    }

    mockFindRoutesByPath.mockReturnValue([mockRoute])
    mockTake.mockReturnValue([mockRoute])
    console.log = jest.fn()

    const onComplete = jest.fn()

    const { result } = renderHook(() =>
      usePrefetchRoute({ initialPath: "/foo/bar", onComplete }),
    )
    result.current.prefetch()

    expect(onComplete).toHaveBeenCalled()
  })

  it("should pass along route TTLs to fetchQuery metadata", () => {
    const mockRoute = {
      match: { params: { id: "bar" } },
      route: {
        path: "/foo/:id",
        query: "TestQuery",
        prepareVariables: jest.fn().mockReturnValue({ id: "bar" }),
        serverCacheTTL: 1000,
      },
    }

    mockFindRoutesByPath.mockReturnValue([mockRoute])
    mockTake.mockReturnValue([mockRoute])
    console.log = jest.fn()

    const { result } = renderHook(() =>
      usePrefetchRoute({ initialPath: "/foo/bar" }),
    )
    result.current.prefetch()

    expect(mockFetchQuery).toHaveBeenCalledWith(
      {},
      "TestQuery",
      { id: "bar", isPrefetched: true },
      {
        fetchPolicy: "store-or-network",
        networkCacheConfig: { force: false, metadata: { maxAge: 1000 } },
      },
    )
  })
})
