import { ConversationPaginationContainer } from "../Conversation"
import { graphql } from "react-relay"
import { useTracking } from "react-tracking"
import { useSystemContext } from "v2/System/useSystemContext"
import { setupTestWrapperTL } from "v2/DevTools/setupTestWrapper"
import { ConversationPagination_Test_Query } from "v2/__generated__/ConversationPagination_Test_Query.graphql"
import { screen } from "@testing-library/react"

jest.unmock("react-relay")
jest.mock("v2/System/useSystemContext")
jest.mock("v2/Apps/Conversation/Components/ConfirmArtworkModal", () => ({
  ConfirmArtworkModalQueryRenderer: () => null,
}))
jest.mock("v2/Apps/Conversation/Components/UnreadMessagesToast", () => ({
  UnreadMessagesToastQueryRenderer: () => null,
}))

const { renderWithRelay } = setupTestWrapperTL<
  ConversationPagination_Test_Query
>({
  Component: props => {
    if (!props.node) return null

    return (
      <ConversationPaginationContainer
        conversation={props.node}
        refetch={jest.fn()}
        setShowDetails={jest.fn()}
        showDetails
      />
    )
  },
  query: graphql`
    query ConversationPagination_Test_Query {
      node(id: "example") {
        ...Conversation_conversation
      }
    }
  `,
})

describe("Conversation", () => {
  const mockuseTracking = useTracking as jest.Mock
  const trackingSpy = jest.fn()
  const mockuseSystemContext = useSystemContext as jest.Mock

  let user = {}

  beforeEach(() => {
    mockuseTracking.mockImplementation(() => ({ trackEvent: trackingSpy }))
    mockuseSystemContext.mockImplementation(() => ({ user }))
  })

  afterEach(() => {
    mockuseTracking.mockReset()
    mockuseSystemContext.mockReset()
    user = {}
  })

  describe("when the artwork is offerable", () => {
    beforeEach(() => {
      user = {
        type: "NotAdmin",
      }
    })

    it("shows the buyer guarantee message", async () => {
      renderWithRelay({
        Artwork: () => ({ isOfferableFromInquiry: true }),
      })

      expect(
        screen.getByText("Be Protected by The Artsy Guarantee")
      ).toBeInTheDocument()
    })
  })

  describe("when the artwork is not offerable", () => {
    beforeEach(() => {
      user = {
        type: "NotAdmin",
      }
    })

    it("doesn't show the buyer guarantee message", () => {
      renderWithRelay({
        Artwork: () => ({ isOfferableFromInquiry: false }),
      })

      expect(
        screen.queryByText("Be Protected by The Artsy Guarantee")
      ).not.toBeInTheDocument()
    })
  })
})
