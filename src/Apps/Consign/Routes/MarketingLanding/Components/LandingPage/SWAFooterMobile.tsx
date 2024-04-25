import { Flex, Button, Text } from "@artsy/palette"
import { useMarketingLandingTracking } from "Apps/Consign/Routes/MarketingLanding/Utils/marketingLandingTracking"
import { RouterLink } from "System/Router/RouterLink"

export const SWAFooterMobile = () => {
  const {
    trackStartSellingClick,
    trackGetInTouchClick,
  } = useMarketingLandingTracking()

  const getInTouchRoute = "/sell/inquiry"

  return (
    <Flex flexDirection="column" width="100%" p={2}>
      <Button
        // @ts-ignore
        as={RouterLink}
        width="100%"
        variant="primaryBlack"
        to="/sell/submission"
        onClick={trackStartSellingClick}
        mb={[1, 0]}
        data-testid="start-selling-button"
      >
        Start Selling
      </Button>

      <Text variant={["xs"]}>
        Not sure what you’re looking for?{" "}
        <RouterLink
          to={getInTouchRoute}
          data-testid="get-in-touch-button"
          onClick={trackGetInTouchClick}
        >
          Speak to an advisor
        </RouterLink>
      </Text>
    </Flex>
  )
}
