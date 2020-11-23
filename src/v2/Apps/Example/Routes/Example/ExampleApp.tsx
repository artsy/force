import React from "react"

export const ExampleApp: React.FC = props => {
  return (
    <>
      <div>example</div>
      <div>{props.children}</div>
    </>
  )
}
