import { screen } from "@testing-library/react"
import { graphql } from "react-relay"
import { setupTestWrapperTL } from "DevTools/setupTestWrapper"
import { SettingsEditSettingsLinkedAccountsFragmentContainer } from "Apps/Settings/Routes/EditSettings/Components/SettingsEditSettingsLinkedAccounts"

jest.unmock("react-relay")
jest.mock("Utils/getENV", () => ({
  getENV: jest.fn().mockReturnValue({
    applePath: "/users/auth/apple",
    facebookPath: "/users/auth/facebook",
    googlePath: "/users/auth/google",
  }),
}))

const { renderWithRelay } = setupTestWrapperTL({
  Component: SettingsEditSettingsLinkedAccountsFragmentContainer,
  query: graphql`
    query SettingsEditSettingsLinkedAccounts_Test_Query {
      me {
        ...SettingsEditSettingsLinkedAccounts_me
      }
    }
  `,
})

describe("SettingsEditSettingsLinkedAccounts", () => {
  it("renders correctly", () => {
    renderWithRelay()

    expect(screen.getByText("Linked Accounts")).toBeInTheDocument()
    expect(screen.getByText("Connect Facebook Account")).toBeInTheDocument()
    expect(screen.getByText("Connect Apple Account")).toBeInTheDocument()
    expect(screen.getByText("Connect Google Account")).toBeInTheDocument()
  })

  it("renders the link if the accounts are disconnected", () => {
    renderWithRelay({
      Me: () => ({ authentications: [] }),
    })

    const links = screen.getAllByRole("link")

    expect(links[0]).toHaveAttribute("href", "/users/auth/facebook")
    expect(links[1]).toHaveAttribute("href", "/users/auth/apple")
    expect(links[2]).toHaveAttribute("href", "/users/auth/google")
  })

  it("renders the buttons if the accounts are connected", () => {
    renderWithRelay({
      Me: () => ({
        authentications: [
          { provider: "FACEBOOK" },
          { provider: "APPLE" },
          { provider: "GOOGLE" },
        ],
      }),
    })

    expect(screen.getByText("Disconnect Facebook Account")).toBeInTheDocument()
    expect(screen.getByText("Disconnect Apple Account")).toBeInTheDocument()
    expect(screen.getByText("Disconnect Google Account")).toBeInTheDocument()
  })
})
