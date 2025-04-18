import { Flex, Text } from "@artsy/palette"
import { type Brand, BrandCreditCardIcon } from "Components/BrandCreditCardIcon"

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
    textColor = "mono100",
  } = props

  return (
    <Flex alignItems="center">
      <BrandCreditCardIcon
        mr={1}
        type={brand as Brand}
        width="26px"
        height="26px"
      />
      <Text variant="sm-display" color={textColor}>
        •••• {lastDigits}
        &nbsp;&nbsp; Exp {expirationMonth.toString().padStart(2, "0")}/
        {expirationYear.toString().slice(-2)}
      </Text>
    </Flex>
  )
}
