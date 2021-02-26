import React, { useState } from "react"
import {
  Button,
  Clickable,
  Flex,
  Input,
  Radio,
  RadioGroup,
  Spacer,
  Text,
  Toggle,
} from "@artsy/palette"
import { useArtworkFilterContext } from "../ArtworkFilterContext"
import { OptionText } from "./OptionText"

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

const parseRange = (range?: string) => {
  return range?.split("-").map(s => {
    if (s === "*") return s
    return parseInt(s, 10)
  })
}

export const PriceRangeFilter: React.FC = () => {
  const { currentlySelectedFilters, setFilter } = useArtworkFilterContext()
  const { priceRange: initialRange, atAuction } = currentlySelectedFilters()

  const numericInitialRange = parseRange(initialRange)

  const [showCustom, setShowCustom] = useState(false)
  const [customRange, setCustomRange] = useState<CustomRange>(
    numericInitialRange ?? DEFAULT_CUSTOM_RANGE
  )

  const handleClick = () => {
    setFilter("priceRange", customRange.join("-"))
  }

  const handleChange = (index: number) => ({
    currentTarget: { value },
  }: React.FormEvent<HTMLInputElement>) => {
    const isOpenEnded = value === "" || value === "0"
    const isMin = index === 0
    const isMax = index === 1

    setCustomRange(prevCustomRange => {
      if (isOpenEnded && isMin) {
        prevCustomRange[index] = 0
      } else if (isOpenEnded && isMax) {
        prevCustomRange[index] = "*"
      } else {
        prevCustomRange[index] = parseInt(value, 10)
      }

      return [...prevCustomRange]
    })
  }

  const handleSelect = (selectedOption: string) => {
    setFilter("priceRange", selectedOption)
    setCustomRange(parseRange(selectedOption))
  }

  return (
    <Toggle label="Price" expanded>
      <Flex flexDirection="column" alignItems="left">
        <RadioGroup
          deselectable
          defaultValue={initialRange}
          onSelect={handleSelect}
          disabled={atAuction}
          disabledText="Disabled for biddable works"
        >
          {PRICE_RANGES.map((range, index) => (
            <Radio
              key={`${index}`}
              my={0.3}
              label={<OptionText>{range.name}</OptionText>}
              value={range.value}
            />
          ))}
        </RadioGroup>
      </Flex>

      <Clickable
        mt={1}
        textDecoration="underline"
        textAlign="left"
        onClick={() => setShowCustom(prevShowCustom => !prevShowCustom)}
      >
        <Text>{showCustom ? "Hide" : "Show"} custom price</Text>
      </Clickable>

      {showCustom && (
        <>
          <Flex mt={1} alignItems="flex-end">
            <Input
              placeholder="$ Min"
              type="number"
              min="0"
              step="1"
              value={customRange[0]}
              onChange={handleChange(0)}
            />

            <Spacer mx={0.5} />

            <Input
              placeholder="$ Max"
              type="number"
              min="0"
              step="1"
              value={customRange[1]}
              onChange={handleChange(1)}
            />
          </Flex>

          <Button mt={1} variant="secondaryGray" onClick={handleClick}>
            Set price
          </Button>
        </>
      )}
    </Toggle>
  )
}
