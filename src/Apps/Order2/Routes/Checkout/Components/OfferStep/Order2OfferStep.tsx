import { ContextModule } from "@artsy/cohesion"
import { Box, Button, Flex, Spacer, Text, TextArea } from "@artsy/palette"
import { validateAndExtractOrderResponse } from "Apps/Order/Components/ExpressCheckout/Util/mutationHandling"
import { appendCurrencySymbol } from "Apps/Order/Utils/currencyUtils"
import {
  CheckoutStepName,
  CheckoutStepState,
} from "Apps/Order2/Routes/Checkout/CheckoutContext/types"
import {
  CheckoutErrorBanner,
  MailtoOrderSupport,
} from "Apps/Order2/Routes/Checkout/Components/CheckoutErrorBanner"
import { Order2ExactPriceOfferForm } from "Apps/Order2/Routes/Checkout/Components/OfferStep/Forms/Order2ExactPriceOfferForm"
import { Order2HiddenPriceOfferForm } from "Apps/Order2/Routes/Checkout/Components/OfferStep/Forms/Order2HiddenPriceOfferForm"
import { Order2PriceRangeOfferForm } from "Apps/Order2/Routes/Checkout/Components/OfferStep/Forms/Order2PriceRangeOfferForm"
import { Order2OfferCompletedView } from "Apps/Order2/Routes/Checkout/Components/OfferStep/Order2OfferCompletedView"
import type { OfferNoteValue } from "Apps/Order2/Routes/Checkout/Components/OfferStep/types"
import { useCompleteOfferData } from "Apps/Order2/Routes/Checkout/Components/OfferStep/useCompleteOfferData"
import { useCheckoutContext } from "Apps/Order2/Routes/Checkout/Hooks/useCheckoutContext"
import { useOrder2AddInitialOfferMutation } from "Apps/Order2/Routes/Checkout/Mutations/useOrder2AddInitialOfferMutation"
import { useOrder2UnsetOrderFulfillmentOptionMutation } from "Apps/Order2/Routes/Checkout/Mutations/useOrder2UnsetOrderFulfillmentOptionMutation"
import { mostRecentCreatedAt } from "Apps/Order2/Routes/Checkout/Utils/mostRecentCreatedAt"
import { useJump } from "Utils/Hooks/useJump"
import createLogger from "Utils/logger"
import type { Order2OfferStep_order$key } from "__generated__/Order2OfferStep_order.graphql"
import type { useOrder2AddInitialOfferMutation$data } from "__generated__/useOrder2AddInitialOfferMutation.graphql"
import { useMemo, useState } from "react"
import { graphql, useFragment } from "react-relay"

const logger = createLogger(
  "Order2/Routes/Checkout/Components/OfferStep/Order2OfferStep.tsx",
)

export const DEFUALT_OFFER_NOTE_PREFIX = "I sent an offer for"

interface Order2OfferStepProps {
  order: Order2OfferStep_order$key
}

