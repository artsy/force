import Colors from "v2/Assets/Colors"
import { media } from "v2/Components/Helpers"
import { Component } from "react";
import styled from "styled-components"

interface Props {
  percentComplete: number
}

/**
 * @deprecated in favor of our Design System ProgressBar component in @artsy/palette
 * https://palette.artsy.net/elements/loaders/progressbar
 */
export class ProgressIndicator extends Component<Props, null> {
  static defaultProps = {
    percentComplete: 0,
  }

  render() {
    const { percentComplete } = this.props

    return (
      <ProgressIndicatorContainer>
        <CompletionBar percentComplete={percentComplete} />
      </ProgressIndicatorContainer>
    )
  }
}

export const ProgressIndicatorContainer = styled.div`
  width: 100%;
  height: 6px;
  background-color: ${Colors.grayRegular};
  ${media.sm`
    height: 3px;
  `};
`

const CompletionBar = styled.div`
  width: ${(props: Props) => `calc(100% * ${props.percentComplete})`};
  height: 100%;
  background-color: black;
  transition: width 0.25s ease-in;
`

CompletionBar.displayName = "CompletionBar"
