import { BorderedRadio, Flex, RadioGroup, Text } from "@artsy/palette"
import { useEffect, useState } from "react"
import { OfferInput } from "v2/Apps/Order/Components/OfferInput"
import { compact } from "lodash"
import { createFragmentContainer, graphql } from "react-relay"
import {
  AnalyticsSchema,
  useAnalyticsContext,
  useTracking,
} from "v2/System/Analytics"
import { ActionType, ClickedOfferOption, PageOwnerType } from "@artsy/cohesion"
import { PriceOptions_artwork } from "v2/__generated__/PriceOptions_artwork.graphql"
import { PriceOptions_order } from "v2/__generated__/PriceOptions_order.graphql"
import { appendCurrencySymbol } from "../Utils/currencyUtils"
import { useScrollTo } from "v2/Utils/Hooks/useScrollTo"

export interface PriceOptionsProps {
  onChange: (value: number) => void
  onFocus: () => void
  showError?: boolean
  artwork: PriceOptions_artwork | null | undefined
  order: PriceOptions_order
}

export const PriceOptions: React.FC<PriceOptionsProps> = ({
  onChange,
  onFocus,
  showError,
  artwork,
  order,
}) => {
  const tracking = useTracking()
  const { contextPageOwnerId, contextPageOwnerType } = useAnalyticsContext()

  const trackClick = (offer: string, amount: number) => {
    const trackingData: ClickedOfferOption = {
      action: ActionType.clickedOfferOption,
      context_page_owner_id: contextPageOwnerId!,
      context_page_owner_type: contextPageOwnerType as PageOwnerType,
      currency: artwork?.priceCurrency!,
      order_id: order.internalID,
      flow: AnalyticsSchema.Flow.MakeOffer,
      offer,
      amount,
    }

    tracking.trackEvent(trackingData)
  }

  const asCurrency = (value: number) =>
    value?.toLocaleString("en-US", {
      currency: artwork?.priceCurrency!,
      minimumFractionDigits: 2,
      style: "currency",
    })

  const [customValue, setCustomValue] = useState<number>()
  useEffect(() => {
    customValue && onChange(customValue)
    // TODO: move this call if necessary once the feature is implemented
    if (toggle && customValue && customValue < priceOptions[0]?.value!) {
      tracking.trackEvent({
        action_type: AnalyticsSchema.ActionType.ViewedOfferTooLow,
        flow: AnalyticsSchema.Flow.MakeOffer,
        order_id: order.internalID,
      })
    }
  }, [customValue, onChange])

  const [toggle, setToggle] = useState(false)

  const listPrice = artwork?.listPrice
  const minPriceRange = listPrice?.minPrice?.major
  const maxPriceRange = listPrice?.maxPrice?.major
  const midPriceRange = (Number(minPriceRange) + Number(maxPriceRange)) / 2

  const getRangeOptions = () => {
    const getRangeDetails = [
      { value: minPriceRange, description: "Low-end of range" },
      { value: midPriceRange, description: "Midpoint" },
      { value: maxPriceRange, description: "Top-end of range" },
    ]
    return getRangeDetails.map(rangePrice => ({
      value: rangePrice.value!,
      description: rangePrice.description,
    }))
  }

  const getPercentageOptions = () => {
    return [0.2, 0.15, 0.1].map(pricePercentage => {
      if (listPrice?.major) {
        return {
          value: listPrice.major * (1 - pricePercentage),
          description: `${pricePercentage * 100}% below the list price`,
        }
      }
      return
    })
  }

  const priceOptions = artwork?.isPriceRange
    ? getRangeOptions()
    : getPercentageOptions()

  // TODO: add call bellow when the feature is implemented
  // trackClick("We recommend changing your offer", priceOptions[0]?.value!)

  const { scrollTo } = useScrollTo({
    selectorOrRef: "#scrollTo--price-option-custom",
    behavior: "smooth",
  })

  return (
    <RadioGroup>
      {compact(priceOptions)
        .map(({ value, description }) => (
          <BorderedRadio
            value={`price-option-${value}`}
            label={appendCurrencySymbol(
              asCurrency(value!),
              artwork?.priceCurrency!
            )}
            onSelect={() => {
              onChange(value!)
              setToggle(false)
              trackClick(description, value)
            }}
            key={`price-option-${value}`}
          >
            <Text variant="sm" color="black60">
              {description}
            </Text>
          </BorderedRadio>
        ))
        .concat(
          <BorderedRadio
            id="scrollTo--price-option-custom"
            value="custom"
            label="Different amount"
            onSelect={() => {
              customValue && onChange(customValue)
              setToggle(true)
              trackClick("Different amount", 0)
            }}
            key="price-option-custom"
          >
            {toggle && (
              <Flex flexDirection="column" marginTop={2}>
                <OfferInput
                  id="OfferForm_offerValue"
                  showError={showError}
                  onChange={setCustomValue}
                  onFocus={() => {
                    onFocus()
                    scrollTo()
                  }}
                  noTitle
                />
              </Flex>
            )}
          </BorderedRadio>
        )}
    </RadioGroup>
  )
}

export const PriceOptionsFragmentContainer = createFragmentContainer(
  PriceOptions,
  {
    artwork: graphql`
      fragment PriceOptions_artwork on Artwork {
        priceCurrency
        isPriceRange
        listPrice {
          ... on Money {
            major
          }
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
    `,
    order: graphql`
      fragment PriceOptions_order on CommerceOrder {
        internalID
      }
    `,
  }
)
