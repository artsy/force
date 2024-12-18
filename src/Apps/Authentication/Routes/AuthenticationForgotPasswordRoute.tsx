import { AuthenticationInlineDialog } from "Apps/Authentication/Components/AuthenticationInlineDialog"
import type { FC } from "react"

export const AuthenticationForgotPasswordRoute: FC<
  React.PropsWithChildren<unknown>
> = () => {
  return <AuthenticationInlineDialog mode="ForgotPassword" />
}
