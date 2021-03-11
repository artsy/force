import React from "react"
import { States } from "storybook-states"

export default {
  title: "Components/Example",
}

export const Example = () => {
  return (
    <States
      states={[{ size: "xxs" }, { size: "xs" }, { size: "sm" }, { size: "md" }]}
    >
      <div>hi</div>
    </States>
  )
}
