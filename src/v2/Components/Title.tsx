import { garamond } from "v2/Assets/Fonts"
import React from "react"
import styled from "styled-components"
import { media } from "./Helpers"

export type TitleSize = "xxsmall" | "small" | "medium" | "large" | "xlarge"

export interface TitleProps extends React.HTMLProps<HTMLDivElement> {
  titleSize?: TitleSize
  color?: string
}

const titleSizes = {
  large: "s37",
  medium: "s30",
  small: "s23",
  xlarge: "s50",
  xxsmall: "s15",
}

/**
 * @deprecated in favor of our Design System Typography components in @artsy/palette
 * https://palette.artsy.net/tokens/typography
 */
const Title: React.SFC<TitleProps> = props => {
  const newProps: TitleProps = { ...props }
  delete newProps.titleSize

  return <div {...newProps}>{props.children}</div>
}

const StyledTitle = styled(Title)`
  color: ${props => props.color};
  margin: 20px 0;
  ${p => garamond(titleSizes[p.titleSize] as any)};
  ${media.sm`
    font-size: ${titleSizes.small};
  `};
`

StyledTitle.defaultProps = {
  color: "inherit",
  titleSize: "medium",
}

export default StyledTitle
