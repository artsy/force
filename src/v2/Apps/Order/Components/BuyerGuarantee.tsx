import { ActionType, ContextModule } from "@artsy/cohesion"
import { CircleBlackCheckIcon, Flex, Link, Text } from "@artsy/palette"
import * as React from "react"
import { useTracking } from "v2/System"

export const BUYER_GUARANTEE_URL =
  "https://support.artsy.net/hc/en-us/articles/360048946973-How-does-Artsy-protect-me"

interface BuyerGuaranteeProps {
  contextModule: ContextModule
  contextPageOwnerType: string
}

export const BuyerGuarantee: React.FC<BuyerGuaranteeProps> = ({
  contextModule,
  contextPageOwnerType,
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
