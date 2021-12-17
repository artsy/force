import { BorderedRadio, Flex, RadioGroup, Text } from "@artsy/palette"
import { useEffect, useState } from "react"
import { OfferInput } from "v2/Apps/Order/Components/OfferInput"
import { Offer_order } from "v2/__generated__/Offer_order.graphql"
import { compact } from "lodash"
import { createFragmentContainer, graphql } from "react-relay"

export interface PriceOptionsProps {
  setValue: (value: number) => void
  onFocus: () => void
  showError?: boolean
  artwork:
    | NonNullable<
        NonNullable<
          NonNullable<NonNullable<Offer_order["lineItems"]>["edges"]>[0]
        >["node"]
      >["artwork"]
    | undefined
  currency: string
}

export const PriceOptions: React.FC<PriceOptionsProps> = ({
  setValue,
  onFocus,
  showError,
  artwork,
  currency,
}) => {
  const asCurrency = (value: number) =>
    value?.toLocaleString("en-US", {
      currency,
      minimumFractionDigits: 2,
      style: "currency",
    })

  const [customValue, setCustomValue] = useState<number>()
  useEffect(() => {
    customValue && setValue(customValue)
  }, [customValue])

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
          description: `${pricePercentage * 100}% below list price`,
        }
      }
      return undefined
    })
  }

  const priceOptions = artwork?.isPriceRange
    ? getRangeOptions()
    : getPercentageOptions()

  return (
    <>
      <RadioGroup>
        {compact(priceOptions)
          .map(({ value, description }) => (
            <BorderedRadio
              value={`price-option-${value}`}
              label={asCurrency(value!)}
              onSelect={() => {
                setValue(value!)
                setToggle(false)
              }}
              key={`price-option-${value}`}
              data-test="price-options"
            >
              <Text variant="sm" color="black60">
                {description}
              </Text>
            </BorderedRadio>
          ))
          .concat(
            <BorderedRadio
              value="custom"
              label="Different amount"
              onSelect={() => {
                customValue && setValue(customValue)
                setToggle(true)
              }}
              data-test="custom"
            >
              {toggle && (
                <Flex flexDirection="column">
                  <OfferInput
                    id="OfferForm_offerValue"
                    showError={showError}
                    onChange={value => {
                      setCustomValue(value)
                    }}
                    onFocus={onFocus}
                    noTitle
                  />
                </Flex>
              )}
            </BorderedRadio>
          )}
      </RadioGroup>
    </>
  )
}

export const PriceOptionsFragmentContainer = createFragmentContainer(
  PriceOptions,
  {
    artwork: graphql`
      fragment PriceOptions_order on CommerceOrder {
        lineItems {
          edges {
            node {
              artwork {
                price
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
            }
          }
        }
      }
    `,
  }
)
