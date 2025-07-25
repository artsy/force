import { ActionType, type ContextModule } from "@artsy/cohesion"
import CheckmarkFillIcon from "@artsy/icons/CheckmarkFillIcon"
import { Flex, Spacer, StackableBorderBox, Text } from "@artsy/palette"
import { RouterLink } from "System/Components/RouterLink"
import type * as React from "react"
import { useTracking } from "react-tracking"

export const BUYER_GUARANTEE_URL =
  "https://support.artsy.net/s/article/The-Artsy-Guarantee"

interface BuyerGuaranteeProps {
  contextModule: ContextModule
  contextPageOwnerType: string
  orderSource?: string | null
  renderArtsyPrivateSaleConditions?: boolean
  privateSaleConditions?: string | null
}

export const BuyerGuarantee: React.FC<
  React.PropsWithChildren<BuyerGuaranteeProps>
> = ({
  contextModule,
  contextPageOwnerType,
  orderSource,
  renderArtsyPrivateSaleConditions,
  privateSaleConditions,
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

  if (
    orderSource === "private_sale" &&
    (renderArtsyPrivateSaleConditions || privateSaleConditions?.length)
  ) {
    return (
      <StackableBorderBox flexDirection="column">
        {renderArtsyPrivateSaleConditions && (
          <Text variant="sm" color="mono60">
            This purchase is subject to{" "}
            <RouterLink
              inline
              textDecoration="underline"
              color="mono100"
              to="/private-sales-conditions-of-sale"
              target="_blank"
              rel="noopener noreferrer"
            >
              Artsy Private Sales LLC Conditions of Sale
            </RouterLink>
          </Text>
        )}

        <Spacer y={renderArtsyPrivateSaleConditions ? 4 : 2} />

        {privateSaleConditions?.length && (
          <>
            <Text fontWeight="bold" variant="xs">
              Additional Conditions of Sale
            </Text>
            <Spacer y={2} />
            <Text variant="xs" color="mono60">
              {privateSaleConditions}
            </Text>
          </>
        )}
      </StackableBorderBox>
    )
  }

  if (orderSource !== "private_sale") {
    return (
      <Flex p={2} my={1} backgroundColor="mono5" data-testid="buyerGuarantee">
        <CheckmarkFillIcon mr={1} />
        <Flex flexDirection="column">
          <Text fontWeight="bold" variant="sm-display">
            Your purchase is protected.
          </Text>
          <Text variant="xs" color="mono60">
            Learn more about{" "}
            <RouterLink
              inline
              target="_blank"
              rel="noopener noreferrer"
              to={BUYER_GUARANTEE_URL}
              onClick={handleClick}
            >
              Artsy’s Buyer Guarantee
            </RouterLink>
            .
          </Text>
        </Flex>
      </Flex>
    )
  }

  return null
}
