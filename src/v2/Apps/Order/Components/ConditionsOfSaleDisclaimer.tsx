import { Link } from "@artsy/palette/dist/elements/Link"
import { Sans, SansProps } from "@artsy/palette/dist/elements/Typography"
import React from "react"

export const ConditionsOfSaleDisclaimer: React.SFC<Partial<
  SansProps
>> = props => (
  <Sans size="2" color="black60" {...props}>
    By clicking Submit, I agree to Artsy’s{" "}
    <Link href="/conditions-of-sale" target="_blank">
      Conditions of Sale.
    </Link>
  </Sans>
)
