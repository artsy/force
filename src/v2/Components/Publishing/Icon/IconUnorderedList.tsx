import React from "react"

export const IconUnorderedList: React.SFC<{ color?: string }> = props => {
  return (
    <svg
      className="IconUnorderedList"
      x="0px"
      y="0px"
      viewBox="-297 389.3 15.7 15.7"
      enableBackground="new -297 389.3 15.7 15.7"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect x="-291.6" y="390.9" fill={props.color} width="10.2" height="1.3" />
      <rect x="-291.6" y="396.5" fill={props.color} width="10.2" height="1.3" />
      <rect x="-291.6" y="402.1" fill={props.color} width="10.2" height="1.3" />
      <circle cx="-295.6" cy="391.5" fill={props.color} r="1.4" />
      <circle cx="-295.6" cy="397.1" fill={props.color} r="1.4" />
      <circle cx="-295.6" cy="402.8" fill={props.color} r="1.4" />
    </svg>
  )
}

IconUnorderedList.defaultProps = {
  color: "black",
}
