import React from "react"
import styled from "styled-components"

interface Props extends React.HTMLProps<HTMLDivElement> {
  color?: string
}

const Icon: React.SFC<Props> = props => (
  <svg xmlns="http://www.w3.org/2000/svg" width="30px" height="30px">
    <g fill={props.color}>
      <path d="M19.1285714,15.3428571 L19.1285714,28.7571429 L11.8285714,21.4714286 L0.757142857,21.4714286 L0.757142857,8.04285714 L11.8285714,8.04285714 L19.1285714,0.757142857 L19.1285714,15.3428571 Z" />
    </g>
  </svg>
)

Icon.defaultProps = {
  color: "black",
}

export const IconVideoMute = styled(Icon).attrs<{
  suppressClassNameWarning?: boolean
}>({
  suppressClassNameWarning: true,
})`
  width: 32px;
  height: 32px;
`
