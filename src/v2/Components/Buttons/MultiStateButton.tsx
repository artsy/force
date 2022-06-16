import colors from "v2/Assets/Colors"
import { avantgarde } from "v2/Assets/Fonts"
import * as React from "react";
import styled from "styled-components"
import { block } from "../Helpers"

export interface ButtonProps extends React.HTMLProps<Button> {
  state?: MultiButtonState
  block?: boolean
}

export enum MultiButtonState {
  Default = "Default",
  Highlighted = "Highlighted",
}

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

export const StyledButton = styled(Button)`
  ${avantgarde("s13")};
  background: ${props => {
    if (props.state === MultiButtonState.Highlighted) return "black"
    return "white"
  }};
  color: ${props => {
    if (props.disabled) return "rgba(0,0,0,0.5)"
    if (props.state === MultiButtonState.Highlighted) return "white"
    return "black"
  }};
  border: ${props => {
    if (props.state !== MultiButtonState.Default) return "none"
    return `solid 1px ${colors.grayRegular}`
  }};
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 15px 30px;
  font-size: 13px;
  line-height: 1;
  outline: 0;
  transition: background-color 0.25s, color 0.25s;
  margin: 10px;
  box-sizing: border-box;
  text-decoration: none;

  &:hover:not(:disabled) {
    color: white;
    cursor: pointer;
    background: ${colors.purpleRegular};
  }

  ${block()};
`

StyledButton.defaultProps = {
  state: MultiButtonState.Default,
  block: false,
}

export default StyledButton
