import { act, renderHook } from "@testing-library/react"
import { CheckoutStepName } from "Apps/Order2/Routes/Checkout/CheckoutContext/types"
import { useSelectDeliveryOption } from "Apps/Order2/Routes/Checkout/Hooks/useSelectDeliveryOption"

jest.mock("Apps/Order2/Routes/Checkout/Hooks/useCheckoutContext", () => ({
  useCheckoutContext: jest.fn(),
}))
jest.mock(
  "Apps/Order2/Routes/Checkout/Mutations/useOrder2SetOrderFulfillmentOptionMutation",
  () => ({
    useOrder2SetOrderFulfillmentOptionMutation: jest.fn(),
  }),
)
jest.mock(
  "Apps/Order/Components/ExpressCheckout/Util/mutationHandling",
  () => ({
    validateAndExtractOrderResponse: jest.fn(),
  }),
)

const { useCheckoutContext } = jest.requireMock(
  "Apps/Order2/Routes/Checkout/Hooks/useCheckoutContext",
)
const { useOrder2SetOrderFulfillmentOptionMutation } = jest.requireMock(
  "Apps/Order2/Routes/Checkout/Mutations/useOrder2SetOrderFulfillmentOptionMutation",
)
const { validateAndExtractOrderResponse } = jest.requireMock(
  "Apps/Order/Components/ExpressCheckout/Util/mutationHandling",
)

const mockSetSectionErrorMessage = jest.fn()
const mockSubmitMutation = jest.fn()

const callSelectDeliveryOption = async (type = "SHIP") => {
  const { result } = renderHook(() => useSelectDeliveryOption())

  let returnValue: boolean | undefined
  await act(async () => {
    returnValue = await result.current.selectDeliveryOption("order-123", type)
  })

  return returnValue
}

describe("useSelectDeliveryOption", () => {
  beforeEach(() => {
    jest.clearAllMocks()
    useCheckoutContext.mockReturnValue({
      setSectionErrorMessage: mockSetSectionErrorMessage,
    })
    useOrder2SetOrderFulfillmentOptionMutation.mockReturnValue({
      submitMutation: mockSubmitMutation,
    })
    mockSubmitMutation.mockResolvedValue({
      setOrderFulfillmentOption: { orderOrError: {} },
    })
    // Default: the response validates successfully (does not throw).
    validateAndExtractOrderResponse.mockReturnValue(undefined)
  })

  it("submits the selected option and clears the delivery option error on success", async () => {
    const returnValue = await callSelectDeliveryOption("SHIP")

    expect(returnValue).toBe(true)

    expect(mockSubmitMutation).toHaveBeenCalledWith({
      variables: {
        input: {
          id: "order-123",
          fulfillmentOption: { type: "SHIP" },
        },
      },
    })

    expect(mockSetSectionErrorMessage).toHaveBeenCalledWith({
      section: CheckoutStepName.DELIVERY_OPTION,
      error: null,
    })
    expect(mockSetSectionErrorMessage).not.toHaveBeenCalledWith(
      expect.objectContaining({
        section: CheckoutStepName.FULFILLMENT_DETAILS,
      }),
    )
  })

  it("routes a missing_postal_code error to the fulfillment details section", async () => {
    validateAndExtractOrderResponse.mockImplementationOnce(() => {
      throw { code: "missing_postal_code" }
    })

    const returnValue = await callSelectDeliveryOption()

    expect(returnValue).toBe(false)

    // Clears the delivery option banner...
    expect(mockSetSectionErrorMessage).toHaveBeenCalledWith({
      section: CheckoutStepName.DELIVERY_OPTION,
      error: null,
    })
    // ...and surfaces the error under the delivery address instead.
    expect(mockSetSectionErrorMessage).toHaveBeenCalledWith({
      section: CheckoutStepName.FULFILLMENT_DETAILS,
      error: {
        title: "Missing postal code",
        message: "Add a postal code to the selected address.",
        code: "missing_postal_code",
      },
    })
  })

  it("shows a fallback delivery option banner for other error codes", async () => {
    validateAndExtractOrderResponse.mockImplementationOnce(() => {
      throw { code: "destination_could_not_be_geocoded" }
    })

    const returnValue = await callSelectDeliveryOption()

    expect(returnValue).toBe(false)

    expect(mockSetSectionErrorMessage).toHaveBeenCalledWith({
      section: CheckoutStepName.DELIVERY_OPTION,
      error: expect.objectContaining({
        title: "An error occurred",
        code: "destination_could_not_be_geocoded",
        displayText: expect.stringContaining("selecting your shipping method"),
      }),
    })
    expect(mockSetSectionErrorMessage).not.toHaveBeenCalledWith(
      expect.objectContaining({
        section: CheckoutStepName.FULFILLMENT_DETAILS,
      }),
    )
  })

  it("shows a fallback banner with an undefined code when the error has none", async () => {
    validateAndExtractOrderResponse.mockImplementationOnce(() => {
      throw new Error("network down")
    })

    const returnValue = await callSelectDeliveryOption()

    expect(returnValue).toBe(false)

    expect(mockSetSectionErrorMessage).toHaveBeenCalledWith({
      section: CheckoutStepName.DELIVERY_OPTION,
      error: expect.objectContaining({
        title: "An error occurred",
        code: undefined,
      }),
    })
  })
})
