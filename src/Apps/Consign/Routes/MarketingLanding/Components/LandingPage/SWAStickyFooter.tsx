import { ContextModule, Intent } from "@artsy/cohesion"
import { Flex, Button, Text, useTheme } from "@artsy/palette"
import { useMarketingLandingTracking } from "Apps/Consign/Routes/MarketingLanding/Utils/marketingLandingTracking"
import { useAuthDialog } from "Components/AuthDialog"
import { RouterLink } from "System/Router/RouterLink"
import { useSystemContext } from "System/SystemContext"

export const SWAStickyFooter = () => {
  const {
    trackStartSellingClick,
    trackGetInTouchClick,
  } = useMarketingLandingTracking()
  const { theme } = useTheme()
  const { isLoggedIn } = useSystemContext()
  const { showAuthDialog } = useAuthDialog()

  const getInTouchRoute = "/sell/inquiry"

  return (
    <Flex
      flexDirection="column"
      width="100%"
      p={2}
      style={{
        transition: "box-shadow 250ms",
        boxShadow: theme.effects.dropShadow,
      }}
      zIndex={1}
    >
      <Button
        // @ts-ignore
        as={RouterLink}
        width="100%"
        variant="primaryBlack"
        to="/sell/submission"
        onClick={event => {
          if (!isLoggedIn) {
            event.preventDefault()

            showAuthDialog({
              mode: "Login",
              options: {
                title: () => {
                  return "Log in to submit an artwork for sell"
                },
              },
              analytics: {
                contextModule: ContextModule.sellStickyFooter,
                intent: Intent.login,
              },
            })

            return
          }
          trackStartSellingClick(ContextModule.sellStickyFooter)
        }}
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
