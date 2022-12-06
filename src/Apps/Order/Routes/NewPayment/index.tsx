import { NewPayment_me$data } from "__generated__/NewPayment_me.graphql"
import { NewPayment_order$data } from "__generated__/NewPayment_order.graphql"
import { NewPaymentRouteSetOrderPaymentMutation } from "__generated__/NewPaymentRouteSetOrderPaymentMutation.graphql"
import { ArtworkSummaryItemFragmentContainer as ArtworkSummaryItem } from "Apps/Order/Components/ArtworkSummaryItem"
import { TransactionDetailsSummaryItemFragmentContainer as TransactionDetailsSummaryItem } from "Apps/Order/Components/TransactionDetailsSummaryItem"
import { CountdownTimer } from "Components/CountdownTimer"
import { RouteConfig, Router } from "found"
import { createRef, useState, FC } from "react"
import { createFragmentContainer, graphql } from "react-relay"
import type { Stripe, StripeElements } from "@stripe/stripe-js"
import createLogger from "Utils/logger"
import { Media } from "Utils/Responsive"
import { Button, Flex, Join, Spacer } from "@artsy/palette"
import {
  CreditCardPicker,
  CreditCardPickerFragmentContainer,
} from "Apps/Order/Components/CreditCardPicker"
import { Dialog, injectDialog } from "Apps/Order/Dialogs"
import {
  CommitMutation,
  injectCommitMutation,
} from "Apps/Order/Utils/commitMutation"
import { get } from "Utils/get"
import { BuyerGuarantee } from "Apps/Order/Components/BuyerGuarantee"
import { createStripeWrapper } from "Utils/createStripeWrapper"
import { ContextModule, OwnerType } from "@artsy/cohesion"
import { OrderRouteContainer } from "Apps/Order/Components/OrderRouteContainer"

export const ContinueButton = props => (
  <Button variant="primaryBlack" width={["100%", "50%"]} {...props}>
    Continue
  </Button>
)

export interface StripeProps {
  stripe: Stripe
  elements: StripeElements
}

export interface NewPaymentProps {
  order: NewPayment_order$data
  me: NewPayment_me$data
  router: Router
  route: RouteConfig
  dialog: Dialog
  commitMutation: CommitMutation
  isCommittingMutation: boolean
}

type CreditCardPickerResultType =
  | { type: "error"; error: string | undefined }
  | { type: "internal_error"; error: string | undefined }
  | { type: "invalid_form" }
  | { type: "success"; creditCardId: string }

const logger = createLogger("Order/Routes/NewPayment/index.tsx")

