import { fireEvent, screen } from "@testing-library/react"
import { SmsSecondFactorRefetchContainer } from "Apps/Settings/Routes/EditSettings/Components/SettingsEditSettingsTwoFactor/TwoFactorAuthentication/Components/SmsSecondFactor/index"
import { setupTestWrapperTL } from "DevTools/setupTestWrapperTL"
import { graphql } from "react-relay"
import { useVerifyEmail } from "Apps/Settings/Routes/EditProfile/Mutations/useVerifyEmail"

jest.unmock("react-relay")
jest.mock("Apps/Settings/Routes/EditProfile/Mutations/useVerifyEmail")

const mockUseVerifyEmail = useVerifyEmail as jest.Mock
const mockSubmitVerifyEmailMutation = jest.fn()

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
  beforeEach(() => {
    mockSubmitVerifyEmailMutation.mockResolvedValue({})
    mockUseVerifyEmail.mockImplementation(() => ({
      submitMutation: mockSubmitVerifyEmailMutation,
    }))
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

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

  describe("Email confirmation requirement", () => {
    it("shows error banner when email is not confirmed and SMS 2FA is not enabled", () => {
      renderWithRelay({
        Me: () => ({
          email: "user@example.com",
          isEmailConfirmed: false,
          smsSecondFactors: [],
        }),
      })

      expect(
        screen.getByText("Email verification required"),
      ).toBeInTheDocument()
      expect(
        screen.getByText(
          /You must verify your email address before setting up text message two-factor authentication/,
        ),
      ).toBeInTheDocument()
      expect(screen.getByText("Send verification email")).toBeInTheDocument()
    })

    it("does not show error banner when email is confirmed", () => {
      renderWithRelay({
        Me: () => ({
          email: "user@example.com",
          isEmailConfirmed: true,
          smsSecondFactors: [],
        }),
      })

      expect(
        screen.queryByText("Email verification required"),
      ).not.toBeInTheDocument()
    })

    it("does not show warning banner when SMS 2FA is already enabled (grandfathered users)", () => {
      renderWithRelay({
        Me: () => ({
          email: "user@example.com",
          isEmailConfirmed: false,
          smsSecondFactors: [
            {
              __typename: "SmsSecondFactor",
              internalID: "123",
              formattedPhoneNumber: "+1 (555) 555-5555",
            },
          ],
        }),
      })

      expect(
        screen.queryByText("Email verification required"),
      ).not.toBeInTheDocument()
    })

    it("disables 'Set Up' button when email is not confirmed", () => {
      renderWithRelay({
        Me: () => ({
          email: "user@example.com",
          isEmailConfirmed: false,
          smsSecondFactors: [],
        }),
      })

      const setupButton = screen.getByRole("button", { name: "Set Up" })
      expect(setupButton).toBeDisabled()
    })

    it("enables 'Set Up' button when email is confirmed", () => {
      renderWithRelay({
        Me: () => ({
          email: "user@example.com",
          isEmailConfirmed: true,
          smsSecondFactors: [],
        }),
      })

      const setupButton = screen.getByRole("button", { name: "Set Up" })
      expect(setupButton).not.toBeDisabled()
    })

    it("allows grandfathered users with unconfirmed email to edit their phone number", () => {
      renderWithRelay({
        Me: () => ({
          email: "user@example.com",
          isEmailConfirmed: false,
          smsSecondFactors: [
            {
              __typename: "SmsSecondFactor",
              internalID: "123",
              formattedPhoneNumber: "+1 (555) 555-5555",
            },
          ],
        }),
      })

      const editButton = screen.getByRole("button", { name: "Edit" })
      expect(editButton).not.toBeDisabled()
    })

    it("shows success message after sending confirmation email", async () => {
      renderWithRelay({
        Me: () => ({
          email: "user@example.com",
          isEmailConfirmed: false,
          smsSecondFactors: [],
        }),
      })

      const sendEmailLink = screen.getByText("Send verification email")
      fireEvent.click(sendEmailLink)

      expect(
        await screen.findByText("Verification email sent"),
      ).toBeInTheDocument()
      expect(
        screen.getByText(
          /Please check your inbox and click the link to verify your email\./,
        ),
      ).toBeInTheDocument()
      expect(screen.getByText("Resend verification email")).toBeInTheDocument()
    })
  })
})
