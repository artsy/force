import React from "react"

import { CreditCardIcon, Flex, Serif, space } from "@artsy/palette"

export const CreditCardDetails = ({
  brand,
  lastDigits,
  expirationMonth,
  expirationYear,
  responsive = true,
}: {
  brand: string
  lastDigits: string
  expirationMonth: number
  expirationYear: number
  responsive?: boolean
}) => (
  <Flex alignItems="center">
    <CreditCardIcon
      type={brand}
      style={{ marginRight: space(1) }}
      width="25px"
    />
    <Serif
      size={responsive ? ["2", "3"] : "3"}
      color="black100"
      style={{ position: "relative", top: "1px" }}
    >
      •••• {lastDigits}
      &nbsp;&nbsp; Exp {expirationMonth.toString().padStart(2, "0")}/
      {expirationYear.toString().slice(-2)}
    </Serif>
  </Flex>
)
