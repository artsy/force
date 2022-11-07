import { STEPS_PLACEHOLDER } from "Apps/Settings/Routes/Insights/Components/CareerHighlights/CareerHighlightsModal/Components/CareerHighlightModalStep"
import { CareerHighlightModal } from "Apps/Settings/Routes/Insights/Components/CareerHighlights/CareerHighlightsModal/Components/CareerHighlightsModal"
import { CareerHighlightSteps } from "Apps/Settings/Routes/Insights/Components/CareerHighlights/CareerHighlightsModal/Components/CareerHighlightsSteps"
import { CareerHighlightKindWithPromo } from "Apps/Settings/Routes/Insights/Components/CareerHighlights/CareerHighlightsModal/config"
import { CareerHighlightsStoriesProvider } from "Apps/Settings/Routes/Insights/Components/CareerHighlights/CareerHighlightsModal/Hooks/useCareerHighlightsStoriesContext"
import { Suspense, useState } from "react"
import { useDialog } from "Utils/Hooks/useDialog"

interface UseCareerHighlightsStories {
  onClose(): void
  careerHighlights: CareerHighlightKindWithPromo[]
  pageIndex?: number
}

export const useCareerHighlightsStories = ({
  onClose,
  careerHighlights,
  pageIndex,
}: UseCareerHighlightsStories) => {
  const [index, setIndex] = useState(pageIndex ?? 0)

  const { isVisible, showDialog, hideDialog, dialogComponent } = useDialog({
    Dialog: () => {
      return (
        <CareerHighlightsStoriesProvider
          careerHighlights={careerHighlights}
          onClose={onClose}
          pageIndex={index}
        >
          <CareerHighlightModal
            onClose={hideDialog}
            height="100%"
            dialogProps={{ height: ["100%", "90%"], maxHeight: 900 }}
          >
            <Suspense fallback={STEPS_PLACEHOLDER}>
              <CareerHighlightSteps />
            </Suspense>
          </CareerHighlightModal>
        </CareerHighlightsStoriesProvider>
      )
    },
  })

  const showCareerHighlightsStoriesModal = (index?: number) => {
    if (index !== undefined) {
      setIndex(index)
    }

    showDialog()
  }

  return {
    isVisible,
    showCareerHighlightsStoriesModal,
    hideCareerHighlightsStoriesModal: hideDialog,
    careerHighlightsStoriesModalComponent: dialogComponent,
  }
}
