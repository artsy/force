import { Display, Flex, themeProps } from "@artsy/palette"
import React from "react"
import styled from "styled-components"
import { BackgroundProps, color, ColorProps } from "styled-system"

// http://24ways.org/2010/calculating-color-contrast/
function getContrast(hex) {
  const r = parseInt(hex.substr(1, 2), 16)
  const g = parseInt(hex.substr(3, 2), 16)
  const b = parseInt(hex.substr(5, 2), 16)
  const yiq = (r * 299 + g * 587 + b * 114) / 1000
  return yiq >= 128 ? "black" : "white"
}
const visibleColor = name => getContrast(themeProps.colors[name])

export interface ColorBlockProps extends ColorProps, BackgroundProps {}

const ColorBlock = styled.div.attrs<ColorBlockProps>({})`
  width: 100px;
  height: 100px;
  padding: 5px;
  ${color};
`

const LabeledColorBlock = ({ name }) => (
  <ColorBlock bg={name}>
    <Flex flexDirection="column">
      <Display color={visibleColor(name)} size="4t">
        {name.toUpperCase()}
      </Display>
      <Display color={visibleColor(name)} size="4t">
        {themeProps.colors[name]}
      </Display>
    </Flex>
  </ColorBlock>
)

const Grid = styled.div`
  display: grid;
  grid-template-columns: 100px 100px 100px 100px;
  grid-gap: 10px;
`

export const ColorPreview = () => (
  <Grid>
    {Object.keys(themeProps.colors).map((name, key) => (
      <LabeledColorBlock name={name} key={key} />
    ))}
  </Grid>
)
