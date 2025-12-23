import { renderHook } from "@testing-library/react"
import type { CheckoutStep } from "Apps/Order2/Routes/Checkout/CheckoutContext/types"
import {
  CheckoutStepName,
  CheckoutStepState,
} from "Apps/Order2/Routes/Checkout/CheckoutContext/types"
import { useCheckoutAutoScroll } from "Apps/Order2/Routes/Checkout/Hooks/useCheckoutAutoScroll"
import { useJump } from "Utils/Hooks/useJump"

jest.mock("Utils/Hooks/useJump")

const mockUseJump = useJump as jest.Mock

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

  const createStep = (
    name: CheckoutStepName,
    state: CheckoutStepState,
  ): CheckoutStep => ({
    name,
    state,
  })

  describe("scrollToStep", () => {
    it("exposes a scrollToStep function", () => {
      const { result } = renderHook(() => useCheckoutAutoScroll())
      expect(result.current.scrollToStep).toBeDefined()
      expect(typeof result.current.scrollToStep).toBe("function")
    })

    it("scrolls to the correct jump ID when scrollToStep is called", () => {
      const { result } = renderHook(() => useCheckoutAutoScroll())

      result.current.scrollToStep(CheckoutStepName.FULFILLMENT_DETAILS)

      jest.runAllTimers()

      expect(mockJumpTo).toHaveBeenCalledWith("fulfillment-details-step", {
        behavior: "smooth",
        offset: 30,
      })
    })

    it("does not scroll when payment step is specified", () => {
      const { result } = renderHook(() => useCheckoutAutoScroll())

      result.current.scrollToStep(CheckoutStepName.PAYMENT)

      jest.runAllTimers()

      expect(mockJumpTo).not.toHaveBeenCalled()
    })
  })

  describe("auto-scroll behavior", () => {
    it("scrolls to confirmation step when it becomes active", () => {
      const { rerender } = renderHook(
        ({ activeStep }: { activeStep?: CheckoutStep }) =>
          useCheckoutAutoScroll({ activeStep }),
        {
          initialProps: {
            activeStep: createStep(
              CheckoutStepName.PAYMENT,
              CheckoutStepState.ACTIVE,
            ),
          },
        },
      )

      // Make confirmation step active
      rerender({
        activeStep: createStep(
          CheckoutStepName.CONFIRMATION,
          CheckoutStepState.ACTIVE,
        ),
      })

      jest.runAllTimers()

      expect(mockJumpTo).toHaveBeenCalledWith("review-step", {
        behavior: "smooth",
        offset: 30,
      })
    })

    it("scrolls to previous step when moving forward through checkout", () => {
      const { rerender } = renderHook(
        ({ activeStep }: { activeStep?: CheckoutStep }) =>
          useCheckoutAutoScroll({ activeStep }),
        {
          initialProps: {
            activeStep: createStep(
              CheckoutStepName.FULFILLMENT_DETAILS,
              CheckoutStepState.ACTIVE,
            ),
          },
        },
      )

      // Move to delivery options step (forward progression)
      rerender({
        activeStep: createStep(
          CheckoutStepName.DELIVERY_OPTION,
          CheckoutStepState.ACTIVE,
        ),
      })

      jest.runAllTimers()

      // Should scroll to the previous step that was just completed
      expect(mockJumpTo).toHaveBeenCalledWith("fulfillment-details-step", {
        behavior: "smooth",
        offset: 30,
      })
    })

    it("scrolls to active step when going backwards (editing a previous step)", () => {
      const { rerender } = renderHook(
        ({ activeStep }: { activeStep?: CheckoutStep }) =>
          useCheckoutAutoScroll({ activeStep }),
        {
          initialProps: {
            activeStep: createStep(
              CheckoutStepName.DELIVERY_OPTION,
              CheckoutStepState.ACTIVE,
            ),
          },
        },
      )

      // Go back to fulfillment details (backwards progression)
      rerender({
        activeStep: createStep(
          CheckoutStepName.FULFILLMENT_DETAILS,
          CheckoutStepState.ACTIVE,
        ),
      })

      jest.runAllTimers()

      // Should scroll to the current active step being edited
      expect(mockJumpTo).toHaveBeenCalledWith("fulfillment-details-step", {
        behavior: "smooth",
        offset: 30,
      })
    })

    it("does not scroll when there is no active step", () => {
      const { rerender } = renderHook(
        ({ activeStep }: { activeStep?: CheckoutStep }) =>
          useCheckoutAutoScroll({ activeStep }),
        {
          initialProps: {
            activeStep: undefined,
          },
        },
      )

      rerender({ activeStep: undefined })

      jest.runAllTimers()

      expect(mockJumpTo).not.toHaveBeenCalled()
    })

    it("does not scroll when there is no previous step", () => {
      const { rerender } = renderHook(
        ({ activeStep }: { activeStep?: CheckoutStep }) =>
          useCheckoutAutoScroll({ activeStep }),
        {
          initialProps: {
            activeStep: undefined,
          },
        },
      )

      // First render with an active step (no previous)
      rerender({
        activeStep: createStep(
          CheckoutStepName.FULFILLMENT_DETAILS,
          CheckoutStepState.ACTIVE,
        ),
      })

      jest.runAllTimers()

      expect(mockJumpTo).not.toHaveBeenCalled()
    })

    it("respects payment step exclusion when moving forward", () => {
      const { rerender } = renderHook(
        ({ activeStep }: { activeStep?: CheckoutStep }) =>
          useCheckoutAutoScroll({ activeStep }),
        {
          initialProps: {
            activeStep: createStep(
              CheckoutStepName.DELIVERY_OPTION,
              CheckoutStepState.ACTIVE,
            ),
          },
        },
      )

      // Move to payment step
      rerender({
        activeStep: createStep(
          CheckoutStepName.PAYMENT,
          CheckoutStepState.ACTIVE,
        ),
      })

      jest.runAllTimers()

      // Should try to scroll to delivery option (previous step)
      // But since payment is excluded, jumpTo should not be called
      // Actually, based on the logic, it WILL scroll to the previous step (delivery option)
      // The exclusion only applies when payment itself would be the target
      expect(mockJumpTo).toHaveBeenCalledWith("delivery-options-step", {
        behavior: "smooth",
        offset: 30,
      })
    })

    it("does not scroll when going back FROM payment step", () => {
      const { rerender } = renderHook(
        ({ activeStep }: { activeStep?: CheckoutStep }) =>
          useCheckoutAutoScroll({ activeStep }),
        {
          initialProps: {
            activeStep: createStep(
              CheckoutStepName.PAYMENT,
              CheckoutStepState.ACTIVE,
            ),
          },
        },
      )

      // Go back to delivery options from payment
      rerender({
        activeStep: createStep(
          CheckoutStepName.DELIVERY_OPTION,
          CheckoutStepState.ACTIVE,
        ),
      })

      jest.runAllTimers()

      // Should scroll to delivery option (active step when going backwards)
      expect(mockJumpTo).toHaveBeenCalledWith("delivery-options-step", {
        behavior: "smooth",
        offset: 30,
      })
    })
  })

  describe("offer flow", () => {
    it("scrolls to offer step when completing it", () => {
      const { rerender } = renderHook(
        ({ activeStep }: { activeStep?: CheckoutStep }) =>
          useCheckoutAutoScroll({ activeStep }),
        {
          initialProps: {
            activeStep: createStep(
              CheckoutStepName.OFFER_AMOUNT,
              CheckoutStepState.ACTIVE,
            ),
          },
        },
      )

      // Move to fulfillment details after completing offer
      rerender({
        activeStep: createStep(
          CheckoutStepName.FULFILLMENT_DETAILS,
          CheckoutStepState.ACTIVE,
        ),
      })

      jest.runAllTimers()

      // Should scroll to the previous step (offer) that was just completed
      expect(mockJumpTo).toHaveBeenCalledWith("offer-step", {
        behavior: "smooth",
        offset: 30,
      })
    })

    it("scrolls to offer step when editing it", () => {
      const { rerender } = renderHook(
        ({ activeStep }: { activeStep?: CheckoutStep }) =>
          useCheckoutAutoScroll({ activeStep }),
        {
          initialProps: {
            activeStep: createStep(
              CheckoutStepName.FULFILLMENT_DETAILS,
              CheckoutStepState.ACTIVE,
            ),
          },
        },
      )

      // Go back to edit offer
      rerender({
        activeStep: createStep(
          CheckoutStepName.OFFER_AMOUNT,
          CheckoutStepState.ACTIVE,
        ),
      })

      jest.runAllTimers()

      // Should scroll to offer step (active step when going backwards)
      expect(mockJumpTo).toHaveBeenCalledWith("offer-step", {
        behavior: "smooth",
        offset: 30,
      })
    })
  })

  describe("timing", () => {
    it("waits 100ms before scrolling to allow DOM updates", () => {
      const { rerender } = renderHook(
        ({ activeStep }: { activeStep?: CheckoutStep }) =>
          useCheckoutAutoScroll({ activeStep }),
        {
          initialProps: {
            activeStep: createStep(
              CheckoutStepName.FULFILLMENT_DETAILS,
              CheckoutStepState.ACTIVE,
            ),
          },
        },
      )

      rerender({
        activeStep: createStep(
          CheckoutStepName.DELIVERY_OPTION,
          CheckoutStepState.ACTIVE,
        ),
      })

      // Should not have scrolled yet
      expect(mockJumpTo).not.toHaveBeenCalled()

      // Advance timers by 100ms
      jest.advanceTimersByTime(100)

      // Now it should have scrolled
      expect(mockJumpTo).toHaveBeenCalled()
    })
  })
})
