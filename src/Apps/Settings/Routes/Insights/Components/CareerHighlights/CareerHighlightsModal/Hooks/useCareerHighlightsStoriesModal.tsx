import { useCareerHighlightsStories } from "Apps/Settings/Routes/Insights/Components/CareerHighlights/CareerHighlightsModal/Hooks/useCareerHighlightsStories"
import type { CareerHighlightKindWithPromo } from "Apps/Settings/Routes/Insights/Components/CareerHighlights/CareerHighlightsModal/config"

interface UseCareerHighlightsModalProps {
  careerHighlights: CareerHighlightKindWithPromo[]
}

export const useCareerHighlightsStoriesModal = (
  props: UseCareerHighlightsModalProps,
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
