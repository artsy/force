import {
  Radio,
  Box,
  Flex,
  RadioGroup,
  Spacer,
  Text,
  Button,
  TextArea,
} from "@artsy/palette"
import { OfferInput } from "Apps/Order/Components/OfferInput"
import { appendCurrencySymbol } from "Apps/Order/Utils/currencyUtils"
import type { OfferFormComponentProps } from "Apps/Order2/Routes/Checkout/Components/OfferStep/types"
import type { Order2ExactPriceOfferForm_order$key } from "__generated__/Order2ExactPriceOfferForm_order.graphql"
import { compact } from "lodash"
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

  // Get the list price from the artwork
  const artwork = orderData.lineItems?.[0]?.artwork
  const listPriceMajor =
    artwork?.listPrice?.__typename === "Money"
      ? artwork.listPrice.major
      : artwork?.listPrice?.__typename === "PriceRange"
        ? artwork.listPrice.maxPrice?.major
        : null

  // Generate price options based on list price
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

  const hasPrice = !!listPriceMajor
  const shouldShowPriceOptions = hasPrice

  const priceNote = Boolean(artwork?.price) && (
    <Text my={1} variant="sm" color="mono60">
      List price: {appendCurrencySymbol(artwork?.price, orderData.currencyCode)}
    </Text>
  )

  return (
    <>
      {/* Offer Amount Section */}
      <Box>
        {shouldShowPriceOptions ? (
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
                      onOfferValueChange(optionValue)
                      setShowCustomInput(false)
                      setCustomValue(undefined)
                      onOfferInputFocus?.()
                    }}
                    error={
                      formIsDirty &&
                      (offerValue <= 0 || offerValue === undefined)
                    }
                    key={key}
                  >
                    <Spacer y={1} />
                    <Text variant="sm" color="mono60">
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
                      onOfferValueChange(customValue || 0)
                      !showCustomInput && setShowCustomInput(true)
                      onOfferInputFocus?.()
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
                            onOfferValueChange(value)
                          }}
                          onFocus={onOfferInputFocus}
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
            <Flex flexDirection="column">
              <OfferInput
                id="OfferForm_offerValue"
                showError={formIsDirty && offerValue <= 0}
                onChange={onOfferValueChange}
                onFocus={onOfferInputFocus}
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
