import React from "react"
import ReactDOM from "react-dom"
import { AuthStatic } from "../components/AuthStatic"
import { MobileAuthStatic } from "../components/MobileAuthStatic"
import { ModalContainer } from "../components/ModalContainer"
import { setCookies } from "../helpers.setCookies"
import { data as sd } from "sharify"

export const init = () => {
  // Rehydrate data from Server
  const bootstrapData = window.__BOOTSTRAP__
  const el = document.getElementById("react-root")
  const Component: any = sd.IS_MOBILE ? MobileAuthStatic : AuthStatic

  if (el) {
    setCookies(bootstrapData.options)

    // Start app
    ReactDOM.hydrate(<Component {...bootstrapData} />, el)
  }
}

export const initModalManager = () => {
  const el = document.getElementById("react-modal-container")

  if (el) {
    ReactDOM.render(<ModalContainer />, el)
  }
}
