import React from "react"
import { data as sd } from "sharify"
import { handleScrollingAuthModal } from "desktop/lib/openAuthModal"
import { ContextModule, Intent } from "@artsy/cohesion"
import { mediator } from "lib/mediator"

const Cookies = require("desktop/components/cookies/index.coffee")

export class AuthWrapper extends React.Component {
  public openModal

  UNSAFE_componentWillMount() {
    const hasCookie = Cookies.get("editorial-signup-dismissed")

    if (!hasCookie && !sd.IS_MOBILE && !sd.CURRENT_USER) {
      mediator.on("modal:closed", this.setDismissCookie)
      mediator.on("auth:sign_up:success", this.setDismissCookie)
      this.onOpenModal()
    }
  }

  onOpenModal = () => {
    handleScrollingAuthModal({
      intent: Intent.viewEditorial,
      contextModule: ContextModule.popUpModal,
      copy: "Sign up for the best stories in art and visual culture",
      destination: location.href,
      afterSignUpAction: {
        action: "editorialSignup",
      },
    })
  }

  setDismissCookie = () => {
    Cookies.set("editorial-signup-dismissed", 1, { expires: 31536000 })
  }

  render() {
    return null
  }
}
