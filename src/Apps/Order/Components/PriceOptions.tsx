import * as DeprecatedAnalyticsSchema from "@artsy/cohesion/dist/DeprecatedSchema"
import { BorderedRadio, Flex, RadioGroup, Text } from "@artsy/palette"
import { useEffect, useState } from "react"
import { OfferInput } from "Apps/Order/Components/OfferInput"
import { MinPriceWarning } from "./MinPriceWarning"
import { compact } from "lodash"
import { createFragmentContainer, graphql } from "react-relay"
import { useAnalyticsContext } from "System/Analytics/AnalyticsContext"
import { ActionType, ClickedOfferOption, PageOwnerType } from "@artsy/cohesion"
import { PriceOptions_artwork$data } from "__generated__/PriceOptions_artwork.graphql"
import { PriceOptions_order$data } from "__generated__/PriceOptions_order.graphql"
import { appendCurrencySymbol } from "Apps/Order/Utils/currencyUtils"
import { useTracking } from "react-tracking"
import { Jump, useJump } from "Utils/Hooks/useJump"
import { Device, useDeviceDetection } from "Utils/Hooks/useDeviceDetection"

export interface PriceOptionsProps {
  onChange: (value: number) => void
  onFocus: () => void
  showError?: boolean
  artwork: PriceOptions_artwork$data | null | undefined
  order: PriceOptions_order$data
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
  const [customValue, setCustomValue] = useState<number>()
  const [toggle, setToggle] = useState(false)
  const [selectedRadio, setSelectedRadio] = useState<string>()
  const { device } = useDeviceDetection()
  const listPrice = artwork?.listPrice

  useEffect(() => {
    if (listPrice && !toggle && !customValue) {
      onChange(listPrice.major ?? listPrice.maxPrice?.major!)
      setSelectedRadio("price-option-0")
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [listPrice, toggle, customValue])

  useEffect(() => {
    if (!!customValue) onChange(customValue)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [customValue])

  useEffect(() => {
    if (showError) {
      setSelectedRadio("price-option-custom")
      setToggle(true)
    }
  }, [showError])

  useEffect(() => {
    if (toggle) trackClick("Different amount", 0)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [toggle])

  const trackClick = (offer: string, amount: number) => {
    const trackingData: ClickedOfferOption = {
      action: ActionType.clickedOfferOption,
      context_page_owner_id: contextPageOwnerId!,
      context_page_owner_type: contextPageOwnerType as PageOwnerType,
      currency: artwork?.priceCurrency!,
      order_id: order.internalID,
      flow: DeprecatedAnalyticsSchema.Flow.MakeOffer,
      offer,
      amount,
    }
    tracking.trackEvent(trackingData)
  }

  const asCurrency = (value: number) =>
    appendCurrencySymbol(
      value?.toLocaleString("en-US", {
        currency: artwork?.priceCurrency!,
        minimumFractionDigits: 2,
        style: "currency",
      }),
      artwork?.priceCurrency!
    )

  const getRangeOptions = () => {
    const minPriceRange = listPrice?.minPrice?.major
    const maxPriceRange = listPrice?.maxPrice?.major
    const midPriceRange = Math.round(
      (Number(minPriceRange) + Number(maxPriceRange)) / 2
    )

    const getRangeDetails = [
      {
        value: maxPriceRange,
        description: "Top-end of range (high chance of acceptance)",
      },
      {
        value: midPriceRange,
        description: "Midpoint (good chance of acceptance)",
      },
      {
        value: minPriceRange,
        description: "Low-end of range (lower chance of acceptance)",
      },
    ]

    return getRangeDetails.map((rangePrice, idx) => ({
      key: `price-option-${idx}`,
      value: rangePrice.value!,
      description: rangePrice.description,
    }))
  }

  const getPercentageOptions = () => {
    const percentageOptions = [
      { percentage: 0, description: "List price (high chance of acceptance)" },
      {
        percentage: 0.1,
        description: "10% below the list price (good chance of acceptance)",
      },
      {
        percentage: 0.2,
        description:
          "20% below the list price (substantial reduction, lower chance of acceptance)",
      },
    ]

    return percentageOptions.map((option, idx) => {
      if (listPrice?.major) {
        return {
          key: `price-option-${idx}`,
          value: Math.round(listPrice.major * (1 - option.percentage)),
          description: option.description,
        }
      }
      return
    })
  }

  const priceOptions = artwork?.isPriceRange
    ? getRangeOptions()
    : getPercentageOptions()
  const minPrice = priceOptions[2]?.value!

  const { jumpTo } = useJump()

  return (
    <RadioGroup onSelect={setSelectedRadio} defaultValue={selectedRadio}>
      {compact(priceOptions)
        .map(({ value, description, key }) => (
          <BorderedRadio
            value={key}
            label={asCurrency(value!)}
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
            value="price-option-custom"
            label="Different amount"
            error={showError}
            onSelect={() => {
              onChange(customValue || 0)
              !toggle && setToggle(true)
            }}
          >
            {toggle && (
              <Jump key="price-option-custom" id="price-option-custom">
                <Flex flexDirection="column" mt={2}>
                  <OfferInput
                    id="OfferForm_offerValue"
                    showError={showError}
                    onChange={setCustomValue}
                    onFocus={() => {
                      onFocus()
                      if (device !== Device.iPhone)
                        jumpTo("price-option-custom")
                    }}
                    noTitle
                  />
                  {(!customValue || customValue < minPrice) && (
                    <MinPriceWarning
                      isPriceRange={!!artwork?.isPriceRange}
                      minPrice={asCurrency(minPrice) as string}
                      orderID={order.internalID}
                    />
                  )}
                </Flex>
              </Jump>
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
