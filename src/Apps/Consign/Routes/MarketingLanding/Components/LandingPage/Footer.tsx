import { Button, Text, Box } from "@artsy/palette"
import { useTracking } from "react-tracking"
import { useAnalyticsContext } from "System/Analytics/AnalyticsContext"
import { useSystemContext } from "System/SystemContext"
import { RouterLink } from "System/Router/RouterLink"
import { ActionType } from "@artsy/cohesion"

export const Footer: React.FC = () => {
  const { user } = useSystemContext()
  const { contextPageOwnerType } = useAnalyticsContext()
  const { trackEvent } = useTracking()

  const trackStartSellingClick = () => {
    trackEvent({
      action: ActionType.tappedConsign,
      context_module: "Footer", // not importing the name from cohesion as a exeption, should NOT be done in other places
      // the reason is that in cohesion the modult is maned "footer"
      // we use "Footer" with capital letter for analyticks already and we do not want to intrpduce another name
      context_page_owner_type: contextPageOwnerType,
      label: "Start Selling",
      destination_path: "/sell/submission",
      user_id: user?.id,
    })
  }

  return (
    <>
      <Box px={[2, 4, 12]} mb={[4, 6, 6]}>
        <Text variant={["lg-display", "xl", "xxl"]} pr={0} textAlign="center">
          Meet your new advisor. It’s Artsy.
        </Text>
      </Box>
      <Box display="flex" justifyContent="center">
        <Button
          // @ts-ignore
          as={RouterLink}
          width={["100%", 300]}
          variant="primaryBlack"
          to="/sell/submission"
          onClick={trackStartSellingClick}
          data-testid="start-selling-button"
        >
          Start Selling
        </Button>
      </Box>
    </>
  )
}
