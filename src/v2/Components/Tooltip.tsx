import { unica } from "v2/Assets/Fonts"
import * as React from "react";
import styled from "styled-components"
import colors from "../Assets/Colors"

interface Props extends React.HTMLProps<HTMLDivElement> {
  horizontalAlign?: string
  hoverWidth?: number
  message: string
  verticalAlign?: string
}

const TooltipContainer = styled.div<Props>`
  ${unica("s12", "regular")};
  display: inline-block;
  position: relative;
  cursor: help;
  margin: 0 0.5em;
  width: 14px;
  height: 14px;
  margin-bottom: -2px;

  &::before {
    display: block;
    top: 0;
    left: 0;
    position: absolute;
    content: "";
    z-index: 2;
    width: 14px;
    height: 14px;
    border-radius: 50%;
    line-height: 15px;
    text-align: center;
    color: white;
  }
  &:hover {
    &::before {
      visibility: hidden;
    }
    &::after {
      opacity: 1;
      z-index: 3;
      visibility: visible;
    }
  }
  &::after {
    display: block;
    top: ${props => (props.verticalAlign === "top" ? `0` : "inherit")};
    bottom: ${props => (props.verticalAlign === "bottom" ? `-7px` : "inherit")};
    left: ${props => (props.horizontalAlign === "right" ? `0` : "inherit")};
    right: ${props => (props.horizontalAlign === "left" ? `-7px` : "inherit")};
    position: absolute;
    visibility: hidden;
    text-align: left;
    z-index: 1;
    margin: -10px 0 0 -10px;
    width: ${props => props.hoverWidth + `px`};
    color: ${colors.graySemibold};
    font-weight: normal;
    background-color: white;
    padding: 20px;
    opacity: 0;
    margin: 0;
    transform: translateZ(0);
    border: 1px solid ${colors.grayRegular};
    content: ${props => `"` + props.message + `"`};
  }
`

/**
 * @deprecated in favor of our Design System Tooltip component in @artsy/palette
 * https://palette.artsy.net/elements/inputs/tooltip
 */
export class Tooltip extends React.Component<Props, null> {
  render() {
    return (
      <TooltipContainer
        message={this.props.message}
        horizontalAlign={this.props.horizontalAlign || "right"}
        verticalAlign={this.props.verticalAlign || "top"}
        hoverWidth={this.props.hoverWidth || 300}
        className={this.props.className}
      >
        {this.props.children}
      </TooltipContainer>
    )
  }
}
