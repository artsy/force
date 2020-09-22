import React from "react"
import { Flex, Radio, RadioGroup, Toggle } from "@artsy/palette"
import { useArtworkFilterContext } from "../ArtworkFilterContext"
import { OptionText } from "./OptionText"

export const PriceRangeFilter: React.FC = () => {
  const filterContext = useArtworkFilterContext()
  const initialRange = filterContext.currentlySelectedFilters().priceRange

  return (
    <Toggle label="Price" expanded>
      <Flex flexDirection="column" alignItems="left">
        <RadioGroup
          deselectable
          defaultValue={initialRange}
          onSelect={selectedOption => {
            filterContext.setFilter("priceRange", selectedOption)
          }}
          disabled={filterContext.currentlySelectedFilters().atAuction ?? false}
          disabledText="Disabled for biddable works"
        >
          {priceRanges.map((range, index) => (
            <Radio
              key={`${index}`}
              my={0.3}
              label={<OptionText>{range.name}</OptionText>}
              value={range.value}
            />
          ))}
        </RadioGroup>
      </Flex>
    </Toggle>
  )
}

const priceRanges = [
  {
    name: "$50k+",
    value: "50000-*",
  },
  {
    name: "$25k – $50k",
    value: "25000-50000",
  },
  {
    name: "$10k – $25k",
    value: "10000-25000",
  },
  {
    name: "$5k – $10k",
    value: "5000-10000",
  },
  {
    name: "$1k – $5k",
    value: "1000-5000",
  },
  {
    name: "$0 – $1,000",
    value: "0-1000",
  },
]
