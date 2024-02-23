import { Text, Box, Spacer } from "@artsy/palette"
import { RouterLink } from "System/Router/RouterLink"
import { FC } from "react"

export const NotificationErrorMessage: FC = () => {
  return (
    <Box maxWidth={800}>
      <Text variant="lg">
        Sorry, the activity could not be loaded due to an error.
      </Text>

      <Spacer y={2} />

      <Text variant="sm-display" color="black60">
        Please contact{" "}
        <RouterLink inline to="mailto:support@artsy.net">
          support@artsy.net
        </RouterLink>{" "}
        with any questions.
      </Text>
    </Box>
  )
}
