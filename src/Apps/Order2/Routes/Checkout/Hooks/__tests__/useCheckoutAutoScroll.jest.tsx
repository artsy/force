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

    it("scrolls to just-completed step when moving forward through checkout", () => {
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

    it("scrolls to newly-active step when going backwards (editing a previous step)", () => {
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

    it("scrolls to active step when there is no previous step", () => {
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

      expect(mockJumpTo).toHaveBeenCalledWith("fulfillment-details-step", {
        behavior: "smooth",
        offset: 30,
      })
    })
  })
})
