import { useEffect } from "react"
import { handleScrollingAuthModal } from "desktop/lib/openAuthModal"
import { ContextModule, Intent } from "@artsy/cohesion"
import { mediator } from "lib/mediator"
import Cookies from "cookies-js"
import { getENV } from "v2/Utils/getENV"

const KEY = "editorial-signup-dismissed"

const setCookie = () => {
  Cookies.set(KEY, 1, { expires: 31536000 })
}

export const useScrollingAuthModal = () => {
  useEffect(() => {
    // Does not display if previously dismissed, is mobile, or is logged in
    if (Cookies.get(KEY) || getENV("IS_MOBILE") || getENV("CURRENT_USER")) {
      return
    }

    handleScrollingAuthModal({
      intent: Intent.viewEditorial,
      contextModule: ContextModule.popUpModal,
      copy: "Sign up for the best stories in art and visual culture",
      destination: location.href,
      afterSignUpAction: {
        action: "editorialSignup",
      },
    })

    mediator.once("modal:closed", setCookie)
    mediator.once("auth:sign_up:success", setCookie)
  }, [])
}
