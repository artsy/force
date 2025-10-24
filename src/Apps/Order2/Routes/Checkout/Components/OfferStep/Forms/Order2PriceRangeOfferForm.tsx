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
import type { Order2PriceRangeOfferForm_order$key } from "__generated__/Order2PriceRangeOfferForm_order.graphql"
import { compact } from "lodash"
import { useEffect, useState } from "react"
import { graphql, useFragment } from "react-relay"

interface PriceOption {
  key: string
  value: number
  description: string
}

interface Order2PriceRangeOfferFormProps extends OfferFormComponentProps {
  order: Order2PriceRangeOfferForm_order$key
}

export const Order2PriceRangeOfferForm: React.FC<
  Order2PriceRangeOfferFormProps
> = ({
  order,
  offerValue,
  offerNoteValue,
  formIsDirty,
  isSubmittingOffer,
  onOfferValueChange,
  onOfferOptionSelected,
  onOfferNoteChange,
  onContinueButtonPressed,
}) => {
  const orderData = useFragment(FRAGMENT, order)
  const artwork = orderData.lineItems?.[0]?.artwork
  const listPrice = artwork?.listPrice

  const getRangeOptions = (): PriceOption[] => {
    if (listPrice?.__typename !== "PriceRange") {
      return []
    }

    const minPriceRange = listPrice.minPrice?.major
    const maxPriceRange = listPrice.maxPrice?.major

    if (!minPriceRange || !maxPriceRange) {
      return []
    }

    const midPriceRange = Math.round((minPriceRange + maxPriceRange) / 2)

    return [
      {
        key: "price-option-max",
        value: Math.round(maxPriceRange),
        description: "Top-end of range",
      },
      {
        key: "price-option-mid",
        value: midPriceRange,
        description: "Midpoint",
      },
      {
        key: "price-option-min",
        value: Math.round(minPriceRange),
        description: "Low-end of range",
      },
    ]
  }

  const priceOptions = getRangeOptions()

  // Find initial selected option based on current value
  const getInitialState = () => {
    if (!offerValue)
      return {
        selectedRadio: undefined,
        customValue: undefined,
        showCustomInput: false,
      }

    const matchingOption = priceOptions.find(
      option => option.value === offerValue,
    )
    if (matchingOption) {
      return {
        selectedRadio: matchingOption.key,
        customValue: undefined,
        showCustomInput: false,
      }
    } else {
      return {
        selectedRadio: "price-option-custom",
        customValue: offerValue,
        showCustomInput: true,
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
  const [showCustomInput, setShowCustomInput] = useState(
    initialState.showCustomInput,
  )

  // Update parent component state when custom values change
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

  const hasPriceRange = priceOptions.length > 0

  const priceNote = Boolean(artwork?.price) && (
    <Text my={1} variant="sm" color="mono60">
      Price range:{" "}
      {appendCurrencySymbol(artwork?.price, orderData.currencyCode)}
    </Text>
  )

  return (
    <>
      {/* Offer Amount Section */}
      <Box>
        {hasPriceRange ? (
          <Box py={2} px={[2, 4]}>
            <RadioGroup
              onSelect={setSelectedRadio}
              defaultValue={selectedRadio}
            >
              {compact(priceOptions)
                .map(({ value: optionValue, description, key }) => (
                  <Radio
                    value={key}
                    label={formatCurrency(optionValue)}
                    onSelect={() => {
                      onOfferOptionSelected(optionValue, description)
                      setShowCustomInput(false)
                      setCustomValue(undefined)
                    }}
                    error={
                      formIsDirty &&
                      (offerValue <= 0 || offerValue === undefined)
                    }
                    key={key}
                  >
                    <Spacer y={1} />
                    <Text variant="xs" color="mono60">
                      {description}
                    </Text>
                    <Spacer y={4} />
                  </Radio>
                ))
                .concat([
                  <Radio
                    value="price-option-custom"
                    label="Other amount"
                    error={
                      formIsDirty &&
                      (offerValue <= 0 || offerValue === undefined)
                    }
                    onSelect={() => {
                      !showCustomInput && setShowCustomInput(true)
                    }}
                    key="price-option-custom"
                  >
                    {showCustomInput && (
                      <Flex flexDirection="column" mt={2}>
                        <OfferInput
                          id="OfferForm_customOfferValue"
                          showError={formIsDirty && offerValue <= 0}
                          onChange={value => {
                            setCustomValue(value)
                          }}
                          onBlur={() => {
                            if (customValue !== undefined) {
                              onOfferOptionSelected(customValue)
                            }
                          }}
                          value={customValue || 0}
                        />
                      </Flex>
                    )}
                  </Radio>,
                ])}
            </RadioGroup>
          </Box>
        ) : (
          <>
            <Text
              variant="lg-display"
              color={formIsDirty && offerValue <= 0 ? "red100" : undefined}
            >
              Enter your offer
            </Text>
            <Spacer y={2} />
            <Flex flexDirection="column">
              <OfferInput
                id="OfferForm_priceRangeOfferValue"
                showError={formIsDirty && offerValue <= 0}
                onChange={onOfferValueChange}
                onBlur={() => {
                  if (offerValue > 0) {
                    onOfferOptionSelected(offerValue)
                  }
                }}
                value={offerValue}
              />
            </Flex>
            {priceNote}
          </>
        )}
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
          <Text variant={["xs", "xs", "sm"]} color="mono60">
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
  fragment Order2PriceRangeOfferForm_order on Order {
    currencyCode
    lineItems {
      artwork {
        price
        isPriceRange
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
`
