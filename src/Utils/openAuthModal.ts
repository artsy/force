import { AuthContextModule, AuthIntent } from "@artsy/cohesion"
import { ModalOptions, ModalType } from "Components/Authentication/Types"
import qs from "qs"
import { Mediator } from "Server/mediator"

export interface AuthModalOptions extends ModalOptions {
  entity: {
    slug: string
    name: string
  }
  contextModule: AuthContextModule
  intent: AuthIntent
}

export const openAuthModal = (mediator: Mediator, options: ModalOptions) => {
  triggerEvent(mediator, "open:auth", options)
}

export const triggerEvent = (
  mediator: Mediator,
  eventName: string,
  options?: ModalOptions
) => {
  if (mediator.ready(eventName)) {
    mediator.trigger(eventName, options)
    return
  }

  const intervalId = setInterval(() => {
    if (mediator.ready(eventName)) {
      mediator.trigger(eventName, options)
      clearInterval(intervalId)
    }
  }, 100)
}

export const getMobileAuthLink = (mode: ModalType, options: ModalOptions) => {
  const path = mode === "login" ? "login" : "signup"
  return `/${path}?${qs.stringify(options)}`
}
