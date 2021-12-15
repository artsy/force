import { Button, BorderBoxProps, Flex } from "@artsy/palette"
import React, { useEffect, useState } from "react"

interface SettingsEditSettingsTwoFactorBackupCodesActionsProps
  extends BorderBoxProps {
  backupSecondFactors: string[]
}

export const SettingsEditSettingsTwoFactorBackupCodesActions: React.FC<SettingsEditSettingsTwoFactorBackupCodesActionsProps> = props => {
  const { backupSecondFactors } = props

  const [supportsClipboard, setSupportsClipboard] = useState(false)

  useEffect(() => {
    // Only render the copy button if browser supports the Clipboard API
    // https://developer.mozilla.org/en-US/docs/Web/API/Clipboard_API
    if ("clipboard" in navigator) setSupportsClipboard(true)
  }, [])

  function copyCodesToClipboard() {
    navigator.clipboard.writeText(backupSecondFactors.join("\n"))
  }

  function downloadCodes() {
    const codes = backupSecondFactors.join("\n")
    const element = document.createElement("a")
    const file = new Blob([codes], { type: "text/plain" })
    element.href = URL.createObjectURL(file)
    element.download = "recovery_codes.txt"
    document.body.appendChild(element) // Required for this to work in FireFox
    element.click()
    URL.revokeObjectURL(element.href)
  }

  return (
    <Flex justifyContent="center">
      {supportsClipboard && (
        <Button
          onClick={copyCodesToClipboard}
          variant="secondaryOutline"
          size="small"
          mt={4}
          mx={2}
          data-test="copyButton"
        >
          Copy
        </Button>
      )}
      <Button
        onClick={downloadCodes}
        variant="secondaryOutline"
        size="small"
        mt={4}
        mx={2}
        data-test="downloadButton"
      >
        Download
      </Button>
    </Flex>
  )
}
