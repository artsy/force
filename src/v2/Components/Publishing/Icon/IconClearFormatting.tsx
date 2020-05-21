import React from "react"

export const IconClearFormatting: React.SFC<{ color?: string }> = props => {
  return (
    <svg
      className="IconClearFormatting"
      x="0px"
      y="0px"
      viewBox="0 0 15.5 15.8"
      enableBackground="new 0 0 15.5 15.8"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g>
        <path
          fill={props.color}
          d="M10.3,0.4c0.7,0,0.9-0.1,1.2-0.4l0.4,0.1c-0.3,0.5-0.8,1.8-0.9,2.3c-0.1,0.1-0.4,0.1-0.5,0c0.1-0.6,0.1-1.1-0.2-1.3 	C10,1.1,9.6,1,9.1,1H8.3C7.9,1,7.9,1,7.7,1.6L5.6,8.2C5.2,9.5,5.2,9.8,6,9.9l0.6,0.1c0.1,0.1,0,0.4-0.1,0.4c-1,0-1.6,0-2.3,0 c-0.7,0-1.3,0-2.1,0c-0.1-0.1-0.1-0.4,0-0.4l0.6-0.1C3.4,9.8,3.5,9.6,4,8.2L6,1.6C6.2,1,6.2,1,5.7,1H4.9C4.4,1,4,1.1,3.6,1.3 C3.2,1.5,2.9,1.9,2.5,2.5C2.3,2.6,2.1,2.5,2,2.3c0.5-0.8,0.9-1.7,1.1-2.2C3.2,0,3.4,0,3.5,0c0,0.3,0.2,0.4,1.1,0.4H10.3z"
        />
        <polyline fill={props.color} points="8,14.2 8,13.2 0,13.2 0,14.2" />
        <polygon
          fill={props.color}
          points="15.2,11.6 14.5,10.9 12.9,12.5 11.3,10.9 10.6,11.6 12.2,13.2 10.6,14.8 11.3,15.5 12.9,13.9 14.5,15.5 15.2,14.8 13.6,13.2"
        />
      </g>
    </svg>
  )
}

IconClearFormatting.defaultProps = {
  color: "black",
}
