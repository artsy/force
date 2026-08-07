import { screen, waitFor } from "@testing-library/react"
import { ConversationAppFragmentContainer } from "Apps/Conversations/ConversationApp"
import { setupTestWrapperTL } from "DevTools/setupTestWrapperTL"
import type { ConversationAppTestQuery } from "__generated__/ConversationAppTestQuery.graphql"
import { graphql } from "react-relay"

jest.unmock("react-relay")

/**
 * Records whether the component tree got a live channels registry — the inert
 * default context value never calls `createSubscription`, so this is only true
 * when a real `ConversationsWebsocketProvider` sits above the component.
 */
const mockProbe = { sawLiveChannelsHolder: false }

jest.mock("Apps/Conversations/components/Message/ConversationMessages", () => {
  const { useEffect } = require("react")
  const {
    useCable,
  } = require("Apps/Conversations/context/ConversationsWebsocketContext")

  return {
    ConversationMessagesPaginationContainer: () => {
      const { channelsHolder } = useCable()

      useEffect(() => {
        const deregister = channelsHolder.subscribe({
          key: "probe",
          listener: () => {},
          createSubscription: () => {
            mockProbe.sawLiveChannelsHolder = true

            return { unsubscribe: () => {} }
          },
        })

        return deregister
      }, [channelsHolder])

      return <div data-testid="cable-probe" />
    },
  }
})

jest.mock("Apps/Conversations/components/Sidebar/ConversationsSidebar", () => ({
  ConversationsSidebarPaginationContainer: () => {
    return <div data-testid="sidebar" />
  },
}))

jest.mock("Apps/Conversations/components/ConversationReply", () => ({
  ConversationReply: () => {
    return <div data-testid="reply" />
  },
}))

jest.mock("Apps/Conversations/components/ConversationHeader", () => ({
  ConversationHeader: () => {
    return <div data-testid="header" />
  },
}))

jest.mock("Apps/Conversations/hooks/useMobileLayoutActions", () => ({
  useMobileLayoutActions: () => ({
    isFetching: false,
    currentColumn: "conversation",
    goToSidebar: () => {},
    goToDetails: () => {},
    goToConversation: () => {},
  }),
}))

jest.mock("Apps/Conversations/components/Details/ConversationDetails", () => ({
  ConversationDetails: () => {
    return <div data-testid="details" />
  },
}))

describe("ConversationApp", () => {
  const { renderWithRelay } = setupTestWrapperTL<ConversationAppTestQuery>({
    Component: ({ conversation, viewer }) => {
      return (
        <ConversationAppFragmentContainer
          conversation={conversation!}
          viewer={viewer!}
        />
      )
    },
    query: graphql`
      query ConversationAppTestQuery @relay_test_operation {
        viewer {
          ...ConversationApp_viewer
        }
        conversation(id: "1234") {
          ...ConversationApp_conversation
        }
      }
    `,
  })

  beforeEach(() => {
    mockProbe.sawLiveChannelsHolder = false
  })

  it("mounts the websocket provider above the conversation tree", async () => {
    renderWithRelay()

    await waitFor(() => {
      expect(screen.getAllByTestId("cable-probe").length).toBeGreaterThan(0)
    })

    expect(mockProbe.sawLiveChannelsHolder).toBe(true)
  })
})
