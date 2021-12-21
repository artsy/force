import {
  Checkbox,
  space,
  color,
  Box,
  Text,
  Flex,
  useThemeConfig,
} from "@artsy/palette"
import { intersection } from "lodash"
import * as React from "react"
import styled from "styled-components"
import {
  SelectedFiltersCountsLabels,
  useArtworkFilterContext,
} from "../ArtworkFilterContext"
import { sortResults } from "./ResultsFilter"
import { FilterExpandable } from "./FilterExpandable"
import { INITIAL_ITEMS_TO_SHOW, ShowMore } from "./ShowMore"
import { useFilterLabelCountByKey } from "../Utils/useFilterLabelCountByKey"

export const COLOR_OPTIONS = [
  { hex: "#ffffff", value: "black-and-white", name: "Black and White" },
  { hex: "#ff0000", value: "red", name: "Red" },
  { hex: "#fbe854", value: "yellow", name: "Yellow" },
  { hex: "#f7923a", value: "orange", name: "Orange" },
  { hex: "#fb81cd", value: "pink", name: "Pink" },
  { hex: "#b82c83", value: "violet", name: "Violet" },
  { hex: "#daa520", value: "gold", name: "Gold" },
  { hex: "#f1572c", value: "darkorange", name: "Dark Orange" },
  { hex: "#217c44", value: "darkgreen", name: "Dark Green" },
  { hex: "#0a1ab4", value: "darkblue", name: "Dark Blue" },
  { hex: "#642b7f", value: "darkviolet", name: "Dark Violet" },
  { hex: "#bccc46", value: "lightgreen", name: "Light Green" },
  { hex: "#c2d5f1", value: "lightblue", name: "Light Blue" },
]

type ColorOption = typeof COLOR_OPTIONS[number]

const ColorSwatch = styled.div`
  width: ${space(2)}px;
  height: ${space(2)}px;
  border-radius: ${space(2)}px;
  flex-shrink: 0;
`

const BlackAndWhiteSwatch = styled(ColorSwatch)`
  position: relative;
  overflow: hidden;
  border: 1px solid ${color("black10")};
  transform: rotate(-135deg);

  &::after {
    content: "";
    display: block;
    width: 100%;
    height: 50%;
    position: absolute;
    top: 0;
    left: 0;
    background-color: ${color("black100")};
  }
`

const ColorFilterOption: React.FC<{ colorOption: ColorOption }> = ({
  colorOption,
}) => {
  const { name, value, hex } = colorOption

  const { currentlySelectedFilters, setFilter } = useArtworkFilterContext()
  const selectedColorOptions = currentlySelectedFilters?.().colors ?? []

  const toggleColor = (color: string) => {
    if (selectedColorOptions.includes(color)) {
      setFilter(
        "colors",
        selectedColorOptions.filter(selectedColor => color !== selectedColor)
      )
    } else {
      setFilter("colors", [...selectedColorOptions, color])
    }
  }

  const tokens = useThemeConfig({
    v2: { my: 0.5 },
    v3: { my: 1 },
  })

  return (
    <Checkbox
      key={name}
      onSelect={() => toggleColor(value)}
      selected={selectedColorOptions.includes(value)}
      my={tokens.my}
    >
      <Box
        display="flex"
        width="65%"
        justifyContent="space-between"
        alignItems="center"
      >
        <Text textAlign="left" variant="text" lineHeight={1}>
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
  const { currentlySelectedFilters } = useArtworkFilterContext()

  const filtersCount = useFilterLabelCountByKey(
    SelectedFiltersCountsLabels.colors
  )
  const label = `Color${filtersCount}`

  const hasBelowTheFoldColorFilter =
    intersection(
      currentlySelectedFilters?.().colors ?? [],
      COLOR_OPTIONS.slice(INITIAL_ITEMS_TO_SHOW).map(({ value }) => value)
    ).length > 0
  const hasColorFilter = (currentlySelectedFilters?.().colors?.length ?? 0) > 0
  const resultsSorted = sortResults(
    currentlySelectedFilters?.().colors ?? [],
    COLOR_OPTIONS
  )
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
