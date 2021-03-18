import { Text } from "@artsy/palette"
import React from "react"
import { States } from "storybook-states"

export default {
  title: "Components/Example",
}

export const Example = () => {
  return (
    <States
      states={[
        { variant: "xs" },
        { variant: "sm" },
        { variant: "md" },
        { variant: "lg" },
        { variant: "xl" },
        { variant: "xxl" },
      ]}
    >
      <Text>Hello world</Text>
    </States>
  )
}
