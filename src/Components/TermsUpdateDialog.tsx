import Cookies from "cookies-js"
import { Button, ModalDialog, Stack, Text } from "@artsy/palette"
import { FC, useEffect, useState } from "react"
import { getENV } from "Utils/getENV"
import { useSystemContext } from "System/SystemContext"
import { RouterLink } from "System/Router/RouterLink"

const TERMS_UPDATE_DIALOG_KEY = "terms-update-2024-dismissed"

interface TermsUpdateDialogProps {}

export const TermsUpdateDialog: FC<TermsUpdateDialogProps> = () => {
  const { isEigen, user } = useSystemContext()

  const isIntegrity = getENV("USER_AGENT") === "ArtsyIntegrity"
  const isSmokeTest = getENV("USER_AGENT") === "ForceSmokeTest"

  const isTermsUpdateActive = false

  const [isDisplayable, setIsDisplayable] = useState(false)

  const handleClose = () => {
    setIsDisplayable(false)
    Cookies.set(TERMS_UPDATE_DIALOG_KEY, 1, { expires: 31536000 })
  }

  const isUserLoggedOut = !user
  const canSkipDialog = isSmokeTest || isIntegrity || isEigen

  useEffect(() => {
    if (!isTermsUpdateActive) return
    if (isUserLoggedOut) return
    if (canSkipDialog) return

    const isDismissed = Cookies.get(TERMS_UPDATE_DIALOG_KEY)
    if (isDismissed) return

    setIsDisplayable(true)
  }, [isUserLoggedOut, canSkipDialog, isTermsUpdateActive])

  if (!isDisplayable) {
    return null
  }

  return (
    <ModalDialog
      hasLogo
      onClose={handleClose}
      footer={
        <Button width="100%" onClick={handleClose}>
          Acknowledge
        </Button>
      }
    >
      <Stack gap={2} textAlign="center">
        <Text variant="sm">
          We’ve recently made updates to the terms and conditions that govern
          our services, including information on procedures for resolving
          disputes with us. Our updated{" "}
          <RouterLink to="/terms" textDecoration="underline" target="_blank">
            General Terms and Conditions of Sale
          </RouterLink>{" "}
          will take effect on May 1. We encourage you to review them.
        </Text>

        <Text variant="sm">
          By continuing to use our services after that date, you agree to these
          updates.
        </Text>
      </Stack>
    </ModalDialog>
  )
}
