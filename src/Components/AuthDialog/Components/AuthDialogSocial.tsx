import AppleIcon from "@artsy/icons/AppleIcon"
import FacebookIcon from "@artsy/icons/FacebookIcon"
import GoogleIcon from "@artsy/icons/GoogleIcon"
import { Button, Stack } from "@artsy/palette"
import { useAuthDialogContext } from "Components/AuthDialog/AuthDialogContext"
import { useAfterAuthenticationRedirectUrl } from "Components/AuthDialog/Hooks/useAfterAuthenticationRedirectUrl"
import { setSocialAuthTracking } from "Components/AuthDialog/Hooks/useSocialAuthTracking"
import { getENV } from "Utils/getENV"
import { stringify } from "qs"
import type { FC } from "react"

export const AuthDialogSocial: FC<React.PropsWithChildren<unknown>> = () => {
  const { applePath, facebookPath, googlePath } = getENV("AP") ?? {
    applePath: "/users/auth/apple",
    facebookPath: "/users/auth/facebook",
    googlePath: "/users/auth/google",
  }

  const {
    state: { options, analytics, mode },
  } = useAuthDialogContext()

  const { redirectUrl } = useAfterAuthenticationRedirectUrl()

  // These params are handled by the routes in the Passport app,
  // they get pushed onto the session and then handled when the social
  // service redirects back to Force.
  const query = stringify(
    {
      afterSignUpAction: options.afterAuthAction,
      "redirect-to": redirectUrl,
      "signup-intent": analytics.intent,
      "signup-referer": getENV("AUTHENTICATION_REFERER"),
      accepted_terms_of_service: true,
      agreed_to_receive_emails: true,
    },
    { skipNulls: true },
  )

  const handleClick = (service: "facebook" | "apple" | "google") => () => {
    setSocialAuthTracking({
      action: { Login: "loggedIn", SignUp: "signedUp" }[mode],
      analytics,
      service,
    })
  }

  return (
    <Stack gap={1} flexDirection="row">
      <Button
        variant="secondaryBlack"
        width="100%"
        // @ts-ignore
        as="a"
        href={`${applePath}?${query}`}
        onClick={handleClick("apple")}
        rel="nofollow"
        title="Continue with Apple"
      >
        <AppleIcon />
      </Button>

      <Button
        variant="secondaryBlack"
        width="100%"
        // @ts-ignore
        as="a"
        href={`${googlePath}?${query}`}
        onClick={handleClick("google")}
        rel="nofollow"
        title="Continue with Google"
      >
        <GoogleIcon />
      </Button>

      <Button
        variant="secondaryBlack"
        width="100%"
        // @ts-ignore
        as="a"
        href={`${facebookPath}?${query}`}
        onClick={handleClick("facebook")}
        rel="nofollow"
        title="Continue with Facebook"
      >
        <FacebookIcon />
      </Button>
    </Stack>
  )
}
