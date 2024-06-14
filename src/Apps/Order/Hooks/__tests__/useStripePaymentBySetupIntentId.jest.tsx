import { renderHook } from "@testing-library/react-hooks"
import { useStripePaymentBySetupIntentId } from "Apps/Order/Hooks/useStripePaymentBySetupIntentId"
import { useRouter } from "System/Hooks/useRouter"
import { useSetPaymentByStripeIntent } from "Apps/Order/Mutations/useSetPaymentByStripeIntentMutation"
import { flushPromiseQueue } from "DevTools/flushPromiseQueue"

jest.mock("System/Hooks/useRouter")
jest.mock("Apps/Order/Mutations/useSetPaymentByStripeIntentMutation")

describe("useStripePaymentBySetupIntentId", () => {
  const mockUseRouter = useRouter as jest.Mock
  const mockUseSetPaymentByStripeIntent = useSetPaymentByStripeIntent as jest.Mock

  let mockOrderOrError

  beforeAll(() => {
    mockUseRouter.mockImplementation(() => ({
      match: {
        location: {
          query: {
            save_account: false,
            setup_intent: "setup-intent-id",
            setup_intent_client_secret: "client-secret",
            redirect_status: "succeeded",
          },
        },
      },
    }))

    mockUseSetPaymentByStripeIntent.mockImplementation(() => ({
      submitMutation: jest.fn().mockImplementation(() => ({
        commerceSetPaymentByStripeIntent: {
          orderOrError: mockOrderOrError,
        },
      })),
    }))
  })

  afterEach(() => jest.clearAllMocks())

  describe("when useSetPaymentByStripeIntent returns successfully", () => {
    beforeAll(() => {
      // the mutation is considered successful if there is no error object
      mockOrderOrError = {}
    })

    it("requests the useSetPaymentByStripeIntent mutation", async () => {
      renderHook(() => useStripePaymentBySetupIntentId("order-id"))

      await flushPromiseQueue()

      expect(mockUseSetPaymentByStripeIntent).toHaveBeenCalled()
    })

    it("returns a result object", async () => {
      const { result } = renderHook(() =>
        useStripePaymentBySetupIntentId("order-id")
      )

      await flushPromiseQueue()

      expect(result.current).toEqual({
        isProcessingRedirect: false,
        stripeSetupIntentId: "setup-intent-id",
        isPaymentSetupSuccessful: true,
        paymentSetupError: null,
      })
    })
  })

  describe("when useSetPaymentByStripeIntent returns an error", () => {
    beforeAll(() => {
      mockOrderOrError = {
        error: {
          code: "error-code",
        },
      }
    })

    it("returns a result object", async () => {
      const { result } = renderHook(() =>
        useStripePaymentBySetupIntentId("order-id")
      )

      await flushPromiseQueue()

      expect(result.current).toEqual({
        isProcessingRedirect: false,
        stripeSetupIntentId: "setup-intent-id",
        isPaymentSetupSuccessful: false,
        paymentSetupError: { code: "error-code" },
      })
    })
  })
})
