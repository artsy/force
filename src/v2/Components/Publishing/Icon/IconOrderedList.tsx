import React from "react"

export const IconOrderedList: React.SFC<{ color?: string }> = props => {
  return (
    <svg
      className="IconOrderedList"
      x="0px"
      y="0px"
      viewBox="-297 389.3 15.7 15.7"
      enableBackground="new -297 389.3 15.7 15.7"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g fill={props.color}>
        <path d="M-295.7,393.8l0-0.7v-2.9l-1.1,0.5v-0.8l1.4-0.6h0.6v3.8l0,0.7H-295.7z" />
      </g>
      <g fill={props.color}>
        <path d="M-296.9,399.2v-0.7l1.6-1.3c0.3-0.3,0.8-0.6,0.8-1c0-0.4-0.4-0.6-0.8-0.6c-0.5,0-0.8,0.3-0.8,0.8h-0.8 c0-0.4,0.1-0.6,0.3-0.9c0.3-0.4,0.8-0.6,1.3-0.6c0.9,0,1.6,0.5,1.6,1.4c0,0.7-0.4,1.1-1,1.5l-1.1,0.9h2.1v0.7H-296.9z" />
      </g>
      <g fill={props.color}>
        <path d="M-295.3,405c-0.9,0-1.5-0.5-1.6-1.4h0.8c0.1,0.4,0.4,0.7,0.8,0.7c0.4,0,0.8-0.3,0.8-0.7c0-0.2-0.1-0.4-0.3-0.6 c-0.2-0.1-0.4-0.1-0.6-0.1c-0.1,0-0.2,0-0.3,0v-0.7c0.1,0,0.1,0,0.2,0c0.3,0,0.8,0,0.8-0.4c0-0.3-0.3-0.5-0.5-0.5 c-0.3,0-0.5,0.1-0.6,0.4h-0.8c0.1-0.7,0.7-1.1,1.4-1.1c0.7,0,1.3,0.4,1.3,1.1c0,0.4-0.1,0.6-0.4,0.8c0.4,0.2,0.7,0.6,0.7,1.1 C-293.8,404.4-294.5,405-295.3,405z" />
      </g>
      <rect x="-291.5" y="390.9" fill={props.color} width="10.2" height="1.3" />
      <rect x="-291.5" y="396.5" fill={props.color} width="10.2" height="1.3" />
      <rect x="-291.5" y="402.1" fill={props.color} width="10.2" height="1.3" />
    </svg>
  )
}

IconOrderedList.defaultProps = {
  color: "black",
}
