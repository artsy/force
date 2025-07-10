import { Button, Flex, Radio, RadioGroup, Spacer, Text } from "@artsy/palette"
import { validateAndExtractOrderResponse } from "Apps/Order/Components/ExpressCheckout/Util/mutationHandling"
import { useCheckoutContext } from "Apps/Order2/Routes/Checkout/Hooks/useCheckoutContext"
import { useOrder2SetFulfillmentOptionMutation } from "Apps/Order2/Routes/Checkout/Mutations/useOrder2SetFulfillmentOptionMutation"
import { BUYER_GUARANTEE_URL } from "Apps/Order2/constants"
import { RouterLink } from "System/Components/RouterLink"
import type {
  Order2DeliveryOptionsForm_order$data,
  Order2DeliveryOptionsForm_order$key,
} from "__generated__/Order2DeliveryOptionsForm_order.graphql"
import { Formik, type FormikConfig, useFormikContext } from "formik"
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
  const { checkoutTracking, setDeliveryOptionComplete } = useCheckoutContext()
  const setFulfillmentOptionMutation = useOrder2SetFulfillmentOptionMutation()

  const { fulfillmentOptions } = orderData
  const deliveryOptions = fulfillmentOptions.filter(
    option => option.type !== "PICKUP",
  )

  const isSingleOption = deliveryOptions.length === 1

  const handleSubmit: FormikConfig<FormValues>["onSubmit"] = async ({
    deliveryOption,
  }) => {
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

    setDeliveryOptionComplete()
  }

  return (
    <Formik<FormValues>
      initialValues={{ deliveryOption: deliveryOptions[0] }}
      onSubmit={handleSubmit}
    >
      {({ handleSubmit, isSubmitting }) => (
        <Flex flexDirection="column" backgroundColor="mono0" py={2} px={[2, 4]}>
          <Flex flexDirection="column">
            <Text
              variant={["sm-display", "md"]}
              fontWeight="bold"
              color="mono100"
            >
              Shipping method
            </Text>
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
            onClick={() => handleSubmit()}
          >
            Continue to Payment
          </Button>
        </Flex>
      )}
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

interface FlatShippingFormProps {
  option: DeliveryOption
}

// TODO: Get these from MP?
const deliveryOptionLabel = (option: DeliveryOption) => {
  switch (option.type) {
    case "DOMESTIC_FLAT":
      return "Flat rate"
    case "INTERNATIONAL_FLAT":
      return "Flat rate"
    default:
      return option.type.replace(/_/g, " ").toLocaleLowerCase()
  }
}

const SingleShippingOption = ({ option }: FlatShippingFormProps) => {
  const label = deliveryOptionLabel(option)

  // TODO: Extract option into shared component so completed view can take advantage, probably using MP's labels
  return (
    <Flex flexDirection="column">
      <Spacer y={0.5} />
      <Flex justifyContent="space-between">
        <Text variant="sm-display" color="mono100">
          {label}
        </Text>
        <Text variant="sm-display" color="mono100">
          {option.amount?.display}
        </Text>
      </Flex>
      <Text variant="xs" color="mono60">
        Estimated to ship between <strong>TODO 28-30</strong>
      </Text>
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

  return (
    <Flex flexDirection="column">
      <RadioGroup
        defaultValue={selectedOption}
        onSelect={selected => {
          setSelectedOption(selected)
          setFieldValue("deliveryOption", selected)
        }}
      >
        {options.map((option, i) => (
          <Radio key={`${option.type}:${i}`} value={option}>
            {option.type} - {option.amount?.display}
          </Radio>
        ))}
      </RadioGroup>
    </Flex>
  )
}
