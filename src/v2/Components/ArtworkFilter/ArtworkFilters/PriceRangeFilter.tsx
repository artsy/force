import { FC, useEffect, useState, useMemo, FormEvent } from "react"
import {
  Box,
  Button,
  Flex,
  LabeledInput,
  Message,
  Radio,
  RadioGroup,
  Spacer,
  Text,
  useThemeConfig,
} from "@artsy/palette"
import {
  SelectedFiltersCountsLabels,
  useArtworkFilterContext,
} from "../ArtworkFilterContext"
import styled from "styled-components"
import { Media } from "v2/Utils/Responsive"
import { themeGet } from "@styled-system/theme-get"
import { FilterExpandable } from "./FilterExpandable"
import { isCustomValue } from "./Utils/isCustomValue"
import { useFilterLabelCountByKey } from "../Utils/useFilterLabelCountByKey"
import { useMode } from "v2/Utils/Hooks/useMode"
import { Range, RANGE_DOT_SIZE } from "v2/Components/Range"
import { debounce } from "lodash"

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

const PRICE_RANGES = [
  { name: "$50K+", value: "50000-*" },
  { name: "$25K – $50K", value: "25000-50000" },
  { name: "$10K – $25K", value: "10000-25000" },
  { name: "$5K – $10K", value: "5000-10000" },
  { name: "$1K – $5K", value: "1000-5000" },
  { name: "$0 – $1,000", value: "0-1000" },
]

type CustomRange = (number | "*")[]

// Constants
const DEBOUNCE_DELAY = 300
const DEFAULT_CUSTOM_RANGE: CustomRange = ["*", "*"]
const DEFAULT_PRICE_RANGE = "*-*"
const DEFAULT_RANGE = [0, 50000]

