import { CheckoutError } from "Apps/Order/Components/ExpressCheckout/Util/mutationHandling"
import {
  type CheckoutErrorBannerProps,
  MailtoOrderSupport,
} from "Apps/Order2/Routes/Checkout/Components/CheckoutErrorBanner"
import type { FormikContextWithAddress } from "Components/Address/AddressFormFields"
import type { FormikHelpers } from "formik"

export const handleError = (
  error: CheckoutError | Error,
  formikHelpers: FormikHelpers<FormikContextWithAddress>,
  defaultErrorBanner: CheckoutErrorBannerProps["error"],
) => {
  let errorBanner: CheckoutErrorBannerProps["error"] = {}

  const isCheckoutError = error instanceof CheckoutError
  const errorMatchField = (isCheckoutError && error.code) || error.message

  switch (errorMatchField) {
    case "missing_postal_code":
      errorBanner = null
      // This error message will not persist through subsequent form validations
      // that refer to the validation schema.
      formikHelpers.setFieldError(
        "address.postalCode",
        "Postal code is required",
      )
      break
    case "missing_region":
      errorBanner = null
      formikHelpers.setFieldError("address.region", "Region is required")
      break
    case "missing_country":
      errorBanner = null
      formikHelpers.setFieldError("address.country", "Country is required")
      break
    case "destination_could_not_be_geocoded":
      errorBanner = {
        title: "Cannot calculate shipping",
        message: (
          <>
            Please confirm that your address details are correct and try again.
            If the issue continues contact <MailtoOrderSupport />.
          </>
        ),
      }
      break
    default:
      errorBanner = defaultErrorBanner || {}
      break
  }

  formikHelpers.setStatus({
    errorBanner,
  })
}
