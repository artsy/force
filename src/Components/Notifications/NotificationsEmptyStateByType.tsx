import { Box, Spacer, Text } from "@artsy/palette"
import { NotificationType } from "./types"

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
    //TODO: add new copy for "all" notifications
    title: "Follow artists and galleries to stay up to date",
    message:
      "Keep track of the art and events you love, and get recommendations based on who you follow.",
  },
  alerts: {
    title: "Hunting for a particular artwork?",
    message:
      "Create alerts on an artist or artwork page and get notifications here when there’s a match.",
  },
  following: {
    title: "Follow artists and galleries to stay up to date",
    message:
      "Keep track of the art and events you love, and get recommendations based on who you follow.",
  },
  offers: {},
}

export const NotificationsEmptyStateByType: React.FC<NotificationsEmptyStateByTypeProps> = ({
  type,
}) => {
  const state = emptyStateByType[type]

  return (
    <Box px={2} py={4} aria-label="There is nothing to show">
      <Text variant="sm-display" textAlign="center">
        {state.title}
      </Text>
      <Spacer y={2} />
      <Text variant="xs" color="black60" textAlign="center">
        {state.message}
      </Text>
    </Box>
  )
}
