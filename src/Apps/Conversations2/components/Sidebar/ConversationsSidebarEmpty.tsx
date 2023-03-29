import { Text } from "@artsy/palette"
import { useRouter } from "next/router"

export const ConversationsSidebarEmpty = () => {
  const { query } = useRouter()

  if (!query.conversationsFilter) {
    return <Text m={2}>All conversations with collectors will show here.</Text>
  }

  if (query.conversationsFilter === "new_inquiries") {
    return <Text m={2}>New inquiries and messages will show here.</Text>
  }

  if (query.conversationsFilter === "replied") {
    return (
      <Text m={2}>Conversations you&apos;ve replied to will show here.</Text>
    )
  }

  return null
}
