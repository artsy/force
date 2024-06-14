import { Text } from "@artsy/palette"
import { useRouter } from "System/Hooks/useRouter"

export const ConversationsSidebarEmpty = () => {
  const { match } = useRouter()

  if (!match.params.conversationsFilter) {
    return <Text m={2}>All conversations with galleries will show here.</Text>
  }

  return null
}
