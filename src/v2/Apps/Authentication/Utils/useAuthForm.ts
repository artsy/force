import { ModalOptions, ModalType } from "v2/Components/Authentication/Types"
import { useRouter } from "v2/System/Router/useRouter"
import { getENV } from "v2/Utils/getENV"
import Cookies from "cookies-js"
import { AuthenticationMetaProps } from "../Components/AuthenticationMeta"
import { computeTitle } from "./computeTitle"

interface UseAuthFormProps {
  canonical: string
  pageTitle: string
  type: ModalType
}

export function useAuthForm({ canonical, pageTitle, type }: UseAuthFormProps) {
  const { match } = useRouter()

  const {
    action,
    afterSignUpAction,
    api_login,
    contextModule,
    copy: copyQueryParam,
    destination,
    intent,
    kind,
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
    description: "",
    title,
  }

  const options: ModalOptions = {
    action,
    afterSignUpAction,
    api_login,
    contextModule,
    copy: copyQueryParam,
    destination,
    intent,
    kind,
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
