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
  setErrorBanner: (error: CheckoutErrorBannerProps["error"]) => void,
) => {
  const isCheckoutError = error instanceof CheckoutError
  const errorMatchField = (isCheckoutError && error.code) || error.message

  const errorHandlers: Record<
    string,
    {
      errorBanner?: CheckoutErrorBannerProps["error"]
      fieldErrors?: Record<string, string>
    }
  > = {
    missing_postal_code: {
      errorBanner: null,
      fieldErrors: {
        "address.postalCode": "Postal code is required",
      },
    },
    missing_region: {
      errorBanner: null,
      fieldErrors: {
        "address.region": "Region is required",
      },
    },
    missing_country: {
      errorBanner: null,
      fieldErrors: {
        "address.country": "Country is required",
      },
    },
    destination_could_not_be_geocoded: {
      errorBanner: {
        title: "Cannot calculate shipping",
        message: (
          <>
            Please confirm that your address details are correct and try again.
            If the issue continues contact <MailtoOrderSupport />.
          </>
        ),
      },
    },
  }

  const errorHandler = errorHandlers[errorMatchField] || {
    errorBanner: defaultErrorBanner || {},
  }

  Object.entries(errorHandler.fieldErrors || {}).forEach(([field, message]) => {
    formikHelpers.setFieldError(field, message)
  })

  setErrorBanner(errorHandler.errorBanner)
}
