import { mount } from "enzyme"
import { SettingsEditSettingsTwoFactorBackupCodesActions } from "../../SettingsEditSettingsTwoFactorBackupCodesActions"

describe("Two factor authentication enrollment", () => {
  const props = {
    backupSecondFactors: ["d3bd78d468", "7aa4c5922c"],
  }
  const getWrapper = (passedProps = props) => {
    return mount(
      <SettingsEditSettingsTwoFactorBackupCodesActions {...passedProps} />
    )
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
    const mockClipboard = { writeText: jest.fn() }
    beforeAll(() => {
      Object.assign(navigator, {
        clipboard: mockClipboard,
      })
    })

    it("displays a copy button", () => {
      const copyButton = getCopyButton()

      expect(copyButton).toHaveLength(1)
      expect(copyButton.text()).toBe("Copy")
    })

    it("enables user to copy the recovery codes", () => {
      const copyButtonProps = getCopyButton().props()

      if (copyButtonProps.onClick) copyButtonProps.onClick({} as any)

      expect(navigator.clipboard.writeText).toBeCalledTimes(1)
    })
  })

  describe("txt file download", () => {
    const downloadButton = getWrapper()
      .find('[data-test="downloadButton"]')
      .first()

    it("displays a download button", () => {
      expect(downloadButton).toHaveLength(1)
      expect(downloadButton.text()).toBe("Download")
    })

    // FIXME: SWC_COMPILER_MIGRATION
    it.skip("enables user to download the recovery codes", () => {
      global.URL.createObjectURL = jest.fn()
      global.URL.revokeObjectURL = jest.fn()

      // @ts-ignore: Type
      global.Blob = (content, options) => {
        return { content, options }
      }

      const downloadButtonProps = downloadButton.props()
      if (downloadButtonProps.onClick) downloadButtonProps.onClick({} as any)

      expect(URL.createObjectURL).toBeCalledWith({
        content: ["d3bd78d468\n7aa4c5922c"],
        options: { type: "text/plain" },
      })
    })
  })
})
