import { OfferInput } from "Apps/Order/Components/OfferInput"
import { appendCurrencySymbol } from "Apps/Order/Utils/currencyUtils"
import type { OfferFormProps } from "Apps/Order2/Routes/Checkout/Components/OfferStep/types"
import { Flex, Radio, RadioGroup, Spacer, Text } from "@artsy/palette"
import type { Order2ExactPriceOfferForm_order$key } from "__generated__/Order2ExactPriceOfferForm_order.graphql"
import { useEffect, useState } from "react"
import { graphql, useFragment } from "react-relay"

interface PriceOption {
  key: string
  value: number
  description: string
}

interface Order2ExactPriceOfferFormProps extends OfferFormProps {
  order: Order2ExactPriceOfferForm_order$key
}

export const Order2ExactPriceOfferForm: React.FC<
  Order2ExactPriceOfferFormProps
> = ({
  order,
  offerValue,
  formIsDirty,
  onOfferValueChange,
  onOfferOptionSelected,
}) => {
  const orderData = useFragment(FRAGMENT, order)

  const listPriceMajor = orderData.lineItems[0]?.listPrice?.major

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

  const allPriceOptions = [
    ...priceOptions,
    {
      key: "price-option-custom",
      value: customValue || 0,
      description: "Other amount",
    },
  ]

  return (
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
              if (!isCustom) {
                setCustomValue(undefined)
                onOfferOptionSelected(value, description)
              }
            }}
          >
            {!isCustom && (
              <>
                <Spacer y={1} />
                <Text variant="sm-display" color="mono60">
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
                  }}
                  onBlur={() => {
                    if (customValue !== undefined) {
                      onOfferOptionSelected(customValue, description)
                    }
                  }}
                  value={customValue || 0}
                />
              </Flex>
            )}
          </Radio>
        )
      })}
    </RadioGroup>
  )
}

const FRAGMENT = graphql`
  fragment Order2ExactPriceOfferForm_order on Order {
    currencyCode
    lineItems {
      listPrice {
        ... on Money {
          major
        }
      }
    }
  }
`
