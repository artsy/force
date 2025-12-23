import { act, renderHook, waitFor } from "@testing-library/react"
import { CheckoutStepState } from "Apps/Order2/Routes/Checkout/CheckoutContext/types"
import {
  MAX_LOADING_MS,
  MIN_LOADING_MS,
  useLoadCheckout,
} from "Apps/Order2/Routes/Checkout/Hooks/useLoadCheckout"
import { useStripePaymentBySetupIntentId } from "Apps/Order2/Routes/Checkout/Hooks/useStripePaymentBySetupIntentId"
import type { Order2CheckoutContext_order$data } from "__generated__/Order2CheckoutContext_order.graphql"

// Mock dependencies
jest.mock("Apps/Order2/Routes/Checkout/Hooks/useStripePaymentBySetupIntentId")

jest.mock("react-relay", () => ({
  ...jest.requireActual("react-relay"),
  useFragment: jest.fn(),
}))

jest.mock("Apps/Order2/Routes/Checkout/Hooks/useCheckoutContext")

jest.mock("Utils/logger", () => {
  // Create logger mock
  const logger = {
    log: jest.fn(),
    warn: jest.fn(),
    error: jest.fn(),
  }
  return jest.fn(() => logger)
})

const loggerFactory = jest.requireMock("Utils/logger") as jest.Mock
const mockLogger = loggerFactory()

jest.useFakeTimers()

const mockSetLoadingComplete = jest.fn()
const mockSetCriticalCheckoutError = jest.fn()

const { useFragment } = jest.requireMock("react-relay")
const { useCheckoutContext } = jest.requireMock(
  "Apps/Order2/Routes/Checkout/Hooks/useCheckoutContext",
)

