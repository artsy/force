import { Box, Flex, Spacer, Text, Range, Expandable } from "@artsy/palette"
import {
  CustomRange,
  DEFAULT_CUSTOM_RANGE,
  DEFAULT_PRICE_RANGE,
  DEFAULT_RANGE,
  NumericInput,
  convertToFilterFormatRange,
  getValue,
  parseRange,
} from "Components/ArtworkFilter/ArtworkFilters/PriceRangeFilter"
import { FC, FormEvent, useEffect, useState } from "react"

interface PriceFilterProps {
  priceRange?: string
  onChange: (range: CustomRange) => void
}

export const PriceRangeFilter: FC<PriceFilterProps> = ({
  onChange,
  priceRange = DEFAULT_PRICE_RANGE,
}) => {
  const [range, setRange] = useState(parseRange(priceRange))
  const sliderRange = parseSliderRange(range)
  const [minValue, maxValue] = range
  const [defaultMinValue, defaultMaxValue] = DEFAULT_RANGE

  useEffect(() => {
    if (priceRange === DEFAULT_PRICE_RANGE) {
      setRange(DEFAULT_CUSTOM_RANGE)
    }
  }, [priceRange])

  const updateRange = (updatedRange: CustomRange) => {
    setRange(updatedRange)
    onChange(updatedRange)
  }

  const handleSliderValueChange = (range: number[]) => {
    const convertedRange = convertToFilterFormatRange(range)

    updateRange(convertedRange)
  }

  const handleInputValueChange = (changedIndex: number) => (
    event: FormEvent<HTMLInputElement>
  ) => {
    const { value } = event.currentTarget
    const updatedRange = range.map((rangeValue, index) => {
      if (index === changedIndex) {
        if (value === "" || value === "0") {
          return "*"
        }

        return parseInt(value, 10)
      }

      return rangeValue
    })

    updateRange(updatedRange)
  }

  // TODO: translations
  return (
    <Expandable
      label="Set price range you are interested in"
      expanded
      borderColor="white100"
    >
      <Flex flexDirection="column">
        <Spacer y={2} />

        <Flex>
          <Box flex={1}>
            <Text variant="xs" mb={0.5}>
              Min
            </Text>

            <NumericInput
              label="$USD"
              name="price_min"
              min="0"
              step="100"
              aria-label="Min price"
              value={getValue(minValue)}
              onChange={handleInputValueChange(0)}
            />
          </Box>

          <Spacer x={2} />

          <Box flex={1}>
            <Text variant="xs" mb={0.5}>
              Max
            </Text>

            <NumericInput
              label="$USD"
              name="price_max"
              min="0"
              step="100"
              aria-label="Max price"
              value={getValue(maxValue)}
              onChange={handleInputValueChange(1)}
            />
          </Box>
        </Flex>

        <Spacer y={4} />

        <Range
          min={defaultMinValue}
          max={defaultMaxValue}
          value={sliderRange}
          onChange={handleSliderValueChange}
          step={100}
          ariaLabels={["Min price", "Max price"]}
        />

        <Flex justifyContent="space-between" mt={1}>
          <Text variant="xs" color="black60">
            ${defaultMinValue}
          </Text>

          <Text variant="xs" color="black60">
            ${defaultMaxValue}+
          </Text>
        </Flex>
      </Flex>
    </Expandable>
  )
}

const parseSliderRange = (range: CustomRange) => {
  return range.map((value, index) => {
    if (value === "*") {
      return DEFAULT_RANGE[index]
    }

    return value as number
  })
}
