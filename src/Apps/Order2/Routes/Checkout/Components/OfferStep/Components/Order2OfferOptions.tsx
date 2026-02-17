import { Flex, Radio, RadioGroup, Spacer, Text } from "@artsy/palette"
import { appendCurrencySymbol } from "Apps/Order/Utils/currencyUtils"
import { OfferInput } from "Apps/Order2/Routes/Checkout/Components/OfferStep/Components/OfferInput"
import type { OfferFormProps } from "Apps/Order2/Routes/Checkout/Components/OfferStep/types"
import type { Order2OfferOptions_order$key } from "__generated__/Order2OfferOptions_order.graphql"
import { useFormikContext } from "formik"
import { useMemo, useState } from "react"
import { graphql, useFragment } from "react-relay"

interface PriceOption {
  key: string
  value: number
  description: string
}

interface Order2OfferOptionsProps extends OfferFormProps {
  order: Order2OfferOptions_order$key
}

/**
 * Determines which radio option should be selected based on the current offer value
 */
const getInitialSelectedRadio = (
  offerValue: number,
  priceOptions: PriceOption[],
): string | undefined => {
  if (!offerValue || offerValue === 0) {
    return undefined
  }

  // Check if the current value matches one of the preset options
  const matchingOption = priceOptions.find(opt => opt.value === offerValue)

  if (matchingOption) {
    return matchingOption.key
  }

  // If it doesn't match any preset option but has a value, it's a custom amount
  return "price-option-custom"
}

export const Order2OfferOptions: React.FC<Order2OfferOptionsProps> = ({
  order,
  onOfferOptionSelected,
  onCustomOfferBlur,
}) => {
  const orderData = useFragment(FRAGMENT, order)
  const { values } = useFormikContext<{ offerValue: number }>()

  const priceOptions = useMemo((): PriceOption[] => {
    const artwork = orderData.lineItems?.[0]?.artworkOrEditionSet
    const artworkListPrice = artwork?.listPrice

    // Handle price range case
    if (artworkListPrice?.__typename === "PriceRange") {
      const minPriceRange = artworkListPrice?.minPrice?.major
      const maxPriceRange = artworkListPrice?.maxPrice?.major

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

    // Handle exact price case
    const listPrice = orderData.lineItems?.[0]?.listPrice
    const listPriceMajor = listPrice?.major

    if (!listPriceMajor) {
      return []
    }

    return [
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
  }, [orderData])

  const [selectedRadio, setSelectedRadio] = useState<string | undefined>(() =>
    getInitialSelectedRadio(values.offerValue, priceOptions),
  )

  const formatCurrency = (amount: number) => {
    return appendCurrencySymbol(
      amount.toLocaleString("en-US", {
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
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

  return (
    <RadioGroup onSelect={handleRadioSelect} defaultValue={selectedRadio}>
      {[
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
              <OfferInput name="offerValue" onBlur={onCustomOfferBlur} />
            </Flex>
          )}
        </Radio>,
      ]}
    </RadioGroup>
  )
}

const FRAGMENT = graphql`
  fragment Order2OfferOptions_order on Order {
    currencyCode
    lineItems {
      listPrice {
        __typename
        ... on Money {
          major
        }
      }
      artworkOrEditionSet {
        ... on Artwork {
          listPrice {
            __typename
            ... on PriceRange {
              maxPrice {
                major
              }
              minPrice {
                major
              }
            }
          }
        }
        ... on EditionSet {
          listPrice {
            __typename
            ... on PriceRange {
              maxPrice {
                major
              }
              minPrice {
                major
              }
            }
          }
        }
      }
    }
  }
`
