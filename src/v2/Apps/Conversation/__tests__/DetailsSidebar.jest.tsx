import { graphql } from "react-relay"
import { setupTestWrapperTL } from "v2/DevTools/setupTestWrapper"
import { screen } from "@testing-library/react"
import { DetailsSidebarFragmentContainer } from "../Components/DetailsSidebar"
import { DetailsSidebar_Test_Query } from "v2/__generated__/DetailsSidebar_Test_Query.graphql"

jest.unmock("react-relay")

const { renderWithRelay } = setupTestWrapperTL<DetailsSidebar_Test_Query>({
  Component: props => {
    if (!props.node) return null

    return (
      <DetailsSidebarFragmentContainer
        conversation={props.node}
        setShowDetails={jest.fn()}
        showDetails
      />
    )
  },
  query: graphql`
    query DetailsSidebar_Test_Query {
      node(id: "example") {
        ...DetailsSidebar_conversation
      }
    }
  `,
})

describe("Conversation", () => {
  describe("when there is an active order", () => {
    it("shows the offer expiration message", async () => {
      renderWithRelay({
        CommerceOrderConnectionWithTotalCount: () => ({
          edges: [
            {
              node: {
                mode: "OFFER",
                stateExpiresAt: "Dec 19",
                displayState: "SUBMITTED",
              },
            },
          ],
        }),
      })

      expect(
        screen.getByText(
          "The seller will respond to your offer by Dec 19. Keep in mind making an offer doesn’t guarantee you the work."
        )
      ).toBeInTheDocument()
    })

    it("shows the offer breakdown", async () => {
      renderWithRelay({
        CommerceOrderConnectionWithTotalCount: () => ({
          edges: [
            {
              node: {
                myLastOffer: {
                  fromParticipant: "SELLER",
                },
                displayState: "SUBMITTED",
                mode: "OFFER",
              },
            },
          ],
        }),
      })

      expect(screen.getByText("Seller's offer")).toBeInTheDocument()
      expect(screen.getByText("List price")).toBeInTheDocument()
      expect(screen.getByText("Tax")).toBeInTheDocument()
    })

    it("shows the payment method", async () => {
      renderWithRelay({
        CommerceOrderConnectionWithTotalCount: () => ({
          edges: [
            {
              node: {
                myLastOffer: {
                  fromParticipant: "SELLER",
                },
                mode: "OFFER",
                displayState: "SUBMITTED",
                creditCard: {
                  lastDigits: "4242",
                  expirationYear: "2024",
                  expirationMonth: "04",
                },
              },
            },
          ],
        }),
      })

      expect(screen.getByText("Payment Method")).toBeInTheDocument()
    })

    it("shows the ship to section", async () => {
      renderWithRelay({
        CommerceOrderConnectionWithTotalCount: () => ({
          edges: [
            {
              node: {
                myLastOffer: {
                  fromParticipant: "SELLER",
                },
                mode: "OFFER",
                displayState: "SUBMITTED",
                requestedFulfillment: {
                  city: "Seattle",
                  postalCode: "98112",
                  region: "WA",
                },
              },
            },
          ],
        }),
      })
      expect(screen.getByText("Ship to")).toBeInTheDocument()
      expect(screen.getByText("Seattle, WA 98112")).toBeInTheDocument()
    })
  })

  describe("when there is no active order", () => {
    it("doesn't show any shipping info", () => {
      renderWithRelay({
        CommerceOrderConnectionWithTotalCount: () => ({
          edges: [],
        }),
      })

      expect(screen.queryByText("Ship to")).not.toBeInTheDocument()
    })

    it("doesn't show any credit card info", () => {
      renderWithRelay({
        CommerceOrderConnectionWithTotalCount: () => ({
          edges: [],
        }),
      })

      expect(screen.queryByText("Payment Method")).not.toBeInTheDocument()
    })

    it("doesn't show any pricing info", () => {
      renderWithRelay({
        CommerceOrderConnectionWithTotalCount: () => ({
          edges: [],
        }),
      })

      expect(screen.queryByText("List Price")).not.toBeInTheDocument()
    })
  })
})
