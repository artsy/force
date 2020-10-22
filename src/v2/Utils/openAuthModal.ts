import { AuthContextModule, AuthIntent, Intent } from "@artsy/cohesion"
import { ModalOptions, ModalType } from "v2/Components/Authentication/Types"
import qs from "qs"
import { data as sd } from "sharify"
import { Mediator } from "lib/mediator"

export interface AuthModalOptions extends ModalOptions {
  entity: {
    slug: string
    name: string
  }
  contextModule: AuthContextModule
  intent: AuthIntent
}

export const openAuthModal = (mediator: Mediator, options: ModalOptions) => {
  mediator.trigger("open:auth", options)
}

export const openAuthToFollowSave = (
  mediator: Mediator,
  options: AuthModalOptions
) => {
  let handled = false

  if (sd.IS_MOBILE) {
    const intent = getMobileIntent(options)
    if (intent) {
      openMobileAuth(intent)
      handled = true
    }
  } else if (mediator) {
    const intent = getDesktopIntent(options)
    if (intent) {
      openAuthModal(mediator, {
        mode: ModalType.signup,
        ...intent,
      })
      handled = true
    }
  }

  if (!handled) {
    window.location.assign("/login")
  }
}

export const getMobileAuthLink = (mode: ModalType, options: ModalOptions) => {
  const path = mode === "login" ? "log_in" : "sign_up"
  return `/${path}?${qs.stringify(options)}`
}

function openMobileAuth(intent) {
  const href = getMobileAuthLink(ModalType.signup, {
    redirectTo: window.location.href,
    ...intent,
  })

  window.location.assign(href)
}

function getMobileIntent(options: AuthModalOptions): ModalOptions {
  switch (options.intent) {
    case Intent.followArtist:
    case Intent.followPartner:
      return getMobileIntentToFollow(options)
    case Intent.saveArtwork:
      return getMobileIntentToSaveArtwork(options)
    default:
      return undefined
  }
}

function getMobileIntentToFollow({
  contextModule,
  entity,
  intent,
}: AuthModalOptions): ModalOptions {
  const kind = intent === Intent.followArtist ? "artist" : "profile"
  return {
    action: "follow",
    contextModule,
    copy: `Sign up to follow ${entity.name}`,
    intent,
    kind,
    objectId: entity.slug,
  }
}

function getMobileIntentToSaveArtwork({
  contextModule,
  entity,
  intent,
}: AuthModalOptions): ModalOptions {
  return {
    action: "save",
    contextModule,
    copy: `Sign up to save artworks`,
    intent,
    kind: "artworks",
    objectId: entity.slug,
  }
}

function getDesktopIntentToFollow({
  contextModule,
  entity,
  intent,
}: AuthModalOptions): ModalOptions {
  const kind = intent === Intent.followArtist ? "artist" : "profile"
  return {
    mode: ModalType.signup,
    contextModule,
    copy: `Sign up to follow ${entity.name}`,
    intent,
    afterSignUpAction: {
      action: "follow",
      kind,
      objectId: entity.slug,
    },
  }
}

function getDesktopIntentToSaveArtwork({
  contextModule,
  entity,
  intent,
}: AuthModalOptions): ModalOptions {
  return {
    mode: ModalType.signup,
    contextModule,
    copy: `Sign up to save artworks`,
    intent,
    afterSignUpAction: {
      action: "save",
      kind: "artworks",
      objectId: entity.slug,
    },
  }
}

function getDesktopIntent(options: AuthModalOptions): ModalOptions {
  switch (options.intent) {
    case Intent.followArtist:
    case Intent.followPartner:
      return getDesktopIntentToFollow(options)
    case Intent.saveArtwork:
      return getDesktopIntentToSaveArtwork(options)
    default:
      return undefined
  }
}
