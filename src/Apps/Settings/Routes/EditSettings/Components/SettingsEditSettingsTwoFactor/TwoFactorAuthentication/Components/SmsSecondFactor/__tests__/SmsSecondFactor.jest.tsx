import { SmsSecondFactorRefetchContainer } from "Apps/Settings/Routes/EditSettings/Components/SettingsEditSettingsTwoFactor/TwoFactorAuthentication/Components/SmsSecondFactor/index"
import { setupTestWrapperTL } from "DevTools/setupTestWrapperTL"
import { screen } from "@testing-library/react"
import { graphql } from "react-relay"

jest.unmock("react-relay")

const { renderWithRelay } = setupTestWrapperTL({
  Component: SmsSecondFactorRefetchContainer,
  query: graphql`
    query SmsSecondFactor_Test_Query @relay_test_operation {
      me {
        ...SmsSecondFactor_me
      }
    }
  `,
})

describe("SmsSecondFactor", () => {
  describe("SMS warning message", () => {
    it("doesn't encourage users to use MFA app over SMS if user is not an Artsy employee", () => {
      renderWithRelay({
        Me: () => ({ email: "user@gmail.com" }),
      })

      //

      expect(
        screen.queryByText(
          "Artsy employees are encouraged to use the “App Authenticator” 2FA method via 1Password (or your preferred password manager).",
        ),
      ).not.toBeInTheDocument()
    })

    it("encourage Artsy employees to use MFA app over SMS", () => {
      renderWithRelay({
        Me: () => ({ email: "user@artsymail.com" }),
      })

      expect(
        screen.getByText(
          "Artsy employees are encouraged to use the “App Authenticator” 2FA method via 1Password (or your preferred password manager).",
        ),
      ).toBeInTheDocument()
    })
  })
})
