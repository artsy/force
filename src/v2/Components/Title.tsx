import { garamond } from "v2/Assets/Fonts"
import * as React from "react";
import styled from "styled-components"
import { media } from "./Helpers"

export type TitleSize = "xxsmall" | "small" | "medium" | "large" | "xlarge"

export interface TitleProps extends React.HTMLProps<HTMLDivElement> {
  titleSize?: TitleSize
  color?: string
}

const titleSizes = {
  xxsmall: "s15",
  small: "s23",
  medium: "s30",
  large: "s37",
  xlarge: "s50",
}

/**
 * @deprecated in favor of our Design System Typography components in @artsy/palette
 * https://palette.artsy.net/atoms/typography
 */
const Title: React.SFC<TitleProps> = props => {
  const newProps: TitleProps = { ...props }
  delete newProps.titleSize

  return <div {...newProps}>{props.children}</div>
}

const StyledTitle = styled(Title)`
  color: ${props => props.color};
  margin: 20px 0;
  ${p =>
    // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
    garamond(titleSizes[p.titleSize] as any)};
  ${media.sm`
    font-size: ${titleSizes.small};
  `};
`

StyledTitle.defaultProps = {
  titleSize: "medium",
  color: "inherit",
}

export default StyledTitle
