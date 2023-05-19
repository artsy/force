import { graphql } from "react-relay"
import { screen, fireEvent, waitFor } from "@testing-library/react"
import { SettingsEditSettingsTwoFactorFragmentContainer } from "Apps/Settings/Routes/EditSettings/Components/SettingsEditSettingsTwoFactor/SettingsEditSettingsTwoFactor"
import { setupTestWrapperTL } from "DevTools/setupTestWrapper"
import { useCreateSettingsBackupSecondFactors } from "Apps/Settings/Routes/EditSettings/Components/SettingsEditSettingsTwoFactor/useCreateSettingsBackupSecondFactorsMutation"
import { flushPromiseQueue } from "DevTools/flushPromiseQueue"
import { ConfirmPassword } from "Components/ConfirmPasswordModal/Mutations/ConfirmPassword"

jest.unmock("react-relay")
jest.mock(
  "../SettingsEditSettingsTwoFactor/useCreateSettingsBackupSecondFactorsMutation"
)
jest.mock("Components/ConfirmPasswordModal/Mutations/ConfirmPassword")

const { renderWithRelay } = setupTestWrapperTL({
  Component: SettingsEditSettingsTwoFactorFragmentContainer,
  query: graphql`
    query SettingsEditSettingsTwoFactor_Test_Query @relay_test_operation {
      me {
        ...SettingsEditSettingsTwoFactor_me
      }
    }
  `,
})

const mockConfirmPasswordMutation = ConfirmPassword as jest.Mock

describe("TwoFactorAuthentication", () => {
  const mockUseCreateSettingsBackupSecondFactors = useCreateSettingsBackupSecondFactors as jest.Mock
  const mockSubmitCreateSettingsBackupSecondFactors = jest.fn()

  beforeEach(() => {
    mockUseCreateSettingsBackupSecondFactors.mockImplementation(() => ({
      submitCreateSettingsBackupSecondFactors: mockSubmitCreateSettingsBackupSecondFactors,
    }))
  })

  afterEach(() => {
    mockUseCreateSettingsBackupSecondFactors.mockReset()
  })

  it("shows current 2FA enrollment status", () => {
    renderWithRelay({ Me: () => ({ hasSecondFactorEnabled: true }) })

    expect(screen.getByText("Enabled")).toBeInTheDocument()

    expect(
      screen.getByText(
        "Set up an additional layer of security by requiring a security code in addition to your password to log in to your Artsy account."
      )
    ).toBeInTheDocument()
  })

  it("does not say enabled if not enrolled in 2fa", () => {
    renderWithRelay({ Me: () => ({ hasSecondFactorEnabled: false }) })

    expect(screen.queryByText("Enabled")).not.toBeInTheDocument()
  })

  describe("AppSecondFactor", () => {
    it("can display Second Factor", () => {
      renderWithRelay()

      expect(screen.getByText("Use Text Messages")).toBeInTheDocument()
    })

    // eslint-disable-next-line jest/no-disabled-tests
    it.skip("creates an enabled App Authenticator 2FA factor", () => {
      // const env = setupTestEnv()
      // const page = await env.buildPage()
      // env.mutations.useResultsOnce(CreateAppSecondFactorMutationSuccessResponse)
      // env.mutations.useResultsOnce(UpdateAppSecondFactorMutationSuccessResponse)
      // env.mutations.useResultsOnce(EnableAppSecondFactorMutationSuccessResponse)
      // await page.clickAppSetupButton()
    })
  })

  describe("SmsSecondFactor", () => {
    it("can display SMSSecondFactor", () => {
      renderWithRelay()

      expect(
        screen.getByText("Security codes will be sent to your mobile phone.")
      ).toBeInTheDocument()
    })

    // eslint-disable-next-line jest/no-disabled-tests
    it.skip("creates an enabled SMS 2FA factor", () => {
      // const env = setupTestEnv()
      // const page = await env.buildPage()
      // env.mutations.useResultsOnce(CreateSmsSecondFactorMutationSuccessResponse)
      // env.mutations.useResultsOnce(
      //   DeliverSmsSecondFactorMutationSuccessResponse
      // )
      // env.mutations.useResultsOnce(UpdateSmsSecondFactorMutationSuccessResponse)
      // env.mutations.useResultsOnce(EnableSmsSecondFactorMutationSuccessResponse)
      // await page.clickSmsSetupButton()
    })
  })

  describe("BackupSecondFactor", () => {
    it("can display BackupSecondFactor", () => {
      renderWithRelay({
        Me: () => ({ backupSecondFactors: null, hasSecondFactorEnabled: true }),
      })

      expect(
        screen.getByText(
          "Generate one-time backup codes to access your account. Keep these safe."
        )
      ).toBeInTheDocument()
    })

    it("prompts to setup if no codes are available", () => {
      renderWithRelay({
        Me: () => ({ backupSecondFactors: null, hasSecondFactorEnabled: true }),
      })

      expect(screen.getByText("Set up")).toBeInTheDocument()
    })

    it("prompts to confirm password when regenerating codes", async () => {
      renderWithRelay({
        Me: () => ({ backupSecondFactors: true, hasSecondFactorEnabled: true }),
      })

      fireEvent.click(screen.getByText("Regenerate"))
      expect(mockSubmitCreateSettingsBackupSecondFactors).not.toBeCalled()
      expect(
        screen.getByPlaceholderText("Enter your password")
      ).toBeInTheDocument()
    })

    it("creates backup codes and displays codes in a modal", async () => {
      renderWithRelay({
        Me: () => ({ backupSecondFactors: null, hasSecondFactorEnabled: true }),
      })

      const setupButton = screen.getByText("Set up")

      expect(setupButton).toBeInTheDocument()
      expect(mockSubmitCreateSettingsBackupSecondFactors).not.toBeCalled()

      fireEvent.click(setupButton)

      const passwordInput = screen.getByPlaceholderText("Enter your password")

      expect(passwordInput).toBeInTheDocument()

      fireEvent.change(passwordInput, { target: { value: "password" } })

      fireEvent.click(screen.getByText("Confirm"))

      await waitFor(() => expect(mockConfirmPasswordMutation).toBeCalled())

      expect(mockSubmitCreateSettingsBackupSecondFactors).toBeCalled()

      await flushPromiseQueue()

      expect(screen.getByText("Your backup codes")).toBeInTheDocument()
    })
  })
})
