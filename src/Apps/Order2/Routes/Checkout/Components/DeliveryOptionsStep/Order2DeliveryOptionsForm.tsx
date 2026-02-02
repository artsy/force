import { ContextModule } from "@artsy/cohesion"
import InfoIcon from "@artsy/icons/InfoIcon"
import {
  Button,
  Clickable,
  Flex,
  Radio,
  RadioGroup,
  Spacer,
  Text,
  Tooltip,
} from "@artsy/palette"
import { validateAndExtractOrderResponse } from "Apps/Order/Components/ExpressCheckout/Util/mutationHandling"
import { CheckoutStepName } from "Apps/Order2/Routes/Checkout/CheckoutContext/types"
import {
  CheckoutErrorBanner,
  somethingWentWrongError,
} from "Apps/Order2/Routes/Checkout/Components/CheckoutErrorBanner"
import {
  deliveryOptionLabel,
  deliveryOptionTimeEstimate,
} from "Apps/Order2/Routes/Checkout/Components/DeliveryOptionsStep/utils"
import { useCheckoutContext } from "Apps/Order2/Routes/Checkout/Hooks/useCheckoutContext"
import { useScrollToErrorBanner } from "Apps/Order2/Routes/Checkout/Hooks/useScrollToErrorBanner"
import { useOrder2SetOrderFulfillmentOptionMutation } from "Apps/Order2/Routes/Checkout/Mutations/useOrder2SetOrderFulfillmentOptionMutation"
import { BUYER_GUARANTEE_URL } from "Apps/Order2/constants"
import { RouterLink } from "System/Components/RouterLink"
import type {
  Order2DeliveryOptionsForm_order$data,
  Order2DeliveryOptionsForm_order$key,
} from "__generated__/Order2DeliveryOptionsForm_order.graphql"
import { Form, Formik, type FormikConfig, useFormikContext } from "formik"
import { useState } from "react"
import { graphql, useFragment } from "react-relay"

interface Order2DeliveryOptionsFormProps {
  order: Order2DeliveryOptionsForm_order$key
}

type DeliveryOption =
  Order2DeliveryOptionsForm_order$data["fulfillmentOptions"][number]

interface FormValues {
  deliveryOption: DeliveryOption
}

export const Order2DeliveryOptionsForm: React.FC<
  Order2DeliveryOptionsFormProps
> = ({ order }) => {
  const orderData = useFragment(FRAGMENT, order)
  const {
    checkoutTracking,
    setDeliveryOptionComplete,
    setStepErrorMessage,
    messages,
  } = useCheckoutContext()
  const setFulfillmentOptionMutation =
    useOrder2SetOrderFulfillmentOptionMutation()

  const deliveryOptionError = messages[CheckoutStepName.DELIVERY_OPTION]?.error
  const errorBannerRef = useScrollToErrorBanner(
    CheckoutStepName.DELIVERY_OPTION,
  )

  const { fulfillmentOptions } = orderData
  const deliveryOptions = fulfillmentOptions.filter(
    option => option.type !== "PICKUP",
  )

  const isSingleOption = deliveryOptions.length === 1

  const handleSubmit: FormikConfig<FormValues>["onSubmit"] = async ({
    deliveryOption,
  }) => {
    try {
      checkoutTracking.clickedOrderProgression(
        ContextModule.ordersShippingMethods,
      )
      const setFulfillmentOptionResult =
        await setFulfillmentOptionMutation.submitMutation({
          variables: {
            input: {
              id: orderData.internalID,
              fulfillmentOption: {
                type: deliveryOption.type as Exclude<
                  DeliveryOption["type"],
                  "SHIPPING_TBD"
                >,
              },
            },
          },
        })

      validateAndExtractOrderResponse(
        setFulfillmentOptionResult.setOrderFulfillmentOption?.orderOrError,
      ).order

      setStepErrorMessage({
        step: CheckoutStepName.DELIVERY_OPTION,
        error: null,
      })
      setDeliveryOptionComplete()
    } catch (error) {
      console.error("Error setting delivery option:", error)
      setStepErrorMessage({
        step: CheckoutStepName.DELIVERY_OPTION,
        error: somethingWentWrongError(
          "selecting your shipping method",
          error?.code,
        ),
      })
    }
  }

  return (
    <Formik<FormValues>
      initialValues={{ deliveryOption: deliveryOptions[0] }}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting }) => {
        return (
          <Form>
            <Flex
              flexDirection="column"
              backgroundColor="mono0"
              py={2}
              px={[2, 2, 4]}
            >
              {deliveryOptionError && (
                <>
                  <CheckoutErrorBanner
                    ref={errorBannerRef}
                    error={deliveryOptionError}
                    analytics={{ flow: "User setting delivery method" }}
                  />
                  <Spacer y={2} />
                </>
              )}
              <Flex flexDirection="column">
                <Flex>
                  <Text
                    variant={["sm-display", "sm-display", "md"]}
                    fontWeight="bold"
                    color="mono100"
                  >
                    Shipping method
                  </Text>

                  <Tooltip
                    variant="defaultDark"
                    placement="top"
                    width={250}
                    pointer={true}
                    content={
                      <Text variant="xs">
                        Shipping methods depend on location and artwork size. If
                        shipped internationally or part of a show, delivery may
                        take longer.
                      </Text>
                    }
                  >
                    <Clickable ml={0.5} style={{ lineHeight: 0 }}>
                      <InfoIcon />
                    </Clickable>
                  </Tooltip>
                </Flex>

                <Text variant="xs" color="mono60">
                  All options are protected against damage and loss with{" "}
                  <RouterLink
                    onClick={() => checkoutTracking.clickedBuyerProtection()}
                    inline
                    target="_blank"
                    to={BUYER_GUARANTEE_URL}
                  >
                    Artsy&rsquo;s Buyer Guarantee
                  </RouterLink>
                  .
                </Text>

                <Spacer y={2} />

                {isSingleOption ? (
                  <SingleShippingOption option={deliveryOptions[0]} />
                ) : (
                  <MultipleShippingOptionsForm options={deliveryOptions} />
                )}
              </Flex>

              <Spacer y={4} />

              <Button
                loading={isSubmitting}
                variant="primaryBlack"
                width="100%"
              >
                Continue to Payment
              </Button>
            </Flex>
          </Form>
        )
      }}
    </Formik>
  )
}

