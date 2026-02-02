import {
  type CheckoutErrorBannerMessage,
  MailtoOrderSupport,
  ORDER_SUPPORT_EMAIL,
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
  defaultErrorBanner: CheckoutErrorBannerMessage | null,
  setErrorBanner: (error?: CheckoutErrorBannerMessage | null) => void,
) => {
  const errorMatchField = ("code" in error && error.code) || error.message

  const errorHandlers: Record<
    KnownErrorCodes,
    (code: string) => ErrorHandlerConfig
  > = {
    missing_postal_code: () => ({
      errorBanner: null,
      fieldErrors: {
        "address.postalCode": "Postal code is required",
      },
    }),
    missing_region: () => ({
      errorBanner: null,
      fieldErrors: {
        "address.region": "Region is required",
      },
    }),
    missing_country: () => ({
      errorBanner: null,
      fieldErrors: {
        "address.country": "Country is required",
      },
    }),
    no_shipping_options: code => ({
      errorBanner: {
        title: "Unable to provide shipping quote",
        message: (
          <>
            Please contact <MailtoOrderSupport /> so we can assist you with your
            purchase.
          </>
        ),
        displayText: `Please contact ${ORDER_SUPPORT_EMAIL} so we can assist you with your purchase.`,
        code,
      },
    }),

    destination_could_not_be_geocoded: code => ({
      errorBanner: {
        title: "Cannot calculate shipping",
        message: (
          <>
            Please confirm that your address details are correct and try again.
            If the issue continues contact <MailtoOrderSupport />.
          </>
        ),
        displayText: `Please confirm that your address details are correct and try again. If the issue continues contact ${ORDER_SUPPORT_EMAIL}.`,
        code,
      },
    }),
  }

  const errorHandler =
    errorMatchField in errorHandlers
      ? errorHandlers[errorMatchField as KnownErrorCodes](errorMatchField)
      : ({
          errorBanner: defaultErrorBanner
            ? {
                ...defaultErrorBanner,
                code: ("code" in error && error.code) || undefined,
              }
            : {},
        } as ErrorHandlerConfig)

  Object.entries(errorHandler.fieldErrors || {}).forEach(([field, message]) => {
    formikHelpers.setFieldError(field, message)
  })

  setErrorBanner(errorHandler.errorBanner)
}

interface ErrorHandlerConfig {
  errorBanner?: CheckoutErrorBannerMessage | null
  fieldErrors?: Record<string, string>
}
