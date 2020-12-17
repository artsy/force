import React from "react"
import styled from "styled-components"
import * as fonts from "../Assets/Fonts"

export type TextAlign = "start" | "center" | "end"
export type TextSize = "small" | "medium" | "large" | "xlarge"
export type TextStyle = "primary" | "secondary"

export interface TextProps extends React.HTMLProps<HTMLParagraphElement> {
  textSize?: TextSize
  textStyle?: TextStyle
  align?: TextAlign
  color?: string
}

const textSizesForPrimaryStyle = {
  large: "17px",
  medium: "15px",
  small: "13px",
  xlarge: "24px",
  xsmall: "11px",
}

const textSizesForSecondaryStyle = {
  large: "20px",
  medium: "17px",
  small: "15px",
  xlarge: "26px",
  xsmall: "11px",
}

const TextStyleToTextSize = {
  primary: textSizesForPrimaryStyle,
  secondary: textSizesForSecondaryStyle,
}

const textStyleNameToCss = {
  primary: fonts.avantgarde("s11"),
  secondary: fonts.garamond("s11"),
}

const RawText: React.SFC<TextProps> = (props: TextProps) => {
  const { textSize, textStyle, align, color, ...remainderProps } = props

  return <p {...remainderProps}>{props.children}</p>
}

/**
 * @deprecated in favor of our Design System Typography components in @artsy/palette
 * https://palette.artsy.net/tokens/typography
 */
const Text = styled(RawText)`
  ${props => textStyleNameToCss[props.textStyle]};
  font-size: ${props => TextStyleToTextSize[props.textStyle][props.textSize]};
  text-align: ${props => props.align};
  color: ${props => props.color};
`

Text.defaultProps = {
  align: "start",
  color: "currentcolor",
  textSize: "small",
  textStyle: "secondary",
}

export default Text
