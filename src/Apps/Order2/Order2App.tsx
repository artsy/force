import { Box } from "@artsy/palette"
import { useFlag } from "@unleash/proxy-client-react"
import { ErrorPage } from "Components/ErrorPage"
import type * as React from "react"

export const Order2App: React.FC<React.PropsWithChildren> = ({ children }) => {
  const isRedesignEnabled = useFlag("emerald_checkout-redesign")

  // TODO: This renders briefly before the real page appears (checkout & details)
  if (!isRedesignEnabled) return <ErrorPage code={404} />

  return (
    <>
      <Box my={2}>{children}</Box>
    </>
  )
}
