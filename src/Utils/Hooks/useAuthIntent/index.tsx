import * as Yup from "yup"
import Cookies from "cookies-js"
import { createContext, FC, useContext, useEffect, useState } from "react"
import { useSystemContext } from "System/Hooks/useSystemContext"
import { followArtistMutation } from "./mutations/AuthIntentFollowArtistMutation"
import { followGeneMutation } from "./mutations/AuthIntentFollowGeneMutation"
import { followProfileMutation } from "./mutations/AuthIntentFollowProfileMutation"
import { saveArtworkMutation } from "./mutations/AuthIntentSaveArtworkMutation"
import { createOrderMutation } from "./mutations/AuthIntentCreateOrderMutation"
import { createOfferOrderMutation } from "./mutations/AuthIntentCreateOfferOrderMutation"
import { associateSubmissionMutation } from "./mutations/AuthIntentAssociateSubmissionMutation"
import { Environment } from "react-relay"
import { useDismissibleContext } from "@artsy/dismissible"

export const AFTER_AUTH_ACTION_KEY = "afterSignUpAction"

export type AfterAuthAction =
  | { action: "associateSubmission"; kind: "submission"; objectId: string }
  | { action: "createAlert" }
  | { action: "createAlert"; kind: "artist"; objectId: string }
  | { action: "createAlert"; kind: "artworks"; objectId: string }
  | { action: "follow"; kind: "artist"; objectId: string }
  | { action: "follow"; kind: "gene"; objectId: string }
  | { action: "follow"; kind: "profile"; objectId: string }
  | { action: "save"; kind: "artworks"; objectId: string }
  | { action: "saveArtworkToLists"; kind: "artworks"; objectId: string }
  | {
      action: "buyNow"
      kind: "artworks"
      objectId: string
      secondaryObjectId: string | null | undefined
    }
  | {
      action: "makeOffer"
      kind: "artworks"
      objectId: string
      secondaryObjectId: string | null | undefined
    }

export const runAuthIntent = async ({
  user,
  relayEnvironment,
  onSuccess,
}: {
  user: User
  relayEnvironment: Environment
  onSuccess: (value: AfterAuthAction) => void
}) => {
  if (!user) return

  const afterAuthActionCookie = Cookies.get(AFTER_AUTH_ACTION_KEY)

  if (!afterAuthActionCookie) return

  const value = parse(afterAuthActionCookie)

  if (!value) {
    // Expire the cookie so we don't keep trying to parse it
    Cookies.expire(AFTER_AUTH_ACTION_KEY)

    return
  }

  try {
    await (() => {
      switch (value.action) {
        case "createAlert":
        case "saveArtworkToLists":
          // Do nothing. Value update triggers UI which handles mutation.
          break

        case "follow":
          switch (value.kind) {
            case "artist":
              return followArtistMutation(relayEnvironment, value.objectId)
            case "gene":
              return followGeneMutation(relayEnvironment, value.objectId)
            case "profile":
              return followProfileMutation(relayEnvironment, value.objectId)
          }

          break

        case "save":
          return saveArtworkMutation(relayEnvironment, value.objectId)

        case "buyNow":
          return createOrderMutation(
            relayEnvironment,
            value.objectId,
            value.secondaryObjectId
          )

        case "makeOffer":
          return createOfferOrderMutation(
            relayEnvironment,
            value.objectId,
            value.secondaryObjectId
          )

        case "associateSubmission":
          return associateSubmissionMutation(relayEnvironment, value.objectId)
      }
    })()

    onSuccess(value)

    Cookies.expire(AFTER_AUTH_ACTION_KEY)
  } catch (err) {
    console.error("Unable to run intent", err)
  }
}

/**
 * If someone is logged out and clicks a follow, save button, or any other action
 * we create a cookie specifying what action they were trying to take.
 *
 * This hook is what checks that cookie and runs that action after they are authenticated.
 */
export const useRunAuthIntent = () => {
  const { user, relayEnvironment } = useSystemContext()

  const { setValue } = useAuthIntent()

  const { syncFromLoggedOutUser } = useDismissibleContext()

  useEffect(() => {
    if (!relayEnvironment) return

    runAuthIntent({
      user,
      relayEnvironment,
      onSuccess: value => {
        setValue(value)

        // Run any success actions/clean up
        switch (value.action) {
          case "follow":
            switch (value.kind) {
              case "artist":
                syncFromLoggedOutUser()
            }
            break
          case "saveArtworkToLists":
            switch (value.kind) {
              case "artworks":
                syncFromLoggedOutUser()
            }
        }
      },
    })
  }, [relayEnvironment, setValue, syncFromLoggedOutUser, user])
}

const AuthIntentContext = createContext<{
  value: AfterAuthAction | null
  setValue: (value: AfterAuthAction | null) => void
}>({
  value: null,
  setValue: (_value: AfterAuthAction | null) => null,
})

export const AuthIntentProvider: FC = ({ children }) => {
  const [value, setValue] = useState<AfterAuthAction | null>(null)

  return (
    <AuthIntentContext.Provider value={{ value, setValue }}>
      {children}
    </AuthIntentContext.Provider>
  )
}

/**
 * Use to subscribe to changes in the `action` value which is set once
 * the user is authenticated.
 */
export const useAuthIntent = () => {
  const { value, setValue } = useContext(AuthIntentContext)

  return { value, setValue, clearValue: () => setValue(null) }
}

export const setAfterAuthAction = (afterAuthAction: AfterAuthAction) => {
  Cookies.set(AFTER_AUTH_ACTION_KEY, JSON.stringify(afterAuthAction))
}

const schema = Yup.object({
  action: Yup.string()
    .oneOf([
      "associateSubmission",
      "createAlert",
      "follow",
      "save",
      "saveArtworkToLists",
      "buyNow",
      "makeOffer",
    ])
    .required(),
  kind: Yup.string()
    .oneOf(["artist", "artworks", "gene", "profile", "submission"])
    .when("action", (action, schema) => {
      return action === "createAlert" ? schema.notRequired() : schema.required()
    }),
  objectId: Yup.string().when("action", (action, schema) => {
    return action === "createAlert" ? schema.notRequired() : schema.required()
  }),
  secondaryObjectId: Yup.string(),
})

export const isValid = (value: any): value is AfterAuthAction => {
  return schema.isValidSync(value)
}

const parse = (value: any): AfterAuthAction | null => {
  try {
    const parsed = JSON.parse(value)

    if (!isValid(parsed)) return null

    return parsed
  } catch (err) {
    return null
  }
}
