import { ContextModule } from "@artsy/cohesion"
import InfoIcon from "@artsy/icons/InfoIcon"
import {
  Button,
  Clickable,
  Flex,
  Radio,
  RadioGroup,
  Skeleton,
  SkeletonBox,
  Spacer,
  Text,
  Tooltip,
} from "@artsy/palette"
import { SectionHeading } from "Apps/Order2/Components/SectionHeading"
import {
  CheckoutStepName,
  CheckoutStepState,
} from "Apps/Order2/Routes/Checkout/CheckoutContext/types"
import { CheckoutErrorBanner } from "Apps/Order2/Routes/Checkout/Components/CheckoutErrorBanner"
import {
  SELECTABLE_TYPES,
  deliveryOptionLabel,
  deliveryOptionTimeEstimate,
} from "Apps/Order2/Routes/Checkout/Components/DeliveryOptionsStep/utils"
import { useCompleteFulfillmentDetailsData } from "Apps/Order2/Routes/Checkout/Components/FulfillmentDetailsStep/useCompleteFulfillmentDetailsData"
import { useCheckoutContext } from "Apps/Order2/Routes/Checkout/Hooks/useCheckoutContext"
import { useScrollToErrorBanner } from "Apps/Order2/Routes/Checkout/Hooks/useScrollToErrorBanner"
import { useSelectDeliveryOption } from "Apps/Order2/Routes/Checkout/Hooks/useSelectDeliveryOption"
import { SHIPPING_AND_RETURNS_FAQS_URL } from "Apps/Order2/constants"
import { RouterLink } from "System/Components/RouterLink"
import type {
  Order2DeliveryOptionsForm_order$data,
  Order2DeliveryOptionsForm_order$key,
} from "__generated__/Order2DeliveryOptionsForm_order.graphql"
import { useCallback, useEffect, useState } from "react"
import { graphql, useFragment } from "react-relay"

interface Order2DeliveryOptionsFormProps {
  order: Order2DeliveryOptionsForm_order$key
  refreshingOptions?: boolean
}

type DeliveryOption =
  Order2DeliveryOptionsForm_order$data["fulfillmentOptions"][number]

export const Order2DeliveryOptionsForm: React.FC<
  Order2DeliveryOptionsFormProps
> = ({ order, refreshingOptions = false }) => {
  const orderData = useFragment(FRAGMENT, order)
  const {
    checkoutTracking,
    completeStep,
    messages,
    isFulfillmentDetailsSaving,
    steps,
  } = useCheckoutContext()
  const { selectDeliveryOption } = useSelectDeliveryOption()
  const [isDeliveryOptionSaving, setIsDeliveryOptionSaving] = useState(false)

  const deliveryOptionError = messages[CheckoutStepName.DELIVERY_OPTION]?.error
  const errorBannerRef = useScrollToErrorBanner(
    CheckoutStepName.DELIVERY_OPTION,
  )

  const { fulfillmentOptions, shippingOrigin, shippingRadius } = orderData
  const deliveryOptions = fulfillmentOptions.filter(
    option => option.type !== "PICKUP",
  )
  const selectableOptions = deliveryOptions.filter(o =>
    SELECTABLE_TYPES.includes(o.type),
  )
  // When all options are SHIPPING_TBD, no mutation is needed.
  const onlyShippingTBD =
    deliveryOptions.length > 0 && selectableOptions.length === 0

  const hasFulfillmentDetails =
    useCompleteFulfillmentDetailsData(orderData) !== null
  const hasDeliveryOption =
    deliveryOptions.length > 0 &&
    (!!orderData.selectedFulfillmentOption || onlyShippingTBD)

  const deliveryOptionsStep = steps?.find(
    step => step.name === CheckoutStepName.DELIVERY_OPTION,
  )

  useEffect(() => {
    if (deliveryOptionsStep?.state !== CheckoutStepState.ACTIVE) {
      return
    }

    const artaOptions = deliveryOptions.filter(option =>
      ["ARTSY_STANDARD", "ARTSY_EXPRESS", "ARTSY_WHITE_GLOVE"].includes(
        option.type,
      ),
    )

    if (artaOptions.length === 0) {
      return
    }

    checkoutTracking.shippingQuoteViewed(
      artaOptions.map(option => {
        const timeEstimate = deliveryOptionTimeEstimate(option.type)
        const timeline = timeEstimate
          ? [timeEstimate[0], timeEstimate[1]].filter(Boolean).join(" ")
          : ""

        return {
          id: option.type,
          type: "arta",
          subtype: option.type.replace("ARTSY_", "").toLowerCase(),
          price_minor: option.amount?.minor ?? 0,
          price_currency: option.amount?.currencyCode ?? "USD",
          timeline,
        }
      }),
    )
  }, [deliveryOptions, checkoutTracking, deliveryOptionsStep?.state])

  const handleContinue = useCallback(() => {
    checkoutTracking.clickedOrderProgression(
      ContextModule.ordersShippingMethods,
    )
    completeStep(CheckoutStepName.DELIVERY_OPTION)
  }, [checkoutTracking, completeStep])

  return (
    <Flex flexDirection="column" backgroundColor="mono0" py={2} px={[2, 2, 4]}>
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

        {shippingOrigin && (
          <Text variant="xs">Ships from {shippingOrigin}</Text>
        )}

        {shippingRadius === "international" && (
          <Text variant="xs">
            Additional processing times may vary by destination
          </Text>
        )}

        <Spacer y={2} />

        {refreshingOptions ? (
          <Skeleton>
            <Flex flexDirection="column" gap={1}>
              {[0, 1, 2].map(i => (
                <SkeletonBox key={i} height="52px" width="100%" />
              ))}
            </Flex>
          </Skeleton>
        ) : deliveryOptions.length === 1 ? (
          <SingleShippingOption option={deliveryOptions[0]} />
        ) : deliveryOptions.length > 1 ? (
          <MultipleShippingOptionsForm
            options={deliveryOptions}
            onSelectOption={async option => {
              // TODO: extract this into a named handler with proper error handling
              // TODO: skip mutation if option.type === currently selected type (avoid duplicate saves)
              checkoutTracking.clickedSelectShippingOption(option.type)
              setIsDeliveryOptionSaving(true)
              const success = await selectDeliveryOption(
                orderData.internalID,
                option.type,
              )
              setIsDeliveryOptionSaving(false)
              return success
            }}
          />
        ) : (
          <Flex flexDirection="column">
            <Text variant="sm-display" color="mono100">
              Unable to find shipping quotes. Please contact orders@artsy.net.
            </Text>
          </Flex>
        )}
      </Flex>

      <Spacer y={4} />

      {/* TODO: this button advances through both the Fulfillment Details and
          Delivery Option steps. Consider whether the copy/disabled logic should
          reflect both steps more explicitly. */}
      <Button
        loading={isDeliveryOptionSaving || isFulfillmentDetailsSaving}
        disabled={
          isFulfillmentDetailsSaving ||
          !hasFulfillmentDetails ||
          !hasDeliveryOption
        }
        variant="primaryBlack"
        width="100%"
        onClick={handleContinue}
      >
        Continue to Payment
      </Button>

      <Spacer y={2} />

      <Text variant="xs" color="mono60">
        <RouterLink
          onClick={() =>
            checkoutTracking.clickedBuyerProtection(
              ContextModule.ordersShippingMethods,
            )
          }
          inline
          target="_blank"
          to={SHIPPING_AND_RETURNS_FAQS_URL}
        >
          All shipping options
        </RouterLink>{" "}
        are protected against damage and loss with The Artsy Guarantee.
      </Text>
    </Flex>
  )
}

