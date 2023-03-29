import { Pill, Flex, Text, Box } from "@artsy/palette"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import {
  ActionType,
  ClickedConversationsFilter,
  PageOwnerType,
  OwnerType,
} from "@artsy/cohesion"
import { useTracking } from "react-tracking"
import { useSystemContext } from "system/SystemContext"

type Filters = "" | "new_inquiries" | "replied"

export const ConversationsSidebarHeader: React.FC = () => {
  const { replace, query } = useRouter()

  const { trackEvent } = useTracking()
  const { user } = useSystemContext()
  const partner_id = user?.currentPartner?._id || ""
  const context = {
    context_owner_id: partner_id,
    context_owner_slug: user?.currentPartner?.id,
    context_page_owner_type: OwnerType.conversation as PageOwnerType,
    context_module: "conversations",
  }

  const [selected, setSelected] = useState<Filters>(
    (query.conversationsFilter as Filters) ?? ""
  )

  useEffect(() => {
    if (
      query.conversationsFilter === selected ||
      (!query.conversationsFilter && selected === "")
    ) {
      return
    }

    const queryParam = selected === "" ? {} : { conversationsFilter: selected }
    replace({
      query: {
        conversationId: query.conversationId,
        ...queryParam,
      },
    })
  }, [selected, replace, query])

  const onClick = (value: Filters) => {
    if (selected !== value) {
      setSelected(value)

      const payload: ClickedConversationsFilter = {
        label: value,
        partner_id: partner_id,
        action: ActionType.clickedConversationsFilter,
        ...context,
      }
      trackEvent(payload)
    }
  }

  return (
    <Box
      p={2}
      position="sticky"
      top={0}
      flexDirection="column"
      backgroundColor="white100"
      borderBottom="1px solid"
      borderBottomColor="black15"
      zIndex={1}
    >
      <Text variant="lg" mb={2}>
        Conversations
      </Text>
      <Flex pr={2} pb={1}>
        <Pill
          variant="default"
          size="small"
          onClick={() => onClick("")}
          selected={selected === ""}
          aria-pressed={selected === ""}
          mr={2}
        >
          All
        </Pill>
        <Pill
          variant="default"
          size="small"
          onClick={() => onClick("new_inquiries")}
          selected={selected === "new_inquiries"}
          aria-pressed={selected === "new_inquiries"}
          mr={2}
        >
          New
        </Pill>
        <Pill
          variant="default"
          size="small"
          onClick={() => onClick("replied")}
          selected={selected === "replied"}
          aria-pressed={selected === "replied"}
          mr={2}
        >
          Replied
        </Pill>
      </Flex>
    </Box>
  )
}
