import { AuthenticationInlineDialog } from "Apps/Authentication/Components/AuthenticationInlineDialog"
import { useAuthPage } from "Apps/Authentication/Hooks/useAuthPage"
import { ForgotPasswordRoute } from "Apps/Authentication/Legacy/Routes/ForgotPasswordRoute"
import { FC } from "react"

export const AuthenticationForgotPasswordRoute: FC = () => {
  const enabled = useAuthPage()

  if (!enabled) {
    return <ForgotPasswordRoute />
  }

  return <AuthenticationInlineDialog mode="ForgotPassword" />
}
