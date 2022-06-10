import { Flex, InstitutionIcon, Text } from "@artsy/palette"

export const WireTransferDetails = ({
  responsive = true,
  textColor = "black100",
  currentStep,
}: {
  responsive?: boolean
  textColor?: string
  currentStep?: string
}) => (
  <Flex flexDirection="column">
    <Flex alignItems="center">
      <InstitutionIcon fill="green100" width="25px" />
      <Text
        size={responsive ? ["2", "3"] : "3"}
        color={textColor}
        style={{ position: "relative", top: "1px" }}
      >
        Wire transfer
      </Text>
    </Flex>
    {currentStep !== "status" && (
      <Flex flexDirection="column" mt={0.5} ml={4}>
        <Text color="black60" fontSize={13}>
          • To pay by wire transfer, complete checkout and a member of the Artsy
          team will contact you with next steps by email.
        </Text>
        <Text color="black60" fontSize={13}>
          • Your bank may charge a fee for the transaction.
        </Text>
      </Flex>
    )}
  </Flex>
)
