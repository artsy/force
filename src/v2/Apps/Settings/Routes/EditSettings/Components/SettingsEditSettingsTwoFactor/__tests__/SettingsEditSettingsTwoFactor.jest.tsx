import { graphql } from "react-relay"
import { screen } from "@testing-library/react"
import { SettingsEditSettingsTwoFactorRefetchContainer } from "../SettingsEditSettingsTwoFactor"
import { setupTestWrapperTL } from "v2/DevTools/setupTestWrapper"
import { useTracking } from "v2/System/Analytics/useTracking"

jest.unmock("react-relay")
jest.mock("v2/System/Analytics/useTracking")

const { renderWithRelay } = setupTestWrapperTL({
  Component: SettingsEditSettingsTwoFactorRefetchContainer,
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
    renderWithRelay()
    expect(screen.getByText("Two-factor Authentication")).toBeInTheDocument()
    expect(
      screen.getByText(
        "Set up an additional layer of security by requiring a security code in addition to your password to log in to your Artsy account."
      )
    ).toBeInTheDocument()
  })

  describe("AppSecondFactor", () => {
    it.skip("prompts to setup if not enabled", async () => {
      // const env = setupTestEnv()
      // const page = await env.buildPage()
      // expect(page.appSetupButton.exists).toBeTruthy
    })

    // eslint-disable-next-line jest/expect-expect
    it.skip("creates an enabled App Authenticator 2FA factor", async () => {
      // const env = setupTestEnv()
      // const page = await env.buildPage()
      // env.mutations.useResultsOnce(CreateAppSecondFactorMutationSuccessResponse)
      // env.mutations.useResultsOnce(UpdateAppSecondFactorMutationSuccessResponse)
      // env.mutations.useResultsOnce(EnableAppSecondFactorMutationSuccessResponse)
      // await page.clickAppSetupButton()
    })
  })

  // describe("SmsSecondFactor", () => {
  //   it("prompts to setup if not enabled", async () => {
  //     const env = setupTestEnv()
  //     const page = await env.buildPage()

  //     expect(page.smsSetupButton.exists).toBeTruthy
  //   })

  //   // eslint-disable-next-line jest/expect-expect
  //   it("creates an enabled SMS 2FA factor", async () => {
  //     const env = setupTestEnv()
  //     const page = await env.buildPage()

  //     env.mutations.useResultsOnce(CreateSmsSecondFactorMutationSuccessResponse)
  //     env.mutations.useResultsOnce(
  //       DeliverSmsSecondFactorMutationSuccessResponse
  //     )
  //     env.mutations.useResultsOnce(UpdateSmsSecondFactorMutationSuccessResponse)
  //     env.mutations.useResultsOnce(EnableSmsSecondFactorMutationSuccessResponse)

  //     await page.clickSmsSetupButton()
  //   })
  // })

  // describe("BackupSecondFactor", () => {
  //   it("prompts to setup if no codes are available", async () => {
  //     const env = setupTestEnv()
  //     const page = await env.buildPage({
  //       mockData: AppEnabledWithoutBackupCodesQueryResponse,
  //     })

  //     expect(page.backupSetupButton.exists).toBeTruthy
  //   })

  //   it("creates backup codes and displays codes in a modal", async done => {
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
  //   })

  //   it("shows current backup codes in a modal", async done => {
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
  //   })

  //   it("regenerates backup codes and displays codes in a modal", async done => {
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