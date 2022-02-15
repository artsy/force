import { useEffect, useState } from "react"
import * as React from "react"
import {
  Button,
  Text,
  Checkbox,
  Clickable,
  Flex,
  Spacer,
  Message,
  TextVariant,
  useThemeConfig,
  RadioGroup,
  Radio,
} from "@artsy/palette"
import {
  ArtworkFiltersState,
  Metric,
  SelectedFiltersCountsLabels,
  useArtworkFilterContext,
} from "../ArtworkFilterContext"
import { NumericInput } from "./PriceRangeFilter"
import { Media } from "v2/Utils/Responsive"
import { FilterExpandable } from "./FilterExpandable"
import { isCustomValue } from "./Utils/isCustomValue"
import { useFilterLabelCountByKey } from "../Utils/useFilterLabelCountByKey"
import { useMode } from "v2/Utils/Hooks/useMode"

export const SIZES_IN_INCHES = [
  { displayName: "Small (under 16in)", name: "SMALL" },
  { displayName: "Medium (16in – 40in)", name: "MEDIUM" },
  { displayName: "Large (over 40in)", name: "LARGE" },
]

export const SIZES_IN_CENTIMETERS = [
  { displayName: "Small (under 40cm)", name: "SMALL" },
  { displayName: "Medium (40 – 100cm)", name: "MEDIUM" },
  { displayName: "Large (over 100cm)", name: "LARGE" },
]

const ONE_IN_TO_CM = 2.54

type CustomRange = (number | "*")[]

type CustomSize = {
  height: CustomRange
  width: CustomRange
}

const convertToCentimeters = (element: number) => {
  return Math.round(element * ONE_IN_TO_CM)
}

export const parseRange = (range: string = "", metric: Metric) => {
  return range.split("-").map(s => {
    if (s === "*") return s
    const value = parseFloat(s)

    if (metric === "cm") {
      return convertToCentimeters(value)
    }

    return value
  })
}

const convertRangeElementToInches = (element: number | "*") => {
  if (element === "*") {
    return element
  }

  return element / ONE_IN_TO_CM
}

const convertRangeToInches = (range: CustomRange) => {
  return [
    convertRangeElementToInches(range[0]),
    convertRangeElementToInches(range[1]),
  ]
}

const convertSizeToInches = (size: CustomSize) => {
  return {
    height: convertRangeToInches(size.height),
    width: convertRangeToInches(size.width),
  }
}

const mapSizeToRange = (size: CustomSize) => {
  return {
    height: size.height?.join("-"),
    width: size.width?.join("-"),
  }
}

const getValue = (value: CustomRange[number]) => {
  return value === "*" || value === 0 ? "" : value
}

export const getPredefinedSizesByMetric = (metric: Metric) => {
  if (metric === "cm") {
    return SIZES_IN_CENTIMETERS
  }

  return SIZES_IN_INCHES
}

export const getUnitLabelByMetric = (metric: Metric) => {
  return metric === "cm" ? "cm" : "in"
}

export interface SizeFilterProps {
  expanded?: boolean
}

type Mode = "resting" | "done"

