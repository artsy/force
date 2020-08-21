import { Sans } from "@artsy/palette/dist/elements/Typography"
import { Flex } from "@artsy/palette/dist/elements/Flex"
import React from "react"

export const Placeholder = ({ name, ...props }) => (
  <Flex
    width="100%"
    style={{ background: "gray" }}
    justifyContent="center"
    alignItems="center"
    {...props}
  >
    <Sans size="5t" color="white" textAlign="center">
      {name}
    </Sans>
  </Flex>
)
