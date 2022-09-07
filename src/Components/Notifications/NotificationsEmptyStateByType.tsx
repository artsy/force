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
    title: "You haven't followed any artists, galleries or fairs yet.",
    message:
      "Follow artists to keep track of their latest work and career highlights. Following artists helps Artsy to recommend works you might like.",
  },
  alerts: {
    title: "You haven't created any Alerts yet.",
    message:
      "Filter for the artworks you love on an Artist Page and tap 'Create Alert' to be notified when new works are added to Artsy.",
  },
}

export const NotificationsEmptyStateByType: React.FC<NotificationsEmptyStateByTypeProps> = ({
  type,
}) => {
  const state = emptyStateByType[type]

  return (
    <Box aria-label="There is nothing to show">
      <Text variant="sm-display" textAlign="center">
        {state.title}
      </Text>
      <Spacer mt={2} />
      <Text variant="xs" color="black60" textAlign="center">
        {state.message}
      </Text>
    </Box>
  )
}
