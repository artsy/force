import {
  Flex,
  Radio,
  RadioGroup,
  Expandable,
  useThemeConfig,
} from "@artsy/palette"
import { sortBy } from "lodash"
import React, { FC } from "react"
import { useArtworkFilterContext } from "../ArtworkFilterContext"

export const InstitutionFilter: FC = () => {
  const { aggregations, ...filterContext } = useArtworkFilterContext()
  const items = aggregations.find(agg => agg.slice === "INSTITUTION")

  const tokens = useThemeConfig({
    v2: { my: 0.5 },
    v3: { my: 1 },
  })

  if (!(items && items.counts)) {
    return null
  }

  const selectedItem = filterContext.currentlySelectedFilters().partnerID

  return (
    <Expandable mb={1} label="Institution">
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
                my={tokens.my}
                value={item.value.toLocaleLowerCase()}
                label={item.name}
              />
            )
          })}
        </RadioGroup>
      </Flex>
    </Expandable>
  )
}
