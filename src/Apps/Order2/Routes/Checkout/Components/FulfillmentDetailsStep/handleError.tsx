import {
  type CheckoutErrorBannerProps,
  MailtoOrderSupport,
} from "Apps/Order2/Routes/Checkout/Components/CheckoutErrorBanner"
import type {
  CheckoutMutationError,
  KnownErrorCodes,
  LocalCheckoutError,
} from "Apps/Order2/Utils/errors"
import type { FormikContextWithAddress } from "Components/Address/AddressFormFields"
import type { FormikHelpers } from "formik"

export const handleError = (
  error: CheckoutMutationError | LocalCheckoutError | Error,
  formikHelpers: FormikHelpers<FormikContextWithAddress>,
  defaultErrorBanner: CheckoutErrorBannerProps["error"],
  setErrorBanner: (error: CheckoutErrorBannerProps["error"]) => void,
) => {
  const errorMatchField = ("code" in error && error.code) || error.message

  const errorHandlers: Record<KnownErrorCodes, ErrorHandlerConfig> = {
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
    no_shipping_options: {
      errorBanner: {
        title: "Unable to provide shipping quote",
        message: (
          <>
            Please contact <MailtoOrderSupport /> so we can assist you with your
            purchase.
          </>
        ),
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

  const errorHandler =
    errorHandlers[errorMatchField as KnownErrorCodes] ||
    ({
      errorBanner: defaultErrorBanner || {},
    } as ErrorHandlerConfig)

  Object.entries(errorHandler.fieldErrors || {}).forEach(([field, message]) => {
    formikHelpers.setFieldError(field, message)
  })

  setErrorBanner(errorHandler.errorBanner)
}

interface ErrorHandlerConfig {
  errorBanner?: CheckoutErrorBannerProps["error"]
  fieldErrors?: Record<string, string>
}
