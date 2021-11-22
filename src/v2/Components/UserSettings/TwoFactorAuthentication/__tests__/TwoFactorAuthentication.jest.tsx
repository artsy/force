import { graphql } from "react-relay"

import { createTestEnv } from "v2/DevTools/createTestEnv"

import { TwoFactorAuthenticationQueryResponse } from "v2/__generated__/TwoFactorAuthenticationQuery.graphql"
import { createMockFetchQuery } from "v2/DevTools"
import { TwoFactorAuthenticationRefetchContainer } from "../"
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
import { mount } from "enzyme"
import { BackupSecondFactorReminder } from "../Components/BackupSecondFactorReminder"

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

      expect(page.appSetupButton.exists).toBeTruthy
    })

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

      expect(page.smsSetupButton.exists).toBeTruthy
    })

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

      expect(page.backupSetupButton.exists).toBeTruthy
    })

    it("creates backup codes and displays codes in a modal", async done => {
      const env = setupTestEnv()
      const page = await env.buildPage({
        mockData: AppEnabledWithoutBackupCodesQueryResponse,
      })

      expect(page.backupSetupButton.exists).toBeTruthy

      env.mutations.useResultsOnce(
        CreateBackupSecondFactorsMutationSuccessResponse
      )
      env.mockQuery.mockImplementation(
        createMockFetchQuery({
          mockData: AppEnabledWithBackupCodesQueryResponse,
        })
      )

      await page.clickBackupSetupButton()

      setTimeout(() => {
        const modalText = page.backupModal.text()

        BackupSecondFactors.forEach(factor => {
          expect(modalText).toContain(factor.code)
        })

        done()
      })
    })

    it("shows current backup codes in a modal", async done => {
      const env = setupTestEnv()
      const page = await env.buildPage({
        mockData: AppEnabledWithBackupCodesQueryResponse,
      })

      expect(page.find("BackupSecondFactor").text()).toContain("10 remaining")

      await page.clickBackupShowButton()

      setTimeout(() => {
        const modalText = page.backupModal.text()

        BackupSecondFactors.forEach(factor => {
          expect(modalText).toContain(factor.code)
        })

        done()
      })
    })

    it("regenerates backup codes and displays codes in a modal", async done => {
      const env = setupTestEnv()
      const page = await env.buildPage({
        mockData: AppEnabledWithBackupCodesQueryResponse,
      })

      expect(page.backupRegenerateButton.exists).toBeTruthy

      env.mutations.useResultsOnce(
        CreateBackupSecondFactorsMutationSuccessResponse
      )

      await page.clickBackupRegenerateButton()

      setTimeout(() => {
        const modalText = page.backupModal.text()

        BackupSecondFactors.forEach(factor => {
          expect(modalText).toContain(factor.code)
        })

        done()
      })
    })
  })
})

describe("Two factor authentication enrollment", () => {
  const props = {
    backupSecondFactors: ['d3bd78d468', '7aa4c5922c'],
    factorTypeName: 'AppSecondFactor'
  }
  const getWrapper = (passedProps = props) => {
    return mount(<BackupSecondFactorReminder {...passedProps} />)
  }

  const getCopyButton = () => {
    return getWrapper().find('[data-test="copyButton"]').first()
  }

  describe("when the browser does not support clipboard", () => {
    it("displays a copy button based on browser support", () => {
      expect(getCopyButton()).toHaveLength(0)
    })
  })

  describe("when the browser supports clipboard", () => {
    const mockClipboard = { writeText: jest.fn() };
    beforeEach(() => {
      Object.assign(navigator, {
        clipboard: mockClipboard
      });
    })

    it("displays a copy button", () => {
      const copyButton = getCopyButton()

      expect(copyButton).toHaveLength(1)
      expect(copyButton.text()).toBe("Copy")
    })

    it("enables user to copy the recovery codes", () => {
      const copyButtonProps = getCopyButton().props()

      if (copyButtonProps.onClick) copyButtonProps.onClick({} as any);

      expect(navigator.clipboard.writeText).toBeCalledTimes(1)
    })
  })
})
