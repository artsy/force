import { CreditCardIcon, Flex, Text } from "@artsy/palette"

interface Props {
  brand: string
  lastDigits: string
  expirationMonth: number
  expirationYear: number
  textColor?: string
}

export const CreditCardDetails = (props: Props) => {
  const {
    lastDigits,
    expirationMonth,
    expirationYear,
    brand,
    textColor = "black100",
  } = props

  return (
    <Flex alignItems="center">
      <CreditCardIcon mr={1} type={brand} width="25px" />
      <Text
        variant="sm-display"
        color={textColor}
        style={{ position: "relative", top: "1px" }}
      >
        •••• {lastDigits}
        &nbsp;&nbsp; Exp {expirationMonth.toString().padStart(2, "0")}/
        {expirationYear.toString().slice(-2)}
      </Text>
    </Flex>
  )
}
