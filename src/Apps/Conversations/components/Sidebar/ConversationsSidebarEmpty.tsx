import { useRouter } from "System/Hooks/useRouter"
import { Text } from "@artsy/palette"

export const ConversationsSidebarEmpty = () => {
  const { match } = useRouter()

  if (!match.params.conversationsFilter) {
    return <Text m={2}>All conversations with galleries will show here.</Text>
  }

  return null
}
