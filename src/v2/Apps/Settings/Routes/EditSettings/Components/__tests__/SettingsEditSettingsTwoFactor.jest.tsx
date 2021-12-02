import { graphql } from "react-relay"
import { screen } from "@testing-library/react"
import { SettingsEditSettingsTwoFactorFragmentContainer } from "../SettingsEditSettingsTwoFactor"
import { setupTestWrapperTL } from "v2/DevTools/setupTestWrapper"
import { useTracking } from "v2/System/Analytics/useTracking"

jest.unmock("react-relay")
jest.mock("v2/System/Analytics/useTracking")

const { renderWithRelay } = setupTestWrapperTL({
  Component: SettingsEditSettingsTwoFactorFragmentContainer,
  query: graphql`
    query SettingsEditSettingsTwoFactor_Test_Query {
      me {
        ...SettingsEditSettingsTwoFactor_me
      }
    }
  `,
})

describe("TwoFactorAuthentication", () => {
  const mockUseTracking = useTracking as jest.Mock

  beforeEach(() => {
    mockUseTracking.mockImplementation(() => ({
      trackEvent: jest.fn(),
    }))
  })

  it("shows current 2FA enrollment status", async () => {
    renderWithRelay({
      Me: () => ({ hasSecondFactorEnabled: true }),
    })
    expect(screen.getByText("Enabled")).toBeInTheDocument()
    expect(
      screen.getByText(
        "Set up an additional layer of security by requiring a security code in addition to your password to log in to your Artsy account."
      )
    ).toBeInTheDocument()
  })

  it("does not say enabled if not enrolled in 2fa", async () => {
    renderWithRelay({
      Me: () => ({ hasSecondFactorEnabled: false }),
    })
    expect(screen.queryByText("Enabled")).not.toBeInTheDocument()
  })

  describe("AppSecondFactor", () => {
    it("can display Second Factor", async () => {
      renderWithRelay()
      expect(screen.getByText("Use text messages")).toBeInTheDocument()
    })

    // eslint-disable-next-line jest/no-disabled-tests
    it.skip("creates an enabled App Authenticator 2FA factor", async () => {
      // const env = setupTestEnv()
      // const page = await env.buildPage()
      // env.mutations.useResultsOnce(CreateAppSecondFactorMutationSuccessResponse)
      // env.mutations.useResultsOnce(UpdateAppSecondFactorMutationSuccessResponse)
      // env.mutations.useResultsOnce(EnableAppSecondFactorMutationSuccessResponse)
      // await page.clickAppSetupButton()
    })
  })

  describe("SmsSecondFactor", () => {
    it("can display SMSSecondFactor", async () => {
      renderWithRelay()

      expect(
        screen.getByText("Security codes will be sent to your mobile phone.")
      ).toBeInTheDocument()
    })

    // eslint-disable-next-line jest/no-disabled-tests
    it.skip("creates an enabled SMS 2FA factor", async () => {
      //     const env = setupTestEnv()
      //     const page = await env.buildPage()
      //     env.mutations.useResultsOnce(CreateSmsSecondFactorMutationSuccessResponse)
      //     env.mutations.useResultsOnce(
      //       DeliverSmsSecondFactorMutationSuccessResponse
      //     )
      //     env.mutations.useResultsOnce(UpdateSmsSecondFactorMutationSuccessResponse)
      //     env.mutations.useResultsOnce(EnableSmsSecondFactorMutationSuccessResponse)
      //     await page.clickSmsSetupButton()
    })
  })

  describe("BackupSecondFactor", () => {
    it("can display BackupSecondFactor", async () => {
      renderWithRelay()

      expect(
        screen.getByText(
          "Generate one-time backup codes to access your account. Keep these safe."
        )
      ).toBeInTheDocument()
    })

    // eslint-disable-next-line jest/no-disabled-tests
    it.skip("prompts to setup if no codes are available", async () => {
      //     const env = setupTestEnv()
      //     const page = await env.buildPage({
      //       mockData: AppEnabledWithoutBackupCodesQueryResponse,
      //     })
      //     expect(page.backupSetupButton.exists).toBeTruthy
    })

    // eslint-disable-next-line jest/no-disabled-tests
    it.skip("creates backup codes and displays codes in a modal", async () => {
      //     const env = setupTestEnv()
      //     const page = await env.buildPage({
      //       mockData: AppEnabledWithoutBackupCodesQueryResponse,
      //     })
      //     expect(page.backupSetupButton.exists).toBeTruthy
      //     env.mutations.useResultsOnce(
      //       CreateBackupSecondFactorsMutationSuccessResponse
      //     )
      //     env.mockQuery.mockImplementation(
      //       createMockFetchQuery({
      //         mockData: AppEnabledWithBackupCodesQueryResponse,
      //       })
      //     )
      //     await page.clickBackupSetupButton()
      //     setTimeout(() => {
      //       const modalText = page.backupModal.text()
      //       BackupSecondFactors.forEach(factor => {
      //         expect(modalText).toContain(factor.code)
      //       })
      //       done()
      //     })
    })

    // eslint-disable-next-line jest/no-disabled-tests
    it.skip("shows current backup codes in a modal", async () => {
      //     const env = setupTestEnv()
      //     const page = await env.buildPage({
      //       mockData: AppEnabledWithBackupCodesQueryResponse,
      //     })
      //     expect(page.find("BackupSecondFactor").text()).toContain("10 remaining")
      //     await page.clickBackupShowButton()
      //     setTimeout(() => {
      //       const modalText = page.backupModal.text()
      //       BackupSecondFactors.forEach(factor => {
      //         expect(modalText).toContain(factor.code)
      //       })
      //       done()
      //     })
    })

    // eslint-disable-next-line jest/no-disabled-tests
    it.skip("regenerates backup codes and displays codes in a modal", async () => {
      //     const env = setupTestEnv()
      //     const page = await env.buildPage({
      //       mockData: AppEnabledWithBackupCodesQueryResponse,
      //     })
      //     expect(page.backupRegenerateButton.exists).toBeTruthy
      //     env.mutations.useResultsOnce(
      //       CreateBackupSecondFactorsMutationSuccessResponse
      //     )
      //     await page.clickBackupRegenerateButton()
      //     setTimeout(() => {
      //       const modalText = page.backupModal.text()
      //       BackupSecondFactors.forEach(factor => {
      //         expect(modalText).toContain(factor.code)
      //       })
      //       done()
      //     })
      //   })
      // })
    })
  })
})
