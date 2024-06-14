import { Text, Box, Spacer } from "@artsy/palette"
import { RouterLink } from "System/Components/RouterLink"
import { useSystemContext } from "System/Hooks/useSystemContext"
import { FC } from "react"

export const NotificationErrorMessage: FC = () => {
  const { isLoggedIn } = useSystemContext()

  if (!isLoggedIn)
    return (
      <Box maxWidth={800}>
        <Text variant="lg">Please log in to view your notifications.</Text>
      </Box>
    )

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
