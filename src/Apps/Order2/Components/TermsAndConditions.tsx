import { Text } from "@artsy/palette"
import { RouterLink } from "System/Components/RouterLink"
import type React from "react"

interface TermsAndConditionsProps {
  onClickTermsAndConditions?: () => void
}

export const TermsAndConditions: React.FC<TermsAndConditionsProps> = ({
  onClickTermsAndConditions,
}) => {
  return (
    <Text variant="xs" color="mono60">
      By clicking Submit, I agree to Artsy’s{" "}
      <RouterLink
        inline
        to="/terms"
        target="_blank"
        onClick={onClickTermsAndConditions}
      >
        General Terms and Conditions of Sale.
      </RouterLink>
    </Text>
  )
}
