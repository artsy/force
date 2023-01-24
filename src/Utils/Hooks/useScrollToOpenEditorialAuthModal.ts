import { ContextModule, Intent } from "@artsy/cohesion"
import { ModalType } from "Components/Authentication/Types"
import { useRouter } from "found"
import { useScrollToOpenAuthModal } from "Utils/Hooks/useScrollToOpenAuthModal"

export const useScrollToOpenEditorialAuthModal = () => {
  const {
    match: { location },
  } = useRouter()

  useScrollToOpenAuthModal({
    key: "editorial-signup-dismissed",
    options: {
      current: {
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
      legacy: {
        mode: ModalType.signup,
        contextModule: ContextModule.popUpModal,
        copy: "Sign up for the latest in art market news",
        intent: Intent.viewEditorial,
        redirectTo: location.pathname,
        triggerSeconds: 2,
      },
    },
  })
}
