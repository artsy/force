import Cookies from "cookies-js"
import { Button, ModalDialog, Text } from "@artsy/palette"
import { FC, useEffect, useState } from "react"
import { useFeatureFlag } from "System/useFeatureFlag"
import { getENV } from "Utils/getENV"

const TERMS_UPDATE_DIALOG_KEY = "terms-update-2024-dismissed"

interface TermsUpdateDialogProps {}

export const TermsUpdateDialog: FC<TermsUpdateDialogProps> = () => {
  const isIntegrity = getENV("USER_AGENT") === "ArtsyIntegrity"
  const isDevelopment = getENV("NODE_ENV") === "development"
  const isTermsUpdateActive = useFeatureFlag("diamond_new-terms-and-conditions")

  const [isDisplayable, setIsDisplayable] = useState(false)

  const handleClose = () => {
    setIsDisplayable(false)
    Cookies.set(TERMS_UPDATE_DIALOG_KEY, 1, { expires: 31536000 })
  }

  useEffect(() => {
    if (isDevelopment || isIntegrity || !isTermsUpdateActive) return

    const isDismissed = Cookies.get(TERMS_UPDATE_DIALOG_KEY)
    if (isDismissed) return

    setIsDisplayable(true)
  }, [isDevelopment, isIntegrity, isTermsUpdateActive])

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
      <Text variant="sm">
        We’ve recently made updates to the terms and conditions that govern our
        services, including information on procedures for resolving disputes
        with us. Our updated General Terms and Conditions of Sale will take
        effect on April 19. We encourage you to review them. By continuing to
        use our services after that date, you agree to these updates.
      </Text>
    </ModalDialog>
  )
}
