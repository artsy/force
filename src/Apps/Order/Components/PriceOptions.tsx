import {
  ActionType,
  type ClickedOfferOption,
  type PageOwnerType,
} from "@artsy/cohesion"
import * as DeprecatedAnalyticsSchema from "@artsy/cohesion/dist/DeprecatedSchema"
import { BorderedRadio, Flex, RadioGroup, Text } from "@artsy/palette"
import { OfferInput } from "Apps/Order/Components/OfferInput"
import { appendCurrencySymbol } from "Apps/Order/Utils/currencyUtils"
import {
  getInitialOfferState,
  getOfferPriceOptions,
} from "Apps/Order/Utils/offerUtils"
import { useAnalyticsContext } from "System/Hooks/useAnalyticsContext"
import { Device, useDeviceDetection } from "Utils/Hooks/useDeviceDetection"
import { Jump, useJump } from "Utils/Hooks/useJump"
import type { PriceOptions_artwork$data } from "__generated__/PriceOptions_artwork.graphql"
import type { PriceOptions_order$data } from "__generated__/PriceOptions_order.graphql"
import { compact } from "lodash"
import { useEffect, useState } from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { useTracking } from "react-tracking"
import { MinPriceWarning } from "./MinPriceWarning"

export interface PriceOptionsProps {
  onChange: (value: number) => void
  onFocus: () => void
  showError?: boolean
  artwork: PriceOptions_artwork$data | null | undefined
  order: PriceOptions_order$data
}

export const PriceOptions: React.FC<
  React.PropsWithChildren<PriceOptionsProps>
> = ({ onChange, onFocus, showError, artwork, order }) => {
  const tracking = useTracking()
  const { contextPageOwnerId, contextPageOwnerType } = useAnalyticsContext()

  const listPrice = artwork?.listPrice
  const orderPrice = Number.parseFloat(
    order.lineItems?.edges?.[0]?.node?.listPrice || "0",
  )
  const formattedOrderPrice: PriceOptions_artwork$data["listPrice"] = {
    major: orderPrice,
  }
  const isPartnerOfferOrder = order.source === "partner_offer"

  const priceOptions = getOfferPriceOptions(
    isPartnerOfferOrder ? formattedOrderPrice : listPrice,
    artwork?.isPriceRange,
    isPartnerOfferOrder,
  )
  const { lastOffer, selectedPriceOption, selectedPriceValue } =
    getInitialOfferState(
      priceOptions,
      Number(order?.myLastOffer?.amountCents || 0) / 100,
    )
  const { device } = useDeviceDetection()

  const [customValue, setCustomValue] = useState<number | undefined>(lastOffer)
  const [toggle, setToggle] = useState(!!lastOffer)
  const [selectedRadio, setSelectedRadio] = useState<string | undefined>(
    selectedPriceOption,
  )

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    if (lastOffer) {
      onChange(lastOffer)
    } else {
      onChange(selectedPriceValue!)
    }
  }, [])

  useEffect(() => {
    if (toggle) trackClick("Different amount", 0)
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
      artwork?.priceCurrency!,
    )

  const minPrice = priceOptions[2]?.value!

  const { jumpTo } = useJump()

  return (
    <>
      <Jump id="offer-value-title">
        <Text variant="lg-display" color={showError ? "red100" : undefined}>
          Select an option
        </Text>
      </Jump>
      <Text variant="xs" mt={4} mb={1} color={showError ? "red100" : undefined}>
        Your offer
      </Text>
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
              error={showError}
              key={key}
            >
              <Text variant="sm" color="mono60">
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
            </BorderedRadio>,
          )}
      </RadioGroup>
    </>
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
  },
)
