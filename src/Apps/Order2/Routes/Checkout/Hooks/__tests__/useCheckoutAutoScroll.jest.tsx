import { renderHook } from "@testing-library/react"
import {
  CheckoutStepName,
  CheckoutStepState,
} from "Apps/Order2/Routes/Checkout/CheckoutContext/types"
import { useCheckoutAutoScroll } from "Apps/Order2/Routes/Checkout/Hooks/useCheckoutAutoScroll"
import { useCheckoutContext } from "Apps/Order2/Routes/Checkout/Hooks/useCheckoutContext"
import { useJump } from "Utils/Hooks/useJump"

jest.mock("Utils/Hooks/useJump")
jest.mock("Apps/Order2/Routes/Checkout/Hooks/useCheckoutContext")

const mockUseJump = useJump as jest.Mock
const mockUseCheckoutContext = useCheckoutContext as jest.Mock

describe("useCheckoutAutoScroll", () => {
  let mockJumpTo: jest.Mock

  beforeEach(() => {
    jest.clearAllMocks()
    jest.useFakeTimers()

    mockJumpTo = jest.fn()
    mockUseJump.mockReturnValue({
      jumpTo: mockJumpTo,
    })
  })

  afterEach(() => {
    jest.runOnlyPendingTimers()
    jest.useRealTimers()
  })

  it("scrolls to active step when loading completes", () => {
    mockUseCheckoutContext.mockReturnValue({
      isLoading: true,
      steps: [
        {
          name: CheckoutStepName.OFFER_AMOUNT,
          state: CheckoutStepState.COMPLETED,
        },
        {
          name: CheckoutStepName.FULFILLMENT_DETAILS,
          state: CheckoutStepState.ACTIVE,
        },
        {
          name: CheckoutStepName.DELIVERY_OPTION,
          state: CheckoutStepState.DISABLED,
        },
        {
          name: CheckoutStepName.PAYMENT,
          state: CheckoutStepState.DISABLED,
        },
        {
          name: CheckoutStepName.CONFIRMATION,
          state: CheckoutStepState.DISABLED,
        },
      ],
    })

    const { rerender } = renderHook(() => useCheckoutAutoScroll())

    expect(mockJumpTo).not.toHaveBeenCalled()

    mockUseCheckoutContext.mockReturnValue({
      isLoading: false,
      steps: [
        {
          name: CheckoutStepName.OFFER_AMOUNT,
          state: CheckoutStepState.COMPLETED,
        },
        {
          name: CheckoutStepName.FULFILLMENT_DETAILS,
          state: CheckoutStepState.ACTIVE,
        },
        {
          name: CheckoutStepName.DELIVERY_OPTION,
          state: CheckoutStepState.DISABLED,
        },
        {
          name: CheckoutStepName.PAYMENT,
          state: CheckoutStepState.DISABLED,
        },
        {
          name: CheckoutStepName.CONFIRMATION,
          state: CheckoutStepState.DISABLED,
        },
      ],
    })

    rerender()
    jest.runAllTimers()

    expect(mockJumpTo).toHaveBeenCalledWith("fulfillment-details-step", {
      behavior: "smooth",
      offset: 30,
    })
  })

  it("does not autoscroll on load if user is on the first step", () => {
    mockUseCheckoutContext.mockReturnValue({
      isLoading: true,
      steps: [
        {
          name: CheckoutStepName.OFFER_AMOUNT,
          state: CheckoutStepState.ACTIVE,
        },
        {
          name: CheckoutStepName.FULFILLMENT_DETAILS,
          state: CheckoutStepState.DISABLED,
        },
        {
          name: CheckoutStepName.DELIVERY_OPTION,
          state: CheckoutStepState.DISABLED,
        },
        {
          name: CheckoutStepName.PAYMENT,
          state: CheckoutStepState.DISABLED,
        },
        {
          name: CheckoutStepName.CONFIRMATION,
          state: CheckoutStepState.DISABLED,
        },
      ],
    })

    const { rerender } = renderHook(() => useCheckoutAutoScroll())

    mockUseCheckoutContext.mockReturnValue({
      isLoading: false,
      steps: [
        {
          name: CheckoutStepName.OFFER_AMOUNT,
          state: CheckoutStepState.ACTIVE,
        },
        {
          name: CheckoutStepName.FULFILLMENT_DETAILS,
          state: CheckoutStepState.DISABLED,
        },
        {
          name: CheckoutStepName.DELIVERY_OPTION,
          state: CheckoutStepState.DISABLED,
        },
        {
          name: CheckoutStepName.PAYMENT,
          state: CheckoutStepState.DISABLED,
        },
        {
          name: CheckoutStepName.CONFIRMATION,
          state: CheckoutStepState.DISABLED,
        },
      ],
    })

    rerender()
    jest.runAllTimers()

    // The initial load scroll (first useEffect) should NOT fire for the first step (activeStepIndex = 0)
    // The step navigation scroll (second useEffect) should also not fire because step hasn't changed
    // We expect 0 calls, confirming no unwanted scrolling on load for the first step
    expect(mockJumpTo).not.toHaveBeenCalled()
  })

  it("scrolls to confirmation when it becomes active", () => {
    mockUseCheckoutContext.mockReturnValue({
      isLoading: false,
      steps: [
        {
          name: CheckoutStepName.OFFER_AMOUNT,
          state: CheckoutStepState.COMPLETED,
        },
        {
          name: CheckoutStepName.FULFILLMENT_DETAILS,
          state: CheckoutStepState.COMPLETED,
        },
        {
          name: CheckoutStepName.DELIVERY_OPTION,
          state: CheckoutStepState.COMPLETED,
        },
        {
          name: CheckoutStepName.PAYMENT,
          state: CheckoutStepState.ACTIVE,
        },
        {
          name: CheckoutStepName.CONFIRMATION,
          state: CheckoutStepState.DISABLED,
        },
      ],
    })

    const { rerender } = renderHook(() => useCheckoutAutoScroll())

    mockUseCheckoutContext.mockReturnValue({
      isLoading: false,
      steps: [
        {
          name: CheckoutStepName.OFFER_AMOUNT,
          state: CheckoutStepState.COMPLETED,
        },
        {
          name: CheckoutStepName.FULFILLMENT_DETAILS,
          state: CheckoutStepState.COMPLETED,
        },
        {
          name: CheckoutStepName.DELIVERY_OPTION,
          state: CheckoutStepState.COMPLETED,
        },
        {
          name: CheckoutStepName.PAYMENT,
          state: CheckoutStepState.COMPLETED,
        },
        {
          name: CheckoutStepName.CONFIRMATION,
          state: CheckoutStepState.ACTIVE,
        },
      ],
    })

    rerender()
    jest.runAllTimers()

    expect(mockJumpTo).toHaveBeenCalledWith("review-step", {
      behavior: "smooth",
      offset: 30,
    })
  })

  it("scrolls to just-completed step when going forward", () => {
    mockUseCheckoutContext.mockReturnValue({
      isLoading: false,
      steps: [
        {
          name: CheckoutStepName.OFFER_AMOUNT,
          state: CheckoutStepState.COMPLETED,
        },
        {
          name: CheckoutStepName.FULFILLMENT_DETAILS,
          state: CheckoutStepState.ACTIVE,
        },
        {
          name: CheckoutStepName.DELIVERY_OPTION,
          state: CheckoutStepState.DISABLED,
        },
        {
          name: CheckoutStepName.PAYMENT,
          state: CheckoutStepState.DISABLED,
        },
        {
          name: CheckoutStepName.CONFIRMATION,
          state: CheckoutStepState.DISABLED,
        },
      ],
    })

    const { rerender } = renderHook(() => useCheckoutAutoScroll())

    mockUseCheckoutContext.mockReturnValue({
      isLoading: false,
      steps: [
        {
          name: CheckoutStepName.OFFER_AMOUNT,
          state: CheckoutStepState.COMPLETED,
        },
        {
          name: CheckoutStepName.FULFILLMENT_DETAILS,
          state: CheckoutStepState.COMPLETED,
        },
        {
          name: CheckoutStepName.DELIVERY_OPTION,
          state: CheckoutStepState.ACTIVE,
        },
        {
          name: CheckoutStepName.PAYMENT,
          state: CheckoutStepState.DISABLED,
        },
        {
          name: CheckoutStepName.CONFIRMATION,
          state: CheckoutStepState.DISABLED,
        },
      ],
    })

    rerender()
    jest.runAllTimers()

    expect(mockJumpTo).toHaveBeenCalledWith("fulfillment-details-step", {
      behavior: "smooth",
      offset: 30,
    })
  })

  it("scrolls to newly-active step when going backwards", () => {
    mockUseCheckoutContext.mockReturnValue({
      isLoading: false,
      steps: [
        {
          name: CheckoutStepName.OFFER_AMOUNT,
          state: CheckoutStepState.COMPLETED,
        },
        {
          name: CheckoutStepName.FULFILLMENT_DETAILS,
          state: CheckoutStepState.COMPLETED,
        },
        {
          name: CheckoutStepName.DELIVERY_OPTION,
          state: CheckoutStepState.ACTIVE,
        },
        {
          name: CheckoutStepName.PAYMENT,
          state: CheckoutStepState.DISABLED,
        },
        {
          name: CheckoutStepName.CONFIRMATION,
          state: CheckoutStepState.DISABLED,
        },
      ],
    })

    const { rerender } = renderHook(() => useCheckoutAutoScroll())

    mockUseCheckoutContext.mockReturnValue({
      isLoading: false,
      steps: [
        {
          name: CheckoutStepName.OFFER_AMOUNT,
          state: CheckoutStepState.COMPLETED,
        },
        {
          name: CheckoutStepName.FULFILLMENT_DETAILS,
          state: CheckoutStepState.ACTIVE,
        },
        {
          name: CheckoutStepName.DELIVERY_OPTION,
          state: CheckoutStepState.DISABLED,
        },
        {
          name: CheckoutStepName.PAYMENT,
          state: CheckoutStepState.DISABLED,
        },
        {
          name: CheckoutStepName.CONFIRMATION,
          state: CheckoutStepState.DISABLED,
        },
      ],
    })

    rerender()
    jest.runAllTimers()

    expect(mockJumpTo).toHaveBeenCalledWith("fulfillment-details-step", {
      behavior: "smooth",
      offset: 30,
    })
  })
})
