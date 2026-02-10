import ReceiptIcon from "@artsy/icons/ReceiptIcon"
import { Box, Flex, Spacer, Text } from "@artsy/palette"
import { themeGet } from "@styled-system/theme-get"
import { Collapse } from "Apps/Order/Components/Collapse"
import { ORDER_SUPPORT_EMAIL } from "Apps/Order2/Routes/Checkout/Components/CheckoutErrorBanner"
import { FadeInBox } from "Components/FadeInBox"
import { RouterLink } from "System/Components/RouterLink"
import { getENV } from "Utils/getENV"
import type { WireTransferOption_order$key } from "__generated__/WireTransferOption_order.graphql"
import type React from "react"
import { graphql, useFragment } from "react-relay"
import styled from "styled-components"

interface WireTransferOptionProps {
  isSelected: boolean
  order: WireTransferOption_order$key
  onSelect: () => void
}

const APP_URL = getENV("APP_URL")

export const WireTransferOption: React.FC<WireTransferOptionProps> = ({
  isSelected,
  order: orderKey,
  onSelect,
}) => {
  const order = useFragment(ORDER_FRAGMENT, orderKey)

  const emailSubject = `Wire transfer inquiry (CODE #${order.code})`

  const artworkInfo = order.lineItems[0]?.artwork?.meta?.share?.slice(10) // Removing "Check out " from the share metadata
  const artworkUrl = APP_URL + order.lineItems[0]?.artwork?.href
  const emailBody = `Hello,\n\nI'm interested in paying by wire transfer and would like some assistance.\n\n${artworkInfo} on Artsy: ${artworkUrl}`

  const mailtoLink = `mailto:${ORDER_SUPPORT_EMAIL}?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`
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
            <RouterLink inline to={mailtoLink}>
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

const ORDER_FRAGMENT = graphql`
  fragment WireTransferOption_order on Order {
    code
    lineItems {
      artwork {
        href
        meta {
          share
        }
      }
    }
  }
`
