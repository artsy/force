import { Flex, Radio, RadioGroup, Spacer, Text } from "@artsy/palette"
import { appendCurrencySymbol } from "Apps/Order/Utils/currencyUtils"
import { FormikOfferInput } from "Apps/Order2/Routes/Checkout/Components/OfferStep/Components/FormikOfferInput"
import type { OfferFormProps } from "Apps/Order2/Routes/Checkout/Components/OfferStep/types"
import type { Order2ExactPriceOfferForm_order$key } from "__generated__/Order2ExactPriceOfferForm_order.graphql"
import { useState } from "react"
import { graphql, useFragment } from "react-relay"

interface PriceOption {
  key: string
  value: number
  description: string
}

interface Order2ExactPriceOfferFormProps extends OfferFormProps {
  order: Order2ExactPriceOfferForm_order$key
}

export const Order2ExactPriceOfferForm: React.FC<
  Order2ExactPriceOfferFormProps
> = ({ order, onOfferOptionSelected }) => {
  const orderData = useFragment(FRAGMENT, order)
  const [selectedRadio, setSelectedRadio] = useState<string>()

  const listPriceMajor = orderData.lineItems[0]?.listPrice?.major

  const priceOptions: PriceOption[] = listPriceMajor
    ? [
        {
          key: "price-option-max",
          value: Math.round(listPriceMajor),
          description: "List price",
        },
        {
          key: "price-option-mid",
          value: Math.round(listPriceMajor * 0.9), // 10% below
          description: "10% below list price",
        },
        {
          key: "price-option-min",
          value: Math.round(listPriceMajor * 0.8), // 20% below
          description: "20% below list price",
        },
      ]
    : []

  const formatCurrency = (amount: number) => {
    return appendCurrencySymbol(
      amount.toLocaleString("en-US", {
        minimumFractionDigits: 2,
        style: "currency",
        currency: orderData.currencyCode,
      }),
      orderData.currencyCode,
    )
  }

  const handleRadioSelect = (value: string) => {
    const option = priceOptions.find(opt => opt.key === value)

    if (option) {
      onOfferOptionSelected(option.value, option.description)
    } else if (
      value === "price-option-custom" &&
      selectedRadio !== "price-option-custom"
    ) {
      onOfferOptionSelected(0, "Custom amount")
    }

    setSelectedRadio(value)
  }

  const radioOptions = [
    ...priceOptions.map(({ key, value, description }) => (
      <Radio key={key} value={key} label={formatCurrency(value)}>
        <Spacer y={1} />
        <Text variant="sm-display" color="mono60">
          {description}
        </Text>
        <Spacer y={4} />
      </Radio>
    )),
    <Radio
      key="price-option-custom"
      value="price-option-custom"
      label="Other amount"
    >
      {selectedRadio === "price-option-custom" && (
        <Flex flexDirection="column" mt={2}>
          <FormikOfferInput name="offerValue" />
        </Flex>
      )}
    </Radio>,
  ]

  return (
    <RadioGroup onSelect={handleRadioSelect} defaultValue={selectedRadio}>
      {radioOptions}
    </RadioGroup>
  )
}

const FRAGMENT = graphql`
  fragment Order2ExactPriceOfferForm_order on Order {
    currencyCode
    lineItems {
      listPrice {
        ... on Money {
          major
        }
      }
    }
  }
`
