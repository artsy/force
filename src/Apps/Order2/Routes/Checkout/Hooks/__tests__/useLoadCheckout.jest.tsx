import { act, renderHook } from "@testing-library/react-hooks"
import type { useLoadCheckoutTestQuery } from "__generated__/useLoadCheckoutTestQuery.graphql"
import { useEffect } from "react"
import {
  RelayEnvironmentProvider,
  graphql,
  usePreloadedQuery,
  useQueryLoader,
} from "react-relay"
import {
  type MockEnvironment,
  MockPayloadGenerator,
  createMockEnvironment,
} from "relay-test-utils"
import { useLoadCheckout } from "../useLoadCheckout"

jest.unmock("react-relay")
let mockRelayEnv: MockEnvironment

jest.useFakeTimers()

beforeEach(() => {
  mockRelayEnv = createMockEnvironment()
  jest.clearAllMocks()
})

const mockOrder = {
  internalID: "order-id-123",
  lineItems: [
    {
      artworkVersion: {
        internalID: "artwork-version-1",
      },
    },
  ],
}

const QUERY = graphql`
  query useLoadCheckoutTestQuery @relay_test_operation {
    me {
      order(id: "order-id-123") {
        ...useLoadCheckout_order
      }
    }
  }
`

const setupHook = async orderData => {
  const hookResult = renderHook(
    () => {
      const [queryRef, loadQuery] = useQueryLoader(QUERY)

      useEffect(() => {
        loadQuery({})
      }, [loadQuery])

      // Always call usePreloadedQuery unconditionally
      const safeQueryRef = queryRef ?? ({} as any)
      const data = usePreloadedQuery<useLoadCheckoutTestQuery>(
        QUERY,
        safeQueryRef,
      )

      return useLoadCheckout(data.me?.order ?? null)
    },
    {
      wrapper: ({ children }) => (
        <RelayEnvironmentProvider environment={mockRelayEnv}>
          {children}
        </RelayEnvironmentProvider>
      ),
    },
  )

  await hookResult.waitFor(() => {
    act(() => {
      mockRelayEnv.mock.resolveMostRecentOperation(operation =>
        MockPayloadGenerator.generate(operation, {
          Me: () => ({
            order: orderData,
          }),
        }),
      )
    })
  })
  await hookResult.waitFor(() => {
    expect(() => hookResult.result.current.isLoading).not.toThrow()
  })

  return hookResult
}

describe("useLoadCheckout", () => {
  it("initializes with isLoading set to true", async () => {
    const { result } = await setupHook(mockOrder)
    expect(result.current.isLoading).toBe(true)
  })

  const passMinimumLoadingTime = () => {
    // This empty act seems necessary for the advanceTimersByTime to work
    // properly for some reason
    act(() => {})
    jest.advanceTimersByTime(1000)
  }

  const markExpressCheckoutLoaded = result => {
    act(() => {
      result.current.handleExpressCheckoutLoaded()
    })
  }

  it("enforces a minimum loading time + the `handleExpressCheckoutLoaded()` call", async () => {
    const hookResult = await setupHook(mockOrder)
    const { result, waitFor } = hookResult

    expect(result.current.isLoading).toBe(true)

    passMinimumLoadingTime()
    markExpressCheckoutLoaded(result)

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false)
    })
  })

  it("sets loadingError if order validation fails because there is no valid lineItem", async () => {
    const orderData = {
      ...mockOrder,
      lineItems: [
        {
          artworkVersion: null,
        },
      ],
    }

    const hookResult = await setupHook(orderData)
    const { result, waitFor } = hookResult

    passMinimumLoadingTime()
    markExpressCheckoutLoaded(result)

    await waitFor(() => {
      expect(result.current.loadingError).toBe("missing_line_item_data")
    })
  })
})
