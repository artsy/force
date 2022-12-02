import { Box, Spacer, Text } from "@artsy/palette"
import { NotificationType } from "./types"

interface NotificationsEmptyStateByTypeProps {
  type: NotificationType
}

const emptyStateByType: Record<
  NotificationType,
  {
    title: string
    message: string
  }
> = {
  all: {
    title: "You haven’t followed any artists, galleries or fairs yet.",
    message:
      "Follow artists to keep track of their latest work and career highlights. Following artists helps Artsy to recommend works you might like.",
  },
  alerts: {
    title: "Set alerts for artworks you’re seeking.",
    message:
      "Filter for the artworks you love on an artist page and select “Create Alert.” Get notifications here when there’s a match.",
  },
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
