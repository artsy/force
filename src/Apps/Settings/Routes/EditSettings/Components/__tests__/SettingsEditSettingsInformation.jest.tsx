import { fireEvent, screen } from "@testing-library/react"
import { SettingsEditSettingsInformationFragmentContainer } from "Apps/Settings/Routes/EditSettings/Components/SettingsEditSettingsInformation"
import { setupTestWrapperTL } from "DevTools/setupTestWrapperTL"
import { graphql } from "react-relay"

jest.unmock("react-relay")

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

describe("SettingsEditSettingsInformation", () => {
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
