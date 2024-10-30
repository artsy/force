import { AuthenticationInlineDialog } from "Apps/Authentication/Components/AuthenticationInlineDialog"
import { FC } from "react"

export const AuthenticationSignUpRoute: FC<React.PropsWithChildren<unknown>> = () => {
  return <AuthenticationInlineDialog mode="Welcome" />
}
