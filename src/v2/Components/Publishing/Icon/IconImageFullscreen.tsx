import React from "react"

export const IconImageFullscreen: React.SFC<{ fill?: string }> = ({
  fill = "black",
}) => {
  return (
    <svg
      className="image-fullscreen"
      width="38px"
      height="22px"
      viewBox="0 0 38 22"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
        <rect
          fill={fill}
          fillRule="nonzero"
          x="0"
          y="0"
          width="38"
          height="22"
        />
        >
      </g>
    </svg>
  )
}
