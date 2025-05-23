import { Box, Spacer, Text } from "@artsy/palette"
import { RouterLink } from "System/Components/RouterLink"
import type { NotificationType } from "./types"

interface NotificationsEmptyStateByTypeProps {
  type: NotificationType
}

const emptyStateByType: Record<
  NotificationType,
  {
    title?: string
    message?: string
  }
> = {
  all: {
    title: "Stay up to date with the artists and artworks you love",
    message:
      "Follow artists and galleries to keep track of their latest updates. Or create an alert and we’ll let you know when there’s a matching work.",
  },
  alerts: {
    title: "Hunting for a particular artwork?",
    message:
      "Create alerts on an artist or artwork page and get notifications here when there’s a match.",
  },
  follows: {
    title: "Follow artists and galleries to stay up to date",
    message:
      "Keep track of the art and events you love, and get recommendations based on who you follow.",
  },
  offers: {},
}

export const NotificationsEmptyStateByType: React.FC<
  React.PropsWithChildren<NotificationsEmptyStateByTypeProps>
> = ({ type }) => {
  const state = emptyStateByType[type]

  return (
    <Box p={4} aria-label="There is nothing to show">
      <Text variant="sm-display" textAlign="left">
        {state.title}
      </Text>
      <Spacer y={1} />
      <Text variant="xs" color="mono60" textAlign="left">
        {state.message}
      </Text>
      <Spacer y={1} />
      <Text color="mono60" variant="xs">
        Get started with:
        <RouterLink to={"/artists"} color="mono100" mx={1}>
          Artists
        </RouterLink>
        {type !== "alerts" && (
          <RouterLink to={"/galleries"} color="mono100">
            Galleries
          </RouterLink>
        )}
      </Text>
    </Box>
  )
}
