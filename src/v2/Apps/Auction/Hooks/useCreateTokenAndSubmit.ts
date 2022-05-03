import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js"
import { useAddCreditCardAndUpdateProfile } from "v2/Apps/Auction/Queries/useAddCreditCardAndUpdateProfile"
import { useCreateBidder } from "v2/Apps/Auction/Queries/useCreateBidder"
import {
  AuctionFormHelpers,
  AuctionFormValues,
  errorMessageForCard,
  stripeCardElementNotFound,
  stripeNotLoadedErrorMessage,
} from "v2/Apps/Auction/Components/Form/Utils"
import createLogger from "v2/Utils/logger"
import { useAuctionTracking } from "./useAuctionTracking"
import { AuctionRegistrationRoute_me } from "v2/__generated__/AuctionRegistrationRoute_me.graphql"
import { AuctionRegistrationRoute_sale } from "v2/__generated__/AuctionRegistrationRoute_sale.graphql"
import { AuctionBidRoute_me } from "v2/__generated__/AuctionBidRoute_me.graphql"
import { AuctionBidRoute_sale } from "v2/__generated__/AuctionBidRoute_sale.graphql"
import { toStripeAddress } from "v2/Components/AddressForm"
import { useRefreshUserData } from "../Queries/useRefreshUserData"

const logger = createLogger("useCreateTokenAndSubmit")

export interface UseCreateTokenAndSubmitProps {
  me: AuctionRegistrationRoute_me | AuctionBidRoute_me
  sale: AuctionRegistrationRoute_sale | AuctionBidRoute_sale
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
  const { refreshUserData } = useRefreshUserData()

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
      logger.error(stripeCardElementNotFound)
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
            phone: values.phoneNumber,
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

      // Since we've added a credit card, refresh the data so that the user
      // no longer sees the credit card / address input form on bid page
      await refreshUserData()

      tracking.registrationSubmitted({
        bidderID: response.createBidder?.bidder?.internalID,
        me,
        sale,
      })

      onSuccess?.()
    } catch (error) {
      logger.error("Error submitting bid: ", error)
      helpers.setStatus("SUBMISSION_FAILED")
    } finally {
      helpers.setSubmitting(false)
    }
  }

  return {
    createToken,
  }
}
