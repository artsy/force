import { SettingsEditSettingsTwoFactorBackupCodesActions } from "Apps/Settings/Routes/EditSettings/Components/SettingsEditSettingsTwoFactor/SettingsEditSettingsTwoFactorBackupCodesActions"
import { render, screen, fireEvent } from "@testing-library/react"

describe("Two factor authentication enrollment", () => {
  const props = {
    backupSecondFactors: ["d3bd78d468", "7aa4c5922c"],
  }

  const mockClipboard = { writeText: jest.fn() }

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it("renders both copy and download buttons when clipboard is supported", () => {
    // Setup clipboard support
    Object.assign(navigator, {
      clipboard: mockClipboard,
    })

    render(<SettingsEditSettingsTwoFactorBackupCodesActions {...props} />)

    // Both buttons should be present
    expect(screen.getByRole("button", { name: "Copy" })).toBeInTheDocument()
    expect(screen.getByRole("button", { name: "Download" })).toBeInTheDocument()
  })

  it("renders copy button even when clipboard is not supported", () => {
    // Remove clipboard support
    Object.assign(navigator, {
      clipboard: undefined,
    })

    render(<SettingsEditSettingsTwoFactorBackupCodesActions {...props} />)

    // Both buttons should be present even without clipboard support
    expect(screen.getByRole("button", { name: "Copy" })).toBeInTheDocument()
    expect(screen.getByRole("button", { name: "Download" })).toBeInTheDocument()
  })

  it("enables user to copy the recovery codes when clipboard is supported", () => {
    Object.assign(navigator, {
      clipboard: mockClipboard,
    })

    render(<SettingsEditSettingsTwoFactorBackupCodesActions {...props} />)

    const copyButton = screen.getByRole("button", { name: "Copy" })
    fireEvent.click(copyButton)

    expect(navigator.clipboard.writeText).toBeCalledTimes(1)
  })

  it("enables user to download the recovery codes", () => {
    global.URL.createObjectURL = jest.fn()
    global.URL.revokeObjectURL = jest.fn()

    // @ts-ignore: Type
    global.Blob = class {
      constructor(content, options) {
        // @ts-ignore: Type
        this.content = content
        // @ts-ignore: Type
        this.options = options
      }
    }

    Object.assign(navigator, {
      clipboard: mockClipboard,
    })

    render(<SettingsEditSettingsTwoFactorBackupCodesActions {...props} />)

    const downloadButton = screen.getByRole("button", { name: "Download" })
    fireEvent.click(downloadButton)

    expect(URL.createObjectURL).toBeCalledWith({
      content: ["d3bd78d468\n7aa4c5922c"],
      options: { type: "text/plain" },
    })
  })
})
