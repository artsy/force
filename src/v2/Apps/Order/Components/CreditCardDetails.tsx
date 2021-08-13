import React from "react"

import { CreditCardIcon, Flex, Text } from "@artsy/palette"

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
    <CreditCardIcon mr={1} type={brand} width="25px" />
    <Text
      size={responsive ? ["2", "3"] : "3"}
      color="black100"
      style={{ position: "relative", top: "1px" }}
    >
      •••• {lastDigits}
      &nbsp;&nbsp; Exp {expirationMonth.toString().padStart(2, "0")}/
      {expirationYear.toString().slice(-2)}
    </Text>
  </Flex>
)
