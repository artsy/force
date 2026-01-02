import ReceiptIcon from "@artsy/icons/ReceiptIcon"
import { Box, Flex, Spacer, Text } from "@artsy/palette"
import { themeGet } from "@styled-system/theme-get"
import { Collapse } from "Apps/Order/Components/Collapse"
import { FadeInBox } from "Components/FadeInBox"
import { RouterLink } from "System/Components/RouterLink"
import type React from "react"
import styled from "styled-components"

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
        <HoverFlex alignItems="center">
          <HoverIcon height={18} fill={isSelected ? "mono100" : "mono60"} />
          {/* Spacer has to be 31px to match Stripe's spacing */}
          <Spacer x="31px" />
          <HoverText
            variant="sm"
            color={isSelected ? "mono100" : "mono60"}
            fontWeight={isSelected ? "bold" : "normal"}
          >
            Wire Transfer
          </HoverText>
        </HoverFlex>

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

const HoverText = styled(Text)`
  transition: color 0.25s;
`

const HoverIcon = styled(ReceiptIcon)`
  svg {
    transition: fill 0.25s;
  }
  g {
    clip-path: none;
  }
`

const HoverFlex = styled(Flex)`
  &:hover ${HoverText} {
    color: ${themeGet("colors.mono100")};
  }

  &:hover ${HoverIcon} svg {
    fill: ${themeGet("colors.mono100")};
  }
`
