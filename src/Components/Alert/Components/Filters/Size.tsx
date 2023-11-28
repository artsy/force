import { FC, useState } from "react"
import {
  Button,
  Checkbox,
  Clickable,
  Flex,
  Join,
  Radio,
  RadioGroup,
  Spacer,
  Text,
} from "@artsy/palette"
import { DEFAULT_METRIC, Metric } from "Utils/metrics"
import { NumericInput } from "Components/NumericInput"
import { useAlertContext } from "Components/Alert/Hooks/useAlertContext"
import {
  DEFAULT_RANGE,
  getRangeValue,
  isCustomRangeValue,
} from "Utils/customRangeUtils"
import {
  CustomSize,
  getCustomSizeRangeInInches,
  getPredefinedSizesByMetric,
  parseSizeRange,
} from "Utils/customSizeUtils"
import { SearchCriteriaAttributeKeys } from "Components/SavedSearchAlert/types"

export const Size: FC = () => {
  const { state, dispatch } = useAlertContext()
  const width = state.criteria.width || DEFAULT_RANGE
  const height = state.criteria.height || DEFAULT_RANGE
  const sizes = state.criteria.sizes || []
  const metric = state.metric || DEFAULT_METRIC
  const metricLabel = metric.toLowerCase()
  const [customSize, setCustomSize] = useState<CustomSize>({
    width: parseSizeRange(width, metric),
    height: parseSizeRange(height, metric),
  })
  const [showCustom, setShowCustom] = useState(
    isCustomRangeValue(width) || isCustomRangeValue(height)
  )
  const [predefinedSizes, setPredefinedSizes] = useState(
    getPredefinedSizesByMetric(metric)
  )

  const updateCriteriaAttribute = (
    key: SearchCriteriaAttributeKeys,
    value: any
  ) => {
    dispatch({
      type: "SET_CRITERIA_ATTRIBUTE",
      payload: { key: key, value: value },
    })
  }

  const toggleSizeSelection = (selected: boolean, name: string) => {
    let updatedValues = sizes

    if (selected) {
      updatedValues = [...updatedValues, name]
    } else {
      updatedValues = updatedValues.filter(item => item !== name)
    }

    updateCriteriaAttribute("width", null)
    updateCriteriaAttribute("height", null)
    updateCriteriaAttribute("sizes", updatedValues)
    setCustomSize({ width: ["*", "*"], height: ["*", "*"] })
  }

  const handleSelectMetric = (nextMetric: Metric) => {
    dispatch({
      type: "SET_METRIC",
      payload: nextMetric,
    })
    setPredefinedSizes(getPredefinedSizesByMetric(nextMetric))

    if (isCustomRangeValue(width) || isCustomRangeValue(height)) {
      const customSizeRanges = getCustomSizeRangeInInches(
        customSize,
        nextMetric
      )

      updateCriteriaAttribute("width", customSizeRanges.width)
      updateCriteriaAttribute("height", customSizeRanges.height)
    }
  }

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

  const handleSetSizesClick = () => {
    const customSizeRanges = getCustomSizeRangeInInches(customSize, metric)
    const width =
      customSizeRanges.width === DEFAULT_RANGE ? null : customSizeRanges.width
    const height =
      customSizeRanges.height === DEFAULT_RANGE ? null : customSizeRanges.height

    updateCriteriaAttribute("width", width)
    updateCriteriaAttribute("height", height)

    if (
      customSizeRanges.width != DEFAULT_RANGE ||
      customSizeRanges.height != DEFAULT_RANGE
    ) {
      updateCriteriaAttribute("sizes", [])
    }
  }

  return (
    <>
      <Join separator={<Spacer y={1} />}>
        <Text variant="sm-display">Size</Text>

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

        <Clickable
          mt={1}
          textDecoration="underline"
          textAlign="left"
          onClick={() => setShowCustom(prevShowCustom => !prevShowCustom)}
        >
          <Text variant="xs">{showCustom ? "Hide" : "Show"} custom size</Text>
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
                value={getRangeValue(customSize.width[0])}
                onChange={handleInputChange("width", 0)}
              />
              <Spacer x={1} />
              <NumericInput
                label={metricLabel}
                name="width_max"
                min="0"
                step="1"
                value={getRangeValue(customSize.width[1])}
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
                value={getRangeValue(customSize.height[0])}
                onChange={handleInputChange("height", 0)}
              />

              <Spacer x={1} />

              <NumericInput
                label={metricLabel}
                name="height_max"
                min="0"
                step="1"
                value={getRangeValue(customSize.height[1])}
                onChange={handleInputChange("height", 1)}
              />
            </Flex>

            <Button
              mt={1}
              variant="primaryGray"
              onClick={handleSetSizesClick}
              width={["100%", 390]}
            >
              Set size
            </Button>
          </>
        )}
      </Join>
    </>
  )
}
