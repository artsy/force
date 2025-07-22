import { CheckoutError } from "Apps/Order/Components/ExpressCheckout/Util/mutationHandling"
import { handleError } from "Apps/Order2/Routes/Checkout/Components/FulfillmentDetailsStep/handleError"
import type { FormikHelpers } from "formik"

let formikHelpers: Partial<FormikHelpers<any>>

const defaultErrorBannerArgs = {}

beforeEach(() => {
  formikHelpers = {
    setFieldError: jest.fn(),
    setStatus: jest.fn(),
  }
})

describe("fulfillment details error handling", () => {
  it("handles missing postal code error", () => {
    const error = new CheckoutError(
      "this is an error `message`",
      "missing_postal_code",
    )

    handleError(
      error,
      formikHelpers as FormikHelpers<any>,
      defaultErrorBannerArgs,
    )

    expect(formikHelpers.setFieldError).toHaveBeenCalledWith(
      "address.postalCode",
      "Postal code is required",
    )
    expect(formikHelpers.setStatus).toHaveBeenCalledWith({
      errorBanner: null,
    })
  })

  it("handles missing region error", () => {
    const error = new CheckoutError(
      "this is an error `message`",
      "missing_region",
    )

    handleError(
      error,
      formikHelpers as FormikHelpers<any>,
      defaultErrorBannerArgs,
    )

    expect(formikHelpers.setFieldError).toHaveBeenCalledWith(
      "address.region",
      "Region is required",
    )
    expect(formikHelpers.setStatus).toHaveBeenCalledWith({
      errorBanner: null,
    })
  })

  it("handles missing country error", () => {
    const error = new CheckoutError(
      "this is an error `message`",
      "missing_country",
    )

    handleError(
      error,
      formikHelpers as FormikHelpers<any>,
      defaultErrorBannerArgs,
    )

    expect(formikHelpers.setFieldError).toHaveBeenCalledWith(
      "address.country",
      "Country is required",
    )
    expect(formikHelpers.setStatus).toHaveBeenCalledWith({
      errorBanner: null,
    })
  })

  it("handles destination could not be geocoded error", () => {
    const error = new CheckoutError(
      "this is an error `message`",
      "destination_could_not_be_geocoded",
    )

    handleError(
      error,
      formikHelpers as FormikHelpers<any>,
      defaultErrorBannerArgs,
    )

    expect(formikHelpers.setFieldError).not.toHaveBeenCalled()
    expect(formikHelpers.setStatus).toHaveBeenCalledWith({
      errorBanner: expect.objectContaining({
        title: "Cannot calculate shipping",
      }),
    })
  })
})
