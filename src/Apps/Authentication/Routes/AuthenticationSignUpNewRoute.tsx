import { SignupLandingPage } from "Apps/Authentication/Routes/SignupLanding/SignupLandingPage"
import type { FC } from "react"

export const AuthenticationSignUpNewRoute: FC<
  React.PropsWithChildren<unknown>
> = () => {
  return <SignupLandingPage />
}
