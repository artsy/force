import { Box, ProgressBar } from "@artsy/palette"
import { random } from "lodash"
import React from "react"
import styled, { css, keyframes } from "styled-components"

interface PageLoaderProps {
  className?: string
  complete?: boolean
  percentComplete?: number
  showBackground?: boolean
  step?: number
  style?: any // FIXME: any
}

interface PageLoaderState {
  progress: number
}

/**
 * A top-level loading bar used when transitioning between pages.
 *
 * Spec: https://app.zeplin.io/project/5acd19ff49a1429169c3128b/screen/5d7166295b4fca9d4724c13d
 */
export class PageLoader extends React.Component<
  PageLoaderProps,
  PageLoaderState
> {
  state = {
    progress: 0,
    // @ts-expect-error STRICT_NULL_CHECK
    step: random(1, this.props.step),
  }

  static defaultProps = {
    showBackground: true,
    style: {},
    step: 2,
  }

  currentProgress = 0
  interval

  constructor(props) {
    super(props)
    this.currentProgress = this.props.percentComplete || 0

    this.state = {
      progress: this.currentProgress,
      step: this.state.step,
    }
  }

  componentDidMount() {
    this.interval = setInterval(() => {
      this.currentProgress += this.state.step
      this.setState({
        progress:
          Math.round(
            (Math.atan(this.currentProgress) / (Math.PI / 1.5)) * 100 * 1000
          ) / 1000,
      })
    }, 100)
  }

  componentWillUnmount() {
    clearInterval(this.interval)
  }

  render() {
    const { showBackground, style, className } = this.props
    const { progress } = this.state
    const isComplete = progress === 100

    const animation = isComplete
      ? ANIMATION_STATES.hidden
      : ANIMATION_STATES.visible

    return (
      <Box width="100%" style={style} className={className}>
        <AnimatedBox animation={animation} position="relative">
          <ProgressBar
            percentComplete={progress}
            highlight="purple100"
            showBackground={showBackground}
          />
        </AnimatedBox>
      </Box>
    )
  }
}

const fadein = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`

const fadeout = keyframes`
0% {
  opacity: 1;
}
100% {
  opacity: 0;
}
`

const ANIMATION_STATES = {
  hidden: css`
    ${fadeout} 0.1s linear;
  `,
  visible: css`
    ${fadein} 0.1s linear;
  `,
}

const AnimatedBox = styled(Box)<{
  animation: any
}>`
  ${({ ...props }) => css`
    animation: ${props.animation};
  `}
`
