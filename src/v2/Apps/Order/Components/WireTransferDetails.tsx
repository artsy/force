import { Flex, InstitutionIcon, Text } from "@artsy/palette"

export const WireTransferDetails = ({
  responsive = true,
  textColor = "black100",
}: {
  responsive?: boolean
  textColor?: string
}) => (
  <Flex flexDirection="column">
    <Flex alignItems="center">
      <InstitutionIcon fill="black60" width="25px" />
      <Text
        size={responsive ? ["2", "3"] : "3"}
        color={textColor}
        style={{ position: "relative", top: "1px" }}
      >
        Wire transfer
      </Text>
    </Flex>
    <Flex flexDirection="column" mt={0.5} ml={4}>
      <Text color="black60" variant="sm" fontSize={13}>
        • To pay by wire transfer, complete checkout and one of our support
        specialists will reach out with next steps.
      </Text>
      <Text color="black60" variant="sm" fontSize={13}>
        • Your bank may charge a fee for the transaction.
      </Text>
    </Flex>
  </Flex>
)
