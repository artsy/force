import { CareerHighlightModal } from "Apps/Settings/Routes/Insights/Components/CareerHighlights/Components/CareerHighlightsModal"
import { CareerHighlightSteps } from "Apps/Settings/Routes/Insights/Components/CareerHighlights/Components/CareerHighlightsSteps"
import { CareerHighlightKindWithPromo } from "Apps/Settings/Routes/Insights/Components/CareerHighlights/config"
import { CareerHighlightsStoriesProvider } from "Apps/Settings/Routes/Insights/Components/CareerHighlights/Hooks/useCareerHighlightsStoriesContext"
import { useDialog } from "Utils/Hooks/useDialog"

interface UseCareerHighlightsStories {
  onClose(): void
  careerHighlights: CareerHighlightKindWithPromo[]
}

export const useCareerHighlightsStories = ({
  onClose,
  careerHighlights,
}: UseCareerHighlightsStories) => {
  const { isVisible, showDialog, hideDialog, dialogComponent } = useDialog({
    Dialog: () => {
      return (
        <CareerHighlightsStoriesProvider
          careerHighlights={careerHighlights}
          onClose={onClose}
        >
          <CareerHighlightModal
            onClose={hideDialog}
            height={["100%", "100%"]}
            dialogProps={{ height: ["100%", "90%"], maxHeight: 800 }}
          >
            <CareerHighlightSteps />
          </CareerHighlightModal>
        </CareerHighlightsStoriesProvider>
      )
    },
  })

  return {
    isVisible,
    showCareerHighlightsStoriesModal: showDialog,
    hideCareerHighlightsStoriesModal: hideDialog,
    careerHighlightsStoriesModalComponent: dialogComponent,
  }
}
