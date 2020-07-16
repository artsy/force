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
  startCursor: "NQ",
  endCursor: "MQ",
  hasNextPage: true,
  hasPreviousPage: false,
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
  describe("User with feature enabled", () => {
    const userType = {
      type: "NotAdmin",
      lab_features: ["User Conversations View"],
    }
    describe("having previous conversations", () => {
      it("renders conversations", async () => {
        // TODO: revisit mocking and remove `artist_names` alias from PurchseHistory
        const mockMe = {
          id: "111",
          conversationsConnection: {
            edges: [{ node: MockedConversation, cursor: "absc" }],
            pageInfo,
          },
        }
        const component = await render(mockMe, userType)
        const text = component.text()
        expect(text).toContain("Conversation with Ashkan Gallery")
      })
    })
    describe("without previous conversations", () => {
      it("shows an empty state when loading the conversationsConnection", async () => {
        const mockMe = {
          id: "111",
          conversationsConnection: { edges: [], pageInfo },
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
          id: "111",
          conversationsConnection: null,
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
  describe("User without the feature enabled", () => {
    it("gives error", async () => {
      const mockMe = {
        id: "111",
        conversationsConnection: {
          edges: [{ node: MockedConversation, cursor: "absc" }],
          pageInfo,
        },
      }
      const component = await render(mockMe, { type: "regular-user" })
      const text = component.text()
      expect(text).toContain(
        "Sorry, the page you were looking for doesn’t exist at this URL."
      )
    })
  })
})
