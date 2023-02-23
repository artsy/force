import { fireEvent, screen } from "@testing-library/react"
import { SettingsEditSettingsInformationFragmentContainer } from "Apps/Settings/Routes/EditSettings/Components/SettingsEditSettingsInformation"
import { setupTestWrapperTL } from "DevTools/setupTestWrapper"
import { graphql } from "react-relay"

jest.unmock("react-relay")
jest.mock("System/useSystemContext")

const { renderWithRelay } = setupTestWrapperTL({
  Component: SettingsEditSettingsInformationFragmentContainer,
  query: graphql`
    query SettingsEditSettingsInformation_Test_Query @relay_test_operation {
      me {
        ...SettingsEditSettingsInformation_me
      }
    }
  `,
})

describe("SettingsEditSettingsInformation with cx-collector-profile ff enabled", () => {
  it("renders the form", () => {
    renderWithRelay()

    expect(screen.queryByText("Email")).toBeInTheDocument()
    expect(screen.queryByText("Price Range")).toBeInTheDocument()
    expect(screen.queryByText("Mobile Number")).toBeInTheDocument()
    expect(screen.queryByText("Password")).not.toBeInTheDocument()
  })

  it("displays the password", async () => {
    renderWithRelay({ Me: () => ({ email: "me@example.com" }) })

    expect(screen.queryByText("Password")).not.toBeInTheDocument()

    const emailInput = screen.getByPlaceholderText("Enter your email address")

    fireEvent.change(emailInput, {
      target: { name: "email", value: "changed@example.com" },
    })

    const passwordInput = screen.getByPlaceholderText("Enter your password")

    expect(passwordInput).toBeInTheDocument()
  })
})

describe("SettingsEditSettingsInformation with cx-collector-profile ff disabled", () => {
  it("renders the form", () => {
    renderWithRelay()

    expect(screen.queryByText("Full Name")).toBeInTheDocument()
    expect(screen.queryByText("Email")).toBeInTheDocument()
    expect(screen.queryByText("Mobile Number")).toBeInTheDocument()
    expect(screen.queryByText("Password")).not.toBeInTheDocument()
  })

  it("displays the password", async () => {
    renderWithRelay({ Me: () => ({ email: "me@example.com" }) })

    expect(screen.queryByText("Password")).not.toBeInTheDocument()

    const emailInput = screen.getByPlaceholderText("Enter your email address")

    fireEvent.change(emailInput, {
      target: { name: "email", value: "changed@example.com" },
    })

    const passwordInput = screen.getByPlaceholderText("Enter your password")

    expect(passwordInput).toBeInTheDocument()
  })
})
