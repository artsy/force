import { ConversationPaginationContainer } from "../Conversation"
import { graphql } from "react-relay"
import { useTracking } from "react-tracking"
import { useSystemContext } from "v2/System/useSystemContext"
import { setupTestWrapper } from "v2/DevTools/setupTestWrapper"
import { ConversationPagination_Test_Query } from "v2/__generated__/ConversationPagination_Test_Query.graphql"

jest.unmock("react-relay")
jest.mock("v2/System/useSystemContext")

const { getWrapper } = setupTestWrapper<ConversationPagination_Test_Query>({
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

    it("shows the buyer guarantee message", () => {
      const wrapper = getWrapper({
        Artwork: () => ({ isOfferableFromInquiry: true }),
      })

      expect(wrapper.find("BuyerGuaranteeMessage")).toHaveLength(1)
    })

    it("renders the confirm artwork modal query renderer", () => {
      const wrapper = getWrapper({
        Artwork: () => ({ isOfferableFromInquiry: true }),
      })

      expect(wrapper.find("ConfirmArtworkModalQueryRenderer")).toHaveLength(1)
    })

    it("renders the OrderModal", () => {
      const wrapper = getWrapper({
        Artwork: () => ({ isOfferableFromInquiry: true }),
      })

      expect(wrapper.find("OrderModal")).toHaveLength(1)
    })
  })

  describe("when the artwork is not offerable", () => {
    beforeEach(() => {
      user = {
        type: "NotAdmin",
      }
    })

    it("doesn't show the buyer guarantee message", () => {
      const wrapper = getWrapper({
        Artwork: () => ({ isOfferableFromInquiry: false }),
      })
      const buyerGuaranteeMessage = wrapper.find("BuyerGuaranteeMessage")

      expect(buyerGuaranteeMessage).toHaveLength(0)
    })
  })
})
