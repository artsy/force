import {
  Checkbox,
  Box,
  Text,
  Spacer,
  GridColumns,
  Column,
} from "@artsy/palette"
import * as React from "react"
import styled from "styled-components"
import { themeGet } from "@styled-system/theme-get"
import { COLOR_OPTIONS } from "Components/ArtworkFilter/ArtworkFilters/ColorFilter"
import { useAlertContext } from "Components/Alert/Hooks/useAlertContext"

type ColorOption = typeof COLOR_OPTIONS[number]

const ColorFilterOption: React.FC<{ colorOption: ColorOption }> = ({
  colorOption,
}) => {
  const { state, dispatch } = useAlertContext()
  const { name, value, hex } = colorOption

  const toggleColor = (selected: boolean, color: string) => {
    let updatedValues = (state.criteria.colors || []) as string[]

    if (selected) {
      updatedValues = [...updatedValues, color]
    } else {
      updatedValues = updatedValues.filter(
        selectedColor => color !== selectedColor
      )
    }

    dispatch({
      type: "SET_CRITERIA_ATTRIBUTE",
      payload: { key: "colors", value: updatedValues },
    })
  }

  return (
    <>
      <Checkbox
        key={name}
        onSelect={selected => toggleColor(selected, value)}
        selected={state.criteria.colors?.includes(value)}
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
    </>
  )
}

export const Color: React.FC = () => {
  return (
    <>
      <Text variant="sm-display">Colors</Text>
      <Spacer y={2} />
      <GridColumns>
        {COLOR_OPTIONS.map(colorOption => {
          return (
            <Column span={6} key={colorOption.value}>
              <ColorFilterOption
                key={colorOption.value}
                colorOption={colorOption as any}
              />
            </Column>
          )
        })}
      </GridColumns>
    </>
  )
}

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
