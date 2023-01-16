import { Text, TextProps } from "@artsy/palette"
import * as React from "react"

interface Props {
  textProps?: Partial<TextProps>
  orderSource?: string | null
}

export const ConditionsOfSaleDisclaimer: React.FC<Props> = ({
  textProps,
  orderSource,
}) => {
  if (orderSource === "private_sale") {
    return (
      <Text variant="sm" color="black60" {...textProps}>
        By clicking Complete Purchase, I agree to
        <a
          style={{ textDecoration: "underline", color: "#000" }}
          href="https://www.artsy.net/partner/artsy-private-sales"
          target="_blank"
          rel="noopener noreferrer"
        >
          &nbsp;Artsy Private Sales LLC Conditions of Sale
        </a>
      </Text>
    )
  }

  return (
    <Text variant="xs" color="black60" {...textProps}>
      By clicking Submit, I agree to Artsy’s{" "}
      <a href="/conditions-of-sale" target="_blank">
        Conditions of Sale.
      </a>
    </Text>
  )
}
