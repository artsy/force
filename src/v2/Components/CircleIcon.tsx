import React from "react"
import styled from "styled-components"
import "../Assets/Fonts"
import Icon, { IconProps } from "./Icon"

interface CircleIconProps extends IconProps {
  ratio?: number
}

const CircleIconContainer = styled.div<CircleIconProps>`
  width: ${props => props.fontSize || "24px"};
  height: ${props => props.fontSize || "24px"};
  background-color: ${props => props.color || "purple"};
  border-radius: 50%;
  vertical-align: text-bottom;
  display: inline-flex;
  justify-content: center;
`

const CircleIcon: React.SFC<CircleIconProps> = (props: CircleIconProps) => {
  // TODO: refactor this to be less messy and easier to type
  const { ref, ...reminderProps } = props as any

  return (
    <CircleIconContainer {...reminderProps}>
      <Icon
        {...reminderProps}
        color="white"
        fontSize={`${
          parseInt(props.fontSize || "24px", 10) * (props.ratio || 0.55)
        }px`}
        style={{ alignSelf: "center", margin: 0 }}
      />
    </CircleIconContainer>
  )
}

export default CircleIcon
