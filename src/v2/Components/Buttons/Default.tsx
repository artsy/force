import colors from "v2/Assets/Colors"
import { avantgarde } from "v2/Assets/Fonts"
import * as React from "react";
import styled from "styled-components"
import { block } from "../Helpers"

export interface ButtonProps extends React.HTMLProps<"button"> {
  state?: ButtonState
  block?: boolean
  color?: string
}

export enum ButtonState {
  Default,
  Loading,
  Success,
  Failure,
}

/**
 * @deprecated in favor of our Design System Button in @artsy/palette
 * https://palette.artsy.net/elements/buttons/button/
 */
export class Button extends React.Component<ButtonProps, any> {
  public static defaultProps: ButtonProps

  render(): JSX.Element {
    // TODO Do we really need to pass an opaque object along or do we know which props should be passed along?
    const newProps: any = { ...this.props }
    delete newProps.state
    delete newProps.block

    return this.props.href ? (
      <a className={this.props.className} {...newProps}>
        <span>{this.props.children}</span>
      </a>
    ) : (
      <button className={this.props.className} {...newProps}>
        <span>{this.props.children}</span>
      </button>
    )
  }
}

export const StyledButton = styled(Button)<ButtonProps>`
  ${avantgarde("s13")};
  background: ${props => {
    if (props.state === ButtonState.Success) return colors.greenRegular
    if (props.state === ButtonState.Failure) return colors.redRegular

    return colors.grayRegular
  }};
  color: ${props => {
    if (props.disabled) return "rgba(0,0,0,0.5)"
    if (props.state !== ButtonState.Default) return "white"
    return "black"
  }};
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 15px 30px;
  line-height: 1;
  outline: 0;
  transition: background-color 0.25s, color 0.25s;
  margin: 10px;
  border: none;
  box-sizing: border-box;
  text-decoration: none;
  border-radius: 2px;

  &:hover:not(:disabled) {
    cursor: pointer;
    background: ${props => {
      if (props.state === ButtonState.Success) return colors.greenBold
      if (props.state === ButtonState.Failure) return colors.redBold

      return colors.grayMedium
    }};
  }

  ${block()};
`

StyledButton.defaultProps = {
  state: ButtonState.Default,
  block: false,
}

export default StyledButton
