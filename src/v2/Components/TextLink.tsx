import { garamond } from "v2/Assets/Fonts"
import React from "react"
import styled from "styled-components"
import colors from "../Assets/Colors"

export interface LinkProps
  extends React.Props<TextLink>,
    React.HTMLAttributes<TextLink> {
  href?: string
  underline?: boolean
  color?: string
  target?: string
}

/**
 * @deprecated in favor of our Design System Link component in @artsy/palette
 * https://palette.artsy.net/elements/buttons/link
 */
export class TextLink extends React.Component<LinkProps, null> {
  public static defaultProps: LinkProps = {
    target: "_self",
  }

  render() {
    return (
      <a
        href={this.props.href}
        className={this.props.className}
        target={this.props.target}
      >
        {this.props.children}
      </a>
    )
  }
}

const StyledTextLink = styled(TextLink)`
  ${garamond("s15")};
  color: ${props => props.color};
  text-decoration: ${props => (props.underline ? "underline" : "none")};
`

StyledTextLink.defaultProps = {
  underline: false,
  color: colors.grayBold,
}

export default StyledTextLink
