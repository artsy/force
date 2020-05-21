import React from "react"
import styled from "styled-components"

interface Props extends React.HTMLProps<HTMLDivElement> {
  color?: string
}

const Icon: React.SFC<Props> = props => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="30px"
    height="30px"
    viewBox="0 0 30 30"
  >
    <g fill={props.color}>
      <polygon points="29.5142857 28 19.1285714 17.6142857 9.55714286 8.04285714 1.51428571 0 0 1.51428571 6.52857143 8.04285714 0.757142857 8.04285714 0.757142857 21.4714286 11.8285714 21.4714286 19.1285714 28.7571429 19.1285714 20.6428571 28 29.5142857" />
      <polygon points="19.1285714 0.757142857 11.8285714 8.04285714 11.8285714 8.04285714 19.1285714 15.3428571" />
    </g>
  </svg>
)

Icon.defaultProps = {
  color: "black",
}

export const IconVideoUnmute = styled(Icon).attrs<{
  suppressClassNameWarning?: boolean
}>({
  suppressClassNameWarning: true,
})`
  width: 32px;
  height: 32px;
`
