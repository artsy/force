import { pMedia } from "v2/Components/Helpers"
import React from "react"
import styled from "styled-components"

interface Props extends React.HTMLProps<HTMLDivElement> {
  color?: string
}

const Icon: React.SFC<Props> = props => (
  <svg
    className={props.className}
    viewBox="0 0 15 15"
    version="1.1"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g stroke="none" strokeWidth="2" fill="none" fillRule="evenodd">
      <g
        transform="translate(-101.000000, -18.000000)"
        fill={props.color ? props.color : "black"}
      >
        <g transform="translate(101.000000, 18.000000)">
          <rect x="0" y="7" width="15" height="1" />
          <rect
            transform="translate(7.500000, 7.500000) rotate(-90.000000) translate(-7.500000, -7.500000) "
            x="0"
            y="7"
            width="15"
            height="1"
          />
        </g>
      </g>
    </g>
  </svg>
)

export const IconPlus = styled(Icon).attrs<{
  suppressClassNameWarning?: boolean
}>({
  suppressClassNameWarning: true,
})`
  width: 15px;
  height: 15px;
  ${pMedia.md`
    width: 13px;
    height: 13px;
  `};
`