const FRAGMENT = graphql`
  fragment Order2DeliveryOptionsForm_order on Order {
    internalID
    fulfillmentOptions {
      amount {
        display
      }
      type
      selected
    }
  }
`

interface SingleShippingOptionProps {
  option: DeliveryOption
}

const SingleShippingOption = ({ option }: SingleShippingOptionProps) => {
  const label = deliveryOptionLabel(option.type)
  const timeEstimate = deliveryOptionTimeEstimate(option.type)
  const [prefix, timeRange] = timeEstimate || []

  return (
    <Flex flexDirection="column">
      <Flex justifyContent="space-between">
        <Text variant="sm-display" color="mono100">
          {label}
        </Text>
        <Text variant="sm" color="mono100">
          {option.amount?.display}
        </Text>
      </Flex>
      {timeEstimate && (
        <Text variant="sm" color="mono60">
          {prefix} <strong>{timeRange}</strong>
        </Text>
      )}
    </Flex>
  )
}

interface MultipleShippingOptionsFormProps {
  options: DeliveryOption[]
}

const MultipleShippingOptionsForm = ({
  options,
}: MultipleShippingOptionsFormProps) => {
  const defaultOption = options.find(option => option.selected) || options[0]
  const [selectedOption, setSelectedOption] = useState(defaultOption)
  const { setFieldValue } = useFormikContext<FormValues>()
  const { checkoutTracking } = useCheckoutContext()

  return (
    <Flex flexDirection="column">
      <RadioGroup
        defaultValue={selectedOption}
        onSelect={selected => {
          setSelectedOption(selected)
          setFieldValue("deliveryOption", selected)
          checkoutTracking.clickedSelectShippingOption(selected.type)
        }}
        gap={2}
      >
        {options.map((option, i) => {
          const label = deliveryOptionLabel(option.type)
          const timeEstimate = deliveryOptionTimeEstimate(option.type)
          const [prefix, timeRange] = timeEstimate || []

          return (
            <Radio
              label={
                <>
                  <Flex justifyContent="space-between" width="100%">
                    <Text variant="sm-display">{label}</Text>
                    <Text variant="sm">{option.amount?.display}</Text>
                  </Flex>
                </>
              }
              key={`${option.type}:${i}`}
              value={option}
            >
              <Flex width="100%">
                <Flex flexDirection="column">
                  {timeEstimate && (
                    <Text variant="sm" color="mono60">
                      {prefix} <strong>{timeRange}</strong>
                    </Text>
                  )}

                  {option.type === "ARTSY_WHITE_GLOVE" &&
                    selectedOption === option && (
                      <Text variant="sm" color="mono60">
                        This service includes custom packing, transportation on
                        a fine art shuttle, and in-home delivery.
                      </Text>
                    )}
                </Flex>
              </Flex>
            </Radio>
          )
        })}
      </RadioGroup>
    </Flex>
  )
}
