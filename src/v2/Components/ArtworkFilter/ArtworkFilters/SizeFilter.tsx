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
  RadioGroup,
  Radio,
} from "@artsy/palette"
import {
  ArtworkFiltersState,
  SelectedFiltersCountsLabels,
  useArtworkFilterContext,
  useCurrentlySelectedFilters,
} from "../ArtworkFilterContext"
import { NumericInput } from "./PriceRangeFilter"
import { Media } from "v2/Utils/Responsive"
import { FilterExpandable } from "./FilterExpandable"
import { isCustomValue } from "./Utils/isCustomValue"
import { useFilterLabelCountByKey } from "../Utils/useFilterLabelCountByKey"
import { useMode } from "v2/Utils/Hooks/useMode"
import { DEFAULT_METRIC, Metric } from "../Utils/metrics"

type Numeric = number | "*"
type CustomRange = Numeric[]
type Mode = "resting" | "done"

export type CustomSize = {
  height: CustomRange
  width: CustomRange
}

export interface SizeFilterProps {
  expanded?: boolean
}

const ONE_IN_TO_CM = 2.54

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

const convertToCentimeters = (element: number) => {
  return Math.round(element * ONE_IN_TO_CM)
}
const convertToInches = (value: number) => {
  return value / ONE_IN_TO_CM
}

export const parseRange = (range: string = "", metric: Metric): Numeric[] => {
  return range.split("-").map(s => {
    if (s === "*") return s
    const value = parseFloat(s)

    if (metric === "cm") {
      return convertToCentimeters(value)
    }

    return value
  })
}

const convertRangeToInches = (range: CustomRange) => {
  return range.map(value => {
    if (value === "*") {
      return value
    }

    return convertToInches(value)
  })
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

export const getCustomSizeRangeInInches = (
  customSize: CustomSize,
  sourceMetric: Metric
) => {
  let sizes = customSize

  if (sourceMetric === "cm") {
    sizes = {
      width: convertRangeToInches(customSize.width),
      height: convertRangeToInches(customSize.height),
    }
  }

  return {
    width: sizes.width.join("-"),
    height: sizes.height.join("-"),
  }
}

export const SizeFilter: React.FC<SizeFilterProps> = ({ expanded }) => {
  const { setFilters } = useArtworkFilterContext()
  const selectedFilters = useCurrentlySelectedFilters()
  const {
    height,
    width,
    reset,
    sizes = [],
    metric = DEFAULT_METRIC,
  } = selectedFilters

  const filtersCount = useFilterLabelCountByKey(
    SelectedFiltersCountsLabels.sizes
  )
  const label = `Size${filtersCount}`

  const [showCustom, setShowCustom] = useState(
    isCustomValue(width) || isCustomValue(height)
  )
  const [customSize, setCustomSize] = useState<CustomSize>({
    height: parseRange(height, metric),
    width: parseRange(width, metric),
  })
  const [mode, setMode] = useMode<Mode>("resting")

  const predefinedSizes = getPredefinedSizesByMetric(metric)
  const metricLabel = metric.toLowerCase()

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
    let updatedValues = sizes

    if (selected) {
      updatedValues = [...updatedValues, name]
    } else {
      updatedValues = updatedValues.filter(item => item !== name)
    }

    const newFilters = {
      ...selectedFilters,
      sizes: updatedValues,
      height: "*-*",
      width: "*-*",
    }

    setFilters?.(newFilters, { force: false })
    setCustomSize({ height: ["*", "*"], width: ["*", "*"] })
  }

  const handleClick = () => {
    const customSizeRanges = getCustomSizeRangeInInches(customSize, metric)
    const newFilters = {
      ...selectedFilters,
      ...customSizeRanges,
      sizes: [],
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

    const updatedFilters: ArtworkFiltersState = {
      ...selectedFilters,
      metric: nextMetric,
    }

    if (isCustomValue(width) || isCustomValue(height)) {
      const customSizeRanges = getCustomSizeRangeInInches(
        customSize,
        nextMetric
      )

      updatedFilters.width = customSizeRanges.width
      updatedFilters.height = customSizeRanges.height
    }

    setFilters!(updatedFilters, { force: false })
  }

  useEffect(() => {
    if (width == "*-*" || height === "*-*") {
      setCustomSize({
        width: parseRange(width, metric),
        height: parseRange(height, metric),
      })
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [width, height])

  useEffect(() => {
    // if filter state is being reset, then also clear local input state
    if (reset) {
      setCustomSize({ height: ["*", "*"], width: ["*", "*"] })
    }
  }, [reset])

  const hasSelection =
    sizes.length > 0 || isCustomValue(width) || isCustomValue(height)

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
        <Text variant="xs" color="black60" mb={1}>
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
                selected={sizes.includes(name)}
                my={1}
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
              label={metricLabel}
              name="width_min"
              min="0"
              step="1"
              value={getValue(customSize.width[0])}
              onChange={handleInputChange("width", 0)}
            />
            <Spacer mx={0.5} />
            <NumericInput
              label={metricLabel}
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
              label={metricLabel}
              name="height_min"
              min="0"
              step="1"
              value={getValue(customSize.height[0])}
              onChange={handleInputChange("height", 0)}
            />

            <Spacer mx={0.5} />

            <NumericInput
              label={metricLabel}
              name="height_max"
              min="0"
              step="1"
              value={getValue(customSize.height[1])}
              onChange={handleInputChange("height", 1)}
            />
          </Flex>

          <Button
            mt={1}
            variant="primaryGray"
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
