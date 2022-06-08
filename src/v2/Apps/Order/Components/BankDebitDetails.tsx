import { Flex, InstitutionIcon, Spacer, Text } from "@artsy/palette"

export const BankDebitDetails = ({
  responsive = true,
  textColor = "black100",
}: {
  lastDigits: string
  responsive?: boolean
  textColor?: string
}) => (
  <Flex alignItems="center">
    <InstitutionIcon fill="black60" />
    <Spacer ml={0.5} />
    <Text
      size={responsive ? ["2", "3"] : "3"}
      color={textColor}
      style={{ position: "relative", top: "1px" }}
    >
      {/* TODO: insert bank account last digits from order */}
      Bank transfer •••• 1234
    </Text>
  </Flex>
)
