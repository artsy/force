import { AuthContextModule, AuthIntent, Intent } from "@artsy/cohesion"
import { ModalOptions, ModalType } from "v2/Components/Authentication/Types"
import qs from "qs"
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
  if (authModalReady(mediator)) {
    mediator.trigger("open:auth", options)
    return
  }

  const intervalId = setInterval(() => {
    if (authModalReady(mediator)) {
      mediator.trigger("open:auth", options)
      clearInterval(intervalId)
    }
  }, 100)
}

const authModalReady = (mediator: Mediator): boolean => {
  return mediator.ready("open:auth")
}

export const openAuthToFollowSaveCreate = (
  mediator: Mediator,
  options: AuthModalOptions
) => {
  let handled = false

  if (mediator) {
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

const FOLLOW_INTENTS = {
  [Intent.followArtist]: "artist",
  [Intent.followPartner]: "profile",
  [Intent.followGene]: "gene",
}

function getDesktopIntentToFollow({
  contextModule,
  entity,
  intent,
}: AuthModalOptions): ModalOptions {
  const kind = FOLLOW_INTENTS[intent]

  return {
    afterSignUpAction: {
      action: "follow",
      kind,
      objectId: entity.slug,
    },
    contextModule,
    copy: `Sign up to follow ${entity.name}`,
    intent,
    mode: ModalType.signup,
  }
}

function getDesktopIntentToSaveArtwork({
  contextModule,
  entity,
  intent,
}: AuthModalOptions): ModalOptions {
  return {
    afterSignUpAction: {
      action: "save",
      kind: "artworks",
      objectId: entity.slug,
    },
    contextModule,
    copy: `Sign up to save artworks`,
    intent,
    mode: ModalType.signup,
  }
}

const getDesktopIntentToCreateAlert = ({
  contextModule,
  entity,
  intent,
}: AuthModalOptions): ModalOptions => {
  return {
    afterSignUpAction: {
      action: "createAlert",
      kind: "artist",
      objectId: entity.slug,
    },
    contextModule,
    intent,
    mode: ModalType.signup,
  }
}

function getDesktopIntent(options: AuthModalOptions): ModalOptions {
  switch (options.intent) {
    case Intent.followArtist:
    case Intent.followPartner:
    case Intent.followGene:
      return getDesktopIntentToFollow(options)
    case Intent.saveArtwork:
      return getDesktopIntentToSaveArtwork(options)
    case "createAlert" as AuthIntent:
      return getDesktopIntentToCreateAlert(options)
    default:
      // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
      return undefined
  }
}

export const getMobileAuthLink = (mode: ModalType, options: ModalOptions) => {
  const path = mode === "login" ? "login" : "signup"
  return `/${path}?${qs.stringify(options)}`
}
