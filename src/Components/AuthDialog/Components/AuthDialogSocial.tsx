import {
  Button,
  Join,
  Spacer,
  AppleIcon,
  GoogleIcon,
  FacebookIcon,
} from "@artsy/palette"
import { useAuthDialogContext } from "Components/AuthDialog/AuthDialogContext"
import { useAfterAuthenticationRedirectUrl } from "Components/AuthDialog/Hooks/useAfterAuthenticationRedirectUrl"
import { setSocialAuthTracking } from "Components/AuthDialog/Hooks/useSocialAuthTracking"
import { stringify } from "qs"
import { FC } from "react"
import { getENV } from "Utils/getENV"

export const AuthDialogSocial: FC = () => {
  const { applePath, facebookPath, googlePath } = getENV("AP")

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
    { skipNulls: true }
  )

  const handleClick = (service: "facebook" | "apple" | "google") => () => {
    setSocialAuthTracking({
      action: { Login: "loggedIn", SignUp: "signedUp" }[mode],
      service,
    })
  }

  return (
    <Join separator={<Spacer y={1} />}>
      <Button
        variant="secondaryBlack"
        width="100%"
        Icon={AppleIcon}
        // @ts-ignore
        as="a"
        href={`${applePath}?${query}`}
        onClick={handleClick("apple")}
        rel="nofollow"
      >
        Continue with Apple
      </Button>

      <Button
        variant="secondaryBlack"
        width="100%"
        Icon={GoogleIcon}
        // @ts-ignore
        as="a"
        href={`${googlePath}?${query}`}
        onClick={handleClick("google")}
        rel="nofollow"
      >
        Continue with Google
      </Button>

      <Button
        variant="secondaryBlack"
        width="100%"
        Icon={FacebookIcon}
        // @ts-ignore
        as="a"
        href={`${facebookPath}?${query}`}
        onClick={handleClick("facebook")}
        rel="nofollow"
      >
        Continue with Facebook
      </Button>
    </Join>
  )
}
