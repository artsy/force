import { Box } from "@artsy/palette"
import type * as React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { Order3AppMeta } from "./Components/Order3AppMeta"

export interface Order3AppProps {
  system: any
}

const Order3App: React.FC<React.PropsWithChildren<Order3AppProps>> = ({
  system,
  children,
}) => {
  if (!system?.time) return null

  return (
    <>
      <Order3AppMeta />
      <Box>{children}</Box>
    </>
  )
}

export const Order3AppFragmentContainer = createFragmentContainer(Order3App, {
  system: graphql`
    fragment Order3App_system on System {
      time {
        day
        month
        year
      }
    }
  `,
})
