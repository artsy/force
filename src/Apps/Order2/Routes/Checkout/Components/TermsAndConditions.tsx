import { Text } from "@artsy/palette"
import { useCheckoutContext } from "Apps/Order2/Routes/Checkout/Hooks/useCheckoutContext"
import { RouterLink } from "System/Components/RouterLink"
import type React from "react"

export const TermsAndConditions: React.FC = () => {
  const { checkoutTracking } = useCheckoutContext()

  return (
    <Text variant="xs" color="mono60">
      By clicking Submit, I agree to Artsy’s{" "}
      <RouterLink
        inline
        to="/terms"
        target="_blank"
        onClick={() => checkoutTracking.clickedTermsAndConditions()}
      >
        General Terms and Conditions of Sale.
      </RouterLink>
    </Text>
  )
}
