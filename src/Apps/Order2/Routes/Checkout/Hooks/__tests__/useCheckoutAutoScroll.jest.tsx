jest.mock("react-tracking", () => ({
  track: () => (component: any) => component,
  useTracking: () => ({ trackEvent: jest.fn() }),
}))
jest.mock("Utils/Hooks/useJump")
jest.mock("Apps/Order2/Routes/Checkout/Hooks/useCheckoutContext")

import { renderHook } from "@testing-library/react"
import {
  CheckoutStepName,
  CheckoutStepState,
} from "Apps/Order2/Routes/Checkout/CheckoutContext/types"
import { useCheckoutAutoScroll } from "Apps/Order2/Routes/Checkout/Hooks/useCheckoutAutoScroll"
import { useCheckoutContext } from "Apps/Order2/Routes/Checkout/Hooks/useCheckoutContext"
import { useJump } from "Utils/Hooks/useJump"

const mockUseJump = useJump as jest.Mock
const mockUseCheckoutContext = useCheckoutContext as jest.Mock

const ALL_STEPS = [
  CheckoutStepName.OFFER_AMOUNT,
  CheckoutStepName.FULFILLMENT_DETAILS,
  CheckoutStepName.DELIVERY_OPTION,
  CheckoutStepName.PAYMENT,
  CheckoutStepName.CONFIRMATION,
]

const createSteps = (activeStep: CheckoutStepName) => {
  const activeIndex = ALL_STEPS.indexOf(activeStep)
  return ALL_STEPS.map((name, index) => ({
    name,
    state:
      index < activeIndex
        ? CheckoutStepState.COMPLETED
        : index === activeIndex
          ? CheckoutStepState.ACTIVE
          : CheckoutStepState.UPCOMING,
  }))
}

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
    const steps = createSteps(CheckoutStepName.FULFILLMENT_DETAILS)

    mockUseCheckoutContext.mockReturnValue({ isLoading: true, steps })

    const { rerender } = renderHook(() => useCheckoutAutoScroll())

    expect(mockJumpTo).not.toHaveBeenCalled()

    mockUseCheckoutContext.mockReturnValue({ isLoading: false, steps })

    rerender()
    jest.runAllTimers()

    expect(mockJumpTo).toHaveBeenCalledWith("fulfillment-details-step", {
      behavior: "smooth",
      offset: 30,
    })
  })

  it("does not autoscroll on load if user is on the first step", () => {
    const steps = createSteps(CheckoutStepName.OFFER_AMOUNT)

    mockUseCheckoutContext.mockReturnValue({ isLoading: true, steps })

    const { rerender } = renderHook(() => useCheckoutAutoScroll())

    mockUseCheckoutContext.mockReturnValue({ isLoading: false, steps })

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
      steps: createSteps(CheckoutStepName.PAYMENT),
    })

    const { rerender } = renderHook(() => useCheckoutAutoScroll())

    mockUseCheckoutContext.mockReturnValue({
      isLoading: false,
      steps: createSteps(CheckoutStepName.CONFIRMATION),
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
      steps: createSteps(CheckoutStepName.FULFILLMENT_DETAILS),
    })

    const { rerender } = renderHook(() => useCheckoutAutoScroll())

    mockUseCheckoutContext.mockReturnValue({
      isLoading: false,
      steps: createSteps(CheckoutStepName.DELIVERY_OPTION),
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
      steps: createSteps(CheckoutStepName.DELIVERY_OPTION),
    })

    const { rerender } = renderHook(() => useCheckoutAutoScroll())

    mockUseCheckoutContext.mockReturnValue({
      isLoading: false,
      steps: createSteps(CheckoutStepName.FULFILLMENT_DETAILS),
    })

    rerender()
    jest.runAllTimers()

    expect(mockJumpTo).toHaveBeenCalledWith("fulfillment-details-step", {
      behavior: "smooth",
      offset: 30,
    })
  })
})
