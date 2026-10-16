import { ActionType, ContextModule, OwnerType } from "@artsy/cohesion"
import { useTracking } from "react-tracking"
import { useAnalyticsContext } from "System/Hooks/useAnalyticsContext"
import SparklesMessageIcon from "@artsy/icons/SparklesMessageIcon"
import { Flex, Text } from "@artsy/palette"
import { useEnableArtAssistant } from "Apps/ArtAssistant/hooks/useEnableArtAssistant"
import { RouterLink } from "System/Components/RouterLink"
import type { FC } from "react"

export const ArtAssistantSearchLink: FC<{
  onNavigate?: () => void
  isCompact?: boolean
}> = ({ onNavigate, isCompact = false }) => {
  const isEnabled = useEnableArtAssistant()
  const { trackEvent } = useTracking()
  const { contextPageOwnerType } = useAnalyticsContext()
  if (!isEnabled) return null
  return (
    <RouterLink
      to="/art-assistant"
      aria-label="Ask Art Assistant"
      title="Ask Art Assistant"
      display="block"
      textDecoration="none"
      onClick={() => {
        trackEvent({
          action: ActionType.tappedArtAssistant,
          context_module: ContextModule.header,
          context_screen_owner_type: contextPageOwnerType,
          destination_screen_owner_type: OwnerType.artAssistant,
          type: isCompact ? "icon" : "button",
        })
        onNavigate?.()
      }}
      p={1}
    >
      <Flex gap={1} alignItems="center">
        <SparklesMessageIcon />
        {!isCompact && <Text variant="sm">Ask Art Assistant</Text>}
      </Flex>
    </RouterLink>
  )
}
