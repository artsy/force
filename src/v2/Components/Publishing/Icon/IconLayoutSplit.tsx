import { color } from "@artsy/palette"
import React from "react"

export const IconLayoutSplit: React.SFC<{ fill?: string }> = ({ fill }) => {
  return (
    <svg
      className="layout-split"
      width="45px"
      height="30px"
      viewBox="0 0 45 30"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
        <g
          className="layout-split-group"
          fill={fill ? fill : color("black100")}
        >
          <g>
            <polyline points="0 2 20 2 20 0 0 0" />
            <polyline points="0 7 20 7 20 5 0 5" />
            <polyline points="0 12 16 12 16 10 0 10" />
            <rect x="25" y="0" width="20" height="30" />
          </g>
        </g>
      </g>
    </svg>
  )
}
