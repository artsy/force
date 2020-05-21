import React from "react"
import styled from "styled-components"

interface Props extends React.HTMLProps<HTMLDivElement> {
  color?: string
}

const Icon: React.SFC<Props> = props => (
  <svg
    x="0px"
    y="0px"
    viewBox="0 0 40 56"
    version="1.1"
    xmlns="http://www.w3.org/2000/svg"
    className={props.className}
  >
    <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
      <polygon fill={props.color} points="0 0 0 56 39.3600006 28" />
    </g>
  </svg>
)

Icon.defaultProps = {
  color: "black",
}

export const IconVideoPlay = styled(Icon).attrs<{
  suppressClassNameWarning?: boolean
}>({
  suppressClassNameWarning: true,
})`
  width: 32px;
  height: 32px;
`
