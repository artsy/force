import { Flex, Radio, RadioGroup, Spacer, Text } from "@artsy/palette"
import { appendCurrencySymbol } from "Apps/Order/Utils/currencyUtils"
import { FormikOfferInput } from "Apps/Order2/Routes/Checkout/Components/OfferStep/Components/FormikOfferInput"
import type { OfferFormProps } from "Apps/Order2/Routes/Checkout/Components/OfferStep/types"
import type { Order2PriceRangeOfferForm_order$key } from "__generated__/Order2PriceRangeOfferForm_order.graphql"
import { compact } from "lodash"
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
> = ({ order, offerValue, onOfferValueChange, onOfferOptionSelected }) => {
  const orderData = useFragment(FRAGMENT, order)
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

  // Find initial selected option based on current value
  const getInitialState = () => {
    if (!offerValue)
      return {
        selectedRadio: undefined,
        showCustomInput: false,
      }

    const matchingOption = priceOptions.find(
      option => option.value === offerValue,
    )
    if (matchingOption) {
      return {
        selectedRadio: matchingOption.key,
        showCustomInput: false,
      }
    } else {
      return {
        selectedRadio: "price-option-custom",
        showCustomInput: true,
      }
    }
  }

  const initialState = getInitialState()
  const [selectedRadio, setSelectedRadio] = useState<string | undefined>(
    initialState.selectedRadio,
  )
  const [showCustomInput, setShowCustomInput] = useState(
    initialState.showCustomInput,
  )

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

  return (
    <RadioGroup onSelect={setSelectedRadio} defaultValue={selectedRadio}>
      {compact(priceOptions)
        .map(({ value: optionValue, description, key }) => (
          <Radio
            value={key}
            label={formatCurrency(optionValue)}
            onSelect={() => {
              onOfferOptionSelected(optionValue, description)
              setShowCustomInput(false)
            }}
            key={key}
          >
            <Spacer y={1} />
            <Text variant="sm-display" color="mono60">
              {description}
            </Text>
            <Spacer y={4} />
          </Radio>
        ))
        .concat([
          <Radio
            value="price-option-custom"
            label="Other amount"
            onSelect={() => {
              if (!showCustomInput) {
                setShowCustomInput(true)
                // Clear the Formik field when switching to custom input
                onOfferValueChange(0)
              }
            }}
            key="price-option-custom"
          >
            {showCustomInput && (
              <Flex flexDirection="column" mt={2}>
                <FormikOfferInput name="offerValue" />
              </Flex>
            )}
          </Radio>,
        ])}
    </RadioGroup>
  )
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
