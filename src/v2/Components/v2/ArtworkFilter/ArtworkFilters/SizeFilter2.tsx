import React, { useState } from "react"
import {
  Button,
  Text,
  Checkbox,
  Clickable,
  Flex,
  Spacer,
  Expandable,
  Message,
  TextVariant,
  useThemeConfig,
} from "@artsy/palette"
import { useArtworkFilterContext } from "../ArtworkFilterContext"
import { NumericInput } from "./PriceRangeFilter"
import { Media } from "v2/Utils/Responsive"

const sizeMap = [
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

const parseRange = (range?: string) => {
  return range?.split("-").map(s => {
    if (s === "*") return s
    return parseInt(s, 10)
  })
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

export interface SizeFilter2Props {
  expanded?: boolean
}

export const SizeFilter2: React.FC<SizeFilter2Props> = ({ expanded }) => {
  const { currentlySelectedFilters, setFilters } = useArtworkFilterContext()
  const { height, width } = currentlySelectedFilters()

  const initialCustomSize = {
    height: parseRange(height),
    width: parseRange(width),
  }

  const [showCustom, setShowCustom] = useState(!!hasValue(initialCustomSize))
  const [customSize, setCustomSize] = useState<CustomSize>(
    hasValue(initialCustomSize) ? initialCustomSize : DEFAULT_CUSTOM_SIZE
  )
  const [mode, setMode] = useState<"resting" | "done">("resting")

  const handleInputChange = (dimension: "height" | "width", index: number) => ({
    currentTarget: { value },
  }: React.FormEvent<HTMLInputElement>) => {
    const isOpenEnded = value === "" || value === "0"
    const isMin = index === 0
    const isMax = index === 1

    setCustomSize(prevCustomSize => {
      if (isOpenEnded && isMin) {
        prevCustomSize[dimension][index] = 0
      } else if (isOpenEnded && isMax) {
        prevCustomSize[dimension][index] = "*"
      } else {
        prevCustomSize[dimension][index] = parseInt(value, 10)
      }

      return { ...prevCustomSize }
    })
  }

  const toggleSizeSelection = (selected, name) => {
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

  const handleClick = () => {
    const newFilters = {
      ...currentlySelectedFilters(),
      sizes: [],
      ...mapSizeToRange(customSize),
    }
    setFilters(newFilters, { force: false })
    setMode("done")
  }

  const tokens = useThemeConfig({
    v2: { my: 0.5, secondaryVariant: "small" as TextVariant },
    v3: { my: 1, secondaryVariant: "xs" as TextVariant },
  })

  return (
    <Expandable mb={1} label="Size" expanded={expanded}>
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

        <Flex flexDirection="column">
          {sizeMap.map(({ name, displayName }, index) => {
            return (
              <Checkbox
                key={index}
                onSelect={selected => toggleSizeSelection(selected, name)}
                selected={currentlySelectedFilters().sizes.includes(name)}
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
              label="Inches"
              name="width_min"
              min="0"
              step="1"
              value={customSize.width && customSize.width[0]}
              onChange={handleInputChange("width", 0)}
            />

            <Spacer mx={0.5} />

            <NumericInput
              label="Inches"
              name="width_max"
              min="0"
              step="1"
              value={customSize.width && customSize.width[1]}
              onChange={handleInputChange("width", 1)}
            />
          </Flex>

          <Text mt={1}>Height</Text>
          <Flex alignItems="flex-end">
            <NumericInput
              label="Inches"
              name="height_min"
              min="0"
              step="1"
              value={customSize.height && customSize.height[0]}
              onChange={handleInputChange("height", 0)}
            />

            <Spacer mx={0.5} />

            <NumericInput
              label="Inches"
              name="height_max"
              min="0"
              step="1"
              value={customSize.height && customSize.height[1]}
              onChange={handleInputChange("height", 1)}
            />
          </Flex>

          <Button mt={1} variant="secondaryGray" onClick={handleClick}>
            Set size
          </Button>
        </>
      )}
    </Expandable>
  )
}
