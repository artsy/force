import React from "react"

export const IconEditImages: React.SFC<{ width?: string }> = ({
  width = "45px",
}) => {
  return (
    <svg
      className="edit-images"
      x="0px"
      y="0px"
      width={width}
      viewBox="0 0 41.446 43.434"
      enableBackground="new 0 0 41.446 43.434"
      xmlns="http://www.w3.org/2000/svg"
    >
      <polygon points="39.364,40.948 11.958,40.948 11.958,37.681 36.097,37.681 36.097,22.278 39.364,22.278 " />
      <polygon points="13.666,9.25 17.277,4.85 20.888,9.25 24.057,9.25 17.277,0.989 10.496,9.25 " />
      <rect x="2.349" y="12.339" width="29.855" height="21.12" />
    </svg>
  )
}
