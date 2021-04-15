import React, { useEffect, useRef, useState } from "react"
import {
  Button,
  Text,
  Checkbox,
  Clickable,
  Flex,
  Spacer,
  TextVariant,
  useThemeConfig,
} from "@artsy/palette"
import { useArtworkFilterContext } from "../ArtworkFilterContext"
import { NumericInput } from "./PriceRangeFilter"
import { FilterExpandable } from "./FilterExpandable"

const SIZES = [
  { displayName: "Small (under 40cm)", name: "SMALL" },
  { displayName: "Medium (40 – 100cm)", name: "MEDIUM" },
  { displayName: "Large (over 100cm)", name: "LARGE" },
]

type CustomRange = (number | "*")[]

type CustomSize = {
  height: CustomRange
  width: CustomRange
}

const DEFAULT_CUSTOM_SIZE: CustomSize = {
  height: ["*", "*"],
  width: ["*", "*"],
}

const convertToCentimeters = (element: number) => Math.round(element * 2.54)

const parseRange = (range?: string) => {
  return range?.split("-").map(s => {
    if (s === "*") return s
    return convertToCentimeters(parseFloat(s))
  })
}

const convertRangeElementToInches = (element: number | "*") => {
  if (element === "*") {
    return element
  }

  return Math.round((element / 2.54) * 100) / 100
}

const convertRangeToInches = (range: CustomRange) => {
  return [
    convertRangeElementToInches(range[0]),
    convertRangeElementToInches(range[1]),
  ]
}

const convertSizeToInches = (size: CustomSize) => {
  return {
    height:
      size.height !== undefined ? convertRangeToInches(size.height) : undefined,
    width:
      size.width !== undefined ? convertRangeToInches(size.width) : undefined,
  }
}

const mapSizeToRange = (size: CustomSize) => {
  return {
    height: size.height?.join("-"),
    width: size.width?.join("-"),
  }
}

const hasValue = (size: CustomSize) => {
  return size.height || size.width
}

const getValue = (value: CustomRange[number]) => {
  return value === "*" || value === 0 ? "" : value
}

export interface SizeFilter2Props {
  expanded?: boolean
}

export const SizeFilter2: React.FC<SizeFilter2Props> = ({ expanded }) => {
  const {
    currentlySelectedFilters,
    setFilters,
    shouldStageFilterChanges,
  } = useArtworkFilterContext()

  const { height, width, reset } = currentlySelectedFilters()

  const initialCustomSize = {
    height: parseRange(height),
    width: parseRange(width),
  }

  const [showCustom, setShowCustom] = useState(!!hasValue(initialCustomSize))
  const [customSize, setCustomSize] = useState<CustomSize>(
    hasValue(initialCustomSize) ? initialCustomSize : DEFAULT_CUSTOM_SIZE
  )

  const handleInputChange = (dimension: "height" | "width", index: number) => ({
    currentTarget: { value },
  }: React.FormEvent<HTMLInputElement>) => {
    isInteractiveRef.current = true

    const isOpenEnded = value === "" || value === "0"
    const isMin = index === 0

    setCustomSize(prevCustomSize => {
      const nextCustomSize = { ...prevCustomSize }

      if (isOpenEnded) {
        nextCustomSize[dimension][index] = "*"
      } else {
        const parsedValue = parseInt(value, 10)

        if (nextCustomSize[dimension])
          nextCustomSize[dimension][index] = parsedValue
        else if (isMin) {
          nextCustomSize[dimension] = [parsedValue, "*"]
        } else {
          nextCustomSize[dimension] = ["*", parsedValue]
        }
      }

      return nextCustomSize
    })
  }

  const isInteractiveRef = useRef(false)

  useEffect(() => {
    if (shouldStageFilterChanges && isInteractiveRef.current) {
      stageFilterChanges()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [customSize, shouldStageFilterChanges])

  const toggleSizeSelection = (selected: boolean, name: string) => {
    let sizes = currentlySelectedFilters().sizes.slice()

    if (selected) {
      sizes.push(name)
    } else {
      sizes = sizes.filter(item => item !== name)
    }

    const newFilters = {
      ...currentlySelectedFilters(),
      sizes,
      height: "*-*",
      width: "*-*",
    }

    setFilters(newFilters, { force: false })
    setCustomSize({ height: ["*", "*"], width: ["*", "*"] })
  }

  const stageFilterChanges = () => {
    const newFilters = {
      ...currentlySelectedFilters(),
      sizes: [],
      ...mapSizeToRange(convertSizeToInches(customSize)),
    }

    setFilters(newFilters, { force: false })
  }

  const handleClick = () => {
    stageFilterChanges()
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

  const {
    sizes: selection = [],
    height: customHeight,
    width: customWidth,
  } = currentlySelectedFilters()

  const hasSelection =
    (selection && selection.length > 0) ||
    (customHeight && customHeight !== "*-*") ||
    (customWidth && customWidth !== "*-*")

  return (
    <FilterExpandable label="Size" expanded={hasSelection || expanded}>
      <Flex flexDirection="column" alignItems="left">
        <Text variant={tokens.secondaryVariant} color="black60" mb={1}>
          This is based on the artwork’s average dimension.
        </Text>

        <Flex flexDirection="column">
          {SIZES.map(({ name, displayName }, index) => {
            return (
              <Checkbox
                key={index}
                onSelect={selected => toggleSizeSelection(selected, name)}
                selected={selection.includes(name)}
                my={tokens.my}
              >
                {displayName}
              </Checkbox>
            )
          })}
        </Flex>
      </Flex>

      <Text></Text>

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
              label="cm"
              name="width_min"
              min="0"
              step="1"
              value={
                customSize.width !== undefined
                  ? getValue(customSize.width[0])
                  : undefined
              }
              onChange={handleInputChange("width", 0)}
            />

            <Spacer mx={0.5} />

            <NumericInput
              label="cm"
              name="width_max"
              min="0"
              step="1"
              value={
                customSize.width !== undefined
                  ? getValue(customSize.width[1])
                  : undefined
              }
              onChange={handleInputChange("width", 1)}
            />
          </Flex>

          <Text mt={1}>Height</Text>

          <Flex alignItems="flex-end">
            <NumericInput
              label="cm"
              name="height_min"
              min="0"
              step="1"
              value={
                customSize.height !== undefined
                  ? getValue(customSize.height[0])
                  : undefined
              }
              onChange={handleInputChange("height", 0)}
            />

            <Spacer mx={0.5} />

            <NumericInput
              label="cm"
              name="height_max"
              min="0"
              step="1"
              value={
                customSize.height !== undefined
                  ? getValue(customSize.height[1])
                  : undefined
              }
              onChange={handleInputChange("height", 1)}
            />
          </Flex>

          {!shouldStageFilterChanges && (
            <Button
              mt={1}
              variant="secondaryGray"
              onClick={handleClick}
              width="100%"
            >
              Set size
            </Button>
          )}
        </>
      )}
    </FilterExpandable>
  )
}
