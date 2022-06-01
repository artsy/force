import { Flex, InstitutionIcon, Text } from "@artsy/palette"

export const BankDebitDetails = ({
  lastDigits,
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
    <InstitutionIcon fill="black60" />
    <Text
      size={responsive ? ["2", "3"] : "3"}
      color={textColor}
      style={{ position: "relative", top: "1px" }}
    >
      •••• {lastDigits}
    </Text>
  </Flex>
)
