import { CareerHighlightKindWithPromo } from "Apps/Settings/Routes/Insights/Components/CareerHighlights/CareerHighlightsModal/config"
import { useCareerHighlightsStories } from "Apps/Settings/Routes/Insights/Components/CareerHighlights/CareerHighlightsModal/Hooks/useCareerHighlightsStories"

interface UseCareerHighlightsModalProps {
  careerHighlights: CareerHighlightKindWithPromo[]
}

export const useCareerHighlightsStoriesModal = (
  props: UseCareerHighlightsModalProps
) => {
  const {
    careerHighlightsStoriesModalComponent,
    showCareerHighlightsStoriesModal,
    hideCareerHighlightsStoriesModal,
  } = useCareerHighlightsStories({
    onClose: () => {
      hideCareerHighlightsStoriesModal()
    },
    careerHighlights: props.careerHighlights,
  })

  return {
    careerHighlightsStoriesModalComponent,
    showCareerHighlightsStoriesModal,
  }
}
