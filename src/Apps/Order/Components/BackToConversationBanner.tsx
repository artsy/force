import type { BoxProps } from "@artsy/palette"
import { TopContextBar } from "Components/TopContextBar"

interface BackToConversationBannerProps {
  conversationId: string
}

export const BackToConversationBanner: React.FC<
  React.PropsWithChildren<BackToConversationBannerProps & BoxProps>
> = ({ conversationId }) => {
  const link = `/user/conversations/${conversationId}`

  return (
    <TopContextBar href={link} displayBackArrow hideSeparator>
      Back to conversation
    </TopContextBar>
  )
}
