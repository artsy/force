import { FC, useEffect, useState, useMemo, FormEvent } from "react"
import { Box, Flex, LabeledInput, Spacer, Text, Range } from "@artsy/palette"
import {
  Aggregations,
  SelectedFiltersCountsLabels,
  useArtworkFilterContext,
  useCurrentlySelectedFilters,
} from "../ArtworkFilterContext"
import styled from "styled-components"
import { FilterExpandable } from "./FilterExpandable"
import { isCustomValue } from "./Utils/isCustomValue"
import { useFilterLabelCountByKey } from "../Utils/useFilterLabelCountByKey"
import { debounce, sortBy } from "lodash"
import { Histogram, HistogramBarEntity } from "./Histogram"

type CustomRange = (number | "*")[]

// Constants
const DEBOUNCE_DELAY = 300
const DEFAULT_CUSTOM_RANGE: CustomRange = ["*", "*"]
const DEFAULT_PRICE_RANGE = "*-*"
const DEFAULT_RANGE = [0, 50000]

export interface PriceRangeFilterNewProps {
  expanded?: boolean
}

export const PriceRangeFilterNew: FC<PriceRangeFilterNewProps> = ({
  expanded,
}) => {
  const {
    shouldStageFilterChanges,
    aggregations,
    setFilter,
  } = useArtworkFilterContext()
  const { priceRange, reset } = useCurrentlySelectedFilters()
  const [range, setRange] = useState(parseRange(priceRange))
  const sliderRange = parseSliderRange(range)
  const [minValue, maxValue] = range
  const [defaultMinValue, defaultMaxValue] = DEFAULT_RANGE
  const bars = getBarsFromAggregations(aggregations)
  const isAllBarsEmpty = bars.every(bar => bar.count === 0)

  const filtersCount = useFilterLabelCountByKey(
    SelectedFiltersCountsLabels.priceRange
  )
  const label = `Price${filtersCount}`
  const hasSelection = priceRange && isCustomValue(priceRange)

  const setFilterDobounced = useMemo(
    () => debounce(setFilter, DEBOUNCE_DELAY),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [shouldStageFilterChanges]
  )

  useEffect(() => {
    // if price filter or filters state is being reset, then also clear local input state
    if (reset || priceRange === DEFAULT_PRICE_RANGE) {
      setRange(DEFAULT_CUSTOM_RANGE)
    }
  }, [reset, priceRange])

  const updateRange = (updatedRange: CustomRange) => {
    setRange(updatedRange)
    setFilterDobounced("priceRange", updatedRange.join("-"))
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

  return (
    <FilterExpandable label={label} expanded={hasSelection || expanded}>
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

      <Spacer y={2} />

      {bars.length > 0 && !isAllBarsEmpty ? (
        <Histogram
          bars={bars}
          selectedRange={[sliderRange[0], sliderRange[1]]}
          data-testid="PriceFilterHistogram"
        />
      ) : null}

      <Spacer y={2} />

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
    </FilterExpandable>
  )
}

// Disables arrows in numeric inputs
export const NumericInput = styled(LabeledInput).attrs({ type: "number" })`
  /* Chrome, Safari, Edge, Opera */
  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  /* Firefox */
  input[type="number"] {
    -moz-appearance: textfield;
  }
`

export const parseRange = (range: string = DEFAULT_PRICE_RANGE) => {
  return range.split("-").map(s => {
    if (s === "*") return s
    return parseInt(s, 10)
  })
}

const parseSliderRange = (range: CustomRange) => {
  return range.map((value, index) => {
    if (value === "*") {
      return DEFAULT_RANGE[index]
    }

    return value as number
  })
}

export const convertToFilterFormatRange = (range: number[]) => {
  return range.map((value, index) => {
    if (value === DEFAULT_RANGE[index]) {
      return "*"
    }

    return value
  })
}

export const getValue = (value: CustomRange[number]) => {
  return value === "*" || value === 0 ? "" : value
}

export const getBarsFromAggregations = (aggregations?: Aggregations) => {
  const aggregation = aggregations?.find(aggregation => {
    return aggregation.slice === "SIMPLE_PRICE_HISTOGRAM"
  })
  const counts = aggregation?.counts ?? []
  const bars: HistogramBarEntity[] = counts.map(entity => ({
    count: entity.count,
    value: Number(entity.value),
  }))
  const sortedBars = sortBy(bars, "value")

  return sortedBars
}
