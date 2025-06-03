import LockIcon from "@artsy/icons/LockIcon"
import ReceiptIcon from "@artsy/icons/ReceiptIcon"
import { Box, Button, Flex, Spacer, Text } from "@artsy/palette"
import {
  Elements,
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js"
import {
  type StripeElementsOptions,
  type StripeElementsUpdateOptions,
  type StripePaymentElementOptions,
  loadStripe,
} from "@stripe/stripe-js"
import { Collapse } from "Apps/Order/Components/Collapse"
import { useUpdateOrderMutation } from "Apps/Order/Components/ExpressCheckout/Mutations/useUpdateOrderMutation"
import { validateAndExtractOrderResponse } from "Apps/Order/Components/ExpressCheckout/Util/mutationHandling"
import { useCheckoutContext } from "Apps/Order2/Routes/Checkout/Hooks/useCheckoutContext"
import { FadeInBox } from "Components/FadeInBox"
import { RouterLink } from "System/Components/RouterLink"
import { getENV } from "Utils/getENV"
import createLogger from "Utils/logger"
import type { Order2PaymentFormConfirmationTokenQuery } from "__generated__/Order2PaymentFormConfirmationTokenQuery.graphql"
import type {
  Order2PaymentForm_order$data,
  Order2PaymentForm_order$key,
} from "__generated__/Order2PaymentForm_order.graphql"
import type React from "react"
import { useState } from "react"
import {
  fetchQuery,
  graphql,
  useFragment,
  useRelayEnvironment,
} from "react-relay"

const stripePromise = loadStripe(getENV("STRIPE_PUBLISHABLE_KEY"))
const logger = createLogger("Order2PaymentForm")

interface Order2PaymentFormProps {
  order: Order2PaymentForm_order$key
}

export const Order2PaymentForm: React.FC<Order2PaymentFormProps> = ({
  order,
}) => {
  const orderData = useFragment(FRAGMENT, order)
  const { itemsTotal, seller } = orderData

  if (!itemsTotal) {
    throw new Error("itemsTotal is required")
  }

  const orderOptions: StripeElementsUpdateOptions = {
    amount: itemsTotal.minor,
    currency: itemsTotal.currencyCode.toLowerCase(),
    onBehalfOf: seller?.merchantAccount?.externalId,
    setupFutureUsage: "off_session",
    captureMethod: "manual",
  }

  const options: StripeElementsOptions = {
    mode: "payment",
    appearance: {
      variables: {
        accordionItemSpacing: "10px",
      },
      rules: {
        ".AccordionItem": {
          border: "none",
          backgroundColor: "#EFEFEF",
        },
        ".AccordionItem:focus-visible": {
          border: "1px solid black",
        },
        ".AccordionItem--selected": {
          border: "1px solid black",
        },
      },
    },
    ...orderOptions,
  }

  return (
    <Elements stripe={stripePromise} options={options}>
      <PaymentFormContent order={orderData} />
    </Elements>
  )
}

interface PaymentFormContentProps {
  order: Order2PaymentForm_order$data
}
const PaymentFormContent: React.FC<PaymentFormContentProps> = ({ order }) => {
  const stripe = useStripe()
  const elements = useElements()
  const environment = useRelayEnvironment()
  const updateOrderMutation = useUpdateOrderMutation()
  const { setConfirmationToken } = useCheckoutContext()
  const [isSubmittingToStripe, setIsSubmittingToStripe] = useState(false)

  if (!(stripe && elements)) {
    return null
  }

  // From Stripe docs
  const [errorMessage, setErrorMessage] = useState()
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("new")

  const paymentElementOptions: StripePaymentElementOptions = {
    layout: {
      type: "accordion",
      spacedAccordionItems: true,
      defaultCollapsed: true,
      radios: false,
    },
  }

  const onChange = event => {
    const { elementType, collapsed } = event
    if (elementType === "payment" && !collapsed) {
      setSelectedPaymentMethod("new")
    }
  }

  const onClickSavedPaymentMethods = () => {
    setSelectedPaymentMethod("saved")
    elements?.getElement("payment")?.collapse()
  }

  const onClickWirePaymentMethods = () => {
    setSelectedPaymentMethod("wire")
    elements?.getElement("payment")?.collapse()
  }

  // From Stripe docs
  const handleError = error => {
    setErrorMessage(error.message)
  }

  // From Stripe docs
  const handleSubmit = async event => {
    event.preventDefault()
    setIsSubmittingToStripe(true)

    const { error: submitError } = await elements.submit()
    if (submitError) {
      logger.error(submitError)
      handleError(submitError)
      return
    }

    const { error, confirmationToken } = await stripe.createConfirmationToken({
      elements,
    })

    if (error) {
      logger.error(error)
      handleError(error)
      return
    }

    const response = await fetchQuery<Order2PaymentFormConfirmationTokenQuery>(
      environment,
      graphql`
        query Order2PaymentFormConfirmationTokenQuery($id: String!) {
          me {
            confirmationToken(id: $id) {
              paymentMethodPreview {
                card {
                  displayBrand
                  last4
                }
              }
            }
          }
        }
      `,
      { id: confirmationToken.id },
      { fetchPolicy: "store-or-network" },
    ).toPromise()

    if (!response) {
      logger.error("Failed to load confirmation token")
      handleError(new Error("Confirmation token not found"))
      return
    }

    try {
      const updateOrderPaymentMethodResult =
        await updateOrderMutation.submitMutation({
          variables: {
            input: {
              id: order.internalID,
              paymentMethod: "CREDIT_CARD",
            },
          },
        })

      validateAndExtractOrderResponse(
        updateOrderPaymentMethodResult.updateOrder?.orderOrError,
      )
    } catch (error) {
      logger.error("Error while updating order payment method", error)
    } finally {
      setIsSubmittingToStripe(false)
    }

    setConfirmationToken({
      confirmationToken: {
        id: confirmationToken.id,
        ...response?.me?.confirmationToken,
      },
    })
  }

  return (
    <form data-testID="paymentForm" onSubmit={handleSubmit}>
      <FadeInBox>
        <Box
          backgroundColor="#EFEFEF"
          borderRadius="5px"
          padding="1rem"
          marginBottom="10px"
          style={{ cursor: "pointer" }}
          onClick={onClickSavedPaymentMethods}
        >
          <Flex alignItems="center">
            <LockIcon fill="mono100" />
            <Spacer x={1} />
            <Text color="mono100">Saved payments</Text>
          </Flex>
          <Collapse open={selectedPaymentMethod === "saved"}>
            <Text variant="sm" ml="30px">
              Select a saved payment method or add a new one.
            </Text>
            <Text variant="sm" p="10px">
              Visa ....1234
            </Text>
            <Text variant="sm" p="10px">
              Visa ....5678
            </Text>
          </Collapse>
        </Box>
      </FadeInBox>
      <PaymentElement options={paymentElementOptions} onChange={onChange} />
      <Spacer y={1} />
      <FadeInBox>
        <Box
          backgroundColor="#EFEFEF"
          borderRadius="5px"
          padding="1rem"
          marginBottom="10px"
          style={{ cursor: "pointer" }}
          onClick={onClickWirePaymentMethods}
        >
          <Flex alignItems="center">
            <ReceiptIcon fill="mono100" />
            <Spacer x={1} />
            <Text color="mono100">Wire Transfer</Text>
          </Flex>
          <Collapse open={selectedPaymentMethod === "wire"}>
            <Text color="mono60" variant="sm" ml="30px">
              To pay by wire transfer, complete checkout and a member of the
              Artsy team will contact you with next steps by email.
            </Text>
            <Text color="mono60" variant="sm" ml="30px">
              Please inform your bank that you will be responsible for all wire
              transfer fees.
            </Text>
            <Text color="mono60" variant="sm" ml="30px">
              You can contact{" "}
              <RouterLink inline to="mailto:orders@artsy.net">
                orders@artsy.net
              </RouterLink>{" "}
              with any questions.
            </Text>
          </Collapse>
        </Box>
      </FadeInBox>
      <Spacer y={2} />
      <Button
        loading={isSubmittingToStripe}
        variant={"primaryBlack"}
        width="100%"
        type="submit"
      >
        Save and Continue
      </Button>
      {errorMessage && <div>{errorMessage}</div>}
    </form>
  )
}

const FRAGMENT = graphql`
  fragment Order2PaymentForm_order on Order {
    internalID
    itemsTotal {
      minor
      currencyCode
    }
    seller {
      ... on Partner {
        merchantAccount {
          externalId
        }
      }
    }
  }
`
