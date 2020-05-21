import { color } from "@artsy/palette"
import React from "react"

export const IconLayoutText: React.SFC<{ fill?: string }> = ({ fill }) => {
  return (
    <svg
      className="layout-text"
      width="45px"
      height="30px"
      viewBox="0 0 45 30"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
        <g className="layout-text-group" fill={fill ? fill : color("black100")}>
          <polyline points="0 2 34 2 34 0 0 0" />
          <polyline points="0 7 26 7 26 5 0 5" />
          <rect x="0" y="10" width="45" height="20" />
        </g>
      </g>
    </svg>
  )
}
