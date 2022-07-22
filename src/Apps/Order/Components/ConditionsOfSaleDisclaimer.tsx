import { Text, TextProps } from "@artsy/palette"
import * as React from "react"

export const ConditionsOfSaleDisclaimer: React.FC<Partial<TextProps>> = (
  props: any
) => (
  <Text variant="xs" color="black60" {...props}>
    By clicking Submit, I agree to Artsy’s{" "}
    <a href="/conditions-of-sale" target="_blank">
      Conditions of Sale.
    </a>
  </Text>
)
