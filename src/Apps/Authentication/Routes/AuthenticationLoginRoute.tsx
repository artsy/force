import { AuthenticationInlineDialog } from "Apps/Authentication/Components/AuthenticationInlineDialog"
import type { FC } from "react"

export const AuthenticationLoginRoute: FC<
  React.PropsWithChildren<unknown>
> = () => {
  return <AuthenticationInlineDialog mode="Welcome" />
}
