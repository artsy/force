import { Checkbox, Box, Text, Flex } from "@artsy/palette"
import { intersection } from "lodash"
import * as React from "react"
import styled from "styled-components"
import {
  SelectedFiltersCountsLabels,
  useArtworkFilterContext,
  useCurrentlySelectedFilters,
} from "../ArtworkFilterContext"
import { FilterExpandable } from "./FilterExpandable"
import { INITIAL_ITEMS_TO_SHOW, ShowMore } from "./ShowMore"
import { useFilterLabelCountByKey } from "../Utils/useFilterLabelCountByKey"
import { sortResults } from "./Utils/sortResults"
import { themeGet } from "@styled-system/theme-get"

export const COLOR_OPTIONS = [
  { hex: "#BB392D", value: "red", name: "Red" },
  { hex: "#EA6B1F", value: "orange", name: "Orange" },
  { hex: "#E2B929", value: "yellow", name: "Yellow" },
  { hex: "#00674A", value: "green", name: "Green" },
  { hex: "#0A1AB4", value: "blue", name: "Blue" },
  { hex: "#7B3D91", value: "purple", name: "Purple" },
  { hex: "#ffffff", value: "black-and-white", name: "Black and White" },
  { hex: "#7B5927", value: "brown", name: "Brown" },
  { hex: "#C2C2C2", value: "gray", name: "Gray" },
  { hex: "#E1ADCD", value: "pink", name: "Pink" },
]

type ColorOption = typeof COLOR_OPTIONS[number]

const ColorSwatch = styled.div`
  width: ${themeGet("space.2")};
  height: ${themeGet("space.2")};
  border-radius: ${themeGet("space.2")};
  flex-shrink: 0;
`

const BlackAndWhiteSwatch = styled(ColorSwatch)`
  position: relative;
  overflow: hidden;
  border: 1px solid ${themeGet("colors.black10")};
  transform: rotate(-135deg);

  &::after {
    content: "";
    display: block;
    width: 100%;
    height: 50%;
    position: absolute;
    top: 0;
    left: 0;
    background-color: ${themeGet("colors.black100")};
  }
`

const ColorFilterOption: React.FC<{ colorOption: ColorOption }> = ({
  colorOption,
}) => {
  const { name, value, hex } = colorOption

  const { setFilter } = useArtworkFilterContext()
  const { colors = [] } = useCurrentlySelectedFilters()

  const toggleColor = (selected: boolean, color: string) => {
    let updatedValues = colors

    if (selected) {
      updatedValues = [...updatedValues, color]
    } else {
      updatedValues = updatedValues.filter(
        selectedColor => color !== selectedColor
      )
    }

    setFilter("colors", updatedValues)
  }

  return (
    <Checkbox
      key={name}
      onSelect={selected => toggleColor(selected, value)}
      selected={colors.includes(value)}
      // TODO: Should not have external margin
      my={1}
    >
      <Box
        display="flex"
        width="65%"
        justifyContent="space-between"
        alignItems="center"
      >
        <Text textAlign="left" variant="sm" lineHeight={1}>
          {name}
        </Text>

        {value === "black-and-white" ? (
          <BlackAndWhiteSwatch />
        ) : (
          <ColorSwatch style={{ backgroundColor: hex }} />
        )}
      </Box>
    </Checkbox>
  )
}
export interface ColorFilterProps {
  expanded?: boolean // set to true to force expansion
}

export const ColorFilter: React.FC<ColorFilterProps> = ({ expanded }) => {
  const { colors = [] } = useCurrentlySelectedFilters()

  const filtersCount = useFilterLabelCountByKey(
    SelectedFiltersCountsLabels.colors
  )
  const label = `Color${filtersCount}`

  const intersected = intersection(
    colors,
    COLOR_OPTIONS.slice(INITIAL_ITEMS_TO_SHOW).map(({ value }) => value)
  )
  const hasBelowTheFoldColorFilter = intersected.length > 0
  const hasColorFilter = colors.length > 0
  const resultsSorted = sortResults(colors, COLOR_OPTIONS)

  return (
    <FilterExpandable label={label} expanded={hasColorFilter || expanded}>
      <Flex flexDirection="column">
        <ShowMore expanded={hasBelowTheFoldColorFilter}>
          {resultsSorted.map(colorOption => {
            return (
              <ColorFilterOption
                key={colorOption.value}
                colorOption={colorOption as any}
              />
            )
          })}
        </ShowMore>
      </Flex>
    </FilterExpandable>
  )
}
