import { Flex, InstitutionIcon, Spacer, Text } from "@artsy/palette"
interface Props {
  last4: string
}

export const BankDebitDetails = (props: Props) => {
  const { last4 } = props
  return (
    <Flex alignItems="center">
      <InstitutionIcon fill="green100" />
      <Spacer ml={0.5} />
      <Text
        size={["2", "3"]}
        color="black100"
        style={{ position: "relative", top: "1px" }}
      >
        Bank transfer •••• {last4}
      </Text>
    </Flex>
  )
}
