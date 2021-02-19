import { Checkbox, space, color, Toggle, Box } from "@artsy/palette"
import React from "react"
import styled from "styled-components"
import { useArtworkFilterContext } from "../ArtworkFilterContext"
import { OptionText } from "./OptionText"
import { ShowMore } from "./ShowMore"

const PRIMARY_COLOR_OPTIONS = [
  { hex: "#ffffff", value: "black-and-white", name: "Black and white" },
  { hex: "#ff0000", value: "red", name: "Red" },
  { hex: "#fbe854", value: "yellow", name: "Yellow" },
  { hex: "#f7923a", value: "orange", name: "Orange" },
  { hex: "#fb81cd", value: "pink", name: "Pink" },
  { hex: "#b82c83", value: "violet", name: "Violet" },
  { hex: "#daa520", value: "gold", name: "Gold" },
]

type ColorOption = typeof PRIMARY_COLOR_OPTIONS[number]

const SECONDARY_COLOR_OPTIONS: ColorOption[] = [
  { hex: "#f1572c", value: "darkorange", name: "Dark orange" },
  { hex: "#217c44", value: "darkgreen", name: "Dark green" },
  { hex: "#0a1ab4", value: "darkblue", name: "Dark blue" },
  { hex: "#642b7f", value: "darkviolet", name: "Dark violet" },
  { hex: "#bccc46", value: "lightgreen", name: "Light green" },
  { hex: "#c2d5f1", value: "lightblue", name: "Light blue" },
]

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

  const {
    currentlySelectedFilters,
    setFilter,
    unsetFilter,
  } = useArtworkFilterContext()
  const { color: selectedColorOption } = currentlySelectedFilters()

  const toggleColor = (color: string) => {
    if (selectedColorOption === color) {
      unsetFilter("color")
    } else {
      setFilter("color", color)
    }
  }

  return (
    <Checkbox
      key={name}
      onSelect={() => toggleColor(value)}
      selected={selectedColorOption === value}
    >
      <OptionText display="flex" width="65%" justifyContent="space-between">
        <Box textAlign="left">{name}</Box>

        {value === "black-and-white" ? (
          <BlackAndWhiteSwatch />
        ) : (
          <ColorSwatch style={{ backgroundColor: hex }} />
        )}
      </OptionText>
    </Checkbox>
  )
}

interface ColorFilterProps {
  expanded?: boolean
}

export const ColorFilter: React.FC<ColorFilterProps> = ({
  expanded = false,
}) => {
  return (
    <Toggle label="Color" expanded={expanded}>
      {PRIMARY_COLOR_OPTIONS.map(colorOption => {
        return (
          <ColorFilterOption
            key={colorOption.value}
            colorOption={colorOption}
          />
        )
      })}

      <ShowMore>
        {SECONDARY_COLOR_OPTIONS.map(colorOption => {
          return (
            <ColorFilterOption
              key={colorOption.value}
              colorOption={colorOption}
            />
          )
        })}
      </ShowMore>
    </Toggle>
  )
}
