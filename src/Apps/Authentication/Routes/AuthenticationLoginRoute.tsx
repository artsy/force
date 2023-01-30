import { AuthenticationInlineDialog } from "Apps/Authentication/Components/AuthenticationInlineDialog"
import { useAuthPage } from "Apps/Authentication/Hooks/useAuthPage"
import { LoginRoute } from "Apps/Authentication/Legacy/Routes/LoginRoute"
import { FC } from "react"

export const AuthenticationLoginRoute: FC = () => {
  const enabled = useAuthPage()

  if (!enabled) {
    return <LoginRoute />
  }

  return <AuthenticationInlineDialog mode="Login" />
}
