import { Flex, Radio, RadioGroup, Spacer, Text } from "@artsy/palette"
import { appendCurrencySymbol } from "Apps/Order/Utils/currencyUtils"
import { FormikOfferInput } from "Apps/Order2/Routes/Checkout/Components/OfferStep/Components/FormikOfferInput"
import type { OfferFormProps } from "Apps/Order2/Routes/Checkout/Components/OfferStep/types"
import type { Order2PriceRangeOfferForm_order$key } from "__generated__/Order2PriceRangeOfferForm_order.graphql"
import { useState } from "react"
import { graphql, useFragment } from "react-relay"

interface PriceOption {
  key: string
  value: number
  description: string
}

interface Order2PriceRangeOfferFormProps extends OfferFormProps {
  order: Order2PriceRangeOfferForm_order$key
}

export const Order2PriceRangeOfferForm: React.FC<
  Order2PriceRangeOfferFormProps
> = ({ order, onOfferOptionSelected, onCustomOfferBlur }) => {
  const orderData = useFragment(FRAGMENT, order)
  const [selectedRadio, setSelectedRadio] = useState<string>()

  const artwork = orderData.lineItems?.[0]?.artworkOrEditionSet
  const listPrice = artwork?.listPrice

  const getRangeOptions = (): PriceOption[] => {
    if (listPrice?.__typename !== "PriceRange") {
      return []
    }

    const minPriceRange = listPrice?.minPrice?.major
    const maxPriceRange = listPrice?.maxPrice?.major

    if (!minPriceRange || !maxPriceRange) {
      return []
    }

    const midPriceRange = Math.round((minPriceRange + maxPriceRange) / 2)

    return [
      {
        key: "price-option-max",
        value: Math.round(maxPriceRange),
        description: "Top-end of range",
      },
      {
        key: "price-option-mid",
        value: midPriceRange,
        description: "Midpoint",
      },
      {
        key: "price-option-min",
        value: Math.round(minPriceRange),
        description: "Low-end of range",
      },
    ]
  }

  const priceOptions = getRangeOptions()

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
    ...priceOptions.map(({ value: optionValue, description, key }) => (
      <Radio value={key} label={formatCurrency(optionValue)} key={key}>
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
          <FormikOfferInput name="offerValue" onBlur={onCustomOfferBlur} />
        </Flex>
      )}
    </Radio>,
  ]

  return <RadioGroup onSelect={handleRadioSelect}>{radioOptions}</RadioGroup>
}

const FRAGMENT = graphql`
  fragment Order2PriceRangeOfferForm_order on Order {
    currencyCode
    lineItems {
      artworkOrEditionSet {
        ... on Artwork {
          price
          listPrice {
            __typename
            ... on PriceRange {
              maxPrice {
                ... on Money {
                  major
                }
              }
              minPrice {
                ... on Money {
                  major
                }
              }
            }
          }
        }
        ... on EditionSet {
          price
          listPrice {
            __typename
            ... on PriceRange {
              maxPrice {
                ... on Money {
                  major
                }
              }
              minPrice {
                ... on Money {
                  major
                }
              }
            }
          }
        }
      }
    }
  }
`
