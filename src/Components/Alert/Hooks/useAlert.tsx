import { useMemo, useState } from "react"

import { AlertProvider } from "Components/Alert/Hooks/useAlertContext"
import { Modal } from "Components/Alert/Components/Modal"
import { SearchCriteriaAttributes } from "Components/SavedSearchAlert/types"
import { Steps } from "Components/Alert/Components/Steps"

interface UseAlert {
  initialCriteria?: SearchCriteriaAttributes
}

export const useAlert = ({ initialCriteria }: UseAlert) => {
  const [isVisible, setIsVisible] = useState(false)

  const showDialog = () => {
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
