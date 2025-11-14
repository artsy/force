import { RouterLink } from "System/Components/RouterLink"
import { Text, type TextProps } from "@artsy/palette"
import type * as React from "react"

interface Props {
  textProps?: Partial<TextProps>
  orderSource?: string | null
}

export const ConditionsOfSaleDisclaimer: React.FC<
  React.PropsWithChildren<Props>
> = ({ textProps, orderSource }) => {
  if (orderSource === "private_sale") {
    return (
      <Text variant="sm" color="mono60" {...textProps}>
        By clicking Complete Purchase, I agree to the{" "}
        <RouterLink
          inline
          color="mono100"
          textDecoration="underline"
          to="/private-sales-conditions-of-sale"
          target="_blank"
          rel="noopener noreferrer"
        >
          Artsy Private Sales LLC Conditions of Sale
        </RouterLink>{" "}
        and any Additional Conditions of Sale specified on this page and in the
        order confirmation email.
      </Text>
    )
  }

  return (
    <Text variant="xs" color="mono60" {...textProps}>
      By clicking Submit, I agree to Artsy’s{" "}
      <RouterLink inline to="/terms" target="_blank">
        General Terms and Conditions of Sale.
      </RouterLink>
    </Text>
  )
}