export const Order2OfferStep: React.FC<Order2OfferStepProps> = ({ order }) => {
  const orderData = useFragment(FRAGMENT, order)
  const {
    steps,
    setOfferAmountComplete,
    checkoutTracking,
    messages,
    setStepErrorMessage,
  } = useCheckoutContext()

  const offerAmountError = messages[CheckoutStepName.OFFER_AMOUNT]?.error

  const { submitMutation: submitOfferMutation } =
    useOrder2AddInitialOfferMutation()
  const unsetOrderFulfillmentOption =
    useOrder2UnsetOrderFulfillmentOptionMutation()

  const { offers } = orderData

  const lastOffer = mostRecentCreatedAt(offers)

  const [formIsDirty, setFormIsDirty] = useState(false)
  const [isSubmittingOffer, setIsSubmittingOffer] = useState(false)

  const [offerNoteValue, setOfferNoteValue] = useState<OfferNoteValue>({
    exceedsCharacterLimit: false,
    value: lastOffer?.note || "",
  })
  const [offerValue, setOfferValue] = useState(lastOffer?.amount?.major || 0)

  const hasNote = !!offerNoteValue.value.trim()
  const completedViewProps = useCompleteOfferData(orderData, hasNote)

  const { jumpTo } = useJump()

  const currentStep = steps?.find(
    step => step.name === CheckoutStepName.OFFER_AMOUNT,
  )?.state

  const onOfferOptionSelected = (value: number, description?: string) => {
    setOfferValue(value)

    // Clear error message when a valid offer is selected
    if (value > 0) {
      setStepErrorMessage({
        step: CheckoutStepName.OFFER_AMOUNT,
        error: null,
      })
    }

    checkoutTracking.clickedOfferOption(
      orderData.currencyCode,
      orderData.internalID,
      value,
      description,
    )
  }

  const handleSubmitError = (error: { code: string }) => {
    logger.error(error)
    setStepErrorMessage({
      step: CheckoutStepName.OFFER_AMOUNT,
      error: {
        title: "An error occurred",
        message: (
          <>
            Something went wrong while selecting your offer amount. Please try
            again or contact <MailtoOrderSupport />.
          </>
        ),
      },
    })
  }

  const onContinueButtonPressed = async () => {
    if (offerValue === undefined || offerValue === 0) {
      setFormIsDirty(true)
      setStepErrorMessage({
        step: CheckoutStepName.OFFER_AMOUNT,
        error: {
          title: "Offer amount required",
          message: "Select an offer amount or enter your own to continue.",
        },
      })
      jumpTo("offer-value-title", { behavior: "smooth" })
      return
    }

    if (offerValue < 0 || offerNoteValue.exceedsCharacterLimit) {
      setFormIsDirty(true)
      jumpTo("price-option-custom", { behavior: "smooth" })
      return
    }

    try {
      setIsSubmittingOffer(true)

      checkoutTracking.clickedOrderProgression(ContextModule.ordersOffer)

      const note = hasNote
        ? offerNoteValue.value
        : `${DEFUALT_OFFER_NOTE_PREFIX} ${appendCurrencySymbol(
            offerValue.toLocaleString("en-US", {
              currency: orderData.currencyCode,
              minimumFractionDigits: 2,
              style: "currency",
            }),
            orderData.currencyCode,
          )}`

      // Unset the current fulfillment option if it exists
      if (orderData.selectedFulfillmentOption?.type) {
        const unsetFulfillmentOptionResult =
          await unsetOrderFulfillmentOption.submitMutation({
            variables: {
              input: {
                id: orderData.internalID,
              },
            },
          })
        validateAndExtractOrderResponse(
          unsetFulfillmentOptionResult.unsetOrderFulfillmentOption
            ?.orderOrError,
        )
      }

      const response: useOrder2AddInitialOfferMutation$data =
        await submitOfferMutation({
          variables: {
            input: {
              amountMinor: offerValue * 100,
              note,
              orderID: orderData.internalID,
            },
          },
        })

      const offerOrError = response.createBuyerOffer?.offerOrError

      if (offerOrError && "mutationError" in offerOrError) {
        handleSubmitError({
          code: offerOrError.mutationError?.code || "unknown",
        })
        return
      }

      if (offerOrError && "offer" in offerOrError) {
        setOfferAmountComplete()

        return
      }

      throw new Error("Unexpected response from offer mutation")
    } catch (error) {
      handleSubmitError({ code: "unknown" })
    } finally {
      setIsSubmittingOffer(false)
      setFormIsDirty(false)
    }
  }

  // Determine which offer form scenario to use based on artwork properties
  const OfferFormComponent = useMemo(() => {
    const priceDisplay = orderData.lineItems?.[0]?.artwork?.priceDisplay

    if (priceDisplay === "hidden") {
      return Order2HiddenPriceOfferForm
    }

    if (priceDisplay === "range") {
      return Order2PriceRangeOfferForm
    }

    return Order2ExactPriceOfferForm
  }, [orderData])

  return (
    <Flex
      flexDirection="column"
      data-testid="offer-step-active"
      backgroundColor="mono0"
    >
      <Box
        py={2}
        px={[2, 4]}
        hidden={currentStep !== CheckoutStepState.UPCOMING}
      >
        <Flex flexDirection="column">
          <Text
            variant={["sm-display", "md"]}
            fontWeight={["bold", "normal"]}
            color="mono100"
          >
            Offer
          </Text>
          <Text variant="sm" color="mono60">
            If accepted, your payment will be processed. All offers are binding
            once submitted.
          </Text>
        </Flex>
      </Box>

      <Box
        py={2}
        px={[2, 4]}
        hidden={currentStep !== CheckoutStepState.COMPLETED}
      >
        {completedViewProps && (
          <Order2OfferCompletedView {...completedViewProps} />
        )}
      </Box>

      <Box pt={2} px={[2, 4]} hidden={currentStep !== CheckoutStepState.ACTIVE}>
        <Flex flexDirection="column">
          <Text
            variant={["sm-display", "md"]}
            fontWeight={["bold", "normal"]}
            color="mono100"
          >
            Offer
          </Text>
          <Text variant="sm" color="mono100">
            If accepted, your payment will be processed. All offers are binding
            once submitted.
          </Text>
          <Spacer y={1} />
          {offerAmountError && <CheckoutErrorBanner error={offerAmountError} />}
        </Flex>
      </Box>

      <Box py={2} px={[2, 4]} hidden={currentStep !== CheckoutStepState.ACTIVE}>
        <OfferFormComponent
          order={orderData}
          offerValue={offerValue}
          formIsDirty={formIsDirty}
          onOfferValueChange={setOfferValue}
          onOfferOptionSelected={onOfferOptionSelected}
        />

        <Spacer y={4} />

        <Flex flexDirection="column">
          <Text
            variant={["sm-display", "md"]}
            fontWeight={["bold", "normal"]}
            color="mono100"
          >
            Offer note
          </Text>
          <Text variant="sm" color="mono100">
            Additional context to help the gallery evaluate your offer.
          </Text>

          <TextArea
            title="Note (recommended)"
            maxLength={1000}
            placeholder="Share what draws you to this work or artist, or add any context about your offer"
            onChange={setOfferNoteValue}
            value={offerNoteValue.value}
          />

          <Spacer y={4} />
          <Button
            variant="primaryBlack"
            width="100%"
            onClick={onContinueButtonPressed}
            loading={isSubmittingOffer}
            disabled={isSubmittingOffer}
          >
            Save and Continue
          </Button>
        </Flex>
      </Box>
    </Flex>
  )
}

const FRAGMENT = graphql`
  fragment Order2OfferStep_order on Order {
    ...useCompleteOfferData_order
    ...Order2ExactPriceOfferForm_order
    ...Order2PriceRangeOfferForm_order
    internalID
    mode
    source
    currencyCode
    selectedFulfillmentOption {
      type
    }
    offers {
      createdAt
      amount {
        display
        major
      }
      note
    }
    lineItems {
      artwork {
        slug
        priceDisplay
        isPriceRange
        isPriceHidden
        listPrice {
          __typename
          ... on Money {
            major
          }
          ... on PriceRange {
            maxPrice {
              major
            }
            minPrice {
              major
            }
          }
        }
        editionSets {
          internalID
        }
      }
    }
  }
`
