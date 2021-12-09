import { graphql } from "react-relay"
import { screen, fireEvent } from "@testing-library/react"
import { SettingsEditSettingsTwoFactorFragmentContainer } from "../SettingsEditSettingsTwoFactor"
import { setupTestWrapperTL } from "v2/DevTools/setupTestWrapper"
import { useCreateSettingsBackupSecondFactors } from "../SettingsEditSettingsTwoFactor/useCreateSettingsBackupSecondFactorsMutation"
import { flushPromiseQueue } from "v2/DevTools"

jest.unmock("react-relay")
jest.mock(
  "../SettingsEditSettingsTwoFactor/useCreateSettingsBackupSecondFactorsMutation"
)

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
      renderWithRelay()

      expect(
        screen.getByText(
          "Generate one-time backup codes to access your account. Keep these safe."
        )
      ).toBeInTheDocument()
    })

    it("prompts to setup if no codes are available", () => {
      renderWithRelay({ Me: () => ({ backupSecondFactors: null }) })

      expect(screen.getByText("Set up")).toBeInTheDocument()
    })

    it("creates backup codes and displays codes in a modal", async () => {
      renderWithRelay({ Me: () => ({ backupSecondFactors: null }) })

      const setupButton = screen.getByText("Set up")

      expect(setupButton).toBeInTheDocument()
      expect(mockSubmitCreateSettingsBackupSecondFactors).not.toBeCalled()

      fireEvent.click(setupButton)

      expect(mockSubmitCreateSettingsBackupSecondFactors).toBeCalled()

      await flushPromiseQueue()

      expect(screen.getByText("Your backup codes")).toBeInTheDocument()
    })
  })
})
