import ReceiptIcon from "@artsy/icons/ReceiptIcon"
import { Box, Flex, Spacer, Text } from "@artsy/palette"
import { Collapse } from "Apps/Order/Components/Collapse"
import { FadeInBox } from "Components/FadeInBox"
import { RouterLink } from "System/Components/RouterLink"
import type React from "react"

interface WireTransferOptionProps {
  isSelected: boolean
  wireEmailSubject: string | null
  wireEmailBody: string | null
  onSelect: () => void
}

export const WireTransferOption: React.FC<WireTransferOptionProps> = ({
  isSelected,
  wireEmailSubject,
  wireEmailBody,
  onSelect,
}) => {
  return (
    <FadeInBox>
      <Box
        backgroundColor="mono5"
        borderRadius="5px"
        padding="1rem"
        marginBottom="10px"
        border={isSelected ? "1px solid" : "none"}
        borderColor="mono10"
        style={{ cursor: "pointer" }}
        onClick={onSelect}
        data-testid="PaymentFormWire"
      >
        <Flex alignItems="center">
          <ReceiptIcon height={18} fill="mono100" />
          {/* Spacer has to be 31px to match Stripe's spacing */}
          <Spacer x="31px" />
          <Text
            variant="sm"
            color="mono100"
            fontWeight={isSelected ? "bold" : "normal"}
          >
            Wire Transfer
          </Text>
        </Flex>

        <Collapse open={isSelected}>
          <Text color="mono100" variant="sm" ml="50px" mb={1}>
            To pay by wire transfer, complete checkout and a member of the Artsy
            team will contact you with next steps by email.
          </Text>

          <Text color="mono100" variant="sm" ml="50px" mb={1}>
            Please inform your bank that you will be responsible for all wire
            transfer fees.
          </Text>

          <Text color="mono100" variant="sm" ml="50px">
            You can contact{" "}
            <RouterLink
              inline
              to={`mailto:orders@artsy.net?subject=${wireEmailSubject}&body=${wireEmailBody}`}
            >
              orders@artsy.net
            </RouterLink>{" "}
            with any questions.
          </Text>
        </Collapse>
      </Box>
    </FadeInBox>
  )
}