const FRAGMENT = graphql`
  fragment Order2DeliveryOptionsForm_order on Order {
    ...useCompleteFulfillmentDetailsData_order
    internalID
    fulfillmentOptions {
      amount {
        display
        minor
        currencyCode
      }
      type
      selected
    }
    selectedFulfillmentOption {
      type
    }
    shippingOrigin
    shippingRadius
  }
`

interface SingleShippingOptionProps {
  option: DeliveryOption
}

const SingleShippingOption = ({ option }: SingleShippingOptionProps) => {
  const label = deliveryOptionLabel(option.type, option.amount?.minor)
  const timeEstimate = deliveryOptionTimeEstimate(option.type)
  const [prefix, timeRange] = timeEstimate || []

  return (
    <Flex flexDirection="column">
      <Flex justifyContent="space-between">
        <Text variant="sm" color="mono100">
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
  onSelectOption: (option: DeliveryOption) => Promise<boolean>
}

const MultipleShippingOptionsForm = ({
  options,
  onSelectOption,
}: MultipleShippingOptionsFormProps) => {
  const defaultOption = options.find(option => option.selected) || options[0]
  const [selectedOption, setSelectedOption] = useState(defaultOption)

  return (
    <RadioGroup
      flexDirection="column"
      defaultValue={defaultOption}
      onSelect={async option => {
        const previous = selectedOption
        setSelectedOption(option)
        const success = await onSelectOption(option)
        if (!success) {
          setSelectedOption(previous)
        }
      }}
    >
      {options.map(option => {
        const label = deliveryOptionLabel(option.type, option.amount?.minor)
        const timeEstimate = deliveryOptionTimeEstimate(option.type)
        const [prefix, timeRange] = timeEstimate || []
        const isSelected = selectedOption?.type === option.type

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
                  <Text variant="sm" color={isSelected ? "mono100" : "mono60"}>
                    {prefix} <strong>{timeRange}</strong>
                  </Text>
                )}

                {option.type === "ARTSY_WHITE_GLOVE" && isSelected && (
                  <Text variant="sm" color={isSelected ? "mono100" : "mono60"}>
                    Includes custom packing, transportation on a fine art
                    shuttle, and in-home delivery
                  </Text>
                )}
              </Flex>
            </Flex>
          </Radio>
        )
      })}
    </RadioGroup>
  )
}
