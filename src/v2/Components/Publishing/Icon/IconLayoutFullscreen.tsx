import { color } from "@artsy/palette"
import React from "react"

export const IconLayoutFullscreen: React.SFC<{ fill?: string }> = ({
  fill,
}) => {
  return (
    <svg
      className="layout-fullscreen"
      width="45px"
      height="30px"
      viewBox="0 0 45 30"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
        <g
          className="layout-fullscreen-group"
          fill={fill ? fill : color("black100")}
        >
          <path d="M0,0 L45,0 L45,30 L0,30 L0,0 Z M3,22 L37,22 L37,20 L3,20 L3,22 Z M3,27 L29,27 L29,25 L3,25 L3,27 Z" />
        </g>
      </g>
    </svg>
  )
}
