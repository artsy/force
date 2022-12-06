import { FC, useEffect, useState } from "react"
import {
  Button,
  Flex,
  LabeledInput,
  Message,
  Radio,
  RadioGroup,
  Spacer,
} from "@artsy/palette"
import {
  SelectedFiltersCountsLabels,
  useArtworkFilterContext,
  useCurrentlySelectedFilters,
} from "../ArtworkFilterContext"
import styled from "styled-components"
import { Media } from "Utils/Responsive"
import { FilterExpandable } from "./FilterExpandable"
import { isCustomValue } from "./Utils/isCustomValue"
import { useFilterLabelCountByKey } from "../Utils/useFilterLabelCountByKey"
import { useMode } from "Utils/Hooks/useMode"
import { PriceRangeFilterNew } from "./PriceRangeFilterNew"
import { useFeatureFlag } from "System/useFeatureFlag"

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

const PRICE_RANGES = [
  { name: "$50K+", value: "50000-*" },
  { name: "$25K – $50K", value: "25000-50000" },
  { name: "$10K – $25K", value: "10000-25000" },
  { name: "$5K – $10K", value: "5000-10000" },
  { name: "$1K – $5K", value: "1000-5000" },
  { name: "$0 – $1,000", value: "0-1000" },
]

type CustomRange = (number | "*")[]

const DEFAULT_CUSTOM_RANGE: CustomRange = ["*", "*"]
const DEFAULT_PRICE_RANGE = "*-*"

const parseRange = (range: string = DEFAULT_PRICE_RANGE) => {
  return range.split("-").map(s => {
    if (s === "*") return s
    return parseInt(s, 10)
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

  const { setFilter } = useArtworkFilterContext()
  const { priceRange, reset } = useCurrentlySelectedFilters()

  const numericRange = parseRange(priceRange)

  const filtersCount = useFilterLabelCountByKey(
    SelectedFiltersCountsLabels.priceRange
  )
  const label = `Price${filtersCount}`

  const isCustomRange =
    // Has some kind of price range set (isn't default)
    isCustomValue(priceRange) &&
    // And isn't a pre-defined price range option
    PRICE_RANGES.find(range => range.value === priceRange) === undefined

  const [showCustom, setShowCustom] = useState(isCustomRange)
  const [customRange, setCustomRange] = useState<CustomRange>(
    numericRange ?? DEFAULT_CUSTOM_RANGE
  )

  const handleClick = () => {
    setFilter("priceRange", customRange.join("-"))
    setMode("done")
  }

  const handleChange = (index: number) => ({
    currentTarget: { value },
  }: React.FormEvent<HTMLInputElement>) => {
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

  const hasSelection = priceRange && isCustomValue(priceRange)

  useEffect(() => {
    // if price filter or filters state is being reset, then also clear local input state
    if (reset || !isCustomValue(priceRange)) {
      setCustomRange(["*", "*"])
    }
  }, [reset, priceRange])

  return (
    <FilterExpandable label={label} expanded={hasSelection || expanded}>
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
          defaultValue={isCustomRange ? "custom" : priceRange}
          onSelect={handleSelect}
        >
          {[
            ...PRICE_RANGES.map((range, index) => (
              <Radio
                key={`${index}`}
                my={1}
                label={range.name}
                value={range.value}
              />
            )),

            <Radio key="custom" my={1} label="Custom Price" value="custom" />,
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

            <Spacer x={1} />

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
            variant="primaryGray"
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

export const PriceRangeFilter: FC<PriceRangeFilterProps> = props => {
  const isNewPriceFilterEnabled = useFeatureFlag("new_price_filter")

  if (isNewPriceFilterEnabled) {
    return <PriceRangeFilterNew {...props} />
  }

  return <PriceRangeFilterOld {...props} />
}
