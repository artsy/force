import { UserRegistrationAuctionsFragmentContainer } from "Apps/Settings/Routes/Auctions/Components/UserRegistrationAuctions"
import { setupTestWrapperTL } from "DevTools/setupTestWrapperTL"
import { screen } from "@testing-library/react"
import type { UserRegistrationAuctionsTestQuery } from "__generated__/UserRegistrationAuctionsTestQuery.graphql"
import { graphql } from "react-relay"

jest.unmock("react-relay")

const { renderWithRelay } =
  setupTestWrapperTL<UserRegistrationAuctionsTestQuery>({
    Component: UserRegistrationAuctionsFragmentContainer,
    query: graphql`
      query UserRegistrationAuctionsTestQuery @relay_test_operation {
        me {
          ...UserRegistrationAuctions_me
        }
      }
    `,
  })

describe("UserRegistrationAuctions", () => {
  it("renders correctly", () => {
    renderWithRelay({
      Me: () => ({
        saleRegistrationsConnection: {
          edges: [
            {
              node: {
                sale: {
                  name: "the-good-sale",
                },
              },
            },
          ],
        },
      }),
    })

    expect(screen.getByText("the-good-sale")).toBeInTheDocument()
  })

  it("renders -Nothing to Show- message when no available sale found", () => {
    renderWithRelay({
      Me: () => ({
        saleRegistrationsConnection: {
          edges: [],
        },
      }),
    })

    expect(screen.getByText("Nothing to Show")).toBeInTheDocument()
  })

  it("renders -Registration for Upcoming Auctions- title even if data is not there", () => {
    renderWithRelay({
      Me: () => ({
        saleRegistrationsConnection: {
          edges: [],
        },
      }),
    })

    expect(
      screen.getByText("Registration for Upcoming Auctions"),
    ).toBeInTheDocument()
  })

  it("renders button with correct href of sale", () => {
    renderWithRelay({
      Me: () => ({
        saleRegistrationsConnection: {
          edges: [
            {
              node: {
                sale: {
                  name: "the-good-sale",
                  href: "/the-good-sale",
                },
              },
            },
          ],
        },
      }),
    })

    const registerButton = screen.getByRole("link", { name: "Register" })
    expect(registerButton).toHaveAttribute("href", "/the-good-sale")
  })
})
