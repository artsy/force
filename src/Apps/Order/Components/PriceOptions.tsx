import * as DeprecatedAnalyticsSchema from "@artsy/cohesion/dist/DeprecatedSchema"
import { BorderedRadio, Flex, RadioGroup, Text } from "@artsy/palette"
import { useEffect, useState } from "react"
import { OfferInput } from "Apps/Order/Components/OfferInput"
import { MinPriceWarning } from "./MinPriceWarning"
import { compact } from "lodash"
import { createFragmentContainer, graphql } from "react-relay"
import { useAnalyticsContext } from "System/Hooks/useAnalyticsContext"
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

  const listPrice = artwork?.listPrice
  const orderPrice = parseFloat(
    order.lineItems?.edges?.[0]?.node?.listPrice || "0"
  )
  const formattedOrderPrice: PriceOptions_artwork$data["listPrice"] = {
    major: orderPrice,
  }
  const isPartnerOfferOrder = order.source === "partner_offer"

  const priceOptions = getOfferPriceOptions(
    isPartnerOfferOrder ? formattedOrderPrice : listPrice,
    artwork?.isPriceRange,
    isPartnerOfferOrder
  )
  const {
    lastOffer,
    selectedPriceOption,
    selectedPriceValue,
  } = getInitialOfferState(
    priceOptions,
    Number(order?.myLastOffer?.amountCents || 0) / 100
  )
  const { device } = useDeviceDetection()

  const [customValue, setCustomValue] = useState<number | undefined>(lastOffer)
  const [toggle, setToggle] = useState(!!lastOffer)
  const [selectedRadio, setSelectedRadio] = useState<string>(
    selectedPriceOption || "price-option-max"
  )

  useEffect(() => {
    if (lastOffer) {
      onChange(lastOffer)
    } else {
      onChange(selectedPriceValue!)
    }

    // need this to run only once
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

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
                    onChange={event => {
                      setCustomValue(event)
                      onChange(event)
                    }}
                    onFocus={() => {
                      onFocus()
                      if (device !== Device.iPhone)
                        jumpTo("price-option-custom")
                    }}
                    noTitle
                  />
                  {(!customValue || customValue < minPrice) &&
                    !isPartnerOfferOrder && (
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
        source
        lineItems {
          edges {
            node {
              listPrice(format: "%v", thousand: "")
            }
          }
        }
        ... on CommerceOfferOrder {
          myLastOffer {
            amountCents
          }
        }
      }
    `,
  }
)
