import { FC, useEffect, useState, useMemo, FormEvent } from "react"
import { Box, Flex, LabeledInput, Spacer, Text } from "@artsy/palette"
import {
  SelectedFiltersCountsLabels,
  useArtworkFilterContext,
  useCurrentlySelectedFilters,
} from "../ArtworkFilterContext"
import styled from "styled-components"
import { themeGet } from "@styled-system/theme-get"
import { FilterExpandable } from "./FilterExpandable"
import { isCustomValue } from "./Utils/isCustomValue"
import { useFilterLabelCountByKey } from "../Utils/useFilterLabelCountByKey"
import { Range, RANGE_DOT_SIZE } from "v2/Components/Range"
import { debounce } from "lodash"
import { BarEntity, BarChart } from "./BarChart"

type CustomRange = (number | "*")[]

// Constants
const DEBOUNCE_DELAY = 300
const DEFAULT_CUSTOM_RANGE: CustomRange = ["*", "*"]
const DEFAULT_PRICE_RANGE = "*-*"
const DEFAULT_RANGE = [0, 50000]
const BARS: BarEntity[] = [
  {
    counts: 34548,
    value: 0,
  },
  {
    counts: 35234,
    value: 2000,
  },
  {
    counts: 6153,
    value: 4000,
  },
  {
    counts: 32119,
    value: 6000,
  },
  {
    counts: 37462,
    value: 8000,
  },
  {
    counts: 1655,
    value: 10000,
  },
  {
    counts: 39325,
    value: 12000,
  },
  {
    counts: 2926,
    value: 14000,
  },
  {
    counts: 9501,
    value: 16000,
  },
  {
    counts: 48407,
    value: 18000,
  },
  {
    counts: 28957,
    value: 20000,
  },
  {
    counts: 24314,
    value: 22000,
  },
  {
    counts: 16478,
    value: 24000,
  },
  {
    counts: 28169,
    value: 26000,
  },
  {
    counts: 7767,
    value: 28000,
  },
  {
    counts: 23397,
    value: 30000,
  },
  {
    counts: 6444,
    value: 32000,
  },
  {
    counts: 18366,
    value: 34000,
  },
  {
    counts: 457,
    value: 36000,
  },
  {
    counts: 28344,
    value: 38000,
  },
  {
    counts: 35116,
    value: 40000,
  },
  {
    counts: 13476,
    value: 42000,
  },
  {
    counts: 39976,
    value: 44000,
  },
  {
    counts: 16281,
    value: 46000,
  },
  {
    counts: 38268,
    value: 48000,
  },
  {
    counts: 20844,
    value: 50000,
  },
]

export interface PriceRangeFilterNewProps {
  expanded?: boolean
}

export const PriceRangeFilterNew: FC<PriceRangeFilterNewProps> = ({
  expanded,
}) => {
  const { shouldStageFilterChanges, setFilter } = useArtworkFilterContext()
  const { priceRange, reset } = useCurrentlySelectedFilters()
  const [range, setRange] = useState(parseRange(priceRange))
  const sliderRange = parseSliderRange(range)
  const [minValue, maxValue] = range
  const [defaultMinValue, defaultMaxValue] = DEFAULT_RANGE

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
      <Flex alignItems="flex-end" mt={2}>
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

        <Spacer mx={2} />

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

      <Spacer mb={4} />

      <Box mx={[RANGE_DOT_SIZE / 2, 0]}>
        <BarChart
          bars={BARS}
          selectedRange={[sliderRange[0], sliderRange[1]]}
        />

        <Spacer mb={4} />

        <Range
          min={defaultMinValue}
          max={defaultMaxValue}
          value={sliderRange}
          allowCross={false}
          onChange={handleSliderValueChange}
          ariaLabelGroupForHandles={[
            "Min price slider handle",
            "Max price slider handle",
          ]}
        />

        <Flex justifyContent="space-between" mt={2}>
          <Text variant="xs" color="black60">
            ${defaultMinValue}
          </Text>
          <Text variant="xs" color="black60">
            ${defaultMaxValue}+
          </Text>
        </Flex>
      </Box>
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

  /* HACK: Setting the font-size to a minimum 16px prevents iOS from zooming on focus */
  /* This won't be necessary when upgraded to Palette v3 */
  @media ${themeGet("mediaQueries.xs")} {
    input {
      font-size: 16px;
    }
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
