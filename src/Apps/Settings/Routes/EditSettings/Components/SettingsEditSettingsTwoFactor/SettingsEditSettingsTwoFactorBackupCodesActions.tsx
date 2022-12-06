import { BoxProps, Button, Flex, Spacer } from "@artsy/palette"
import React, { useEffect } from "react"
import { useMode } from "Utils/Hooks/useMode"

interface SettingsEditSettingsTwoFactorBackupCodesActionsProps
  extends BoxProps {
  backupSecondFactors: string[]
}

export const SettingsEditSettingsTwoFactorBackupCodesActions: React.FC<SettingsEditSettingsTwoFactorBackupCodesActionsProps> = ({
  backupSecondFactors,
  ...rest
}) => {
  const [mode, setMode] = useMode<"Unsupported" | "Supported" | "Copied">(
    "Unsupported"
  )

  useEffect(() => {
    // Only render the copy button if browser supports the Clipboard API
    // https://developer.mozilla.org/en-US/docs/Web/API/Clipboard_API
    if ("clipboard" in navigator) setMode("Supported")
  }, [setMode])

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>

    if (mode === "Copied") {
      timeout = setTimeout(() => setMode("Supported"), 1000)
    }

    return () => {
      clearTimeout(timeout)
    }
  }, [mode, setMode])

  const copyCodesToClipboard = () => {
    navigator.clipboard.writeText(backupSecondFactors.join("\n"))
    setMode("Copied")
  }

  const downloadCodes = () => {
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
    <Flex justifyContent="center" {...rest}>
      {mode !== "Unsupported" && (
        <>
          <Button
            onClick={copyCodesToClipboard}
            data-test="copyButton"
            flex={1}
            size="small"
            variant="secondaryBlack"
          >
            {mode === "Copied" ? "Copied" : "Copy"}
          </Button>

          <Spacer x={1} />
        </>
      )}

      <Button
        onClick={downloadCodes}
        data-test="downloadButton"
        flex={1}
        size="small"
        variant="secondaryBlack"
      >
        Download
      </Button>
    </Flex>
  )
}
