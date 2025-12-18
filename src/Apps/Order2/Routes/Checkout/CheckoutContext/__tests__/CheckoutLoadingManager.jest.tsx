import { act, render, screen, waitFor } from "@testing-library/react"
import {
  CheckoutLoadingManager,
  MAX_LOADING_MS,
  MIN_LOADING_MS,
} from "Apps/Order2/Routes/Checkout/CheckoutContext/CheckoutLoadingManager"
import { Order2CheckoutContext } from "Apps/Order2/Routes/Checkout/CheckoutContext/Order2CheckoutContext"
import { CheckoutStepState } from "Apps/Order2/Routes/Checkout/CheckoutContext/types"
import { useStripePaymentBySetupIntentId } from "Apps/Order2/Routes/Checkout/Hooks/useStripePaymentBySetupIntentId"
import type { Order2CheckoutContext_order$data } from "__generated__/Order2CheckoutContext_order.graphql"

// Mock dependencies
jest.mock("Apps/Order2/Routes/Checkout/Hooks/useStripePaymentBySetupIntentId")

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

// Mock the Order2CheckoutContext hooks
const mockUseStoreState = jest.fn()
const mockUseStoreActions = jest.fn()

Order2CheckoutContext.useStoreState = mockUseStoreState as any
Order2CheckoutContext.useStoreActions = mockUseStoreActions as any

