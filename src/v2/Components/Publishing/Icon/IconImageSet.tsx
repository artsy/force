import React from "react"

export const IconImageSet: React.SFC<{ color?: string }> = props => {
  return (
    <svg
      className="image-set"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 44 44"
    >
      <path
        d="M6760.67,551.72h-32v-32h32v32Zm-30-2h28v-28h-28v28Z"
        transform="translate(-6728.67 -507.72)"
        fill={props.color}
      />
      <polygon
        points="38 37 36 37 36 8 7 8 7 6 38 6 38 37"
        fill={props.color}
      />
      <polygon
        points="44 31 42 31 42 2 13 2 13 0 44 0 44 31"
        fill={props.color}
      />
    </svg>
  )
}

IconImageSet.defaultProps = {
  color: "black",
}
