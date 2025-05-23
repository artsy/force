import { Box, Flex, Range, Spacer, Text, usePrevious } from "@artsy/palette"
import { NumericInput } from "Components/NumericInput"
import { convertToFilterFormatRange } from "Components/PriceRange/Utils/convertToFilterFormatRange"
import { getPriceValue } from "Components/PriceRange/Utils/getPriceValue"
import { parsePriceRange } from "Components/PriceRange/Utils/parsePriceRange"
import { parseSliderPriceRange } from "Components/PriceRange/Utils/parseSliderPriceRange"
import {
  type CustomRange,
  DEFAULT_RANGE,
} from "Components/PriceRange/constants"
import { type FC, type FormEvent, useEffect, useState } from "react"
import { useDebouncedCallback } from "use-debounce"
import { Histogram, type HistogramBarEntity } from "./Histogram"

interface PriceRangeProps {
  priceRange: string
  onUpdate?: (range: CustomRange) => void
  onDebouncedUpdate?: (range: CustomRange) => void
  bars?: HistogramBarEntity[]
}

export const PriceRange: FC<React.PropsWithChildren<PriceRangeProps>> = ({
  priceRange,
  onUpdate,
  onDebouncedUpdate,
  bars,
}) => {
  const [localRange, setLocalRange] = useState(parsePriceRange(priceRange))

  const previousPriceRange = usePrevious(priceRange)

  const sliderRange = parseSliderPriceRange(localRange)

  const [minValue, maxValue] = localRange
  const [defaultMinValue, defaultMaxValue] = DEFAULT_RANGE

  useEffect(() => {
    const shouldUpdate = previousPriceRange !== priceRange
    if (!shouldUpdate) return
    const nextRange = parsePriceRange(priceRange)
    setLocalRange(nextRange)
  }, [localRange, previousPriceRange, priceRange])

  const handleDebouncedUpdate = useDebouncedCallback(
    (nextRange: CustomRange) => {
      onDebouncedUpdate?.(nextRange)
    },
    250,
  )

  const updateRange = (nextRange: CustomRange) => {
    setLocalRange(nextRange)
    onUpdate?.(nextRange)
    handleDebouncedUpdate(nextRange)
  }

  const handleSliderValueChange = (range: number[]) => {
    const convertedRange = convertToFilterFormatRange(range)
    updateRange(convertedRange)
  }

  const handleInputValueChange =
    (changedIndex: number) =>
    ({ currentTarget: { value } }: FormEvent<HTMLInputElement>) => {
      const nextRange = localRange.map((rangeValue, index) => {
        if (index === changedIndex && (value === "" || value === "0")) {
          return "*"
        }

        if (index === changedIndex) {
          return Number.parseInt(value, 10)
        }

        return rangeValue
      })

      updateRange(nextRange)
    }

  return (
    <>
      {!!bars && !!shouldDisplayHistogram(bars) && (
        <Histogram
          bars={bars}
          selectedRange={[sliderRange[0], sliderRange[1]]}
          data-testid="PriceFilterHistogram"
        />
      )}

      <Spacer y={shouldDisplayHistogram(bars) ? 2 : 4} />

      <Range
        min={defaultMinValue}
        max={defaultMaxValue}
        value={sliderRange}
        onChange={handleSliderValueChange}
        step={100}
        ariaLabels={["Min price", "Max price"]}
      />

      <Flex justifyContent="space-between" mt={1}>
        <Text variant="xs" color="mono60">
          ${defaultMinValue}
        </Text>

        <Text variant="xs" color="mono60">
          ${defaultMaxValue}+
        </Text>
      </Flex>

      <Spacer y={2} />

      <Flex>
        <Box flex={1}>
          <NumericInput
            title="Min"
            label="$USD"
            name="price_min"
            min="0"
            step="100"
            aria-label="Min price"
            value={getPriceValue(minValue)}
            onChange={handleInputValueChange(0)}
          />
        </Box>

        <Spacer x={2} />

        <Box flex={1}>
          <NumericInput
            title="Max"
            label="$USD"
            name="price_max"
            min="0"
            step="100"
            aria-label="Max price"
            value={getPriceValue(maxValue)}
            onChange={handleInputValueChange(1)}
          />
        </Box>
      </Flex>
    </>
  )
}

const isAllBarsEmpty = (bars: HistogramBarEntity[]) => {
  return bars.every(bar => bar.count === 0)
}

const shouldDisplayHistogram = (bars?: HistogramBarEntity[]) => {
  if (!bars) return false
  return bars.length > 0 && !isAllBarsEmpty(bars)
}
