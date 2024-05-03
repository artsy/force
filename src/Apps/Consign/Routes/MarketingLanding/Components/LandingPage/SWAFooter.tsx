import { Button, Text, Box } from "@artsy/palette"
import { RouterLink } from "System/Router/RouterLink"
import { useMarketingLandingTracking } from "Apps/Consign/Routes/MarketingLanding/Utils/marketingLandingTracking"
import { ContextModule, Intent } from "@artsy/cohesion"
import { useSystemContext } from "System/SystemContext"
import { useAuthDialog } from "Components/AuthDialog"

export const SWAFooter: React.FC = () => {
  const { trackStartSellingClick } = useMarketingLandingTracking()
  const { isLoggedIn } = useSystemContext()
  const { showAuthDialog } = useAuthDialog()

  return (
    <>
      <Box px={[2, 4, 12]} mb={[4, 6, 6]}>
        <Text variant={["lg-display", "xl", "xxl"]} pr={0} textAlign="center">
          Sell with Artsy is the simple, contemporary way to sell art from your
          collection.
        </Text>
      </Box>
      <Box display="flex" justifyContent="center">
        <Button
          // @ts-ignore
          as={RouterLink}
          width={["100%", 300]}
          variant="primaryBlack"
          to="/sell/submission"
          onClick={event => {
            if (!isLoggedIn) {
              event.preventDefault()

              showAuthDialog({
                mode: "Login",
                options: {
                  title: () => {
                    return "Log in to submit an artwork for sale"
                  },
                },
                analytics: {
                  contextModule: ContextModule.sellFooter,
                  intent: Intent.login,
                },
              })

              return
            }
            trackStartSellingClick("Footer")
          }}
          data-testid="start-selling-button"
        >
          Start Selling
        </Button>
      </Box>
    </>
  )
}
