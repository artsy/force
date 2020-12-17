import {
  ConversationAppTestQueryRawResponse,
  ConversationAppTestQueryResponse,
} from "v2/__generated__/ConversationAppTestQuery.graphql"
import { MockedConversation } from "v2/Apps/__tests__/Fixtures/Conversation"
import { SystemContextProvider } from "v2/Artsy"
import { MockBoot, renderRelayTree } from "v2/DevTools"
import { Match } from "found"
import React from "react"
import { HeadProvider } from "react-head"
import { graphql } from "react-relay"
import { ConversationAppFragmentContainer } from "../ConversationApp"

jest.unmock("react-relay")

const pageInfo: ConversationAppTestQueryRawResponse["me"]["conversationsConnection"]["pageInfo"] = {
  endCursor: "MQ",
  hasNextPage: true,
  hasPreviousPage: false,
  startCursor: "NQ",
}

const render = (me: ConversationAppTestQueryRawResponse["me"], user: User) =>
  renderRelayTree({
    Component: (props: ConversationAppTestQueryResponse) => (
      <ConversationAppFragmentContainer
        me={{
          ...me,
        }}
        match={({ route: { displayFullPage: true } } as unknown) as Match}
        router={{ replace: () => {} } as any}
        {...props}
      />
    ),
    mockData: {
      me,
    } as ConversationAppTestQueryRawResponse,
    query: graphql`
      query ConversationAppTestQuery @raw_response_type {
        me {
          ...ConversationApp_me
        }
      }
    `,
    wrapper: children => (
      <MockBoot>
        <HeadProvider>
          <SystemContextProvider user={user}>{children}</SystemContextProvider>
        </HeadProvider>
      </MockBoot>
    ),
  })

describe("Conversation app", () => {
  describe("as non admin user", () => {
    const userType = {
      type: "NotAdmin",
    }
    describe("having previous conversations", () => {
      it("renders conversations", async () => {
        // TODO: revisit mocking and remove `artist_names` alias from PurchseHistory
        const mockMe = {
          conversationsConnection: {
            edges: [{ cursor: "absc", node: MockedConversation }],
            pageInfo,
          },
          id: "111",
        }
        const component = await render(mockMe, userType)
        const text = component.text()
        expect(text).toContain("InboxAshkan Gallery")
      })
    })
    describe("without previous conversations", () => {
      it("shows an empty state when loading the conversationsConnection", async () => {
        const mockMe = {
          conversationsConnection: { edges: [], pageInfo },
          id: "111",
        }

        const component = await render(mockMe, userType)
        const text = component.text()
        expect(text).toContain("You don't have any messages yet.")
        expect(text).toContain(
          "Contact galleries to purchase available work. You'll find your ongoing conversations here."
        )

        const button = component.find("Button")
        expect(button.length).toBe(1)
        expect(button.text()).toBe("Explore artworks")

        const link = component.find("RouterLink")
        expect(link.html()).toContain(`href="/collect"`)
      })

      it("shows an empty state on failure on loading the conversationsConnection", async () => {
        const mockMe = {
          conversationsConnection: null,
          id: "111",
        }

        const component = await render(mockMe, userType)
        const text = component.text()
        expect(text).toContain("You don't have any messages yet.")
        expect(text).toContain(
          "Contact galleries to purchase available work. You'll find your ongoing conversations here."
        )

        const button = component.find("Button")
        expect(button.length).toBe(1)
        expect(button.text()).toBe("Explore artworks")

        const link = component.find("RouterLink")
        expect(link.html()).toContain(`href="/collect"`)
      })
    })
  })
})
