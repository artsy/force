import { useMemo, useState } from "react"

import { ArtworkAlertProvider } from "Components/ArtworkAlert/Hooks/useArtworkAlertContext"
import { Modal } from "Components/ArtworkAlert/Components/Modal"
import { SearchCriteriaAttributes } from "Components/SavedSearchAlert/types"
import { Steps } from "Components/ArtworkAlert/Components/Steps"

interface UseArtworkAlert {
  initialCriteria?: SearchCriteriaAttributes
}

export const useArtworkAlert = ({ initialCriteria }: UseArtworkAlert) => {
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
          <ArtworkAlertProvider initialCriteria={initialCriteria}>
            <Modal onClose={hideDialog}>
              <Steps />
            </Modal>
          </ArtworkAlertProvider>
        )}
      </>
    )
  }, [isVisible, initialCriteria])

  return {
    isVisible,
    showArtworkAlert: showDialog,
    hideArtworkAlert: hideDialog,
    artworkAlertComponent: dialogComponent,
  }
}
