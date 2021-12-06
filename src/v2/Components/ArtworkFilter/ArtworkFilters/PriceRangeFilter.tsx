import { useEffect, useState } from "react"
import * as React from "react"
import {
  Button,
  Flex,
  LabeledInput,
  Message,
  Radio,
  RadioGroup,
  Spacer,
  useThemeConfig,
} from "@artsy/palette"
import { useArtworkFilterContext } from "../ArtworkFilterContext"
import styled from "styled-components"
import { Media } from "v2/Utils/Responsive"
import { themeGet } from "@styled-system/theme-get"
import { FilterExpandable } from "./FilterExpandable"
import { isCustomValue } from "./Utils/isCustomValue"
import { getFilterLabelWithCounts } from "../Utils/getFilterLabelWithCounts"

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

const DEFAULT_CUSTOM_RANGE: CustomRange = ["*", "*"]

const parseRange = (range: string = "*-*") => {
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

export const PriceRangeFilter: React.FC<PriceRangeFilterProps> = ({
  expanded,
}) => {
  const [mode, setMode] = useState<"resting" | "done">("resting")

  const {
    currentlySelectedFilters,
    selectedFiltersCounts,
    setFilter,
  } = useArtworkFilterContext()
  const { priceRange: initialRange, reset } = currentlySelectedFilters?.() ?? {}

  const numericInitialRange = parseRange(initialRange)

  const label = getFilterLabelWithCounts(
    "Price",
    selectedFiltersCounts.priceRange
  )

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

    if (selectedOption !== null) {
      setCustomRange(parseRange(selectedOption))
    }

    setShowCustom(false)
    setFilter("priceRange", selectedOption)
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
