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
  if (!isEnabled) return null
  return (
    <RouterLink
      to="/art-assistant"
      aria-label="Ask Art Assistant"
      title="Ask Art Assistant"
      display="block"
      textDecoration="none"
      onClick={onNavigate}
      p={1}
    >
      <Flex gap={1} alignItems="center">
        <SparklesMessageIcon />
        {!isCompact && <Text variant="sm">Ask Art Assistant</Text>}
      </Flex>
    </RouterLink>
  )
}
