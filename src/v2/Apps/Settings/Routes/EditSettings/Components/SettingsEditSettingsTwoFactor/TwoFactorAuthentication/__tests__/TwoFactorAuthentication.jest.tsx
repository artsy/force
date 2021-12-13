import { graphql } from "react-relay"

import { createTestEnv } from "v2/DevTools/createTestEnv"

import { TwoFactorAuthenticationQueryResponse } from "v2/__generated__/TwoFactorAuthenticationQuery.graphql"
import { createMockFetchQuery } from "v2/DevTools"
import { TwoFactorAuthenticationRefetchContainer } from ".."
import {
  AppEnabledWithBackupCodesQueryResponse,
  AppEnabledWithoutBackupCodesQueryResponse,
  BackupSecondFactors,
  CreateAppSecondFactorMutationSuccessResponse,
  CreateBackupSecondFactorsMutationSuccessResponse,
  CreateSmsSecondFactorMutationSuccessResponse,
  DeliverSmsSecondFactorMutationSuccessResponse,
  EnableAppSecondFactorMutationSuccessResponse,
  EnableSmsSecondFactorMutationSuccessResponse,
  UpdateAppSecondFactorMutationSuccessResponse,
  UpdateSmsSecondFactorMutationSuccessResponse,
} from "./fixtures"
import { TwoFactorAuthenticationTestPage } from "./Utils/TwoFactorAuthenticationTestPage"

jest.unmock("react-relay")
HTMLCanvasElement.prototype.getContext = jest.fn()

const setupTestEnv = () => {
  return createTestEnv({
    TestPage: TwoFactorAuthenticationTestPage,
    Component: (props: TwoFactorAuthenticationQueryResponse) => (
      // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
      <TwoFactorAuthenticationRefetchContainer {...props} />
    ),
    query: graphql`
      query TwoFactorAuthenticationTestQuery {
        me {
          ...TwoFactorAuthentication_me
        }
      }
    `,
    defaultMutationResults: {
      createBackupSecondFactors: {},
      createSmsSecondFactor: {},
      updateSmsSecondFactor: {},
      createAppSecondFactor: {},
      updateAppSecondFactor: {},
      deliverSecondFactor: {},
      enableSecondFactor: {},
      disableSecondFactor: {},
    },
    defaultData: {
      me: {
        hasSecondFactorEnabled: false,
        appSecondFactors: [],
        smsSecondFactors: [],
        backupSecondFactors: [],
      },
    },
  })
}

describe("TwoFactorAuthentication", () => {
  it("shows current 2FA enrollment status", async () => {
    const env = setupTestEnv()
    const page = await env.buildPage()

    expect(page.text()).toContain("Two-factor Authentication")
    expect(page.text()).toContain("Set up")
  })

  describe("AppSecondFactor", () => {
    it("prompts to setup if not enabled", async () => {
      const env = setupTestEnv()
      const page = await env.buildPage()

      expect(page.appSetupButton.exists).toBeTruthy()
    })

    // eslint-disable-next-line jest/expect-expect
    it("creates an enabled App Authenticator 2FA factor", async () => {
      const env = setupTestEnv()
      const page = await env.buildPage()

      env.mutations.useResultsOnce(CreateAppSecondFactorMutationSuccessResponse)
      env.mutations.useResultsOnce(UpdateAppSecondFactorMutationSuccessResponse)
      env.mutations.useResultsOnce(EnableAppSecondFactorMutationSuccessResponse)

      await page.clickAppSetupButton()
    })
  })

  describe("SmsSecondFactor", () => {
    it("prompts to setup if not enabled", async () => {
      const env = setupTestEnv()
      const page = await env.buildPage()

      expect(page.smsSetupButton.exists).toBeTruthy()
    })

    // eslint-disable-next-line jest/expect-expect
    it("creates an enabled SMS 2FA factor", async () => {
      const env = setupTestEnv()
      const page = await env.buildPage()

      env.mutations.useResultsOnce(CreateSmsSecondFactorMutationSuccessResponse)
      env.mutations.useResultsOnce(
        DeliverSmsSecondFactorMutationSuccessResponse
      )
      env.mutations.useResultsOnce(UpdateSmsSecondFactorMutationSuccessResponse)
      env.mutations.useResultsOnce(EnableSmsSecondFactorMutationSuccessResponse)

      await page.clickSmsSetupButton()
    })
  })

  describe("BackupSecondFactor", () => {
    it("prompts to setup if no codes are available", async () => {
      const env = setupTestEnv()
      const page = await env.buildPage({
        mockData: AppEnabledWithoutBackupCodesQueryResponse,
      })

      expect(page.backupSetupButton.exists).toBeTruthy()
    })

    it("creates backup codes and displays codes in a modal", async () => {
      const env = setupTestEnv()
      const page = await env.buildPage({
        mockData: AppEnabledWithoutBackupCodesQueryResponse,
      })

      expect(page.backupSetupButton.exists).toBeTruthy()

      env.mutations.useResultsOnce(
        CreateBackupSecondFactorsMutationSuccessResponse
      )
      env.mockQuery.mockImplementation(
        createMockFetchQuery({
          mockData: AppEnabledWithBackupCodesQueryResponse,
        })
      )

      await page.clickBackupSetupButton()

      const modalText = page.backupModal.text()
      BackupSecondFactors.forEach(factor => {
        expect(modalText).toContain(factor.code)
      })
    })

    it("shows current backup codes in a modal", async () => {
      const env = setupTestEnv()
      const page = await env.buildPage({
        mockData: AppEnabledWithBackupCodesQueryResponse,
      })

      expect(page.find("BackupSecondFactor").text()).toContain("10 remaining")

      await page.clickBackupShowButton()

      const modalText = page.backupModal.text()
      BackupSecondFactors.forEach(factor => {
        expect(modalText).toContain(factor.code)
      })
    })

    it("regenerates backup codes and displays codes in a modal", async () => {
      const env = setupTestEnv()
      const page = await env.buildPage({
        mockData: AppEnabledWithBackupCodesQueryResponse,
      })

      expect(page.backupRegenerateButton.exists).toBeTruthy()

      env.mutations.useResultsOnce(
        CreateBackupSecondFactorsMutationSuccessResponse
      )

      await page.clickBackupRegenerateButton()

      const modalText = page.backupModal.text()
      BackupSecondFactors.forEach(factor => {
        expect(modalText).toContain(factor.code)
      })
    })
  })
})
