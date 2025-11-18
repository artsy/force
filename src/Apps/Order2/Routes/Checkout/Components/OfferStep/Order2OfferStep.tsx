import { ContextModule } from "@artsy/cohesion"
import { Box, Button, Flex, Spacer, Text, TextArea } from "@artsy/palette"
import { validateAndExtractOrderResponse } from "Apps/Order/Components/ExpressCheckout/Util/mutationHandling"
import {
  CheckoutStepName,
  CheckoutStepState,
} from "Apps/Order2/Routes/Checkout/CheckoutContext/types"
import {
  CheckoutErrorBanner,
  type CheckoutErrorBannerProps,
  MailtoOrderSupport,
} from "Apps/Order2/Routes/Checkout/Components/CheckoutErrorBanner"
import { OfferInput } from "Apps/Order2/Routes/Checkout/Components/OfferStep/Components/OfferInput"
import { Order2OfferOptions } from "Apps/Order2/Routes/Checkout/Components/OfferStep/Components/Order2OfferOptions"
import {
  Order2OfferCompletedView,
  type Order2OfferCompletedViewProps,
} from "Apps/Order2/Routes/Checkout/Components/OfferStep/Order2OfferCompletedView"
import type { OfferNoteValue } from "Apps/Order2/Routes/Checkout/Components/OfferStep/types"
import { useCompleteOfferData } from "Apps/Order2/Routes/Checkout/Components/OfferStep/useCompleteOfferData"
import { useCheckoutContext } from "Apps/Order2/Routes/Checkout/Hooks/useCheckoutContext"
import { useOrder2AddInitialOfferMutation } from "Apps/Order2/Routes/Checkout/Mutations/useOrder2AddInitialOfferMutation"
import { useOrder2UnsetOrderFulfillmentOptionMutation } from "Apps/Order2/Routes/Checkout/Mutations/useOrder2UnsetOrderFulfillmentOptionMutation"
import { mostRecentCreatedAt } from "Apps/Order2/Routes/Checkout/Utils/mostRecentCreatedAt"
import createLogger from "Utils/logger"
import type {
  Order2OfferStep_order$data,
  Order2OfferStep_order$key,
} from "__generated__/Order2OfferStep_order.graphql"
import type { useOrder2AddInitialOfferMutation$data } from "__generated__/useOrder2AddInitialOfferMutation.graphql"
import { Formik, type FormikConfig, useFormikContext } from "formik"
import { useState } from "react"
import { graphql, useFragment } from "react-relay"
import * as yup from "yup"

const logger = createLogger(
  "Order2/Routes/Checkout/Components/OfferStep/Order2OfferStep.tsx",
)

interface OfferFormValues {
  offerValue: number
  offerNote: string
}

interface Order2OfferStepProps {
  order: Order2OfferStep_order$key
}

interface Order2OfferStepFormContentProps {
  orderData: Order2OfferStep_order$data
  offerAmountError: CheckoutErrorBannerProps["error"]
  currentStep: CheckoutStepState | undefined
  completedViewProps: Order2OfferCompletedViewProps | null
  isSubmittingOffer: boolean
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

  const [isSubmittingOffer, setIsSubmittingOffer] = useState(false)

  const currentStep = steps?.find(
    step => step.name === CheckoutStepName.OFFER_AMOUNT,
  )?.state

  const completedViewProps = useCompleteOfferData(orderData)


  const validationSchema = yup.object().shape({
    offerValue: yup
      .number()
      .test(
        "is-required",
        "Offer amount is required",
        value => value !== undefined && value !== 0,
      ),
    offerNote: yup.string().max(1000, "Note cannot exceed 1000 characters"),
  })

  const handleSubmit: FormikConfig<OfferFormValues>["onSubmit"] = async ({
    offerValue,
    offerNote,
  }) => {
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

    try {
      setIsSubmittingOffer(true)

      checkoutTracking.clickedOrderProgression(ContextModule.ordersOffer)

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
              note: offerNote,
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
    }
  }

  return (
    <Formik<OfferFormValues>
      initialValues={{
        offerValue: lastOffer?.amount?.major || 0,
        offerNote: lastOffer?.note || "",
      }}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
      validateOnChange={false}
      validateOnBlur={false}
    >
      <Order2OfferStepFormContent
        orderData={orderData}
        offerAmountError={offerAmountError}
        currentStep={currentStep}
        completedViewProps={completedViewProps}
        isSubmittingOffer={isSubmittingOffer}
      />
    </Formik>
  )
}

const Order2OfferStepFormContent: React.FC<Order2OfferStepFormContentProps> = ({
  orderData,
  offerAmountError,
  currentStep,
  completedViewProps,
  isSubmittingOffer,
}) => {
  const { values, errors, setFieldValue, submitForm } =
    useFormikContext<OfferFormValues>()
  const { setStepErrorMessage, checkoutTracking } = useCheckoutContext()

  const clearOfferError = () => {
    setStepErrorMessage({
      step: CheckoutStepName.OFFER_AMOUNT,
      error: null,
    })
  }

  const trackOfferOption = (value: number, description?: string) => {
    if (value !== undefined && value > 0) {
      checkoutTracking.clickedOfferOption(
        orderData.currencyCode,
        orderData.internalID,
        value,
        description,
      )
    }
  }

  const onOfferOptionSelected = (value: number) => {
    setFieldValue("offerValue", value)
    clearOfferError()

    trackOfferOption(value, "Custom amount")
  }

  const onCustomOfferBlur = (value: number) => {
    trackOfferOption(value, "Custom amount")
  }

  const onOfferNoteChange = (noteValue: OfferNoteValue) => {
    setFieldValue("offerNote", noteValue.value)
  }

  const onContinueButtonPressed = async () => {
    if (values.offerValue === undefined || values.offerValue === 0) {
      setFieldValue("offerValue", values.offerValue, true)
      setStepErrorMessage({
        step: CheckoutStepName.OFFER_AMOUNT,
        error: {
          title: "Offer amount required",
          message: "Select an offer amount or enter your own to continue.",
        },
      })
      return
    }

    if (errors.offerNote) {
      return
    }

    submitForm()
  }

  const isPriceHidden = orderData.lineItems?.[0]?.artwork?.priceDisplay === "hidden"

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
        {isPriceHidden ? (
          <OfferInput name="offerValue" onBlur={onCustomOfferBlur} />
        ) : (
          <Order2OfferOptions
            order={orderData}
            onOfferOptionSelected={onOfferOptionSelected}
            onCustomOfferBlur={onCustomOfferBlur}
          />
        )}

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
            onChange={onOfferNoteChange}
            value={values.offerNote}
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
    ...Order2OfferOptions_order
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