describe("useLoadCheckout", () => {
  const mockOrderData: Order2CheckoutContext_order$data = {
    internalID: "order-123",
    mode: "BUY",
    source: "inquiry",
    buyerStateExpiresAt: null,
    stripeConfirmationToken: null,
    selectedFulfillmentOption: null,
    lineItems: [
      {
        artworkVersion: {
          internalID: "artwork-version-123",
        },
        artwork: {
          slug: "artist-artwork",
        },
      },
    ],
  } as any

  let mockStripeCallback: (() => void) | null = null

  const mockOrder = {} as any // Fragment key

  beforeEach(() => {
    jest.clearAllMocks()
    mockStripeCallback = null

    // Setup useFragment mock to return mockOrderData
    useFragment.mockReturnValue(mockOrderData)

    // Setup default mocks
    ;(useStripePaymentBySetupIntentId as jest.Mock).mockImplementation(
      (_orderId, callback) => {
        mockStripeCallback = callback
      },
    )

    // Mock useCheckoutContext
    useCheckoutContext.mockReturnValue({
      isLoading: true,
      criticalCheckoutError: null,
      expressCheckoutPaymentMethods: null,
      steps: [{ state: CheckoutStepState.ACTIVE, name: "PAYMENT" }],
      setCriticalCheckoutError: mockSetCriticalCheckoutError,
      setLoadingComplete: mockSetLoadingComplete,
    })
  })

  afterEach(() => {
    document.body.style.overflow = ""
  })

  describe("scroll lock", () => {
    it("locks scroll when loading", () => {
      useCheckoutContext.mockReturnValue({
        isLoading: true,
        criticalCheckoutError: null,
        expressCheckoutPaymentMethods: null,
        steps: [],
        setCriticalCheckoutError: mockSetCriticalCheckoutError,
        setLoadingComplete: mockSetLoadingComplete,
      })

      renderHook(() => useLoadCheckout(mockOrder))

      expect(document.body.style.overflow).toBe("hidden")
    })

    it("unlocks scroll when loading completes", () => {
      let isLoading = true
      useCheckoutContext.mockImplementation(() => ({
        isLoading,
        criticalCheckoutError: null,
        expressCheckoutPaymentMethods: null,
        steps: [],
        setCriticalCheckoutError: mockSetCriticalCheckoutError,
        setLoadingComplete: mockSetLoadingComplete,
      }))

      const { rerender } = renderHook(() => useLoadCheckout(mockOrder))

      expect(document.body.style.overflow).toBe("hidden")

      // Simulate loading complete
      isLoading = false
      rerender()

      expect(document.body.style.overflow).toBe("")
    })

    it("cleans up scroll lock on unmount", () => {
      useCheckoutContext.mockReturnValue({
        isLoading: true,
        criticalCheckoutError: null,
        expressCheckoutPaymentMethods: null,
        steps: [],
        setCriticalCheckoutError: mockSetCriticalCheckoutError,
        setLoadingComplete: mockSetLoadingComplete,
      })

      const { unmount } = renderHook(() => useLoadCheckout(mockOrder))

      expect(document.body.style.overflow).toBe("hidden")

      unmount()

      expect(document.body.style.overflow).toBe("")
    })
  })

  describe("order validation", () => {
    it("validates order successfully with valid data", async () => {
      renderHook(() => useLoadCheckout(mockOrder))

      await waitFor(() => {
        expect(mockSetCriticalCheckoutError).not.toHaveBeenCalled()
      })
    })

    it("sets error when order has missing line item data", async () => {
      const invalidOrderData = {
        ...mockOrderData,
        lineItems: [],
      } as any

      useFragment.mockReturnValue(invalidOrderData)

      renderHook(() => useLoadCheckout(mockOrder))

      await waitFor(() => {
        expect(mockSetCriticalCheckoutError).toHaveBeenCalledWith(
          "missing_line_item_data",
        )
      })
    })

    it("sets error when line item has no artwork version", async () => {
      const invalidOrderData = {
        ...mockOrderData,
        lineItems: [{ artworkVersion: null }],
      } as any

      useFragment.mockReturnValue(invalidOrderData)

      renderHook(() => useLoadCheckout(mockOrder))

      await waitFor(() => {
        expect(mockSetCriticalCheckoutError).toHaveBeenCalledWith(
          "missing_line_item_data",
        )
      })
    })
  })

  describe("loading timeout", () => {
    it("sets loading_timeout error when MAX_LOADING_MS is exceeded", async () => {
      renderHook(() => useLoadCheckout(mockOrder))

      act(() => {
        jest.advanceTimersByTime(MAX_LOADING_MS)
      })

      await waitFor(() => {
        expect(mockSetCriticalCheckoutError).toHaveBeenCalledWith(
          "loading_timeout",
        )
      })

      expect(mockLogger.error).toHaveBeenCalled()
      const errorCall = mockLogger.error.mock.calls[0][0]
      expect(errorCall.message).toContain(
        `Checkout loading state exceeded ${MAX_LOADING_MS}ms timeout`,
      )
    })

    it("does not set timeout error if loading completes before MAX_LOADING_MS", async () => {
      let isLoading = true
      useCheckoutContext.mockImplementation(() => ({
        isLoading,
        criticalCheckoutError: null,
        expressCheckoutPaymentMethods: [],
        steps: [],
        setCriticalCheckoutError: mockSetCriticalCheckoutError,
        setLoadingComplete: mockSetLoadingComplete,
      }))

      const { rerender } = renderHook(() => useLoadCheckout(mockOrder))

      // Advance past minimum loading time
      act(() => {
        jest.advanceTimersByTime(MIN_LOADING_MS)
      })

      // Trigger stripe callback
      act(() => {
        mockStripeCallback?.()
      })

      // Loading completes
      isLoading = false
      rerender()

      // Advance to where timeout would fire
      act(() => {
        jest.advanceTimersByTime(MAX_LOADING_MS - MIN_LOADING_MS)
      })

      // Should call setLoadingComplete, not error
      await waitFor(() => {
        expect(mockSetLoadingComplete).toHaveBeenCalled()
      })
      expect(mockSetCriticalCheckoutError).not.toHaveBeenCalled()
    })
  })

  describe("loading completion", () => {
    it("completes loading when all conditions are met", async () => {
      let expressCheckoutLoaded = false

      useCheckoutContext.mockImplementation(() => ({
        isLoading: true,
        criticalCheckoutError: null,
        expressCheckoutPaymentMethods: expressCheckoutLoaded ? [] : null,
        steps: [],
        setCriticalCheckoutError: mockSetCriticalCheckoutError,
        setLoadingComplete: mockSetLoadingComplete,
      }))

      const { rerender } = renderHook(() => useLoadCheckout(mockOrder))

      // Advance minimum loading time
      act(() => {
        jest.advanceTimersByTime(MIN_LOADING_MS)
      })

      // Trigger stripe callback
      act(() => {
        mockStripeCallback?.()
      })

      // Express checkout loads
      expressCheckoutLoaded = true
      rerender()

      await waitFor(() => {
        expect(mockSetLoadingComplete).toHaveBeenCalled()
      })
    })

    it("does not complete loading if minimum time has not passed", () => {
      useCheckoutContext.mockReturnValue({
        isLoading: true,
        criticalCheckoutError: null,
        expressCheckoutPaymentMethods: [],
        steps: [],
        setCriticalCheckoutError: mockSetCriticalCheckoutError,
        setLoadingComplete: mockSetLoadingComplete,
      })

      renderHook(() => useLoadCheckout(mockOrder))

      // Trigger stripe callback
      act(() => {
        mockStripeCallback?.()
      })

      // Don't advance time - minimum not passed
      expect(mockSetLoadingComplete).not.toHaveBeenCalled()
    })

    it("does not complete loading if there is a critical error", async () => {
      useCheckoutContext.mockReturnValue({
        isLoading: true,
        criticalCheckoutError: "loading_timeout",
        expressCheckoutPaymentMethods: [],
        steps: [],
        setCriticalCheckoutError: mockSetCriticalCheckoutError,
        setLoadingComplete: mockSetLoadingComplete,
      })

      renderHook(() => useLoadCheckout(mockOrder))

      act(() => {
        jest.advanceTimersByTime(MIN_LOADING_MS)
        mockStripeCallback?.()
      })

      await waitFor(() => {
        expect(mockSetLoadingComplete).not.toHaveBeenCalled()
      })
    })
  })

  describe("stripe redirect handling", () => {
    it("handles stripe redirect callback", () => {
      renderHook(() => useLoadCheckout(mockOrder))

      expect(useStripePaymentBySetupIntentId).toHaveBeenCalledWith(
        "order-123",
        expect.any(Function),
      )

      // Callback should be stored
      expect(mockStripeCallback).not.toBeNull()
    })
  })
})
