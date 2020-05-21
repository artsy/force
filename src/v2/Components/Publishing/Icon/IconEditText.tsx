import React from "react"

export const IconEditText: React.SFC<{ width?: string }> = ({
  width = "45px",
}) => {
  return (
    <svg
      className="edit-text"
      x="0px"
      y="0px"
      width={width}
      viewBox="0 0 56.769 29.866"
      enableBackground="new 0 0 56.769 29.866"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect x="1.953" y="13.344" width="52" height="3.447" />
      <rect x="1.953" y="24.348" width="33.224" height="3.447" />
      <rect x="1.953" y="2.475" width="52" height="3.447" />
    </svg>
  )
}
