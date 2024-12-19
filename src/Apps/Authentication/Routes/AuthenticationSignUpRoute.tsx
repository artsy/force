import { AuthenticationInlineDialog } from "Apps/Authentication/Components/AuthenticationInlineDialog"
import type { FC } from "react"

export const AuthenticationSignUpRoute: FC<
  React.PropsWithChildren<unknown>
> = () => {
  return <AuthenticationInlineDialog mode="Welcome" />
}
