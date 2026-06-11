import { act, renderHook, waitFor } from "@testing-library/react"
import { setNavigationGuardsEnabled } from "Apps/Order2/Order2App"
import { CheckoutStepState } from "Apps/Order2/Routes/Checkout/CheckoutContext/types"
import {
  MAX_LOADING_MS,
  MIN_LOADING_MS,
  useLoadCheckout,
} from "Apps/Order2/Routes/Checkout/Hooks/useLoadCheckout"
import type { Order2CheckoutContext_order$data } from "__generated__/Order2CheckoutContext_order.graphql"

// Mock dependencies
jest.mock("Apps/Order2/Order2App", () => ({
  setNavigationGuardsEnabled: jest.fn(),
}))

jest.mock("react-relay", () => ({
  ...jest.requireActual("react-relay"),
  useFragment: jest.fn(),
}))

jest.mock("Apps/Order2/Routes/Checkout/Hooks/useCheckoutContext")
jest.mock("Apps/Order2/Routes/Checkout/Hooks/useCheckoutModal")

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
const mockSetExpressCheckoutLoaded = jest.fn()
const mockShowCheckoutErrorModal = jest.fn()

const { useFragment } = jest.requireMock("react-relay")
const { useCheckoutContext } = jest.requireMock(
  "Apps/Order2/Routes/Checkout/Hooks/useCheckoutContext",
)
const { useCheckoutModal } = jest.requireMock(
  "Apps/Order2/Routes/Checkout/Hooks/useCheckoutModal",
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

  const mockOrder = {} as any // Fragment key

  beforeEach(() => {
    jest.clearAllMocks()

    // Setup useFragment mock to return mockOrderData
    useFragment.mockReturnValue(mockOrderData)

    // Mock useCheckoutContext
    useCheckoutContext.mockReturnValue({
      isLoading: true,
      expressCheckoutPaymentMethods: null,
      steps: [{ state: CheckoutStepState.ACTIVE, name: "PAYMENT" }],
      setLoadingComplete: mockSetLoadingComplete,
      setExpressCheckoutLoaded: mockSetExpressCheckoutLoaded,
    })

    // Mock useCheckoutModal
    useCheckoutModal.mockReturnValue({
      checkoutModalError: null,
      showCheckoutErrorModal: mockShowCheckoutErrorModal,
    })
  })

  afterEach(() => {
    document.body.style.removeProperty("overflow")
    document.body.style.removeProperty("padding-right")
  })

  describe("scroll lock", () => {
    it("locks scroll when loading", () => {
      useCheckoutContext.mockReturnValue({
        isLoading: true,
        expressCheckoutPaymentMethods: null,
        steps: [],
        setLoadingComplete: mockSetLoadingComplete,
      })

      renderHook(() => useLoadCheckout(mockOrder))

      expect(document.body.style.overflow).toBe("hidden")
      expect(document.body.style.paddingRight).toBe("1024px")
    })

    it("unlocks scroll when loading completes", () => {
      let isLoading = true
      useCheckoutContext.mockImplementation(() => ({
        isLoading,
        expressCheckoutPaymentMethods: null,
        steps: [],
        setLoadingComplete: mockSetLoadingComplete,
      }))

      const { rerender } = renderHook(() => useLoadCheckout(mockOrder))

      expect(document.body.style.overflow).toBe("hidden")
      expect(document.body.style.paddingRight).toBe("1024px")

      // Simulate loading complete
      isLoading = false
      rerender()

      expect(document.body.style.overflow).toBe("")
      expect(document.body.style.paddingRight).toBe("")
    })

    it("cleans up scroll lock on unmount", () => {
      useCheckoutContext.mockReturnValue({
        isLoading: true,
        expressCheckoutPaymentMethods: null,
        steps: [],
        setLoadingComplete: mockSetLoadingComplete,
      })

      const { unmount } = renderHook(() => useLoadCheckout(mockOrder))

      expect(document.body.style.overflow).toBe("hidden")
      expect(document.body.style.paddingRight).toBe("1024px")

      unmount()

      expect(document.body.style.overflow).toBe("")
      expect(document.body.style.paddingRight).toBe("")
    })
  })

  describe("order validation", () => {
    it("validates order successfully with valid data", async () => {
      renderHook(() => useLoadCheckout(mockOrder))

      await waitFor(() => {
        expect(mockShowCheckoutErrorModal).not.toHaveBeenCalled()
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
        expect(mockShowCheckoutErrorModal).toHaveBeenCalledWith({
          error: "missing_line_item_data",
        })
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
        expect(mockShowCheckoutErrorModal).toHaveBeenCalledWith({
          error: "missing_line_item_data",
        })
      })
    })
  })

  describe("loading timeout", () => {
    it("degrades gracefully without a modal when only Express Checkout is stuck", async () => {
      // All other flags are good — only expressCheckoutPaymentMethods stays null.
      // This is the Eigen-webview shape: Stripe.js never resolves the
      // Express Checkout element, but the rest of the checkout is healthy.
      useCheckoutContext.mockReturnValue({
        isLoading: true,
        expressCheckoutPaymentMethods: null,
        steps: [],
        setLoadingComplete: mockSetLoadingComplete,
        setExpressCheckoutLoaded: mockSetExpressCheckoutLoaded,
      })

      renderHook(() => useLoadCheckout(mockOrder))

      // Pass the minimum-loading gate.
      act(() => {
        jest.advanceTimersByTime(MIN_LOADING_MS)
      })

      // Advance past the deadline; Express Checkout never loaded.
      act(() => {
        jest.advanceTimersByTime(MAX_LOADING_MS - MIN_LOADING_MS)
      })

      await waitFor(() => {
        expect(mockLogger.error).toHaveBeenCalled()
      })

      // Log fires with the *current* flag state so we can diagnose which
      // flag was stuck, instead of always reporting all-false.
      const errorMessage = mockLogger.error.mock.calls[0][0].message
      expect(errorMessage).toContain("minimumLoadingPassed: true")
      expect(errorMessage).toContain("orderValidated: true")
      expect(errorMessage).toContain("isExpressCheckoutLoaded: false")

      // No blocking modal; Express Checkout is force-emptied so the rest of
      // the page can finish loading and the user can complete checkout.
      expect(mockShowCheckoutErrorModal).not.toHaveBeenCalled()
      expect(mockSetExpressCheckoutLoaded).toHaveBeenCalledWith([])
    })

    it("surfaces the modal when a flag other than Express Checkout is stuck", async () => {
      // Express Checkout *is* loaded (empty list), but loading is still stuck
      // for another reason. This is a genuine problem — not graceful
      // degradation — so the user should see the blocking modal.
      useCheckoutContext.mockReturnValue({
        isLoading: true,
        expressCheckoutPaymentMethods: [],
        steps: [],
        setLoadingComplete: mockSetLoadingComplete,
        setExpressCheckoutLoaded: mockSetExpressCheckoutLoaded,
      })

      renderHook(() => useLoadCheckout(mockOrder))

      // Pass the minimum-loading gate.
      act(() => {
        jest.advanceTimersByTime(MIN_LOADING_MS)
      })

      act(() => {
        jest.advanceTimersByTime(MAX_LOADING_MS - MIN_LOADING_MS)
      })

      await waitFor(() => {
        expect(mockShowCheckoutErrorModal).toHaveBeenCalledWith({
          error: "loading_timeout",
        })
      })

      expect(mockLogger.error).toHaveBeenCalled()
      expect(mockSetExpressCheckoutLoaded).not.toHaveBeenCalled()
    })

    it("does not set timeout error if loading completes before MAX_LOADING_MS", async () => {
      let isLoading = true
      useCheckoutContext.mockImplementation(() => ({
        isLoading,
        expressCheckoutPaymentMethods: [],
        steps: [],
        setLoadingComplete: mockSetLoadingComplete,
      }))

      const { rerender } = renderHook(() => useLoadCheckout(mockOrder))

      // Advance past minimum loading time
      act(() => {
        jest.advanceTimersByTime(MIN_LOADING_MS)
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
      expect(mockShowCheckoutErrorModal).not.toHaveBeenCalled()
    })
  })

  describe("loading completion", () => {
    it("completes loading when all conditions are met", async () => {
      let expressCheckoutLoaded = false

      useCheckoutContext.mockImplementation(() => ({
        isLoading: true,
        expressCheckoutPaymentMethods: expressCheckoutLoaded ? [] : null,
        steps: [],
        setLoadingComplete: mockSetLoadingComplete,
      }))

      const { rerender } = renderHook(() => useLoadCheckout(mockOrder))

      // Advance minimum loading time
      act(() => {
        jest.advanceTimersByTime(MIN_LOADING_MS)
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
        expressCheckoutPaymentMethods: [],
        steps: [],
        setLoadingComplete: mockSetLoadingComplete,
      })

      renderHook(() => useLoadCheckout(mockOrder))

      // Don't advance time - minimum not passed
      expect(mockSetLoadingComplete).not.toHaveBeenCalled()
    })

    it("does not complete loading if there is a critical error", async () => {
      useCheckoutContext.mockReturnValue({
        isLoading: true,
        expressCheckoutPaymentMethods: [],
        steps: [],
        setLoadingComplete: mockSetLoadingComplete,
      })
      useCheckoutModal.mockReturnValue({
        checkoutModalError: "loading_timeout",
        showCheckoutErrorModal: mockShowCheckoutErrorModal,
      })

      renderHook(() => useLoadCheckout(mockOrder))

      act(() => {
        jest.advanceTimersByTime(MIN_LOADING_MS)
      })

      await waitFor(() => {
        expect(mockSetLoadingComplete).not.toHaveBeenCalled()
      })
    })
  })

  describe("navigation guards", () => {
    it("disables navigation guards on critical error", () => {
      useCheckoutModal.mockReturnValue({
        checkoutModalError: "loading_timeout",
        showCheckoutErrorModal: mockShowCheckoutErrorModal,
      })

      renderHook(() => useLoadCheckout(mockOrder))

      expect(setNavigationGuardsEnabled).toHaveBeenCalledWith(false)
    })

    it("disables navigation guards when express checkout is active", () => {
      useCheckoutContext.mockReturnValue({
        isLoading: false,
        expressCheckoutPaymentMethods: [],
        expressCheckoutState: "active",
        steps: [],
        setLoadingComplete: mockSetLoadingComplete,
      })

      renderHook(() => useLoadCheckout(mockOrder))

      expect(setNavigationGuardsEnabled).toHaveBeenCalledWith(false)
    })

    it("disables navigation guards when express checkout is submitting", () => {
      useCheckoutContext.mockReturnValue({
        isLoading: false,
        expressCheckoutPaymentMethods: [],
        expressCheckoutState: "submit",
        steps: [],
        setLoadingComplete: mockSetLoadingComplete,
      })

      renderHook(() => useLoadCheckout(mockOrder))

      expect(setNavigationGuardsEnabled).toHaveBeenCalledWith(false)
    })

    it("re-enables navigation guards when express checkout is dismissed", () => {
      let expressCheckoutState: "active" | "submit" | null = "active"

      useCheckoutContext.mockImplementation(() => ({
        isLoading: false,
        expressCheckoutPaymentMethods: [],
        expressCheckoutState,
        steps: [],
        setLoadingComplete: mockSetLoadingComplete,
      }))

      const { rerender } = renderHook(() => useLoadCheckout(mockOrder))

      expect(setNavigationGuardsEnabled).toHaveBeenCalledWith(false)

      // User cancels express checkout
      expressCheckoutState = null
      rerender()

      expect(setNavigationGuardsEnabled).toHaveBeenCalledWith(true)
    })
  })
})
