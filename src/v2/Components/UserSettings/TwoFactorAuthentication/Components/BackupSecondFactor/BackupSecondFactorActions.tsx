import { Button, BorderBoxProps, Flex } from "@artsy/palette"
import React, { useEffect, useState } from "react"

interface BackupSecondFactorActionsProps extends BorderBoxProps {
  backupSecondFactors: string[]
}

export const BackupSecondFactorActions: React.FC<BackupSecondFactorActionsProps> = props => {
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
    const element = document.createElement("a");
    const file = new Blob([codes], {type: 'text/plain'});
    element.href = URL.createObjectURL(file);
    element.download = "recovery_codes.txt";
    document.body.appendChild(element); // Required for this to work in FireFox
    element.click();
  }

  return (
    <Flex justifyContent="center">
      {supportsClipboard && (
        <Button
          onClick={copyCodesToClipboard}
          variant="secondaryOutline"
          size="small"
          m={1}
          data-test="copyButton"
        >
          Copy
        </Button>
      )}

      <Button
        onClick={downloadCodes}
        variant="secondaryOutline"
        size="small"
        m={1}
        data-test="downloadButton"
      >
        Download
      </Button>
    </Flex>
  )
}
