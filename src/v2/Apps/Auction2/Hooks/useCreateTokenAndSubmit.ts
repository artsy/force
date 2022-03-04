import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js"
import { useAddCreditCardAndUpdateProfile } from "v2/Apps/Auction2/Queries/useAddCreditCardAndUpdateProfile"
import { useCreateBidder } from "v2/Apps/Auction2/Queries/useCreateBidder"
import {
  AuctionFormHelpers,
  AuctionFormValues,
  errorMessageForCard,
  stripeNotLoadedErrorMessage,
} from "v2/Apps/Auction2/Components/Form/Utils"
import createLogger from "v2/Utils/logger"
import { useAuctionTracking } from "./useAuctionTracking"
import { Auction2RegistrationRoute_me } from "v2/__generated__/Auction2RegistrationRoute_me.graphql"
import { Auction2RegistrationRoute_sale } from "v2/__generated__/Auction2RegistrationRoute_sale.graphql"
import { Auction2BidRoute_me } from "v2/__generated__/Auction2BidRoute_me.graphql"
import { Auction2BidRoute_sale } from "v2/__generated__/Auction2BidRoute_sale.graphql"
import { toStripeAddress } from "v2/Components/AddressForm"

const logger = createLogger("useCreateTokenAndSubmit")

interface UseCreateTokenAndSubmitProps {
  me: Auction2RegistrationRoute_me | Auction2BidRoute_me
  sale: Auction2RegistrationRoute_sale | Auction2BidRoute_sale
  onSuccess?: () => void
}

export const useCreateTokenAndSubmit = ({
  me,
  sale,
  onSuccess,
}: UseCreateTokenAndSubmitProps) => {
  const stripe = useStripe()
  const elements = useElements()
  const { tracking } = useAuctionTracking()

  const {
    submitMutation: submitAddCreditCardAndUpdateProfileMutation,
  } = useAddCreditCardAndUpdateProfile()
  const { submitMutation: createBidder } = useCreateBidder()

  /**
   * The createToken flow is as follows:
   *
   * 1. Load stripe
   * 2. Set submitting=true
   * 3. Create a new stripe token from address form
   * 4. Add credit card and update user address or reject if mutation error
   * 5. Create bidder
   * 6. Call onSuccess callback
   */
  const createToken = async (
    values: AuctionFormValues,
    helpers: AuctionFormHelpers
  ) => {
    if (!stripe || !elements) {
      logger.error(stripeNotLoadedErrorMessage)
      helpers.setStatus("SUBMISSION_FAILED")
      return
    }

    const element = elements.getElement(CardElement)

    if (!element) {
      helpers.setStatus("SUBMISSION_FAILED")
      return
    }

    helpers.setSubmitting(true)

    try {
      const { error, token } = await stripe.createToken(
        element,
        toStripeAddress(values.address!)
      )!

      if (error) {
        helpers.setFieldError("creditCard", error.message)
        return
      }

      await submitAddCreditCardAndUpdateProfileMutation({
        variables: {
          creditCardInput: {
            token: token?.id!,
          },
          profileInput: {
            phone: values.address?.phoneNumber,
          },
        },
        rejectIf: res => {
          if (res.createCreditCard?.creditCardOrError?.mutationError) {
            const mutationErrorDetail = res.createCreditCard?.creditCardOrError
              ?.mutationError?.detail!

            helpers.setFieldError(
              "creditCard",
              errorMessageForCard(mutationErrorDetail)
            )

            return mutationErrorDetail
          }
        },
      })

      const response = await createBidder({
        variables: {
          input: { saleID: sale.slug },
        },
      })

      tracking.registrationSubmitted({
        bidderID: response.createBidder?.bidder?.internalID,
        me,
        sale,
      })

      onSuccess?.()
    } catch (error) {
      logger.error("Error submitting bid: ", error)
      tracking.registrationSubmitFailed({ error, sale, me })
      helpers.setStatus("SUBMISSION_FAILED")
    } finally {
      helpers.setSubmitting(false)
    }
  }

  return {
    createToken,
  }
}
