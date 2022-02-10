import { BorderedRadio, Flex, RadioGroup, Text } from "@artsy/palette"
import { useEffect, useState } from "react"
import { OfferInput } from "v2/Apps/Order/Components/OfferInput"
import { MinPriceWarning } from "./MinPriceWarning"
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
import { OfferItem, PriceRange, Price } from "../Utils/offerItemExtractor"

export interface PriceOptionsProps {
  onChange: (value: number) => void
  onFocus: () => void
  showError?: boolean
  order: PriceOptions_order
  listPrice: OfferItem["listPrice"]
  isPriceRange: boolean | null
  currency: PriceOptions_artwork["priceCurrency"]
}

export const PriceOptions: React.FC<PriceOptionsProps> = ({
  onChange,
  onFocus,
  showError,
  listPrice,
  order,
  isPriceRange,
  currency,
}) => {
  const tracking = useTracking()
  const { contextPageOwnerId, contextPageOwnerType } = useAnalyticsContext()

  const [customValue, setCustomValue] = useState<number>()
  const [toggle, setToggle] = useState(false)
  const [selectedRadio, setSelectedRadio] = useState<string>()

  useEffect(() => {
    if (!!customValue) onChange(customValue)
  }, [customValue])

  useEffect(() => {
    if (showError) {
      setSelectedRadio("price-option-custom")
      setToggle(true)
    }
  }, [showError])

  useEffect(() => {
    if (toggle) trackClick("Different amount", 0)
  }, [toggle])

  const trackClick = (offer: string, amount: number) => {
    const trackingData: ClickedOfferOption = {
      action: ActionType.clickedOfferOption,
      context_page_owner_id: contextPageOwnerId!,
      context_page_owner_type: contextPageOwnerType as PageOwnerType,
      currency: currency!,
      order_id: order.internalID,
      flow: AnalyticsSchema.Flow.MakeOffer,
      offer,
      amount,
    }
    tracking.trackEvent(trackingData)
  }

  const asCurrency = (value: number) =>
    appendCurrencySymbol(
      value?.toLocaleString("en-US", {
        currency: currency!,
        minimumFractionDigits: 2,
        style: "currency",
      }),
      currency!
    )

  const getRangeOptions = () => {
    const listPriceRange = listPrice as PriceRange
    const minPriceRange = listPriceRange?.minPrice?.major
    const maxPriceRange = listPriceRange?.maxPrice?.major
    const midPriceRange = (Number(minPriceRange) + Number(maxPriceRange)) / 2
    console.log("range", listPriceRange)
    const getRangeDetails = [
      { value: minPriceRange, description: "Low-end of range" },
      { value: midPriceRange, description: "Midpoint" },
      { value: maxPriceRange, description: "Top-end of range" },
    ]
    return getRangeDetails.map((rangePrice, idx) => ({
      key: `price-option-${idx}`,
      value: rangePrice.value!,
      description: rangePrice.description,
    }))
  }

  const getPercentageOptions = () => {
    const listPricePercentage = listPrice as Price
    return [0.2, 0.15, 0.1].map((pricePercentage, idx) => {
      if (listPricePercentage?.major) {
        return {
          key: `price-option-${idx}`,
          value: Math.round(listPrice.major * (1 - pricePercentage)),
          description: `${pricePercentage * 100}% below the list price`,
        }
      }
      return
    })
  }

  const priceOptions = isPriceRange ? getRangeOptions() : getPercentageOptions()

  const minPrice = priceOptions[0]?.value!
  console.log("check", isPriceRange)

  const selectMinPrice = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation()
    trackClick("We recommend changing your offer", minPrice)
    setSelectedRadio("price-option-0")
    setToggle(false)
    setCustomValue(undefined)
    onChange(minPrice)
  }

  const { scrollTo } = useScrollTo({
    selectorOrRef: "#scrollTo--price-option-custom",
    behavior: "smooth",
  })

  return (
    <RadioGroup onSelect={setSelectedRadio} defaultValue={selectedRadio}>
      {compact(priceOptions)
        .map(({ value, description, key }) => (
          <BorderedRadio
            value={key}
            label={asCurrency(value!) as string}
            onSelect={() => {
              onChange(value!)
              setToggle(false)
              setCustomValue(undefined)
              trackClick(description, value)
            }}
            key={key}
          >
            <Text variant="sm" color="black60">
              {description}
            </Text>
          </BorderedRadio>
        ))
        .concat(
          <BorderedRadio
            id="scrollTo--price-option-custom"
            value="price-option-custom"
            label="Different amount"
            error={showError}
            onSelect={() => {
              customValue && onChange(customValue)
              !toggle && setToggle(true)
            }}
            key="price-option-custom"
          >
            {toggle && (
              <Flex flexDirection="column" mt={2}>
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
                {(!customValue || customValue < minPrice) && (
                  <MinPriceWarning
                    isPriceRange={!!isPriceRange}
                    onClick={selectMinPrice}
                    minPrice={asCurrency(minPrice) as string}
                    orderID={order.internalID}
                  />
                )}
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
      }
    `,
    order: graphql`
      fragment PriceOptions_order on CommerceOrder {
        internalID
      }
    `,
  }
)
