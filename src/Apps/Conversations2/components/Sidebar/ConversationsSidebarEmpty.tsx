import { Text } from "@artsy/palette"
import { useRouter } from "System/Router/useRouter"

export const ConversationsSidebarEmpty = () => {
  const { match } = useRouter()

  if (!match.params.conversationsFilter) {
    return <Text m={2}>All conversations with collectors will show here.</Text>
  }

  if (match.params.conversationsFilter === "new_inquiries") {
    return <Text m={2}>New inquiries and messages will show here.</Text>
  }

  if (match.params.conversationsFilter === "replied") {
    return (
      <Text m={2}>Conversations you&apos;ve replied to will show here.</Text>
    )
  }

  return null
}
