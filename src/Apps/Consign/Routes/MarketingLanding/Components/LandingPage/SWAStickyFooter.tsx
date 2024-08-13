import { ContextModule } from "@artsy/cohesion"
import { Box, Button, Text, useTheme } from "@artsy/palette"
import { Z } from "Apps/Components/constants"
import { useMarketingLandingTracking } from "Apps/Consign/Routes/MarketingLanding/Utils/marketingLandingTracking"
import { RouterLink } from "System/Components/RouterLink"
import { useFeatureFlag } from "System/Hooks/useFeatureFlag"

export const SWAStickyFooter = () => {
  const enableNewSubmissionFlow = useFeatureFlag("onyx_new_submission_flow")
  const {
    trackStartSellingClick,
    trackGetInTouchClick,
  } = useMarketingLandingTracking()
  const { theme } = useTheme()

  const getInTouchRoute = "/sell/inquiry"

  return (
    <Box
      flexDirection="column"
      width="100%"
      p={2}
      style={{
        transition: "box-shadow 250ms",
        boxShadow: theme.effects.dropShadow,
      }}
      zIndex={Z.globalNav}
      position="fixed"
      right={0}
      bottom={0}
      left={0}
      bg="white100"
    >
      <Button
        // @ts-ignore
        as={RouterLink}
        width="100%"
        variant="primaryBlack"
        to={enableNewSubmissionFlow ? "sell/intro" : "/sell/submission"}
        onClick={event => {
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
    </Box>
  )
}
