import { unica } from "v2/Assets/Fonts"
import { Component } from "react";
import { ReactNode } from "react"
import styled from "styled-components"
import colors from "../../Assets/Colors"
import Text from "../Text"
import { CheckIcon } from "@artsy/palette"

export interface RenderProps {
  nextStep: () => void
  previousStep: () => void
  gotoStep: (index: number) => void
  stepState: StepMarkerState
  isComplete: () => boolean
}

export interface StepMarkerProps {
  children?: (renderProps: RenderProps) => ReactNode | void
  steps: MarkLabel[]
  style?: any
  onChange?: any
  currentStepIndex: number
}

export interface StepMarkerState {
  currentStepIndex: number
  steps: MarkState[]
}

export type MarkState = MarkLabel & { isActive: boolean; isComplete: boolean }

export interface MarkLabel {
  label?: string
  onClick?: any
}

export class StepMarker extends Component<StepMarkerProps, StepMarkerState> {
  constructor(props: StepMarkerProps) {
    super(props)
    this.state = this.computeStepState(props)
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.currentStepIndex !== this.props.currentStepIndex) {
      this.setState(this.computeStepState(nextProps))
    }
  }

  computeStepState(props) {
    const { currentStepIndex, steps } = props
    const stepState = steps.map((step, i) => {
      const isActive = i === currentStepIndex
      const isComplete = i < currentStepIndex
      return { ...step, isActive, isComplete }
    })
    return {
      steps: stepState,
      currentStepIndex,
    }
  }

  render() {
    const { style } = this.props
    const { steps } = this.state

    return (
      <Container style={style}>
        <Markers>
          {steps.map((step, key) => {
            return (
              <Mark {...step} key={key}>
                {step.isComplete && <StyledIcon fill="white100" />}
                <StyledText onClick={step.onClick} align="center">
                  {step.label}
                </StyledText>
              </Mark>
            )
          })}
        </Markers>
      </Container>
    )
  }
}

const Container = styled.div`
  padding: 20px;
`

const Markers = styled.div`
  display: flex;
`

const Mark = styled.div`
  ${(props: MarkState) => {
    const { isActive, isComplete } = props
    const circleSize = "10px" // + 2px border
    let bgColor = colors.white
    let circleBorderColor = colors.grayRegular
    let connectingBorderColor = colors.grayRegular

    if (isActive) {
      bgColor = colors.white
      circleBorderColor = colors.black
    }
    if (isComplete) {
      bgColor = colors.black
      circleBorderColor = colors.black
      connectingBorderColor = colors.black
    }

    return `
      position: relative;
      padding: 12px;
      text-align: center;
      width: 100%;

      &::before {
        background: ${bgColor};
        border-radius: 50%;
        border: 2px solid ${circleBorderColor};
        top: calc(-${circleSize} / 2);
        left: calc(50% - calc(${circleSize} / 2));
        width: ${circleSize};
        height: ${circleSize};
        position: absolute;
        content: " ";
        z-index: 2;
      }

      &::after {
        border-top: 2px solid ${connectingBorderColor};
        width: 100%;
        left: 50%;
        top: 1px;
        position: absolute;
        content: " ";
      }

      &:last-child:after {
        border-top: none;
      }
    `
  }};
`

const StyledText = styled(Text)`
  ${unica("s12", "regular")};
  margin-top: 0;
  margin-bottom: 0;
`

const StyledIcon = styled(CheckIcon)`
  width: 100%;
  text-align: center;
  font-size: 6px;
  color: white;
  position: absolute;
  top: -1px;
  left: -3px;
  z-index: 3;
`
