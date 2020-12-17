import React from "react"

import styled, { keyframes } from "styled-components"

interface Props extends React.HTMLProps<Spinner> {
  width?: number
  height?: number
  spinnerSize?: "small" | "medium" | "large"
}

/**
 * @deprecated in favor of our Design System Spinner component in @artsy/palette
 * https://palette.artsy.net/elements/loaders/spinner
 */
export class Spinner extends React.Component<Props> {
  render() {
    return <div className={this.props.className} />
  }
}

const spin = keyframes`
  100% {
    transform: rotate(360deg);
  }
`

const getSize = props => {
  const base = { height: 6, width: 25 }

  // tslint:disable-next-line
  switch (props.spinnerSize) {
    case "small":
      return {
        height: base.height * 0.5,
        width: base.width * 0.5,
      }
    case "medium":
      return {
        height: base.height * 0.8,
        width: base.width * 0.8,
      }
    case "large":
      return {
        height: base.height,
        width: base.width,
      }
    default:
      return {
        height: props.height,
        width: props.width,
      }
  }
}

const StyledSpinner = styled(Spinner)`
  background: black;
  animation: ${spin} 1s infinite linear;
  position: absolute;

  ${(props: Props) => {
    const { width, height } = getSize(props)

    return `
      width: ${width}px;
      height: ${height}px;
      top: calc(50% - ${height}px / 2);
      left: calc(50% - ${width}px / 2);
    `
  }};
`

StyledSpinner.defaultProps = {
  height: 6,
  width: 25,
}

export default StyledSpinner
