import {
  CardCvcElement,
  CardExpiryElement,
  CardNumberElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js"
import { useAddCreditCardAndUpdateProfile } from "Apps/Auction/Queries/useAddCreditCardAndUpdateProfile"
import { useCreateBidder } from "Apps/Auction/Queries/useCreateBidder"
import createLogger from "Utils/logger"
import { useAuctionTracking } from "./useAuctionTracking"
import { AuctionRegistrationRoute_me$data } from "__generated__/AuctionRegistrationRoute_me.graphql"
import { AuctionRegistrationRoute_sale$data } from "__generated__/AuctionRegistrationRoute_sale.graphql"
import { AuctionBidRoute_me$data } from "__generated__/AuctionBidRoute_me.graphql"
import { AuctionBidRoute_sale$data } from "__generated__/AuctionBidRoute_sale.graphql"
import { toStripeAddress } from "Components/Address/AddressForm"
import { useRefreshUserData } from "Apps/Auction/Queries/useRefreshUserData"
import {
  errorMessageForCard,
  stripeCardElementNotFound,
  stripeNotLoadedErrorMessage,
} from "Apps/Auction/Components/Form/Utils/errorMessages"
import {
  AuctionFormValues,
  AuctionFormHelpers,
} from "Apps/Auction/Components/Form/Utils/initialValues"

const logger = createLogger("useCreateTokenAndSubmit")

export interface UseCreateTokenAndSubmitProps {
  me: AuctionRegistrationRoute_me$data | AuctionBidRoute_me$data
  sale: AuctionRegistrationRoute_sale$data | AuctionBidRoute_sale$data
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
