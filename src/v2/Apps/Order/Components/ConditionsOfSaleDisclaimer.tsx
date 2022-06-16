import { Link, Text, SansProps } from "@artsy/palette"
import * as React from "react";

export const ConditionsOfSaleDisclaimer: React.FC<Partial<SansProps>> = (
  props: any
) => (
  <Text variant="xs" color="black60" {...props}>
    By clicking Submit, I agree to Artsy’s{" "}
    <Link href="/conditions-of-sale" target="_blank">
      Conditions of Sale.
    </Link>
  </Text>
)
