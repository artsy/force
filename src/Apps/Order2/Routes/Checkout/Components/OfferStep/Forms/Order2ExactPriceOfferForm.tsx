import {
  Box,
  Button,
  Flex,
  Radio,
  RadioGroup,
  Spacer,
  Text,
  TextArea,
} from "@artsy/palette"
import { OfferInput } from "Apps/Order/Components/OfferInput"
import { appendCurrencySymbol } from "Apps/Order/Utils/currencyUtils"
import type { OfferFormComponentProps } from "Apps/Order2/Routes/Checkout/Components/OfferStep/types"
import type { Order2ExactPriceOfferForm_order$key } from "__generated__/Order2ExactPriceOfferForm_order.graphql"
import { useEffect, useState } from "react"
import { graphql, useFragment } from "react-relay"

interface PriceOption {
  key: string
  value: number
  description: string
}

interface Order2ExactPriceOfferFormProps extends OfferFormComponentProps {
  order: Order2ExactPriceOfferForm_order$key
}

export const Order2ExactPriceOfferForm: React.FC<
  Order2ExactPriceOfferFormProps
> = ({
  order,
  offerValue,
  offerNoteValue,
  formIsDirty,
  isSubmittingOffer,
  onOfferValueChange,
  onOfferNoteChange,
  onOfferInputFocus,
  onContinueButtonPressed,
}) => {
  const orderData = useFragment(FRAGMENT, order)
  const artwork = orderData.lineItems?.[0]?.artwork
  const listPriceMajor =
    artwork?.listPrice?.__typename === "Money"
      ? artwork.listPrice.major
      : artwork?.listPrice?.__typename === "PriceRange"
        ? artwork.listPrice.maxPrice?.major
        : null

  const priceOptions: PriceOption[] = listPriceMajor
    ? [
        {
          key: "price-option-max",
          value: Math.round(listPriceMajor),
          description: "List price",
        },
        {
          key: "price-option-mid",
          value: Math.round(listPriceMajor * 0.9), // 10% below
          description: "10% below list price",
        },
        {
          key: "price-option-min",
          value: Math.round(listPriceMajor * 0.8), // 20% below
          description: "20% below list price",
        },
      ]
    : []

  const getInitialState = () => {
    if (!offerValue)
      return {
        selectedRadio: undefined,
        customValue: undefined,
      }

    const matchingOption = priceOptions.find(
      option => option.value === offerValue,
    )
    if (matchingOption) {
      return {
        selectedRadio: matchingOption.key,
        customValue: undefined,
      }
    } else {
      return {
        selectedRadio: "price-option-custom",
        customValue: offerValue,
      }
    }
  }

  const initialState = getInitialState()
  const [selectedRadio, setSelectedRadio] = useState<string | undefined>(
    initialState.selectedRadio,
  )
  const [customValue, setCustomValue] = useState<number | undefined>(
    initialState.customValue,
  )

  // Update parent component when custom values change
  useEffect(() => {
    if (selectedRadio === "price-option-custom") {
      onOfferValueChange(customValue || 0)
    }
  }, [customValue, selectedRadio, onOfferValueChange])

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

  const allPriceOptions = [
    ...priceOptions,
    {
      key: "price-option-custom",
      value: customValue || 0,
      description: "Other amount",
    },
  ]

  return (
    <>
      {/* Offer Amount Section */}
      <Box>
        <Box py={2} px={[2, 4]}>
          <RadioGroup onSelect={setSelectedRadio} defaultValue={selectedRadio}>
            {allPriceOptions.map(({ key, value, description }) => {
              const isCustom = key === "price-option-custom"
              const showCustomInput = isCustom && selectedRadio === key

              return (
                <Radio
                  key={key}
                  value={key}
                  label={isCustom ? description : formatCurrency(value)}
                  onSelect={() => {
                    setSelectedRadio(key)
                    onOfferValueChange(value)
                    if (!isCustom) {
                      setCustomValue(undefined)
                    }
                    onOfferInputFocus?.()
                  }}
                >
                  {!isCustom && (
                    <>
                      <Spacer y={1} />
                      <Text variant="xs" color="mono60">
                        {description}
                      </Text>
                      <Spacer y={4} />
                    </>
                  )}

                  {showCustomInput && (
                    <Flex flexDirection="column" mt={2}>
                      <OfferInput
                        id="OfferForm_customOfferValue"
                        showError={formIsDirty && offerValue <= 0}
                        onChange={value => {
                          setCustomValue(value)
                          onOfferValueChange(value)
                        }}
                        onFocus={onOfferInputFocus}
                        value={customValue || 0}
                      />
                    </Flex>
                  )}
                </Radio>
              )
            })}
          </RadioGroup>
        </Box>
      </Box>

      <Spacer y={2} />

      {/* Offer Note Section */}
      <Box py={2} px={[2, 4]}>
        <Flex flexDirection="column">
          <Text
            variant={["sm-display", "md"]}
            fontWeight={["bold", "normal"]}
            color="mono100"
          >
            Offer note
          </Text>
          <Text variant={["xs", "xs", "sm"]} color="mono100">
            Additional context to help the gallery evaluate your offer.
          </Text>

          <TextArea
            title="Note (recommended)"
            maxLength={1000}
            placeholder="Share what draws you to this work or artist, or add any context about your offer"
            onChange={onOfferNoteChange}
            value={offerNoteValue.value}
          />

          <Spacer y={4} />
          <Button
            variant="primaryBlack"
            width="100%"
            onClick={onContinueButtonPressed}
            loading={isSubmittingOffer}
            disabled={isSubmittingOffer}
          >
            Save and Continue
          </Button>
        </Flex>
      </Box>
    </>
  )
}

const FRAGMENT = graphql`
  fragment Order2ExactPriceOfferForm_order on Order {
    currencyCode
    lineItems {
      artwork {
        price
        listPrice {
          __typename
          ... on Money {
            major
          }
          ... on PriceRange {
            maxPrice {
              major
            }
          }
        }
      }
    }
  }
`
