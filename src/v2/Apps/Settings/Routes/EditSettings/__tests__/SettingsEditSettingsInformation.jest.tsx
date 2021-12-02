import { screen, fireEvent } from "@testing-library/react"
import { graphql } from "react-relay"
import { setupTestWrapperTL } from "v2/DevTools/setupTestWrapper"
import { SettingsEditSettingsInformationFragmentContainer } from "../Components/SettingsEditSettingsInformation"

jest.unmock("react-relay")

const { renderWithRelay } = setupTestWrapperTL({
  Component: SettingsEditSettingsInformationFragmentContainer,
  query: graphql`
    query SettingsEditSettingsInformation_Test_Query {
      me {
        ...SettingsEditSettingsInformation_me
      }
    }
  `,
})

describe("SettingsEditSettingsInformation", () => {
  it("renders the form", () => {
    renderWithRelay()

    expect(screen.queryByText("Full Name")).toBeInTheDocument()
    expect(screen.queryByText("Email")).toBeInTheDocument()
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
