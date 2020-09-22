import { Flex, Radio, RadioGroup, Toggle } from "@artsy/palette"
import { sortBy } from "lodash"
import React, { FC } from "react"
import { useArtworkFilterContext } from "../ArtworkFilterContext"
import { OptionText } from "./OptionText"

export const InstitutionFilter: FC = () => {
  const { aggregations, ...filterContext } = useArtworkFilterContext()
  const items = aggregations.find(agg => agg.slice === "INSTITUTION")

  if (!(items && items.counts)) {
    return null
  }

  const selectedItem = filterContext.currentlySelectedFilters().partnerID

  return (
    <Toggle label="Institution">
      <Flex flexDirection="column" alignItems="left">
        <RadioGroup
          deselectable
          defaultValue={selectedItem}
          onSelect={selectedOption => {
            filterContext.setFilter("partnerID", selectedOption)
          }}
        >
          {sortBy(items.counts, ["name"]).map((item, index) => {
            return (
              <Radio
                key={index}
                my={0.3}
                value={item.value.toLocaleLowerCase()}
                label={<OptionText>{item.name}</OptionText>}
              />
            )
          })}
        </RadioGroup>
      </Flex>
    </Toggle>
  )
}
