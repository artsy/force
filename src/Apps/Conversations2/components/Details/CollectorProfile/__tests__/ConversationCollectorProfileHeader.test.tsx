import { screen } from "@testing-library/react"
import { graphql } from "relay-runtime"
import { ConversationCollectorProfileHeaderTestQuery } from "__generated__/ConversationCollectorProfileHeaderTestQuery.graphql"
import { ConversationCollectorProfileHeader } from "Apps/Conversations2/components/Details/CollectorProfile/ConversationCollectorProfileHeader"
import { setupTestWrapperTL } from "DevTools/setupTestWrapper"

describe("CollectorProfileHeader", () => {
  const { renderWithRelay } = setupTestWrapperTL<
    ConversationCollectorProfileHeaderTestQuery
  >({
    Component: props => (
      <ConversationCollectorProfileHeader
        user={props.conversation?.fromUser!}
      />
    ),
    query: graphql`
      query ConversationCollectorProfileHeaderTestQuery @relay_test_operation {
        conversation(id: "conversation-id") {
          fromUser {
            ...ConversationCollectorProfileHeader_user
          }
        }
      }
    `,
  })

  it("Renders CollectorProfileHeader", () => {
    renderWithRelay({
      User: () => ({
        initials: "AP",
        collectorProfile: {
          name: "Angela",
          artsyUserSince: "1999",
        },
      }),
    })
    expect(screen.getByText("Collector Profile")).toBeInTheDocument()
    expect(screen.getByText("Angela")).toBeInTheDocument()
    expect(screen.getByText("AP")).toBeInTheDocument()
    expect(screen.getByText("Member since 1999")).toBeInTheDocument()
  })
  it("Renders without artsyUserSince if we dont have that information", () => {
    renderWithRelay({
      User: () => ({
        initials: "",
        collectorProfile: {
          name: "",
          artsyUserSince: "",
        },
      }),
    })

    expect(screen.getByText("Collector Profile")).toBeInTheDocument()
    expect(screen.queryByText("Member since ")).not.toBeInTheDocument()
  })
  describe("Displays the correct verification status", () => {
    it("verified", () => {
      renderWithRelay({
        User: () => ({
          collectorProfile: {
            isIdentityVerified: true,
            isEmailConfirmed: true,
          },
        }),
      })
      expect(screen.getByText("ID verified")).toBeInTheDocument()
      expect(screen.getByText("Email Address verified")).toBeInTheDocument()
    })
    it("unverified", () => {
      renderWithRelay({
        User: () => ({
          collectorProfile: {
            isIdentityVerified: false,
            isEmailConfirmed: false,
          },
        }),
      })
      expect(screen.getByText("ID not verified")).toBeInTheDocument()
      expect(screen.getByText("Email Address not verified")).toBeInTheDocument()
    })
  })
})
