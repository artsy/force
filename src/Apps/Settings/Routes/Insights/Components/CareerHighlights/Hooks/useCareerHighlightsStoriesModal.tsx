import { CareerHighlightKindWithPromo } from "Apps/Settings/Routes/Insights/Components/CareerHighlights/config"
import { useCareerHighlightsStories } from "Apps/Settings/Routes/Insights/Components/CareerHighlights/Hooks/useCareerHighlightsStories"

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
