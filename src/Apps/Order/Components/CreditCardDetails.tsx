import { Flex, Text } from "@artsy/palette"
import { Brand, BrandCreditCardIcon } from "Components/BrandCreditCardIcon"

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
      <BrandCreditCardIcon mr={1} type={brand as Brand} width="25px" />
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
