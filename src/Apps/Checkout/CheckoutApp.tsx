import type * as React from "react"
import { Box } from "@artsy/palette"
import { useFlag } from "@unleash/proxy-client-react"
import { ErrorPage } from "Components/ErrorPage"

export const CheckoutApp: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const isRedesignEnabled = useFlag("emerald_checkout-redesign")

  if (!isRedesignEnabled) return <ErrorPage code={404} />

  return (
    <>
      <Box my={2}>{children}</Box>
    </>
  )
}
