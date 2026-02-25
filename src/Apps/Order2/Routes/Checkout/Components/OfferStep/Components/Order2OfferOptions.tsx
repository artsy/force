import { Flex, Radio, Spacer, Text } from "@artsy/palette"
import { appendCurrencySymbol } from "Apps/Order/Utils/currencyUtils"
import { OfferInput } from "Apps/Order2/Routes/Checkout/Components/OfferStep/Components/OfferInput"
import type { OfferFormProps } from "Apps/Order2/Routes/Checkout/Components/OfferStep/types"
import createLogger from "Utils/logger"
import { useCountdownTimer } from "Utils/Hooks/useCountdownTimer"
import type { Order2OfferOptions_order$key } from "__generated__/Order2OfferOptions_order.graphql"
import { useFormikContext } from "formik"
import { DateTime } from "luxon"
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

  const isLimitedPartnerOffer = orderData.source === "PARTNER_OFFER"

  // Calculate timer directly in this component to ensure re-renders
  const partnerOfferEndTime =
    (isLimitedPartnerOffer && orderData.buyerStateExpiresAt) || ""
  const partnerOfferStartTime = isLimitedPartnerOffer
    ? DateTime.fromISO(partnerOfferEndTime).minus({ days: 3 }).toString()
    : ""

  const timer = useCountdownTimer({
    startTime: partnerOfferStartTime,
    endTime: partnerOfferEndTime,
    imminentTime: 1,
  })

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

    const priceStart = isLimitedPartnerOffer ? "Gallery offer" : "List price"

    return [
      {
        key: PriceOptionKey.MAX,
        value: Math.round(lineItemListPriceMajor),
        description: priceStart,
      },
      {
        key: PriceOptionKey.MID,
        value: Math.round(lineItemListPriceMajor * 0.9), // 10% below
        description: `10% below ${priceStart.toLowerCase()}`,
      },
      {
        key: PriceOptionKey.MIN,
        value: Math.round(lineItemListPriceMajor * 0.8), // 20% below
        description: `20% below ${priceStart.toLowerCase()}`,
      },
    ]
  }, [artworkListPrice, lineItemListPrice, isLimitedPartnerOffer])

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
    <Flex flexDirection="column">
      {priceOptions.map(({ value: optionValue, description, key }) => {
        const isSelected = selectedRadio === key
        const isGalleryOffer =
          isLimitedPartnerOffer && key === PriceOptionKey.MAX
        const showTimer = isGalleryOffer && timer.hasValidRemainingTime
        return (
          <Flex
            key={key}
            backgroundColor={isSelected ? "mono5" : "mono0"}
            p={2}
          >
            <Radio
              flex={1}
              value={key}
              selected={isSelected}
              onClick={() => handleRadioSelect(key)}
              label={
                isGalleryOffer ? (
                  <Text variant="sm-display" color="blue100">
                    {formatCurrency(optionValue)}
                  </Text>
                ) : (
                  formatCurrency(optionValue)
                )
              }
            >
              <Spacer y={0.5} />
              <Text
                variant="sm-display"
                color={isGalleryOffer ? "blue100" : "mono60"}
              >
                {description}
                {showTimer && ` (Exp. ${timer.remainingTime})`}
              </Text>
            </Radio>
          </Flex>
        )
      })}
      <Flex
        backgroundColor={
          selectedRadio === PriceOptionKey.CUSTOM ? "mono5" : "mono0"
        }
        p={2}
      >
        <Radio
          flex={1}
          value={PriceOptionKey.CUSTOM}
          selected={selectedRadio === PriceOptionKey.CUSTOM}
          onClick={() => handleRadioSelect(PriceOptionKey.CUSTOM)}
          label="Other amount"
        >
          {selectedRadio === PriceOptionKey.CUSTOM && (
            <Flex flexDirection="column" mt={2}>
              <OfferInput name="offerValue" onBlur={onCustomOfferBlur} />
            </Flex>
          )}
        </Radio>
      </Flex>
    </Flex>
  )
}

const FRAGMENT = graphql`
  fragment Order2OfferOptions_order on Order {
    source
    buyerStateExpiresAt
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
