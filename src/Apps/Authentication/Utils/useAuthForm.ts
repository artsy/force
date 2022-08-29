import { ModalOptions, ModalType } from "Components/Authentication/Types"
import { useRouter } from "System/Router/useRouter"
import { getENV } from "Utils/getENV"
import Cookies from "cookies-js"
import { AuthenticationMetaProps } from "../Components/AuthenticationMeta"
import { computeTitle } from "./computeTitle"

interface UseAuthFormProps {
  canonical: string
  pageTitle: string
  description?: string
  type: ModalType
}

export function useAuthForm({
  canonical,
  description,
  pageTitle,
  type,
}: UseAuthFormProps) {
  const { match } = useRouter()

  const {
    action,
    afterSignUpAction,
    contextModule,
    copy: copyQueryParam,
    destination,
    intent,
    kind,
    oauthLogin,
    objectId,
  } = match.location.query as ModalOptions

  const title = computeTitle({
    copy: copyQueryParam,
    intent,
    pageTitle,
  })

  const redirectTo = getENV("AUTHENTICATION_REDIRECT_TO")
  const signupReferer = getENV("AUTHENTICATION_REFERER")

  if (action) {
    const isClient = typeof window !== "undefined"

    if (isClient) {
      Cookies.set(
        "afterSignUpAction",
        JSON.stringify({ action, kind, objectId })
      )
    }
  }

  const meta: AuthenticationMetaProps["meta"] = {
    canonical,
    description: description ?? "",
    title,
  }

  const options: ModalOptions = {
    action,
    afterSignUpAction,
    contextModule,
    copy: copyQueryParam,
    destination,
    intent,
    kind,
    oauthLogin,
    objectId,
    redirectTo,
    signupReferer,
    title,
  }

  return {
    meta,
    options,
    type,
  }
}