export const NewPaymentRoute: FC<NewPaymentProps & StripeProps> = props => {
  const [isGettingCreditCardId, setIsGettingCreditCardId] = useState(false)
  const [
    creditCardPickerResult,
    setCreditCardPickerResult,
  ] = useState<CreditCardPickerResultType | null>(null)

  const {
    order,
    me,
    router,
    route,
    dialog,
    commitMutation,
    isCommittingMutation,
    stripe,
  } = props
  const isLoading = isCommittingMutation || isGettingCreditCardId
  const CreditCardPicker = createRef<CreditCardPicker>()

  const getCreditCardId = async (): Promise<string | null> => {
    setIsGettingCreditCardId(true)

    const result = await CreditCardPicker?.current?.getCreditCardId()

    setIsGettingCreditCardId(false)

    if (result?.type === "invalid_form") return null

    if (result?.type === "error") {
      dialog.showErrorDialog({
        title: result?.error,
        message:
          "Please enter another payment method or contact your bank for more information.",
      })
      return null
    }

    if (result?.type === "internal_error") {
      dialog.showErrorDialog({
        title: "An internal error occurred",
      })
      logger.error(result?.error)
      return null
    }

    if (result?.type === "success" && result?.creditCardId) {
      setCreditCardPickerResult(result)
      return result.creditCardId
    }

    return null
  }

  const onContinue = async () => {
    try {
      const creditCardId =
        creditCardPickerResult?.type === "success"
          ? creditCardPickerResult.creditCardId
          : await getCreditCardId()

      if (creditCardId) {
        const orderOrError = (
          await fixFailedPayment({
            input: {
              creditCardId,
              offerId: order.lastOffer?.internalID,
              orderId: order.internalID,
            },
          })
        ).commerceFixFailedPayment?.orderOrError!

        if (orderOrError.error) {
          handleFixFailedPaymentError(orderOrError.error.code)
          return
        }

        if (orderOrError.actionData && orderOrError.actionData.clientSecret) {
          const scaResult = await stripe.handleCardAction(
            orderOrError.actionData.clientSecret
          )
          if (scaResult.error) {
            dialog.showErrorDialog({
              title: "An error occurred",
              message: scaResult.error.message,
            })
            return
          } else {
            onContinue()
          }
        }

        router.push(`/orders/${order.internalID}/status`)
      }
    } catch (error) {
      logger.error(error)
      dialog.showErrorDialog()
    }
  }

  const fixFailedPayment = (
    variables: NewPaymentRouteSetOrderPaymentMutation["variables"]
  ) => {
    return commitMutation<NewPaymentRouteSetOrderPaymentMutation>({
      variables,
      mutation: graphql`
        mutation NewPaymentRouteSetOrderPaymentMutation(
          $input: CommerceFixFailedPaymentInput!
        ) {
          commerceFixFailedPayment(input: $input) {
            orderOrError {
              ... on CommerceOrderWithMutationSuccess {
                order {
                  state
                  creditCard {
                    internalID
                    name
                    street1
                    street2
                    city
                    state
                    country
                    postal_code: postalCode
                  }
                  ... on CommerceOfferOrder {
                    awaitingResponseFrom
                  }
                }
              }
              ... on CommerceOrderRequiresAction {
                actionData {
                  clientSecret
                }
              }
              ... on CommerceOrderWithMutationFailure {
                error {
                  type
                  code
                  data
                }
              }
            }
          }
        }
      `,
    })
  }

  const handleFixFailedPaymentError = async (code: string) => {
    switch (code) {
      case "capture_failed": {
        dialog.showErrorDialog({
          title: "Charge failed",
          message:
            "Payment has been declined. Please contact your card provider or bank institution, then press “Continue” again. Alternatively, use another payment method.",
        })
        break
      }
      case "insufficient_inventory": {
        await dialog.showErrorDialog({
          title: "Not available",
          message: "Sorry, the work is no longer available.",
        })
        routeToArtistPage()
        break
      }
      default: {
        dialog.showErrorDialog()
        break
      }
    }
  }

  const getArtistId = () => {
    return get(
      order,
      o => o.lineItems?.edges?.[0]?.node?.artwork?.artists?.[0]?.slug
    )
  }

  const routeToArtistPage = () => {
    const artistId = getArtistId()

    // Don't confirm whether or not you want to leave the page
    route.onTransition = () => null
    window.location.assign(`/artist/${artistId}`)
  }

  return (
    <OrderRouteContainer
      currentStep="Payment"
      steps={["Payment"]}
      content={
        <Flex
          flexDirection="column"
          style={isLoading ? { pointerEvents: "none" } : {}}
        >
          {order.mode === "OFFER" && (
            <>
              <Flex>
                <CountdownTimer
                  action="Submit new payment"
                  note="Expiration will end negotiations on this offer. Keep in mind the work can be sold to another buyer in the meantime."
                  countdownStart={order.lastOffer?.createdAt!}
                  countdownEnd={order.stateExpiresAt!}
                />
              </Flex>
              <Spacer y={[2, 4]} />
            </>
          )}
          <Join separator={<Spacer y={4} />}>
            <CreditCardPickerFragmentContainer
              order={order}
              me={me}
              commitMutation={commitMutation}
              innerRef={CreditCardPicker}
            />
            <Media greaterThan="xs">
              <ContinueButton onClick={onContinue} loading={isLoading} />
            </Media>
          </Join>
        </Flex>
      }
      sidebar={
        <Flex flexDirection="column">
          <Flex flexDirection="column">
            <ArtworkSummaryItem order={order} />
            <TransactionDetailsSummaryItem order={order} />
          </Flex>
          <BuyerGuarantee
            contextModule={ContextModule.ordersNewPayment}
            contextPageOwnerType={OwnerType.ordersNewPayment}
          />
          <Spacer y={[2, 4]} />
          <Media at="xs">
            <>
              <ContinueButton onClick={onContinue} loading={isLoading} />
            </>
          </Media>
        </Flex>
      }
    />
  )
}

export const NewPaymentFragmentContainer = createFragmentContainer(
  createStripeWrapper<NewPaymentProps>(
    injectCommitMutation(injectDialog(NewPaymentRoute)) as any
  ),
  {
    me: graphql`
      fragment NewPayment_me on Me {
        ...CreditCardPicker_me
      }
    `,
    order: graphql`
      fragment NewPayment_order on CommerceOrder {
        internalID
        mode
        stateExpiresAt
        lineItems {
          edges {
            node {
              artwork {
                slug
                artists {
                  slug
                }
              }
            }
          }
        }
        ... on CommerceOfferOrder {
          lastOffer {
            createdAt
            internalID
            note
          }
        }
        ...CreditCardPicker_order
        ...ArtworkSummaryItem_order
        ...TransactionDetailsSummaryItem_order
      }
    `,
  }
)
