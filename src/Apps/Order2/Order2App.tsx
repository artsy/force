import { Box, breakpoints } from "@artsy/palette"
import { useSystemContext } from "System/Hooks/useSystemContext"
import type * as React from "react"
import { Meta } from "react-head"

export const Order2App: React.FC<React.PropsWithChildren> = ({ children }) => {
  const { isEigen } = useSystemContext()
  // const router = useRouter()

  // const isCheckoutRedesignEnabled = useFlag("emerald_checkout-redesign")
  // const isDetailsRedesignEnabled = useFlag("emerald_order-details-page")
  // const pathname = router.match.location.pathname
  // const isDetailsPath = pathname.match(/\/details$/)
  // const isCheckoutPath = pathname.match(/\/checkout$/)
  // const isEnabled =
  //   (isDetailsRedesignEnabled && isDetailsPath) ||
  //   (isCheckoutRedesignEnabled && isCheckoutPath)

  // // FIXME: This renders briefly before the real page appears (checkout & details)
  // if (!isEnabled) return <ErrorPage code={404} />

  return (
    <>
      <Meta
        name="viewport"
        content={
          isEigen
            ? "width=device-width, user-scalable=no"
            : "width=device-width, initial-scale=1, maximum-scale=5 viewport-fit=cover"
        }
      />
      <Box maxWidth={breakpoints.lg}>{children}</Box>
    </>
  )
}
