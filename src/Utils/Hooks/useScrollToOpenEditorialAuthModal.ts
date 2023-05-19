import { ContextModule, Intent } from "@artsy/cohesion"
import { useScrollToOpenAuthModal } from "Utils/Hooks/useScrollToOpenAuthModal"

export const useScrollToOpenEditorialAuthModal = () => {
  useScrollToOpenAuthModal({
    key: "editorial-signup-dismissed",
    options: {
      mode: "SignUp",
      options: {
        title: mode => {
          const action = mode === "SignUp" ? "Sign up" : "Log in"
          return `${action} for the latest in art market news`
        },
      },
      analytics: {
        contextModule: ContextModule.popUpModal,
        intent: Intent.viewEditorial,
        trigger: "scroll",
      },
    },
  })
}
