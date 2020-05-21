import React from "react"
import styled from "styled-components"

interface Props {
  orientation?: string
}

export const Arrow: React.SFC<Props> = props => {
  return (
    <ArrowContainer>
      <ArrowBody {...props} />
      <ArrowShadow {...props} />
    </ArrowContainer>
  )
}

Arrow.defaultProps = {
  orientation: "up",
}

export const ArrowContainer = styled.div`
  position: relative;
`

const ArrowBody = styled.div.attrs<Props>({})`
  position: absolute;
  left: 0;
  top: 0;
  width: 0;
  height: 0;
  border-left: 20px solid transparent;
  border-right: 20px solid transparent;
  z-index: 1;
  ${props =>
    props.orientation === "up"
      ? `border-bottom: 20px solid white;`
      : `border-top: 20px solid white;`};
`

const ArrowShadow = styled.div.attrs<Props>({})`
  position: absolute;
  left: 5px;
  width: 0;
  height: 0;
  border-left: 15px solid transparent;
  border-right: 15px solid transparent;
  filter: drop-shadow(0 0 4px rgba(0, 0, 0, 0.15));
  ${props =>
    props.orientation === "up"
      ? `
      border-bottom: 15px solid white;
      top: 0px;
    `
      : `
      border-top: 15px solid white;
      top: 5px;
    `};
`
