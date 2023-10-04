import { Pill, Flex, Text, Box } from "@artsy/palette"
import { useEffect, useState } from "react"
import {
  ActionType,
  ClickedConversationsFilter,
  PageOwnerType,
  OwnerType,
} from "@artsy/cohesion"
import { useTracking } from "react-tracking"
import { useSystemContext } from "System/useSystemContext"
import { useRouter } from "found"

type Filters = "" | "new_inquiries" | "replied"

export const ConversationsSidebarHeader: React.FC = () => {
  return (
    <Box
      p={2}
      px={4}
      position="sticky"
      top={0}
      flexDirection="column"
      backgroundColor="white100"
      borderBottom="1px solid"
      borderBottomColor="black15"
      zIndex={1}
    >
      <Text variant="lg">Conversations</Text>
    </Box>
  )
}
