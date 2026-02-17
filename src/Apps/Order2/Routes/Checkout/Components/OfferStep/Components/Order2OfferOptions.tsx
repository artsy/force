import { Flex, Radio, RadioGroup, Spacer, Text } from "@artsy/palette"
import { appendCurrencySymbol } from "Apps/Order/Utils/currencyUtils"
import { OfferInput } from "Apps/Order2/Routes/Checkout/Components/OfferStep/Components/OfferInput"
import type { OfferFormProps } from "Apps/Order2/Routes/Checkout/Components/OfferStep/types"
import createLogger from "Utils/logger"
import type { Order2OfferOptions_order$key } from "__generated__/Order2OfferOptions_order.graphql"
import { useFormikContext } from "formik"
import { useMemo, useState } from "react"
import { graphql, useFragment } from "react-relay"

const logger = createLogger("Order2OfferOptions")

interface PriceOption {
  key: PriceOptionKey
  value: number
  description: string
}

interface Order2OfferOptionsProps extends OfferFormProps {
  order: Order2OfferOptions_order$key
}

enum PriceOptionKey {
  MAX = "price-option-max",
  MID = "price-option-mid",
  MIN = "price-option-min",
  CUSTOM = "price-option-custom",
}

/**
 * Determines which radio option should be selected based on the current offer value
 */
const getInitialSelectedRadio = (
  offerValue: number,
  priceOptions: PriceOption[],
): PriceOptionKey | undefined => {
  if (!offerValue || offerValue === 0) {
    return undefined
  }

  // Check if the current value matches one of the preset options
  const matchingOption = priceOptions.find(opt => opt.value === offerValue)

  if (matchingOption) {
    return matchingOption.key
  }

  // If it doesn't match any preset option but has a value, it's a custom amount
  return PriceOptionKey.CUSTOM
}

export const Order2OfferOptions: React.FC<Order2OfferOptionsProps> = ({
  order,
  onOfferOptionSelected,
  onCustomOfferBlur,
}) => {
  const orderData = useFragment(FRAGMENT, order)
  const { values } = useFormikContext<{ offerValue: number }>()

  const artwork = orderData.lineItems?.[0]?.artworkOrEditionSet
  const artworkListPrice = artwork?.listPrice

  // exact price case
  const lineItemListPrice = orderData.lineItems?.[0]?.listPrice

  const priceOptions = useMemo((): PriceOption[] => {
    // Handle price range case
    if (artworkListPrice?.__typename === "PriceRange") {
      const minPriceRange = artworkListPrice?.minPrice?.major
      const maxPriceRange = artworkListPrice?.maxPrice?.major

      if (!minPriceRange || !maxPriceRange) {
        logger.error(
          "Missing price range data for artwork - no preset offer options will be shown",
          { minPriceRange, maxPriceRange },
        )
        return []
      }

      const midPriceRange = Math.round((minPriceRange + maxPriceRange) / 2)

      return [
        {
          key: PriceOptionKey.MAX,
          value: Math.round(maxPriceRange),
          description: "Top-end of range",
        },
        {
          key: PriceOptionKey.MID,
          value: midPriceRange,
          description: "Midpoint",
        },
        {
          key: PriceOptionKey.MIN,
          value: Math.round(minPriceRange),
          description: "Low-end of range",
        },
      ]
    }

    const lineItemListPriceMajor = lineItemListPrice?.major

    if (!lineItemListPriceMajor) {
      logger.error(
        "Missing list price for artwork - no preset offer options will be shown",
        { listPrice: lineItemListPrice },
      )
      return []
    }

    return [
      {
        key: PriceOptionKey.MAX,
        value: Math.round(lineItemListPriceMajor),
        description: "List price",
      },
      {
        key: PriceOptionKey.MID,
        value: Math.round(lineItemListPriceMajor * 0.9), // 10% below
        description: "10% below list price",
      },
      {
        key: PriceOptionKey.MIN,
        value: Math.round(lineItemListPriceMajor * 0.8), // 20% below
        description: "20% below list price",
      },
    ]
  }, [artworkListPrice, lineItemListPrice])

  const [selectedRadio, setSelectedRadio] = useState<
    PriceOptionKey | undefined
  >(() => getInitialSelectedRadio(values.offerValue, priceOptions))

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

    setSelectedRadio(value as PriceOptionKey)
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
