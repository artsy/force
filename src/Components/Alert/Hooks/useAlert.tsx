import { useEffect, useMemo, useState } from "react"

import { AlertProvider } from "Components/Alert/Hooks/useAlertContext"
import { Modal } from "Components/Alert/Components/Modal"
import { SearchCriteriaAttributes } from "Components/SavedSearchAlert/types"
import { Steps } from "Components/Alert/Components/Steps"
import { useAuthDialog } from "Components/AuthDialog"
import { useAuthIntent } from "Utils/Hooks/useAuthIntent"
import { useSystemContext } from "System/SystemContext"
import { ShowAuthDialogOptions } from "Components/AuthDialog/AuthDialogContext"

interface UseAlert {
  authDialogOptions?: Omit<ShowAuthDialogOptions, "mode">
  initialCriteria?: SearchCriteriaAttributes
}

export const useAlert = ({ authDialogOptions, initialCriteria }: UseAlert) => {
  const { showAuthDialog } = useAuthDialog()
  const { isLoggedIn } = useSystemContext()

  const { value, clearValue } = useAuthIntent()

  useEffect(() => {
    if (!value || value.action !== "createAlert") return

    showDialog()

    clearValue()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [clearValue, value])

  const [isVisible, setIsVisible] = useState(false)

  const showDialog = () => {
    if (!isLoggedIn && authDialogOptions) {
      showAuthDialog({ mode: "SignUp", ...authDialogOptions })
      return
    }

    setIsVisible(true)
  }

  const hideDialog = () => {
    setIsVisible(false)
  }

  const dialogComponent = useMemo(() => {
    return (
      <>
        {isVisible && (
          <AlertProvider initialCriteria={initialCriteria}>
            <Modal onClose={hideDialog}>
              <Steps />
            </Modal>
          </AlertProvider>
        )}
      </>
    )
  }, [isVisible, initialCriteria])

  return {
    isVisible,
    showAlert: showDialog,
    hideAlert: hideDialog,
    alertComponent: dialogComponent,
  }
}
