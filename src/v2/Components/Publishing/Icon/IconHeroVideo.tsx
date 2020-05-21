import React from "react"

export const IconHeroVideo: React.SFC<{ width?: string }> = ({
  width = "45px",
}) => {
  return (
    <svg
      className="hero-video"
      x="0px"
      y="0px"
      width={width}
      viewBox="0 0 81 51.9"
      enableBackground="new 0 0 81 51.9"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g>
        <polyline points="24,39 54,39 54,37 24,37 	" />
        <polyline points="24,44 54,44 54,42 24,42 	" />
        <polyline points="24,49 48,49 48,47 24,47 	" />
      </g>
      <path d="M0,0v31h81V0H0z M36,21.3V10l8.7,5.7L36,21.3z" />
    </svg>
  )
}
