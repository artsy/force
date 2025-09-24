import * as DeprecatedAnalyticsSchema from "@artsy/cohesion/dist/DeprecatedSchema"
import { Box, Flex, Text } from "@artsy/palette"
import { appendCurrencySymbol } from "Apps/Order/Utils/currencyUtils"
import {
  CheckoutStepName,
  CheckoutStepState,
} from "Apps/Order2/Routes/Checkout/CheckoutContext/types"
import { useCheckoutContext } from "Apps/Order2/Routes/Checkout/Hooks/useCheckoutContext"
import { useOrder2AddInitialOfferMutation } from "Apps/Order2/Routes/Checkout/Mutations/useOrder2AddInitialOfferMutation"
import { useJump } from "Utils/Hooks/useJump"
import createLogger from "Utils/logger"
import type { Order2OfferStep_order$key } from "__generated__/Order2OfferStep_order.graphql"
import type { useOrder2AddInitialOfferMutation$data } from "__generated__/useOrder2AddInitialOfferMutation.graphql"
import { useState } from "react"
import { graphql, useFragment } from "react-relay"
import { useTracking } from "react-tracking"
import { Order2OfferCompletedView } from "Apps/Order2/Routes/Checkout/Components/OfferStep/Order2OfferCompletedView"
import { Order2ExactPriceOfferForm } from "Apps/Order2/Routes/Checkout/Components/OfferStep/Forms/Order2ExactPriceOfferForm"
import { Order2PriceRangeOfferForm } from "Apps/Order2/Routes/Checkout/Components/OfferStep/Forms/Order2PriceRangeOfferForm"
import type { OfferNoteValue } from "Apps/Order2/Routes/Checkout/Components/OfferStep/types"

const logger = createLogger(
  "Order2/Routes/Checkout/Components/OfferStep/Order2OfferStep.tsx",
)

export const DEFUALT_OFFER_NOTE_PREFIX = "I sent an offer for"

interface Order2OfferStepProps {
  order: Order2OfferStep_order$key
}

export const Order2OfferStep: React.FC<Order2OfferStepProps> = ({ order }) => {
  const orderData = useFragment(FRAGMENT, order)
  const { trackEvent } = useTracking()
  const { steps, setOfferAmountComplete } = useCheckoutContext()
  const { submitMutation: submitOfferMutation } =
    useOrder2AddInitialOfferMutation()

  const [formIsDirty, setFormIsDirty] = useState(false)
  const [isSubmittingOffer, setIsSubmittingOffer] = useState(false)
  const [offerNoteValue, setOfferNoteValue] = useState<OfferNoteValue>({
    exceedsCharacterLimit: false,
    value: "",
  })
  const [offerValue, setOfferValue] = useState(0)

  // Store submitted offer data for completed view
  const [submittedOfferAmount, setSubmittedOfferAmount] = useState<number>(0)
  const [submittedOfferNote, setSubmittedOfferNote] = useState<string>("")
  const { jumpTo } = useJump()

  const currentStep = steps?.find(
    step => step.name === CheckoutStepName.OFFER_AMOUNT,
  )?.state

  const onOfferInputFocus = () => {
    trackEvent({
      action_type: DeprecatedAnalyticsSchema.ActionType.FocusedOnOfferInput,
      flow: DeprecatedAnalyticsSchema.Flow.MakeOffer,
      order_id: orderData.internalID,
    })
  }

  const handleSubmitError = (error: { code: string }) => {
    logger.error(error)
    console.error("Error submitting offer:", error)
  }

  const onContinueButtonPressed = async () => {
    if (offerValue === undefined) {
      setFormIsDirty(true)
      jumpTo("offer-value-title", { behavior: "smooth" })
      return
    }
    if (offerValue <= 0 || offerNoteValue.exceedsCharacterLimit) {
      setFormIsDirty(true)
      jumpTo("price-option-custom", { behavior: "smooth" })
      return
    }

    try {
      setIsSubmittingOffer(true)

      const hasNote = offerNoteValue && offerNoteValue.value.trim() !== ""

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

      // Submit the offer mutation
      const response: useOrder2AddInitialOfferMutation$data =
        await submitOfferMutation({
          variables: {
            input: {
              amountCents: offerValue * 100,
              note,
              orderId: orderData.internalID,
            },
          },
        })

      const orderOrError = response.commerceAddInitialOfferToOrder?.orderOrError

      if (orderOrError && "error" in orderOrError) {
        handleSubmitError({ code: orderOrError.error?.code || "unknown" })
        return
      }

      if (orderOrError && "order" in orderOrError) {
        // Success! Store the submitted data for completed view
        setSubmittedOfferAmount(offerValue)
        setSubmittedOfferNote(note)

        // Mark step as completed and move to next step
        setOfferAmountComplete()
        return
      }

      // Fallback error case
      throw new Error("Unexpected response from offer mutation")
    } catch (error) {
      logger.error(error)
      handleSubmitError({ code: "unknown" })
    } finally {
      setIsSubmittingOffer(false)
    }
  }

  // Determine which offer form scenario to use based on artwork properties
  const getOfferFormComponent = () => {
    const artwork = orderData.lineItems?.[0]?.artwork

    // Check if artwork has a price range
    const isPriceRange =
      artwork?.listPrice?.__typename === "PriceRange" &&
      artwork?.listPrice?.maxPrice?.major &&
      artwork?.listPrice?.minPrice?.major

    if (isPriceRange) {
      return Order2PriceRangeOfferForm
    }

    // Default to exact price form for single prices
    return Order2ExactPriceOfferForm
  }

  const OfferFormComponent = getOfferFormComponent()

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
          <Text variant={["xs", "xs", "sm"]} color="mono60">
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
        <Order2OfferCompletedView
          order={orderData}
          offerAmount={submittedOfferAmount}
          offerNote={submittedOfferNote}
        />
      </Box>

      <Box py={2} px={[2, 4]} hidden={currentStep !== CheckoutStepState.ACTIVE}>
        <Flex flexDirection="column">
          <Text
            variant={["sm-display", "md"]}
            fontWeight={["bold", "normal"]}
            color="mono100"
          >
            Offer
          </Text>
          <Text variant={["xs", "xs", "sm"]} color="mono60">
            If accepted, your payment will be processed. All offers are binding
            once submitted.
          </Text>
        </Flex>
      </Box>

      <Box hidden={currentStep !== CheckoutStepState.ACTIVE}>
        <OfferFormComponent
          order={orderData}
          offerValue={offerValue}
          offerNoteValue={offerNoteValue}
          formIsDirty={formIsDirty}
          isSubmittingOffer={isSubmittingOffer}
          onOfferValueChange={setOfferValue}
          onOfferNoteChange={setOfferNoteValue}
          onOfferInputFocus={onOfferInputFocus}
          onContinueButtonPressed={onContinueButtonPressed}
        />
      </Box>
    </Flex>
  )
}

const FRAGMENT = graphql`
  fragment Order2OfferStep_order on Order {
    internalID
    mode
    currencyCode
    lineItems {
      artwork {
        slug
        isPriceRange
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
    ...Order2ExactPriceOfferForm_order
    ...Order2PriceRangeOfferForm_order
    ...Order2OfferCompletedView_order
  }
`
