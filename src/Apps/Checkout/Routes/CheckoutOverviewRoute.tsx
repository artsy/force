import type * as React from "react"
import { Text } from "@artsy/palette"
import { PaymentForm } from "Apps/Checkout/Components/PaymentForm"

export const CheckoutOverviewRoute: React.FC<
  React.PropsWithChildren<unknown>
> = () => {
  return (
    <>
      <Text variant="xl">Checkout</Text>

      <PaymentForm />
    </>
  )
}
