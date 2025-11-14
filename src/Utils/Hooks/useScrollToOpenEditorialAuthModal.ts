import { ContextModule, Intent } from "@artsy/cohesion"
import { useScrollToOpenAuthModal } from "Utils/Hooks/useScrollToOpenAuthModal"

export const useScrollToOpenEditorialAuthModal = () => {
  useScrollToOpenAuthModal({
    key: "editorial-signup-dismissed",
    options: {
      options: {
        title: `Sign up or log in for the latest in art market news`,
      },
      analytics: {
        contextModule: ContextModule.popUpModal,
        intent: Intent.viewEditorial,
        trigger: "scroll",
      },
    },
  })
}
