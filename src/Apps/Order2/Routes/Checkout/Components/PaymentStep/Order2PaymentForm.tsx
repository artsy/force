import { ContextModule } from "@artsy/cohesion"
import LockIcon from "@artsy/icons/LockIcon"
import ReceiptIcon from "@artsy/icons/ReceiptIcon"
import {
  Box,
  Button,
  Checkbox,
  Flex,
  Radio,
  RadioGroup,
  Spacer,
  Text,
  useTheme,
} from "@artsy/palette"
import {
  Elements,
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js"
import {
  type StripeElementsOptions,
  type StripeElementsUpdateOptions,
  type StripePaymentElementChangeEvent,
  type StripePaymentElementOptions,
} from "@stripe/stripe-js"
import { Collapse } from "Apps/Order/Components/Collapse"
import { useUpdateOrderMutation } from "Apps/Order/Components/ExpressCheckout/Mutations/useUpdateOrderMutation"
import { useSetPayment } from "Apps/Order/Mutations/useSetPayment"
import { validateAndExtractOrderResponse } from "Apps/Order/Components/ExpressCheckout/Util/mutationHandling"
import { CheckoutErrorBanner } from "Apps/Order2/Routes/Checkout/Components/CheckoutErrorBanner"
import { useCheckoutContext } from "Apps/Order2/Routes/Checkout/Hooks/useCheckoutContext"
import { FadeInBox } from "Components/FadeInBox"
import { RouterLink } from "System/Components/RouterLink"
import { extractNodes } from "Utils/extractNodes"
import createLogger from "Utils/logger"
import type { Order2PaymentFormConfirmationTokenQuery } from "__generated__/Order2PaymentFormConfirmationTokenQuery.graphql"
import type { Order2PaymentFormSavedCreditCardsQuery } from "__generated__/Order2PaymentFormSavedCreditCardsQuery.graphql"
import type {
  Order2PaymentForm_order$data,
  Order2PaymentForm_order$key,
} from "__generated__/Order2PaymentForm_order.graphql"
import type React from "react"
import { useState, useEffect } from "react"
import {
  fetchQuery,
  graphql,
  useFragment,
  useRelayEnvironment,
} from "react-relay"
import { Brand, BrandCreditCardIcon } from "Components/BrandCreditCardIcon"

const logger = createLogger("Order2PaymentForm")
const defaultErrorMessage =
  "Something went wrong. Please try again or contact orders@artsy.net"

interface Order2PaymentFormProps {
  order: Order2PaymentForm_order$key
}

export const Order2PaymentForm: React.FC<Order2PaymentFormProps> = ({
  order,
}) => {
  const orderData = useFragment(FRAGMENT, order)
  const stripe = useStripe()
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

  const { theme } = useTheme()

  const options: StripeElementsOptions = {
    mode: "payment",
    appearance: {
      variables: {
        accordionItemSpacing: "10px",
        fontFamily: theme.fonts.sans,
        colorPrimary: theme.colors.mono100, // accordion is selected
        colorTextSecondary: theme.colors.mono100, // accordion is not selected
      },
      rules: {
        ".AccordionItem": {
          lineHeight: "26px",
          fontSize: "16px",
          fontWeight: "normal",
          border: "none",
          backgroundColor: theme.colors.mono5,
        },
        ".AccordionItem--selected": {
          lineHeight: "26px",
          fontSize: "16px",
          fontWeight: "bold",
          border: "1px solid #E7E7E7", // mono10
        },
      },
    },
    ...orderOptions,
  }

  return (
    <Elements stripe={stripe} options={options}>
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
  const setPaymentMutation = useSetPayment()
  const { setConfirmationToken, checkoutTracking, setSavedCreditCard } =
    useCheckoutContext()

  const [isSubmittingToStripe, setIsSubmittingToStripe] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [subtitleErrorMessage, setSubtitleErrorMessage] = useState<
    string | null
  >(null)
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<
    null | "saved" | "stripe-card" | "wire" | "stripe-other"
  >(null)
  const [saveCreditCard, setSaveCreditCard] = useState(true)
  const [savedCreditCards, setSavedCreditCards] = useState<any[]>([])
  const [isLoadingCreditCards, setIsLoadingCreditCards] = useState(false)
  const [selectedCreditCard, setSelectedCreditCard] = useState<any | null>(null)

  const isSelectedPaymentMethodStripe = selectedPaymentMethod?.match(/^stripe/)

  useEffect(() => {
    const fetchSavedCreditCards = async () => {
      setIsLoadingCreditCards(true)
      try {
        const response =
          await fetchQuery<Order2PaymentFormSavedCreditCardsQuery>(
            environment,
            graphql`
              query Order2PaymentFormSavedCreditCardsQuery {
                me {
                  creditCards(first: 10) {
                    edges {
                      node {
                        internalID
                        brand
                        lastDigits
                      }
                    }
                  }
                }
              }
            `,
            {},
            { fetchPolicy: "store-or-network" },
          ).toPromise()

        if (response?.me?.creditCards) {
          const cards = extractNodes(response.me.creditCards)
          setSavedCreditCards(cards)
          if (cards.length > 0) {
            setSelectedPaymentMethod("saved")
            setSelectedCreditCard(cards[0])
          }
        }
      } catch (error) {
        logger.error("Error fetching saved credit cards", error)
      } finally {
        setIsLoadingCreditCards(false)
      }
    }

    fetchSavedCreditCards()
  }, [])

  if (!(stripe && elements)) {
    return null
  }

  const paymentElementOptions: StripePaymentElementOptions = {
    layout: {
      type: "accordion",
      spacedAccordionItems: true,
      defaultCollapsed: true,
      radios: false,
    },
    wallets: {
      applePay: "never",
      googlePay: "never",
    },
    business: { name: "Artsy" },
  }

  const onChange = (event: StripePaymentElementChangeEvent) => {
    const { elementType, collapsed, value } = event
    logger.warn("PaymentElement onChange event", {
      event,
    })
    if (elementType === "payment" && !collapsed) {
      if (value.type === "card") {
        // Only track this the first time it happens
        if (selectedPaymentMethod !== "stripe-card") {
          checkoutTracking.clickedPaymentMethod({
            paymentMethod: "CREDIT_CARD",
            amountMinor: order.itemsTotal?.minor,
            currency: order.itemsTotal?.currencyCode ?? "",
          })
        }
        setSelectedPaymentMethod("stripe-card")
      } else {
        // TODO
        setSelectedPaymentMethod("stripe-other")
      }
    }
  }

  const onClickSavedPaymentMethods = () => {
    setErrorMessage(null) // Clear any previous error messages
    setSelectedPaymentMethod("saved")
    elements?.getElement("payment")?.collapse()
  }

  const onClickWirePaymentMethods = () => {
    checkoutTracking.clickedPaymentMethod({
      paymentMethod: "WIRE_TRANSFER",
      amountMinor: order.itemsTotal?.minor,
      currency: order.itemsTotal?.currencyCode ?? "",
    })
    setErrorMessage(null) // Clear any previous error messages
    setSelectedPaymentMethod("wire")
    elements?.getElement("payment")?.collapse()
  }

  const handleError = error => {
    setErrorMessage(error.message)
    setIsSubmittingToStripe(false)
  }

  const handleSubmit = async event => {
    event.preventDefault()

    if (!selectedPaymentMethod) {
      setSubtitleErrorMessage("Select a payment method")
      return
    }

    checkoutTracking.clickedOrderProgression(ContextModule.ordersPayment)

    if (isSelectedPaymentMethodStripe) {
      setIsSubmittingToStripe(true)

      const { error: submitError } = await elements.submit()
      if (submitError) {
        logger.error(submitError)
        handleError(submitError)
        return
      }

      const { error, confirmationToken } = await stripe.createConfirmationToken(
        {
          elements,
        },
      )

      if (error) {
        logger.error(error)
        handleError(error)
        return
      }

      const response =
        await fetchQuery<Order2PaymentFormConfirmationTokenQuery>(
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
        logger.error("Failed to fetch confirmation token from Gravity")
        handleError(new Error(defaultErrorMessage))
        return
      }

      try {
        const updateOrderPaymentMethodResult =
          await updateOrderMutation.submitMutation({
            variables: {
              input: {
                id: order.internalID,
                paymentMethod: "CREDIT_CARD",
                stripeConfirmationToken: confirmationToken.id,
              },
            },
          })

        validateAndExtractOrderResponse(
          updateOrderPaymentMethodResult.updateOrder?.orderOrError,
        )
      } catch (error) {
        logger.error("Error while updating order payment method", error)
        handleError(new Error(defaultErrorMessage))
      } finally {
        setIsSubmittingToStripe(false)
      }

      setConfirmationToken({
        confirmationToken: {
          id: confirmationToken.id,
          ...response?.me?.confirmationToken,
        },
        saveCreditCard,
      })
    }

    if (selectedPaymentMethod === "wire") {
      handleError(new Error("Wire transfer not supported yet"))
    }

    if (selectedPaymentMethod === "saved") {
      if (!selectedCreditCard) {
        setSubtitleErrorMessage("Select a saved payment method")
        return
      }

      setIsSubmittingToStripe(true)

      try {
        const orderOrError = (
          await setPaymentMutation.submitMutation({
            variables: {
              input: {
                id: order.internalID,
                paymentMethod: "CREDIT_CARD",
                paymentMethodId: selectedCreditCard?.internalID,
              },
            },
          })
        ).commerceSetPayment?.orderOrError

        if (orderOrError?.error) {
          throw orderOrError.error
        }
      } catch (error) {
        logger.error("Error while updating order payment method", error)
        handleError(new Error(defaultErrorMessage))
      } finally {
        setIsSubmittingToStripe(false)
        setSavedCreditCard({ savedCreditCard: selectedCreditCard })
      }
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      {subtitleErrorMessage && !selectedPaymentMethod && (
        <Text variant="xs" color="red100" mb={2}>
          {subtitleErrorMessage}
        </Text>
      )}
      {/* Stripe error messages are displayed within the Payment Element, so we don't need to handle them here. */}
      {errorMessage && !isSelectedPaymentMethodStripe && (
        <>
          <Spacer y={2} />
          <CheckoutErrorBanner error={{ message: errorMessage }} />
          <Spacer y={2} />
        </>
      )}
      <Spacer y={2} />
      {savedCreditCards.length > 0 && (
        <FadeInBox>
          <Box
            backgroundColor="mono5"
            borderRadius="5px"
            padding="1rem"
            marginBottom="10px"
            style={{ cursor: "pointer" }}
            onClick={onClickSavedPaymentMethods}
          >
            <Flex alignItems="center">
              <LockIcon fill="mono100" />
              {/* Spacer has to be 31px to match Stripe's spacing */}
              <Spacer x="31px" />
              <Text
                variant="sm"
                color="mono100"
                fontWeight={
                  selectedPaymentMethod === "saved" ? "bold" : "normal"
                }
              >
                Saved payments
              </Text>
            </Flex>
            <Collapse open={selectedPaymentMethod === "saved"}>
              <Text variant="sm" ml="50px">
                Select a saved payment method or add a new one.
              </Text>
              <Box ml="50px">
                {isLoadingCreditCards ? (
                  <Text variant="sm" ml="50px">
                    Loading saved cards...
                  </Text>
                ) : (
                  <>
                    <RadioGroup
                      defaultValue={selectedCreditCard}
                      onSelect={val => {
                        setSelectedCreditCard(val)
                      }}
                    >
                      {savedCreditCards.map(card => (
                        <Radio
                          key={card.internalID}
                          value={card}
                          pb="15px"
                          pt="15px"
                          label={
                            <Flex>
                              <BrandCreditCardIcon
                                type={card.brand as Brand}
                                width="24px"
                                height="24px"
                                mr={1}
                              />
                              <Text variant="sm">•••• {card.lastDigits}</Text>
                            </Flex>
                          }
                        ></Radio>
                      ))}
                    </RadioGroup>
                  </>
                )}
              </Box>
            </Collapse>
          </Box>
        </FadeInBox>
      )}
      <PaymentElement options={paymentElementOptions} onChange={onChange} />
      <Spacer y={1} />
      <FadeInBox>
        <Box
          backgroundColor="mono5"
          borderRadius="5px"
          padding="1rem"
          marginBottom="10px"
          style={{ cursor: "pointer" }}
          onClick={onClickWirePaymentMethods}
          data-testid={"PaymentFormWire"}
        >
          <Flex alignItems="center">
            <ReceiptIcon fill="mono100" />
            {/* Spacer has to be 31px to match Stripe's spacing */}
            <Spacer x="31px" />
            <Text
              variant="sm"
              color="mono100"
              fontWeight={selectedPaymentMethod === "wire" ? "bold" : "normal"}
            >
              Wire Transfer
            </Text>
          </Flex>
          <Collapse open={selectedPaymentMethod === "wire"}>
            <Text color="mono100" variant="sm" ml="50px" mb={1}>
              To pay by wire transfer, complete checkout and a member of the
              Artsy team will contact you with next steps by email.
            </Text>
            <Text color="mono100" variant="sm" ml="50px" mb={1}>
              Please inform your bank that you will be responsible for all wire
              transfer fees.
            </Text>
            <Text color="mono100" variant="sm" ml="50px">
              You can contact{" "}
              <RouterLink inline to="mailto:orders@artsy.net">
                orders@artsy.net
              </RouterLink>{" "}
              with any questions.
            </Text>
          </Collapse>
        </Box>
      </FadeInBox>

      <Collapse open={selectedPaymentMethod === "stripe-card"}>
        <Box p={2}>
          <Checkbox selected={saveCreditCard} onSelect={setSaveCreditCard}>
            Save credit card for later use
          </Checkbox>
        </Box>
      </Collapse>

      <Spacer y={2} />
      {/* Stripe error messages are displayed within the Payment Element, so we don't need to handle them here. */}
      {errorMessage && !isSelectedPaymentMethodStripe && (
        <>
          <CheckoutErrorBanner error={{ message: errorMessage }} />
          <Spacer y={4} />
        </>
      )}
      <Button
        loading={isSubmittingToStripe}
        variant="primaryBlack"
        width="100%"
        type="submit"
      >
        Save and Continue
      </Button>
    </form>
  )
}

const FRAGMENT = graphql`
  fragment Order2PaymentForm_order on Order {
    mode
    source
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
