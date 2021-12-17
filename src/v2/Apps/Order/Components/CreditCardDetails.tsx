import { CreditCardIcon, Flex, Text } from "@artsy/palette"

export const CreditCardDetails = ({
  brand,
  lastDigits,
  expirationMonth,
  expirationYear,
  responsive = true,
  textColor = "black100",
}: {
  brand: string
  lastDigits: string
  expirationMonth: number
  expirationYear: number
  responsive?: boolean
  textColor?: string
}) => (
  <Flex alignItems="center">
    <CreditCardIcon mr={1} type={brand} width="25px" />
    <Text
      size={responsive ? ["2", "3"] : "3"}
      color={textColor}
      style={{ position: "relative", top: "1px" }}
    >
      •••• {lastDigits}
      &nbsp;&nbsp; Exp {expirationMonth.toString().padStart(2, "0")}/
      {expirationYear.toString().slice(-2)}
    </Text>
  </Flex>
)
