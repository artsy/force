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
import {
  getInitialOfferState,
  getOfferPriceOptions,
} from "Apps/Order/Utils/offerUtils"

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

  const listPrice = artwork?.listPrice
  const priceOptions = getOfferPriceOptions(listPrice, artwork?.isPriceRange)
  const {
    customOffer,
    selectedPriceOption,
    selectedPriceValue,
  } = getInitialOfferState(
    priceOptions,
    Number(order?.myLastOffer?.amountCents || 0) / 100
  )

  const [customValue, setCustomValue] = useState<number | undefined>(
    customOffer
  )
  const [toggle, setToggle] = useState(!!customOffer)
  const [selectedRadio, setSelectedRadio] = useState<string>(
    selectedPriceOption || "price-option-0"
  )

  useEffect(() => {
    if (customOffer) {
      onChange(customOffer)
    } else {
      onChange(selectedPriceValue!)
    }

    // need this to run only once
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

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
              onChange(value)
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
                    value={customValue}
                    onChange={setCustomValue}
                    onFocus={() => {
                      onFocus()
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
        ... on CommerceOfferOrder {
          myLastOffer {
            amountCents
          }
        }
      }
    `,
  }
)
