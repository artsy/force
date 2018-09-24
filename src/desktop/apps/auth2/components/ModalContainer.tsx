import Cookies from "cookies-js"
import React from "react"
import { ModalManager } from "reaction/Components/Authentication/Desktop/ModalManager"
import { handleSubmit, setCookies } from "../helpers"
import { data as sd } from "sharify"
const mediator = require("../../../lib/mediator.coffee")

export const ModalContainer: React.SFC<any> = () => {
  let manager: ModalManager | null

  mediator.on("open:auth", options => {
    options.destination = options.destination || location.href

    setCookies(options)

    if (options && options.mode === "register") {
      options.mode = "signup"
    }

    setTimeout(() => {
      if (manager) {
        manager.openModal(options)
      }
    }, document.readyState === "complete" ? 0 : 500)
  })

  mediator.on("auth:error", err => {
    if (manager) {
      manager.setError(err)
    }
  })

  return (
    <ModalManager
      ref={ref => (manager = ref)}
      submitUrls={{
        login: sd.AP.loginPagePath,
        signup: sd.AP.signupPagePath,
        facebook: sd.AP.facebookPath,
        twitter: sd.AP.twitterPath,
      }}
      csrf={sd.CSRF_TOKEN}
      handleSubmit={handleSubmit as any}
      onSocialAuthEvent={data => {
        const analyticsOptions = {
          action:
            data.mode === "signup"
              ? "Created account"
              : "Successfully logged in",
          type: data.mode,
          context_module: data.contextModule,
          modal_copy: data.copy,
          trigger: data.trigger || "click",
          trigger_seconds: data.triggerSeconds,
          intent: data.intent,
          auth_redirect: data.redirectTo || data.destination,
          service: data.service,
        }

        Cookies.set(
          `analytics-${data.mode}`,
          JSON.stringify(analyticsOptions),
          {
            expires: 60 * 60 * 24,
          }
        )
      }}
      onModalClose={() => {
        mediator.trigger("modal:closed")
      }}
    />
  )
}
