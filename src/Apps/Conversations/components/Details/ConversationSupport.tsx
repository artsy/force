import {
  ActionType,
  type ClickedVisitHelpCenter,
  ContextModule,
  OwnerType,
} from "@artsy/cohesion"
import HelpIcon from "@artsy/icons/HelpIcon"
import { Flex, Text } from "@artsy/palette"
import { RouterLink } from "System/Components/RouterLink"
import { useTracking } from "react-tracking"

interface ConversationSupportProps {
  conversationId?: string | null
}

export const ConversationSupport: React.FC<ConversationSupportProps> = ({
  conversationId,
}) => {
  const { trackEvent } = useTracking()

  const handleClickInquiriesFAQ = () => {
    const payload: ClickedVisitHelpCenter = {
      action: ActionType.clickedVisitHelpCenter,
      context_module: ContextModule.conversations,
      context_page_owner_id: conversationId || "",
      context_page_owner_type: OwnerType.conversation,
      destination_page_owner_type: OwnerType.articles,
      destination_page_owner_slug: "0TO3b000000UevEGAS/contacting-a-gallery",
      flow: "Inquiry",
    }

    trackEvent(payload)
  }

  return (
    <>
      <Text variant="lg" mb={2}>
        Support
      </Text>

      <RouterLink
        to="https://support.artsy.net/s/topic/0TO3b000000UevEGAS/contacting-a-gallery"
        target="_blank"
        textDecoration="none"
        onClick={handleClickInquiriesFAQ}
      >
        <Flex alignItems="center" mb={1}>
          <HelpIcon mr={1} />
          <Text variant="xs">Inquiries FAQ</Text>
        </Flex>
      </RouterLink>
    </>
  )
}
