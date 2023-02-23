import { Button, Text, Box } from "@artsy/palette"
import { useTracking } from "react-tracking"
import { useAnalyticsContext, useSystemContext } from "System"
import { RouterLink } from "System/Router/RouterLink"

export const Footer: React.FC = () => {
  const { user } = useSystemContext()
  const { contextPageOwnerType } = useAnalyticsContext()
  const { trackEvent } = useTracking()

  const trackStartSellingClick = () => {
    trackEvent({
      action: "clickedStartSelling",
      context_module: "Footer",
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
          onClick={trackStartSellingClick}
          data-testid="start-selling-button"
        >
          Start Selling
        </Button>
      </Box>
    </>
  )
}
