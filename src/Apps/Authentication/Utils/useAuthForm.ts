import { AuthenticationMetaProps } from "Apps/Authentication/Components/AuthenticationMeta"
import { ModalOptions, ModalType } from "Components/Authentication/Types"
import { useRouter } from "System/Router/useRouter"
import { getENV } from "Utils/getENV"
import {
  AfterAuthAction,
  AFTER_AUTH_ACTION_KEY,
} from "Utils/Hooks/useAuthIntent"
import { computeTitle } from "./computeTitle"
import Cookies from "cookies-js"
import { useEffect } from "react"

interface UseAuthFormProps {
  canonical: string
  pageTitle: string
  description?: string
  type: ModalType
}

export const useAuthForm = ({
  canonical,
  description,
  pageTitle,
  type,
}: UseAuthFormProps) => {
  const { match } = useRouter()

  const {
    afterSignUpAction,
    contextModule,
    copy: copyQueryParam,
    intent,
    oauthLogin,
    // FIXME: Convection should link using the `afterSignUpAction` param, not `submissionId`
    submissionId,
  } = match.location.query as ModalOptions & { submissionId?: string }

  const title = computeTitle({ copy: copyQueryParam, intent, pageTitle })
  const redirectTo = getENV("AUTHENTICATION_REDIRECT_TO")
  const signupReferer = getENV("AUTHENTICATION_REFERER")

  // FIXME: Convection should link using the `afterSignUpAction` param,
  // not `submissionId` so that we don't have to do this.
  //
  // If there's a `submissionId` constructs an `afterSignUpAction` from it. Otherwise
  // falls back to the `afterSignUpAction` param.
  const _afterSignUpAction: AfterAuthAction | undefined = !!submissionId
    ? {
        action: "associateSubmission",
        kind: "submission",
        objectId: submissionId,
      }
    : afterSignUpAction

  // FIXME: We have to make the cookie now because apparently passing it into
  // options like this doesn't even work!
  useEffect(() => {
    if (!_afterSignUpAction) return

    Cookies.set(AFTER_AUTH_ACTION_KEY, JSON.stringify(_afterSignUpAction))
  }, [_afterSignUpAction])

  const meta: AuthenticationMetaProps["meta"] = {
    canonical,
    description: description ?? "",
    title,
  }

  const options: ModalOptions = {
    contextModule,
    copy: copyQueryParam,
    intent,
    oauthLogin,
    redirectTo,
    signupReferer,
  }

  return {
    meta,
    options,
    type,
  }
}
