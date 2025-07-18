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
  const errorMatchField = isCheckoutError ? error.code : error.message

  console.error("**", error.message, errorMatchField)
  switch (errorMatchField) {
    case "missing_postal_code":
      errorBanner = null
      // TODO: Will this work when the user touches the field? We could set some kind of meta value on the formik context
      // for the schema to reference, like to say 'actually this field is required'
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
