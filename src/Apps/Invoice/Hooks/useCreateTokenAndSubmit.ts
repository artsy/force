import {
  stripeCardElementNotFound,
  stripeNotLoadedErrorMessage,
} from "Apps/Auction/Components/Form/Utils/errorMessages"
import type { AddressFormValues } from "Apps/Invoice/Components/AddressFormWithCreditCard"
import type { InvoicePaymentFormProps } from "Apps/Invoice/Components/InvoicePaymentForm"
import { useMakeInvoicePayment } from "Apps/Invoice/Hooks/useMakeInvoicePayment"
import { toStripeAddress } from "Components/Address/utils"
import createLogger from "Utils/logger"
import { useToasts } from "@artsy/palette"
import {
  CardCvcElement,
  CardExpiryElement,
  CardNumberElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js"
import type { FormikHelpers } from "formik"

const logger = createLogger("useCreateTokenAndSubmit")

export interface UseCreateTokenAndSubmitProps extends InvoicePaymentFormProps {
  onSuccess: () => void
}

export const useCreateTokenAndSubmit = ({
  onSuccess,
  ...rest
}: UseCreateTokenAndSubmitProps) => {
  const stripe = useStripe()
  const elements = useElements()
  const { sendToast } = useToasts()

  const { submitMutation: makeInvoicePaymentMutation } = useMakeInvoicePayment()

  const createToken = async (
    values: AddressFormValues,
    helpers: FormikHelpers<AddressFormValues>,
  ) => {
    if (!stripe || !elements) {
      logger.error(stripeNotLoadedErrorMessage)
      helpers.setStatus("SUBMISSION_FAILED")
      return
    }

    const cardNumberElement = elements.getElement(CardNumberElement)
    const cardExpiryElement = elements.getElement(CardExpiryElement)
    const cardCvcElement = elements.getElement(CardCvcElement)

    if (!cardNumberElement || !cardExpiryElement || !cardCvcElement) {
      logger.error(stripeCardElementNotFound)
      helpers.setStatus("SUBMISSION_FAILED")
      return
    }

    helpers.setSubmitting(true)

    try {
      const { error, token } = await stripe.createToken(
        cardNumberElement,
        toStripeAddress(values.address),
      )

      if (error) {
        helpers.setFieldError("creditCard", error.message)
        return
      }

      await makeInvoicePaymentMutation({
        variables: {
          input: {
            creditCardToken: token.id,
            provider: "stripe",
            ...rest,
          },
        },
        rejectIf: res => {
          if (res.createInvoicePayment?.responseOrError?.mutationError) {
            const errorMessage =
              res.createInvoicePayment.responseOrError.mutationError.message

            helpers.setFieldError("creditCard", errorMessage)

            return errorMessage
          }
        },
      })

      sendToast({
        variant: "success",
        message: "Payment successful",
      })

      onSuccess()
    } catch (_error) {
      helpers.setStatus("SUBMISSION_FAILED")
    } finally {
      helpers.setSubmitting(false)
    }
  }

  return {
    createToken,
  }
}
