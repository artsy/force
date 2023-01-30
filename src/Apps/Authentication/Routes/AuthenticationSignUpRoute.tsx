import { AuthenticationInlineDialog } from "Apps/Authentication/Components/AuthenticationInlineDialog"
import { useAuthPage } from "Apps/Authentication/Hooks/useAuthPage"
import { SignupRoute } from "Apps/Authentication/Legacy/Routes/SignupRoute"
import { FC } from "react"

export const AuthenticationSignUpRoute: FC = () => {
  const enabled = useAuthPage()

  if (!enabled) {
    return <SignupRoute />
  }

  return <AuthenticationInlineDialog mode="SignUp" />
}
