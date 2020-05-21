import { color } from "@artsy/palette"
import React from "react"

export const IconLayoutBasic: React.SFC<{ fill?: string }> = ({ fill }) => {
  return (
    <svg
      className="layout-basic"
      width="45px"
      height="30px"
      viewBox="0 0 45 30"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
        <g
          className="layout-basic-group"
          fill={fill ? fill : color("black100")}
        >
          <polyline points="6 25 40 25 40 23 6 23" />
          <polyline points="10 30 36 30 36 28 10 28" />
          <rect x="0" y="0" width="45" height="20" />
        </g>
      </g>
    </svg>
  )
}