const parseRange = (range: string = DEFAULT_PRICE_RANGE) => {
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

const convertToArtworkFilterFormatRange = (range: number[]) => {
  return range.map((value, index) => {
    if (value === DEFAULT_RANGE[index]) {
      return "*"
    }

    return value
  })
}

const getValue = (value: CustomRange[number]) => {
  return value === "*" || value === 0 ? "" : value
}

export interface PriceRangeFilterProps {
  expanded?: boolean
}

type Mode = "resting" | "done"

export const PriceRangeFilterOld: FC<PriceRangeFilterProps> = ({
  expanded,
}) => {
  const [mode, setMode] = useMode<Mode>("resting")

  const { currentlySelectedFilters, setFilter } = useArtworkFilterContext()
  const { priceRange: initialRange, reset } = currentlySelectedFilters?.() ?? {}

  const numericInitialRange = parseRange(initialRange)

  const filtersCount = useFilterLabelCountByKey(
    SelectedFiltersCountsLabels.priceRange
  )
  const label = `Price${filtersCount}`

  const isCustomRange =
    // Has some kind of price range set (isn't default)
    isCustomValue(initialRange) &&
    // And isn't a pre-defined price range option
    PRICE_RANGES.find(range => range.value === initialRange) === undefined

  const [showCustom, setShowCustom] = useState(isCustomRange)
  const [customRange, setCustomRange] = useState<CustomRange>(
    numericInitialRange ?? DEFAULT_CUSTOM_RANGE
  )

  const handleClick = () => {
    setFilter("priceRange", customRange.join("-"))
    setMode("done")
  }

  const handleChange = (index: number) => ({
    currentTarget: { value },
  }: FormEvent<HTMLInputElement>) => {
    const isOpenEnded = value === "" || value === "0"
    setCustomRange(prevCustomRange => {
      const nextCustomRange = [...prevCustomRange]

      if (isOpenEnded) {
        nextCustomRange[index] = "*"
      } else {
        nextCustomRange[index] = parseInt(value, 10)
      }

      return nextCustomRange
    })
  }

  const handleSelect = (selectedOption: string) => {
    if (selectedOption === "custom") {
      setShowCustom(true)
      return
    }

    if (selectedOption) {
      setCustomRange(parseRange(selectedOption))
      setFilter("priceRange", selectedOption)
    } else {
      setCustomRange(DEFAULT_CUSTOM_RANGE)
      setFilter("priceRange", DEFAULT_PRICE_RANGE)
    }

    setShowCustom(false)
  }

  const tokens = useThemeConfig({
    v2: { my: 0.5 },
    v3: { my: 1 },
  })

  const selection = currentlySelectedFilters?.().priceRange
  const hasSelection = selection && isCustomValue(selection)

  useEffect(() => {
    // if price filter or filters state is being reset, then also clear local input state
    if (reset || !isCustomValue(initialRange)) {
      setCustomRange(["*", "*"])
    }
  }, [reset, initialRange])

  return (
    <FilterExpandable label={label} expanded={hasSelection || expanded}>
      <Flex mt={1} alignItems="flex-end">
        <NumericInput
          label="$USD"
          name="price_min"
          placeholder="Min"
          min="0"
          step="1"
          value={getValue(customRange[0])}
          onChange={handleChange(0)}
        />

        <Spacer mx={0.5} />

        <NumericInput
          label="$USD"
          name="price_max"
          placeholder="Max"
          min="0"
          step="1"
          value={getValue(customRange[1])}
          onChange={handleChange(1)}
        />
      </Flex>

      <Box my={2}>
        <Range min={0} max={100} allowCross={false} defaultValue={[0, 100]} />
      </Box>

      {mode === "done" && (
        <Media lessThan="sm">
          <Message variant="info" my={2}>
            Price set, select apply to see full results
          </Message>
        </Media>
      )}

      <Flex flexDirection="column" alignItems="left">
        <RadioGroup
          deselectable
          defaultValue={isCustomRange ? "custom" : initialRange}
          onSelect={handleSelect}
        >
          {[
            ...PRICE_RANGES.map((range, index) => (
              <Radio
                key={`${index}`}
                my={tokens.my}
                label={range.name}
                value={range.value}
              />
            )),

            <Radio
              key="custom"
              my={tokens.my}
              label="Custom Price"
              value="custom"
            />,
          ]}
        </RadioGroup>
      </Flex>

      {showCustom && (
        <>
          <Flex mt={1} alignItems="flex-end">
            <NumericInput
              label="$USD"
              name="price_min"
              placeholder="Min"
              min="0"
              step="1"
              value={getValue(customRange[0])}
              onChange={handleChange(0)}
            />

            <Spacer mx={0.5} />

            <NumericInput
              label="$USD"
              name="price_max"
              placeholder="Max"
              min="0"
              step="1"
              value={getValue(customRange[1])}
              onChange={handleChange(1)}
            />
          </Flex>

          <Button
            mt={1}
            variant="secondaryGray"
            onClick={handleClick}
            width="100%"
          >
            Set price
          </Button>
        </>
      )}
    </FilterExpandable>
  )
}

export const PriceRangeFilterNew: FC<PriceRangeFilterProps> = ({
  expanded,
}) => {
  const {
    shouldStageFilterChanges,
    currentlySelectedFilters,
    setFilter,
  } = useArtworkFilterContext()
  const { priceRange, reset } = currentlySelectedFilters?.() ?? {}
  const [range, setRange] = useState(parseRange(priceRange))
  const sliderRange = parseSliderRange(range)
  const [minValue, maxValue] = range
  const [defaultMinValue, defaultMaxValue] = DEFAULT_RANGE

  const filtersCount = useFilterLabelCountByKey(
    SelectedFiltersCountsLabels.priceRange
  )
  const label = `Price${filtersCount}`
  const selection = currentlySelectedFilters?.().priceRange
  const hasSelection = selection && isCustomValue(selection)

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

  const updateRange = (updatedRange: (number | "*")[]) => {
    setRange(updatedRange)
    setFilterDobounced("priceRange", updatedRange.join("-"))
  }

  const handleSliderValueChange = (range: number[]) => {
    const convertedRange = convertToArtworkFilterFormatRange(range)

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
            value={getValue(maxValue)}
            onChange={handleInputValueChange(1)}
          />
        </Box>
      </Flex>

      <Box mt={4}>
        <Box mx={RANGE_DOT_SIZE / 2}>
          <Range
            min={defaultMinValue}
            max={defaultMaxValue}
            value={sliderRange}
            allowCross={false}
            onChange={handleSliderValueChange}
            railStyle={{
              left: `-${RANGE_DOT_SIZE / 2}px`,
              width: `calc(100% + ${RANGE_DOT_SIZE}px)`,
            }}
          />
        </Box>

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

export const PriceRangeFilter: FC<PriceRangeFilterProps> = props => {
  if (true) {
    return <PriceRangeFilterNew {...props} />
  }

  return <PriceRangeFilterOld {...props} />
}
