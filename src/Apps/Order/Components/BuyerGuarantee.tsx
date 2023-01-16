import { ActionType, ContextModule } from "@artsy/cohesion"
import {
  CircleBlackCheckIcon,
  Flex,
  Link,
  Text,
  StackableBorderBox,
  Spacer,
} from "@artsy/palette"
import * as React from "react"
import { useTracking } from "react-tracking"

export const BUYER_GUARANTEE_URL =
  "https://support.artsy.net/hc/en-us/articles/360048946973-How-does-Artsy-protect-me"

interface BuyerGuaranteeProps {
  contextModule: ContextModule
  contextPageOwnerType: string
  orderSource?: string | null
  renderArtsyPrivateSaleConditions?: boolean
}

export const BuyerGuarantee: React.FC<BuyerGuaranteeProps> = ({
  contextModule,
  contextPageOwnerType,
  orderSource,
  renderArtsyPrivateSaleConditions,
}) => {
  const { trackEvent } = useTracking()

  const handleClick = () => {
    if (contextModule && contextPageOwnerType) {
      trackEvent({
        action: ActionType.clickedBuyerProtection,
        context_module: contextModule,
        context_page_owner_type: contextPageOwnerType,
      })
    }
  }

  if (orderSource === "private_sale") {
    return (
      <StackableBorderBox
        flexDirection="column"
        style={{ position: "relative", borderTop: "none" }}
      >
        {renderArtsyPrivateSaleConditions && (
          <Text variant="sm" color="black60">
            This purchase is subject to{" "}
            <a
              style={{ textDecoration: "underline", color: "#000" }}
              href="https://www.artsy.net/partner/artsy-private-sales"
              target="_blank"
              rel="noopener noreferrer"
            >
              Artsy Private Sales LLC Conditions of Sale
            </a>
          </Text>
        )}

        <Spacer y={renderArtsyPrivateSaleConditions ? 4 : 2} />

        <Text fontWeight="bold" variant="xs">
          Additional conditions of sale
        </Text>

        <Spacer y={2} />

        {/* TODO: will be pulled from Exchange when available */}
        <Text variant="xs" color="black60">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi feugiat
          aliquet commodo. Mauris ut elit tincidunt, aliquam dolor nec,
          porttitor metus. Curabitur mi erat, sagittis porttitor augue sed,
          consectetur iaculis elit. Etiam massa purus, tincidunt vel ipsum non,
          venenatis iaculis nisi. Nam quis dapibus ante, id congue arcu.
          Interdum et malesuada fames ac ante ipsum primis in faucibus curabitur
          mi erat, sagittis porttitor. Lorem ipsum dolor sit amet, consectetur
          adipiscing elit. Morbi feugiat aliquet commodo. Mauris ut elit
          tincidunt, aliquam dolor nec, porttitor metus. Curabitur mi erat,
          sagittis porttitor augue sed, consectetur iaculis elit. Etiam massa
          purus, tincidunt vel ipsum non, venenatis iaculis nisi. Nam quis
          dapibus ante, id congue arcu. Interdum et malesuada fames ac ante
          ipsum primis in faucibus curabitur mi erat, sagittis porttitor.
        </Text>
      </StackableBorderBox>
    )
  }

  return (
    <Flex p={2} my={1} backgroundColor="black10">
      <CircleBlackCheckIcon mr={1} />
      <Flex flexDirection="column">
        <Text fontWeight="bold" variant="sm-display">
          Your purchase is protected.
        </Text>
        <Text variant="xs" color="black60">
          Learn more about{" "}
          <Link
            target="_blank"
            rel="noopener noreferrer"
            href={BUYER_GUARANTEE_URL}
            onClick={handleClick}
          >
            Artsy’s buyer protection.
          </Link>
        </Text>
      </Flex>
    </Flex>
  )
}