describe("CheckoutLoadingManager", () => {
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

  beforeEach(() => {
    jest.clearAllMocks()
    mockStripeCallback = null

    // Setup default mocks
    ;(useStripePaymentBySetupIntentId as jest.Mock).mockImplementation(
      (_orderId, callback) => {
        mockStripeCallback = callback
      },
    )

    mockUseStoreActions.mockImplementation(selector => {
      const actions = {
        setCriticalCheckoutError: mockSetCriticalCheckoutError,
        setLoadingComplete: mockSetLoadingComplete,
      }
      return selector(actions)
    })

    // Default state mocks
    mockUseStoreState.mockImplementation(selector => {
      const state = {
        isLoading: true,
        criticalCheckoutError: null,
        expressCheckoutPaymentMethods: null,
        steps: [{ state: CheckoutStepState.ACTIVE, name: "PAYMENT" }],
      }
      return selector(state)
    })
  })

  afterEach(() => {
    document.body.style.overflow = ""
  })

  describe("scroll lock", () => {
    it("locks scroll when loading", () => {
      mockUseStoreState.mockImplementation(selector => {
        const state = {
          isLoading: true,
          criticalCheckoutError: null,
          expressCheckoutPaymentMethods: null,
          steps: [],
        }
        return selector(state)
      })

      render(
        <CheckoutLoadingManager orderData={mockOrderData}>
          <div>Content</div>
        </CheckoutLoadingManager>,
      )

      expect(document.body.style.overflow).toBe("hidden")
    })

    it("unlocks scroll when loading completes", () => {
      let isLoading = true
      mockUseStoreState.mockImplementation(selector => {
        const state = {
          isLoading,
          criticalCheckoutError: null,
          expressCheckoutPaymentMethods: null,
          steps: [],
        }
        return selector(state)
      })

      const { rerender } = render(
        <CheckoutLoadingManager orderData={mockOrderData}>
          <div>Content</div>
        </CheckoutLoadingManager>,
      )

      expect(document.body.style.overflow).toBe("hidden")

      // Simulate loading complete
      isLoading = false
      rerender(
        <CheckoutLoadingManager orderData={mockOrderData}>
          <div>Content</div>
        </CheckoutLoadingManager>,
      )

      expect(document.body.style.overflow).toBe("")
    })

    it("cleans up scroll lock on unmount", () => {
      mockUseStoreState.mockImplementation(selector => {
        const state = {
          isLoading: true,
          criticalCheckoutError: null,
          expressCheckoutPaymentMethods: null,
          steps: [],
        }
        return selector(state)
      })

      const { unmount } = render(
        <CheckoutLoadingManager orderData={mockOrderData}>
          <div>Content</div>
        </CheckoutLoadingManager>,
      )

      expect(document.body.style.overflow).toBe("hidden")

      unmount()

      expect(document.body.style.overflow).toBe("")
    })
  })

  describe("order validation", () => {
    it("validates order successfully with valid data", async () => {
      render(
        <CheckoutLoadingManager orderData={mockOrderData}>
          <div>Content</div>
        </CheckoutLoadingManager>,
      )

      await waitFor(() => {
        expect(mockSetCriticalCheckoutError).not.toHaveBeenCalled()
      })
    })

    it("sets error when order has missing line item data", async () => {
      const invalidOrderData = {
        ...mockOrderData,
        lineItems: [],
      } as any

      render(
        <CheckoutLoadingManager orderData={invalidOrderData}>
          <div>Content</div>
        </CheckoutLoadingManager>,
      )

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

      render(
        <CheckoutLoadingManager orderData={invalidOrderData}>
          <div>Content</div>
        </CheckoutLoadingManager>,
      )

      await waitFor(() => {
        expect(mockSetCriticalCheckoutError).toHaveBeenCalledWith(
          "missing_line_item_data",
        )
      })
    })
  })

  describe("loading timeout", () => {
    it("sets loading_timeout error when MAX_LOADING_MS is exceeded", async () => {
      render(
        <CheckoutLoadingManager orderData={mockOrderData}>
          <div>Content</div>
        </CheckoutLoadingManager>,
      )

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
      mockUseStoreState.mockImplementation(selector => {
        const state = {
          isLoading,
          criticalCheckoutError: null,
          expressCheckoutPaymentMethods: [],
          steps: [],
        }
        return selector(state)
      })

      const { rerender } = render(
        <CheckoutLoadingManager orderData={mockOrderData}>
          <div>Content</div>
        </CheckoutLoadingManager>,
      )

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
      rerender(
        <CheckoutLoadingManager orderData={mockOrderData}>
          <div>Content</div>
        </CheckoutLoadingManager>,
      )

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

      mockUseStoreState.mockImplementation(selector => {
        const state = {
          isLoading: true,
          criticalCheckoutError: null,
          expressCheckoutPaymentMethods: expressCheckoutLoaded ? [] : null,
          steps: [],
        }
        return selector(state)
      })

      const { rerender } = render(
        <CheckoutLoadingManager orderData={mockOrderData}>
          <div>Content</div>
        </CheckoutLoadingManager>,
      )

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
      rerender(
        <CheckoutLoadingManager orderData={mockOrderData}>
          <div>Content</div>
        </CheckoutLoadingManager>,
      )

      await waitFor(() => {
        expect(mockSetLoadingComplete).toHaveBeenCalled()
      })
    })

    it("does not complete loading if minimum time has not passed", () => {
      mockUseStoreState.mockImplementation(selector => {
        const state = {
          isLoading: true,
          criticalCheckoutError: null,
          expressCheckoutPaymentMethods: [],
          steps: [],
        }
        return selector(state)
      })

      render(
        <CheckoutLoadingManager orderData={mockOrderData}>
          <div>Content</div>
        </CheckoutLoadingManager>,
      )

      // Trigger stripe callback
      act(() => {
        mockStripeCallback?.()
      })

      // Don't advance time - minimum not passed
      expect(mockSetLoadingComplete).not.toHaveBeenCalled()
    })

    it("does not complete loading if there is a critical error", async () => {
      mockUseStoreState.mockImplementation(selector => {
        const state = {
          isLoading: true,
          criticalCheckoutError: "loading_timeout",
          expressCheckoutPaymentMethods: [],
          steps: [],
        }
        return selector(state)
      })

      render(
        <CheckoutLoadingManager orderData={mockOrderData}>
          <div>Content</div>
        </CheckoutLoadingManager>,
      )

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
      render(
        <CheckoutLoadingManager orderData={mockOrderData}>
          <div>Content</div>
        </CheckoutLoadingManager>,
      )

      expect(useStripePaymentBySetupIntentId).toHaveBeenCalledWith(
        "order-123",
        expect.any(Function),
      )

      // Callback should be stored
      expect(mockStripeCallback).not.toBeNull()
    })
  })

  describe("children rendering", () => {
    it("renders children", () => {
      render(
        <CheckoutLoadingManager orderData={mockOrderData}>
          <div data-testid="child-content">Test Content</div>
        </CheckoutLoadingManager>,
      )

      expect(screen.getByTestId("child-content")).toBeInTheDocument()
    })
  })
})
