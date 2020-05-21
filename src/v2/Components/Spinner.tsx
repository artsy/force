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
  const base = { width: 25, height: 6 }

  // tslint:disable-next-line
  switch (props.spinnerSize) {
    case "small":
      return {
        width: base.width * 0.5,
        height: base.height * 0.5,
      }
    case "medium":
      return {
        width: base.width * 0.8,
        height: base.height * 0.8,
      }
    case "large":
      return {
        width: base.width,
        height: base.height,
      }
    default:
      return {
        width: props.width,
        height: props.height,
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
  width: 25,
  height: 6,
}

export default StyledSpinner
