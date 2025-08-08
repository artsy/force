import { useSetPaymentByStripeIntent } from "Apps/Order/Mutations/useSetPaymentByStripeIntentMutation"
import { useRouter } from "System/Hooks/useRouter"
import { useCheckoutContext } from "./useCheckoutContext"
import createLogger from "Utils/logger"
import { useEffect, useState } from "react"
import { fetchQuery, graphql, useRelayEnvironment } from "react-relay"
import type { useStripePaymentBySetupIntentIdConfirmationTokenQuery } from "__generated__/useStripePaymentBySetupIntentIdConfirmationTokenQuery.graphql"

const logger = createLogger("useStripePaymentBySetupIntentId")

/*
 * Hook to handle Stripe redirect for newly-linked bank account in Order2
 * pulls necessary params from Stripe redirect URL and sets payment by intentId
 */
export function useStripePaymentBySetupIntentId(
  orderId: string,
  orderData: any,
) {
  const { submitMutation: setPaymentByStripeIntentMutation } =
    useSetPaymentByStripeIntent()
  const { router } = useRouter()
  const environment = useRelayEnvironment()
  const {
    setSetupIntentId,
    saveCreditCard,
    setFulfillmentDetailsComplete,
    setConfirmationToken,
  } = useCheckoutContext()

  const [isProcessingRedirect, setIsProcessingRedirect] = useState(false)
  const [stripeSetupIntentId, setStripeSetupIntentId] = useState<null | string>(
    null,
  )
  const [isPaymentSetupSuccessful, setIsPaymentSetupSuccessful] =
    useState(false)
  const [paymentSetupError, setPaymentSetupError] = useState<null | object>(
    null,
  )

  // Reusable function to fetch confirmation token and set it in context
  const fetchAndSetConfirmationToken = async (tokenId: string) => {
    try {
      const response =
        await fetchQuery<useStripePaymentBySetupIntentIdConfirmationTokenQuery>(
          environment,
          graphql`
            query useStripePaymentBySetupIntentIdConfirmationTokenQuery(
              $id: String!
            ) {
              me {
                confirmationToken(id: $id) {
                  paymentMethodPreview {
                    __typename
                    ... on Card {
                      displayBrand
                      last4
                    }
                    ... on USBankAccount {
                      bankName
                      last4
                    }
                  }
                }
              }
            }
          `,
          { id: tokenId },
          { fetchPolicy: "store-or-network" },
        ).toPromise()

      setConfirmationToken({
        confirmationToken: {
          id: tokenId,
          ...response?.me?.confirmationToken,
        },
        saveCreditCard,
      })

      return response
    } catch (error) {
      logger.error("Failed to fetch confirmation token:", error)
      // Set basic confirmation token even if fetch fails
      setConfirmationToken({
        confirmationToken: {
          id: tokenId,
        },
        saveCreditCard,
      })
      throw error
    }
  }

  useEffect(() => {
    // pull necessary params from Stripe redirect URL
    const urlParams = new URLSearchParams(window.location.search)
    const setup_intent = urlParams.get("setup_intent")
    const redirect_status = urlParams.get("redirect_status")
    const save_account = urlParams.get("save_account")
    const confirmation_token = urlParams.get("confirmation_token")

    let oneTimeUse = false

    if (
      save_account === "false" ||
      (typeof save_account === "boolean" && !save_account)
    ) {
      oneTimeUse = true
    } else {
      // Use the saveCreditCard state from context if save_account param is not present
      oneTimeUse = !saveCreditCard
    }

    if (setup_intent && redirect_status === "succeeded") {
      logger.log("Processing Stripe redirect for setup intent:", setup_intent)
      setIsProcessingRedirect(true)
      setStripeSetupIntentId(setup_intent)
      setSetupIntentId(setup_intent)

      // Set fulfillment details as complete based on order data
      const isPickup = orderData.selectedFulfillmentOption?.type === "PICKUP"
      setFulfillmentDetailsComplete({ isPickup })

      // Fetch and set confirmation token to display bank account details
      if (confirmation_token) {
        fetchAndSetConfirmationToken(confirmation_token).catch(error => {
          logger.error(
            "Failed to set confirmation token after redirect:",
            error,
          )
        })
      }

      // set payment with new bank account by Setup Intent ID
      setPaymentBySetupIntentId(setup_intent, oneTimeUse).finally(() => {
        setIsProcessingRedirect(false)
      })

      // Clean up URL parameters
      const newUrl = new URL(window.location.href)
      newUrl.searchParams.delete("setup_intent")
      newUrl.searchParams.delete("setup_intent_client_secret")
      newUrl.searchParams.delete("redirect_status")
      newUrl.searchParams.delete("save_account")
      newUrl.searchParams.delete("confirmation_token")
      router.replace(newUrl.pathname + newUrl.search)
    }
  }, [
    orderId,
    router,
    setSetupIntentId,
    saveCreditCard,
    setFulfillmentDetailsComplete,
    orderData.selectedFulfillmentOption?.type,
  ])

  const setPaymentBySetupIntentId = async (
    setupIntentId: string,
    oneTimeUse: boolean,
  ) => {
    try {
      const orderOrError = (
        await setPaymentByStripeIntentMutation({
          variables: {
            input: {
              id: orderId,
              oneTimeUse,
              setupIntentId,
            },
          },
        })
      ).commerceSetPaymentByStripeIntent?.orderOrError

      if (orderOrError?.error) throw orderOrError.error
      setIsPaymentSetupSuccessful(true)
      logger.log("Successfully set payment by setup intent")
    } catch (error) {
      setIsPaymentSetupSuccessful(false)
      setPaymentSetupError(error)
      logger.error("Failed to set payment by setup intent:", error)
    }
  }

  return {
    isProcessingRedirect,
    stripeSetupIntentId,
    isPaymentSetupSuccessful,
    paymentSetupError,
  }
}