export const SizeFilter: React.FC<SizeFilterProps> = ({ expanded }) => {
  const {
    currentlySelectedFilters,
    setFilters,
    metric,
    setMetric,
  } = useArtworkFilterContext()
  const {
    height,
    width,
    reset,
    ...otherSelectedFilters
  } = currentlySelectedFilters?.() as ArtworkFiltersState

  const filtersCount = useFilterLabelCountByKey(
    SelectedFiltersCountsLabels.sizes
  )
  const label = `Size${filtersCount}`

  const initialCustomSize = React.useMemo(
    () => ({
      height: parseRange(height, metric) as CustomRange,
      width: parseRange(width, metric) as CustomRange,
    }),
    [width, height, metric]
  )

  const [showCustom, setShowCustom] = useState(
    isCustomValue(width) || isCustomValue(height)
  )
  const [customSize, setCustomSize] = useState<CustomSize>(initialCustomSize)
  const [mode, setMode] = useMode<Mode>("resting")

  const predefinedSizes = getPredefinedSizesByMetric(metric)
  const metricUnitLabel = getUnitLabelByMetric(metric)

  const handleInputChange = (dimension: "height" | "width", index: number) => ({
    currentTarget: { value },
  }: React.FormEvent<HTMLInputElement>) => {
    const isOpenEnded = value === "" || value === "0"
    const isMin = index === 0

    setCustomSize(prevCustomSize => {
      if (isOpenEnded) {
        prevCustomSize[dimension][index] = "*"
      } else {
        const parsedValue = parseInt(value, 10)
        if (prevCustomSize[dimension])
          prevCustomSize[dimension][index] = parsedValue
        else if (isMin) {
          prevCustomSize[dimension] = [parsedValue, "*"]
        } else {
          prevCustomSize[dimension] = ["*", parsedValue]
        }
      }

      return { ...prevCustomSize }
    })
  }

  const toggleSizeSelection = (selected: boolean, name: string) => {
    let sizes = currentlySelectedFilters?.().sizes?.slice()
    if (sizes) {
      if (selected) {
        sizes.push(name)
      } else {
        sizes = sizes.filter(item => item !== name)
      }
    }

    const newFilters = {
      ...currentlySelectedFilters?.(),
      sizes,
      height: "*-*",
      width: "*-*",
    }

    setFilters?.(newFilters, { force: false })
    setCustomSize({ height: ["*", "*"], width: ["*", "*"] })
  }

  const handleClick = () => {
    const newFilters = {
      ...currentlySelectedFilters?.(),
      sizes: [],
      ...mapSizeToRange(convertSizeToInches(customSize) as CustomSize),
    }

    if (reset) {
      delete newFilters.reset
    }

    setFilters?.(newFilters, { force: false })
    setMode("done")
  }

  const handleSelectMetric = (nextMetric: Metric) => {
    if (metric === nextMetric) {
      return
    }

    if (width !== "*-*" || height !== "*-*") {
      let formattedCustomSize = customSize

      if (nextMetric === "cm") {
        formattedCustomSize = convertSizeToInches(customSize)
      }

      setFilters!({
        ...otherSelectedFilters,
        ...mapSizeToRange(formattedCustomSize),
      })
    }

    setMetric(nextMetric)
  }

  const tokens = useThemeConfig({
    v2: { my: 0.5, secondaryVariant: "small" as TextVariant },
    v3: { my: 1, secondaryVariant: "xs" as TextVariant },
  })

  useEffect(() => {
    // if filter state is being reset, then also clear local input state
    if (reset) {
      setCustomSize({ height: ["*", "*"], width: ["*", "*"] })
    }
  }, [reset])

  useEffect(() => {
    setCustomSize(initialCustomSize)
  }, [initialCustomSize])

  const selection = currentlySelectedFilters?.().sizes
  const customHeight = currentlySelectedFilters?.().height
  const customWidth = currentlySelectedFilters?.().width
  const hasSelection =
    (selection && selection.length > 0) ||
    isCustomValue(customHeight) ||
    isCustomValue(customWidth)

  return (
    <FilterExpandable label={label} expanded={hasSelection || expanded}>
      {mode === "done" && (
        <Media lessThan="sm">
          <Message variant="info" my={2}>
            Size set, select apply to see full results
          </Message>
        </Media>
      )}
      <Flex flexDirection="column" alignItems="left">
        <Text variant={tokens.secondaryVariant} color="black60" mb={1}>
          This is based on the artwork’s average dimension.
        </Text>

        <RadioGroup
          defaultValue={metric}
          onSelect={handleSelectMetric}
          flexDirection="row"
          my={2}
        >
          <Radio value="cm" label="cm" flex={1} />
          <Radio value="in" label="in" flex={1} />
        </RadioGroup>

        <Flex flexDirection="column">
          {predefinedSizes.map(({ name, displayName }, index) => {
            return (
              <Checkbox
                key={index}
                onSelect={selected => toggleSizeSelection(selected, name)}
                selected={currentlySelectedFilters?.().sizes?.includes(name)}
                my={tokens.my}
              >
                {displayName}
              </Checkbox>
            )
          })}
        </Flex>
      </Flex>

      <Clickable
        mt={1}
        textDecoration="underline"
        textAlign="left"
        onClick={() => setShowCustom(prevShowCustom => !prevShowCustom)}
      >
        <Text variant="small">{showCustom ? "Hide" : "Show"} custom size</Text>
      </Clickable>

      {showCustom && (
        <>
          <Text mt={1}>Width</Text>
          <Flex alignItems="flex-end">
            <NumericInput
              label={metricUnitLabel}
              name="width_min"
              min="0"
              step="1"
              value={getValue(customSize.width[0])}
              onChange={handleInputChange("width", 0)}
            />
            <Spacer mx={0.5} />
            <NumericInput
              label={metricUnitLabel}
              name="width_max"
              min="0"
              step="1"
              value={getValue(customSize.width[1])}
              onChange={handleInputChange("width", 1)}
            />
          </Flex>

          <Text mt={1}>Height</Text>
          <Flex alignItems="flex-end">
            <NumericInput
              label={metricUnitLabel}
              name="height_min"
              min="0"
              step="1"
              value={getValue(customSize.height[0])}
              onChange={handleInputChange("height", 0)}
            />

            <Spacer mx={0.5} />

            <NumericInput
              label={metricUnitLabel}
              name="height_max"
              min="0"
              step="1"
              value={getValue(customSize.height[1])}
              onChange={handleInputChange("height", 1)}
            />
          </Flex>

          <Button
            mt={1}
            variant="secondaryGray"
            onClick={handleClick}
            width="100%"
          >
            Set size
          </Button>
        </>
      )}
    </FilterExpandable>
  )
}
