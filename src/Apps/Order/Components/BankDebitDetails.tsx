import InstitutionIcon from "@artsy/icons/InstitutionIcon"
import { Flex, Spacer, Text } from "@artsy/palette"

interface Props {
  last4: string
}

export const BankDebitDetails = (props: Props) => {
  const { last4 } = props
  return (
    <Flex alignItems="center">
      <InstitutionIcon fill="green100" />
      <Spacer x={0.5} />
      <Text
        variant="sm-display"
        color="mono100"
        style={{ position: "relative", top: "1px" }}
      >
        Bank transfer •••• {last4}
      </Text>
    </Flex>
  )
}
