import React from "react"
import { ConversationPaginationContainer } from "../Conversation"
import { MockBoot } from "v2/DevTools"
import { graphql } from "react-relay"
import { useTracking } from "react-tracking"
import { useSystemContext as baseUseSystemContext } from "v2/System"
import { setupTestWrapper } from "v2/DevTools/setupTestWrapper"
import {
  ConversationPaginationTestQuery,
  ConversationPaginationTestQueryResponse,
} from "v2/__generated__/ConversationPaginationTestQuery.graphql"

jest.unmock("react-relay")
jest.mock("react-tracking")
jest.mock("v2/System/useSystemContext")

describe("Conversation", () => {
  const { getWrapper } = setupTestWrapper<ConversationPaginationTestQuery>({
    Component: (props: ConversationPaginationTestQueryResponse) => {
      return (
        <MockBoot>
          <ConversationPaginationContainer
            {...props}
            conversation={props.me?.conversation!}
            showDetails
            setShowDetails={jest.fn()}
            refetch={jest.fn()}
          />
        </MockBoot>
      )
    },
    query: graphql`
      query ConversationPaginationTestQuery {
        me {
          conversation(id: "whatever") {
            ...Conversation_conversation
          }
        }
      }
    `,
  })

  const mockuseTracking = useTracking as jest.Mock
  const trackingSpy = jest.fn()
  let useSystemContext = baseUseSystemContext as jest.Mock

  beforeEach(() => {
    mockuseTracking.mockImplementation(() => ({
      trackEvent: trackingSpy,
    }))

    useSystemContext.mockImplementation(() => {
      return {
        user: { lab_features: ["Web Inquiry Checkout"] },
        mediator: {
          on: jest.fn(),
          off: jest.fn(),
        },
      }
    })
  })

  afterEach(() => {
    jest.resetAllMocks()
  })

  it("shows the buyer guarantee message", async () => {
    const wrapper = getWrapper({
      ConversationConnection: () => ({
        edges: [],
      }),
    })
    expect(wrapper.find("BuyerGuaranteeMessage")).toHaveLength(1)
  })
})
