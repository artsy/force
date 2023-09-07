/* eslint-disable react-hooks/rules-of-hooks */
import { renderHook } from "@testing-library/react-hooks"
import { useElements, useStripe } from "@stripe/react-stripe-js"
import { useAddCreditCardAndUpdateProfile } from "Apps/Auction/Queries/useAddCreditCardAndUpdateProfile"
import { useCreateBidder } from "Apps/Auction/Queries/useCreateBidder"
import {
  useCreateTokenAndSubmit,
  UseCreateTokenAndSubmitProps,
} from "Apps/Auction/Hooks/useCreateTokenAndSubmit"
import { flushPromiseQueue } from "DevTools/flushPromiseQueue"
import { useAuctionTracking } from "Apps/Auction/Hooks/useAuctionTracking"
import { useRefreshUserData } from "Apps/Auction/Queries/useRefreshUserData"

jest.mock("Components/Address/AddressForm", () => ({
  toStripeAddress: jest.fn(),
}))

jest.mock("Apps/Auction/Queries/useRefreshUserData")
jest.mock("Apps/Auction/Hooks/useAuctionTracking")
jest.mock("Apps/Auction/Queries/useAddCreditCardAndUpdateProfile")
jest.mock("Apps/Auction/Queries/useCreateBidder")
jest.mock("Apps/Auction/Components/Form/Utils/errorMessages", () => ({
  errorMessageForCard: x => x,
}))

jest.mock("@stripe/react-stripe-js", () => ({
  useStripe: jest.fn(),
  useElements: jest.fn(),
  CardElement: jest.fn(),
}))

describe("useCreateTokenAndSubmit", () => {
  const mockUseAuctionTracking = useAuctionTracking as jest.Mock
  const mockUseElements = useElements as jest.Mock
  const mockUseStripe = useStripe as jest.Mock
  const mockUseAddCreditCardAndUpdateProfile = useAddCreditCardAndUpdateProfile as jest.Mock
  const mockUseCreateBidder = useCreateBidder as jest.Mock
  const mockUseRefreshUserData = useRefreshUserData as jest.Mock

  const values = {
    phoneNumber: "+1 (123) 456-7890",
  }

  const helpers = {
    setFieldError: jest.fn(),
    setStatus: jest.fn(),
    setSubmitting: jest.fn(),
  }

  const props = ({
    me: {},
    sale: {
      slug: "test-sale",
    },
    onSuccess: jest.fn(),
  } as unknown) as UseCreateTokenAndSubmitProps

  const setupHook = async () => {
    const { result } = renderHook(() => useCreateTokenAndSubmit(props))

    if (result.error) {
      throw result.error
    }

    const createToken = result.current.createToken as any

    try {
      await createToken(values, helpers)
    } catch (error) {
      throw new Error(error)
    }
  }

  beforeEach(() => {
    mockUseAuctionTracking.mockImplementation(() => ({
      tracking: {
        registrationSubmitted: jest.fn(),
      },
    }))

    mockUseStripe.mockImplementation(() => ({
      createToken: jest.fn(() => ({
        error: null,
        token: {
          id: "tokenID",
        },
      })),
    }))

    mockUseElements.mockImplementation(() => ({
      getElement: jest.fn(() => "foo"),
    }))

    mockUseAddCreditCardAndUpdateProfile.mockImplementation(() => ({
      submitMutation: jest.fn(),
    }))

    mockUseCreateBidder.mockImplementation(() => ({
      submitMutation: jest.fn(() => ({
        createBidder: {
          bidder: {
            internalID: "bidderInternalID",
          },
        },
      })),
    }))

    mockUseRefreshUserData.mockImplementation(() => ({
      refreshUserData: jest.fn(),
    }))
  })

  it("sets SUBMISSION_FAILED error if stripe not found", async () => {
    mockUseStripe.mockImplementation(() => null)
    await setupHook()
    expect(helpers.setStatus).toHaveBeenCalledWith("SUBMISSION_FAILED")
  })

  it("sets SUBMISSION_FAILED error if elements not found", async () => {
    mockUseStripe.mockImplementation(() => "foo")
    mockUseElements.mockImplementation(() => null)
    await setupHook()
    expect(helpers.setStatus).toHaveBeenCalledWith("SUBMISSION_FAILED")
  })

  it("sets SUBMISSION_FAILED error if element not found", async () => {
    mockUseStripe.mockImplementation(() => "foo")
    mockUseElements.mockImplementation(() => ({
      getElement: () => null,
    }))
    await setupHook()
    expect(helpers.setStatus).toHaveBeenCalledWith("SUBMISSION_FAILED")
  })

  it("sets submitting to true", async () => {
    await setupHook()
    expect(helpers.setSubmitting).toHaveBeenCalledWith(true)
  })

  describe("creating a stripe token", () => {
    it("if an error is returned, it sets a credit card error", async () => {
      mockUseStripe.mockImplementation(() => ({
        createToken: () => ({
          error: {
            message: "error",
          },
        }),
      }))
      await setupHook()
      expect(helpers.setFieldError).toHaveBeenCalledWith("creditCard", "error")
    })
  })

  describe("adding credit card and address mutation", () => {
    it("rejects if an error and sets a field error", async () => {
      const spy = jest.fn()
      mockUseAddCreditCardAndUpdateProfile.mockImplementation(() => ({
        submitMutation: spy,
      }))

      await setupHook()
      const rejectIf = spy.mock.calls[0][0].rejectIf

      rejectIf({
        createCreditCard: {
          creditCardOrError: {
            mutationError: {
              detail: "error",
            },
          },
        },
      })

      expect(helpers.setFieldError).toHaveBeenCalledWith("creditCard", "error")
    })

    it("is  called with token.id and phone", async () => {
      const spy = jest.fn()
      mockUseAddCreditCardAndUpdateProfile.mockImplementation(() => ({
        submitMutation: spy,
      }))

      await setupHook()

      expect(spy).toHaveBeenCalledWith(
        expect.objectContaining({
          variables: {
            creditCardInput: {
              token: "tokenID",
            },
            profileInput: {
              phone: values.phoneNumber,
            },
          },
        })
      )
    })
  })

  it("creates a bidder mutation", async () => {
    const spy = jest.fn(() => ({
      createBidder: {
        bidder: {
          internalID: "foo",
        },
      },
    }))

    mockUseCreateBidder.mockImplementation(() => ({
      submitMutation: spy,
    }))

    await setupHook()
    await flushPromiseQueue()

    expect(spy).toHaveBeenCalledWith(
      expect.objectContaining({
        variables: {
          input: {
            saleID: props.sale.slug,
          },
        },
      })
    )
  })

  it("tracks registration submitted", async () => {
    const spy = jest.fn()

    mockUseAuctionTracking.mockImplementation(() => ({
      tracking: {
        registrationSubmitted: spy,
      },
    }))

    await setupHook()
    await flushPromiseQueue()

    expect(spy).toHaveBeenCalledWith(
      expect.objectContaining({
        bidderID: "bidderInternalID",
      })
    )
  })

  it("triggers an onSuccess callback", async () => {
    await setupHook()
    await flushPromiseQueue()
    expect(props.onSuccess).toHaveBeenCalled()
  })

  it("sets submitting to false at the very end", async () => {
    await setupHook()
    await flushPromiseQueue()
    expect(helpers.setSubmitting).toHaveBeenCalledWith(false)
  })
})
