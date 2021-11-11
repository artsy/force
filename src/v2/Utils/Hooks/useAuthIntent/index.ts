import Cookies from "cookies-js"
import { useEffect } from "react"
import { Environment } from "react-relay"
import { useSystemContext } from "v2/System"
import { followArtistMutation } from "./mutations/AuthIntentFollowArtistMutation"
import { followGeneMutation } from "./mutations/AuthIntentFollowGeneMutation"
import { followProfileMutation } from "./mutations/AuthIntentFollowProfileMutation"
import { saveArtworkMutation } from "./mutations/AuthIntentSaveArtworkMutation"
import { createConsignSubmission } from "v2/Apps/Consign/Routes/SubmissionFlow/Utils/createConsignSubmission"
import {
  getSubmission,
  removeSubmission,
} from "v2/Apps/Consign/Routes/SubmissionFlow/Utils/useSubmission"

const AFTER_AUTH_ACTION_KEY = "afterSignUpAction"

export type AfterAuthAction =
  | { action: "follow"; kind: "artist"; objectId: string }
  | { action: "follow"; kind: "profile"; objectId: string }
  | { action: "follow"; kind: "gene"; objectId: string }
  | { action: "save"; kind: "artworks"; objectId: string }
  | { action: "save"; kind: "submissions"; objectId: string }

const isValid = (value: any): value is AfterAuthAction => {
  return (
    typeof value === "object" &&
    "action" in value &&
    "kind" in value &&
    "objectId" in value
  )
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

export const runAuthIntent = async (
  user: User,
  relayEnvironment: Environment
) => {
  if (!user) return

  const afterAuthActionCookie = Cookies.get(AFTER_AUTH_ACTION_KEY)
  if (!afterAuthActionCookie) return

  const value = parse(afterAuthActionCookie)
  if (value === null) return

  try {
    await (() => {
      switch (value.action) {
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
          switch (value.kind) {
            case "artworks":
              return saveArtworkMutation(relayEnvironment, value.objectId)
            case "submissions":
              const submission = getSubmission(value.objectId)

              if (submission) {
                return createConsignSubmission(
                  relayEnvironment,
                  submission,
                  user
                ).then(() => {
                  removeSubmission(value.objectId)
                })
              }
          }
          break
      }
    })()

    Cookies.expire(AFTER_AUTH_ACTION_KEY)
  } catch (err) {
    console.error("Unable to run intent", err)
  }
}

/**
 * If someone is logged out and clicks a follow or save button we create a cookie
 * specifying what action they were trying to take.
 *
 * This hook is what checks that cookie and runs that action after they are authenticated.
 */
export const useAuthIntent = () => {
  const { user, relayEnvironment } = useSystemContext()

  useEffect(() => {
    // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
    runAuthIntent(user, relayEnvironment)
  }, [relayEnvironment, user])
}
