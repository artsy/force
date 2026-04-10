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
import { SectionHeading } from "Apps/Order2/Components/SectionHeading"
import { CheckoutStepName } from "Apps/Order2/Routes/Checkout/CheckoutContext/types"
import {
  CheckoutErrorBanner,
  fallbackError,
} from "Apps/Order2/Routes/Checkout/Components/CheckoutErrorBanner"
import {
  deliveryOptionLabel,
  deliveryOptionTimeEstimate,
} from "Apps/Order2/Routes/Checkout/Components/DeliveryOptionsStep/utils"
import { useCheckoutContext } from "Apps/Order2/Routes/Checkout/Hooks/useCheckoutContext"
import { useScrollToErrorBanner } from "Apps/Order2/Routes/Checkout/Hooks/useScrollToErrorBanner"
import { useOrder2SetOrderFulfillmentOptionMutation } from "Apps/Order2/Routes/Checkout/Mutations/useOrder2SetOrderFulfillmentOptionMutation"
import { SHIPPING_AND_RETURNS_FAQS_URL } from "Apps/Order2/constants"
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
    setSectionErrorMessage,
    messages,
  } = useCheckoutContext()
  const setFulfillmentOptionMutation =
    useOrder2SetOrderFulfillmentOptionMutation()

  const deliveryOptionError = messages[CheckoutStepName.DELIVERY_OPTION]?.error
  const errorBannerRef = useScrollToErrorBanner(
    CheckoutStepName.DELIVERY_OPTION,
  )

  const { fulfillmentOptions, shippingOrigin } = orderData
  const deliveryOptions = fulfillmentOptions.filter(
    option => option.type !== "PICKUP",
  )

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
                type: deliveryOption.type,
              },
            },
          },
        })

      validateAndExtractOrderResponse(
        setFulfillmentOptionResult.setOrderFulfillmentOption?.orderOrError,
      ).order

      setSectionErrorMessage({
        section: CheckoutStepName.DELIVERY_OPTION,
        error: null,
      })
      setDeliveryOptionComplete()
    } catch (error) {
      console.error("Error setting delivery option:", error)
      setSectionErrorMessage({
        section: CheckoutStepName.DELIVERY_OPTION,
        error: fallbackError("selecting your shipping method", error?.code),
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
                <Flex alignItems="center">
                  <SectionHeading>Shipping method</SectionHeading>

                  <Tooltip
                    variant="defaultDark"
                    placement="top"
                    width={250}
                    pointer={true}
                    content={
                      <Text variant="xs">
                        Shipping options depend on location and artwork size.
                        International orders or works in shows may take longer.
                      </Text>
                    }
                  >
                    <Clickable aria-label="Shipping information" ml={0.5}>
                      <InfoIcon />
                    </Clickable>
                  </Tooltip>
                </Flex>

                <Spacer y={1} />

                {deliveryOptions.length === 1 ? (
                  <SingleShippingOption option={deliveryOptions[0]} />
                ) : deliveryOptions.length > 1 ? (
                  <MultipleShippingOptionsForm
                    options={deliveryOptions}
                    shippingOrigin={shippingOrigin}
                  />
                ) : (
                  <Flex flexDirection="column">
                    <Text variant="sm-display" color="mono100">
                      Unable to find shipping quotes. Please contact
                      orders@artsy.net.
                    </Text>
                  </Flex>
                )}
              </Flex>

              <Spacer y={4} />

              <Button
                loading={isSubmitting}
                disabled={deliveryOptions.length === 0}
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
    shippingOrigin
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
  shippingOrigin: string | null | undefined
}

const MultipleShippingOptionsForm = ({
  options,
  shippingOrigin,
}: MultipleShippingOptionsFormProps) => {
  const defaultOption = options.find(option => option.selected) || options[0]
  const [selectedOption, setSelectedOption] = useState(defaultOption)
  const { setFieldValue } = useFormikContext<FormValues>()
  const { checkoutTracking } = useCheckoutContext()

  return (
    <>
      {shippingOrigin && (
        <Text variant="xs" color="mono60">
          Ships from {shippingOrigin}
        </Text>
      )}

      <Spacer y={0.5} />

      <Text variant="xs" color="mono60">
        <RouterLink inline target="_blank" to={SHIPPING_AND_RETURNS_FAQS_URL}>
          All shipping options
        </RouterLink>{" "}
        are protected against damage and loss with The Artsy Guarantee.
      </Text>

      <Spacer y={2} />

      <RadioGroup
        flexDirection="column"
        defaultValue={defaultOption}
        onSelect={option => {
          setSelectedOption(option)
          setFieldValue("deliveryOption", option)
          checkoutTracking.clickedSelectShippingOption(option.type)
        }}
      >
        {options.map(option => {
          const label = deliveryOptionLabel(option.type)
          const timeEstimate = deliveryOptionTimeEstimate(option.type)
          const [prefix, timeRange] = timeEstimate || []
          const isSelected = selectedOption === option

          return (
            <Radio
              key={option.type}
              flex={1}
              backgroundColor={isSelected ? "mono5" : "mono0"}
              p={1}
              label={
                <Flex justifyContent="space-between" width="100%">
                  <Text variant="sm-display">{label}</Text>
                  <Text variant="sm">{option.amount?.display}</Text>
                </Flex>
              }
              value={option}
            >
              <Flex width="100%">
                <Flex flexDirection="column">
                  {timeEstimate && (
                    <Text
                      variant="sm"
                      color={isSelected ? "mono100" : "mono60"}
                    >
                      {prefix} <strong>{timeRange}</strong>
                    </Text>
                  )}

                  {option.type === "ARTSY_WHITE_GLOVE" && isSelected && (
                    <Text
                      variant="sm"
                      color={isSelected ? "mono100" : "mono60"}
                    >
                      Includes custom packing, transportation on a fine art
                      shuttle, and in-home delivery.
                    </Text>
                  )}
                </Flex>
              </Flex>
            </Radio>
          )
        })}
      </RadioGroup>
    </>
  )
}
