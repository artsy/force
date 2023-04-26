import { Flex, Text } from "@artsy/palette"
import InstitutionIcon from "@artsy/icons/InstitutionIcon"

export const WireTransferDetails = ({
  responsive = true,
  textColor = "black100",
  withDescription = true,
  orderSource = null,
}: {
  responsive?: boolean
  textColor?: string
  withDescription?: boolean
  orderSource?: string | null
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
    {withDescription && (
      <Flex flexDirection="column" mt={0.5} ml={4}>
        {orderSource === "private_sale" ? (
          <Text color="black60" fontSize={13}>
            • To pay by wire transfer, complete checkout to view banking details
            and wire transfer instructions.
          </Text>
        ) : (
          <Text color="black60" fontSize={13}>
            • To pay by wire transfer, complete checkout and a member of the
            Artsy team will contact you with next steps by email.
          </Text>
        )}

        <Text color="black60" fontSize={13}>
          • Please inform your bank that you will be responsible for all wire
          transfer fees.
        </Text>
      </Flex>
    )}
  </Flex>
)
