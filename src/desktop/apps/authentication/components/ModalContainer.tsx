import Cookies from "cookies-js"
import React from "react"
import { data as sd } from "sharify"

import { handleSubmit, setCookies } from "../helpers"
import { ModalManager } from "@artsy/reaction/dist/Components/Authentication/Desktop/ModalManager"
import {
  ModalOptions,
  ModalType,
} from "reaction/Components/Authentication/Types"

const mediator = require("../../../lib/mediator.coffee")

export class ModalContainer extends React.Component<any> {
  public manager: ModalManager | null

  UNSAFE_componentWillMount() {
    mediator.on("open:auth", this.onOpenAuth)
    mediator.on("auth:error", this.onAuthError)
  }

  onOpenAuth = (options: ModalOptions) => {
    options.destination = options.destination || location.href
    if (options && (options.mode as any) === "register") {
      options.mode = ModalType.signup
    }

    setCookies(options)
    setTimeout(
      () => {
        if (this.manager) {
          this.manager.openModal(options)
        }
      },
      document.readyState === "complete" ? 0 : 500
    )
  }

  onAuthError = (err: any) => {
    if (this.manager) {
      this.manager.setError(err)
    }
  }

  onSocialAuthEvent = (data: any) => {
    const analyticsOptions = {
      action:
        data.mode === "signup" ? "Created account" : "Successfully logged in",
      type: data.mode,
      context_module: data.contextModule,
      modal_copy: data.copy,
      trigger: data.trigger || "click",
      trigger_seconds: data.triggerSeconds,
      intent: data.intent,
      auth_redirect: data.redirectTo || data.destination,
      service: data.service,
    }

    Cookies.set(`analytics-${data.mode}`, JSON.stringify(analyticsOptions), {
      expires: 60 * 60 * 24,
    })
  }

  render() {
    return (
      <ModalManager
        ref={ref => (this.manager = ref)}
        submitUrls={{
          login: sd.AP.loginPagePath,
          signup: sd.AP.signupPagePath,
          facebook: sd.AP.facebookPath,
          twitter: sd.AP.twitterPath,
        }}
        csrf={sd.CSRF_TOKEN}
        handleSubmit={handleSubmit}
        onSocialAuthEvent={this.onSocialAuthEvent}
        onModalClose={() => {
          mediator.trigger("modal:closed")
        }}
        showRecaptchaDisclaimer={true}
      />
    )
  }
}
