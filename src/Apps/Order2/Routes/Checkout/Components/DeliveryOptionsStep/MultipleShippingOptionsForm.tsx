import { Flex, Radio, RadioGroup, Text } from "@artsy/palette"
import type { Order2DeliveryOptionsForm_order$data } from "__generated__/Order2DeliveryOptionsForm_order.graphql"
import {
  deliveryOptionLabel,
  deliveryOptionTimeEstimate,
} from "Apps/Order2/Routes/Checkout/Components/DeliveryOptionsStep/utils"
import { useState } from "react"

type DeliveryOption =
  Order2DeliveryOptionsForm_order$data["fulfillmentOptions"][number]

interface MultipleShippingOptionsFormProps {
  options: DeliveryOption[]
  onSelectOption: (option: DeliveryOption) => Promise<boolean>
}

export const MultipleShippingOptionsForm = ({
  options,
  onSelectOption,
}: MultipleShippingOptionsFormProps) => {
  const defaultOption = options.find(option => option.selected) || options[0]
  const [selectedOption, setSelectedOption] = useState(defaultOption)

  return (
    <RadioGroup
      flexDirection="column"
      defaultValue={defaultOption}
      onSelect={async option => {
        const previous = selectedOption
        setSelectedOption(option)
        const success = await onSelectOption(option)
        if (!success) {
          setSelectedOption(previous)
        }
      }}
    >
      {options.map(option => {
        const label = deliveryOptionLabel(option.type, option.amount?.minor)
        const timeEstimate = deliveryOptionTimeEstimate(option.type)
        const [prefix, timeRange] = timeEstimate || []
        const isSelected = selectedOption?.type === option.type

        return (
          <Radio
            key={option.type}
            flex={1}
            backgroundColor={isSelected ? "mono5" : "mono0"}
            p={1}
            label={
              <Flex justifyContent="space-between" width="100%">
                <Text variant="sm-display">{label}</Text>
                <Text variant="sm">{option.amount?.display}</Text>
              </Flex>
            }
            value={option}
          >
            <Flex width="100%">
              <Flex flexDirection="column">
                {timeEstimate && (
                  <Text variant="sm" color={isSelected ? "mono100" : "mono60"}>
                    {prefix} <strong>{timeRange}</strong>
                  </Text>
                )}

                {option.type === "ARTSY_WHITE_GLOVE" && isSelected && (
                  <Text variant="sm" color={isSelected ? "mono100" : "mono60"}>
                    Includes custom packing, transportation on a fine art
                    shuttle, and in-home delivery
                  </Text>
                )}
              </Flex>
            </Flex>
          </Radio>
        )
      })}
    </RadioGroup>
  )
}
